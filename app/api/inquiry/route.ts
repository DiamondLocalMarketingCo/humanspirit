import { NextRequest, NextResponse } from "next/server";
import { assessCompany } from "../../lib/assessment";

export const runtime = "nodejs";
function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}
const rightsChoices = ["Yes, subject to review", "Not sure / needs approval", "No / restricted"];
const allowedSizes = ["1–10", "11–24", "25–29", "30–49", "50–200", "201–1,000", "1,001+", "Prefer not to say"];
const allowedCountries = ["United States","United Kingdom","Canada","India","Australia","Singapore","Ireland","Netherlands","Germany","France","Other"];
const noStore = {"Cache-Control":"no-store"};

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && (!host || ![ "https://" + host, "http://localhost:3000" ].includes(origin))) return NextResponse.json({error:"Invalid origin"},{status:403,headers:noStore});
  if (!(req.headers.get("content-type") || "").startsWith("application/json")) return NextResponse.json({error:"JSON required."},{status:415,headers:noStore});
  let data: Record<string, unknown>;
  try {
    const raw = await req.text();
    if (raw.length > 16000) return NextResponse.json({error:"The submission is too long."},{status:413});
    data = JSON.parse(raw) as Record<string, unknown>;
    if (!data || Array.isArray(data) || typeof data !== "object") throw Error("Invalid data");
  } catch {
    return NextResponse.json({error:"Please check the form and try again."},{status:400});
  }

  // Honeypot: discard bot submissions without sending email.
  if (clean(data.fax, 100)) return NextResponse.json({success:true},{headers:noStore});

  const company = clean(data.company,160);
  const website = clean(data.website,200);
  const sector = clean(data.sector,100);
  const employees = clean(data.employees,40);
  const founded = clean(data.founded,4);
  const dataType = clean(data.dataType,100);
  const rights = clean(data.rights,80);
  const name = clean(data.name,150);
  const email = clean(data.email,254);
  const role = clean(data.role,120);
  const details = clean(data.details,1200);
  const companyStatus = clean(data.companyStatus,20);
  const country = clean(data.country,60);
  const english = clean(data.english,10);
  const documentation = clean(data.documentation,30);
  const workflows = clean(data.workflows,10);
  const communications = clean(data.communications,20);
  const systems = Array.isArray(data.systems)
    ? data.systems.filter((v):v is string=>typeof v==="string").slice(0,28).map(v=>v.trim().slice(0,80)).filter(Boolean)
    : [];

  if (!company || !sector || !allowedSizes.includes(employees) || !dataType || !rightsChoices.includes(rights) ||
      !name || !role || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || systems.length === 0 || data.consent !== "yes" ||
      (founded && !/^(18|19|20)\d{2}$/.test(founded)) ||
      !["operating","closed"].includes(companyStatus) || !allowedCountries.includes(country) ||
      !["Yes","Some","No"].includes(english) || !["Strong / established","Some","Very little"].includes(documentation) ||
      !["Yes","Some","No"].includes(workflows) ||
      (companyStatus === "closed" && !["Extensive","Substantial","Limited","None"].includes(communications))) {
    return NextResponse.json({error:"Please complete the required fields and confirm permission to contact you."},{status:400});
  }

  const assessment = assessCompany({companyStatus, country, english, documentation, workflows, communications, systems, rights, employees});
  // Only deliver private applicant data through the authenticated mail provider.
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LIORVEL_INQUIRY_EMAIL;
  const from = process.env.LIORVEL_FROM_EMAIL;

  const content = [
    "New Liorvel company assessment", "",
    "Screening: " + assessment.label + " (" + assessment.status + ")",
    "Program: " + assessment.program,
    "Standard requirements not met: " + (assessment.blockers.join(" | ") || "None"),
    "Manual checks: " + (assessment.checks.join(" | ") || "None"),
    "Internal note: This is for Liorvel review. Any external referral application is a separate step and must use the correct referral tracking process.", "",
    "Company: " + company,
    "Website: " + (website || "Not provided"),
    "Industry: " + sector,
    "Business status: " + companyStatus,
    "Country: " + country,
    "English documentation: " + english,
    "Documentation depth: " + documentation,
    "Recurring workflows: " + workflows,
    "Chat history: " + (communications || "Not applicable"),
    "Full-time employees: " + employees,
    "Year founded: " + (founded || "Not provided"),
    "Business systems: " + systems.join(", "),
    "Potential data category: " + dataType,
    "Ability to explore data licensing: " + rights,
    "Contact name: " + name,
    "Work email: " + email,
    "Role: " + role,
    "Additional context: " + (details || "Not provided"),
    "Consent: Contact about this inquiry only (does not permit data sharing)"
  ].join("\n");

  if (!key || !from || !to) {
    console.error("Liorvel inquiry email configuration is incomplete", {
      hasApiKey: Boolean(key),
      hasFrom: Boolean(from),
      hasRecipient: Boolean(to)
    });
    return NextResponse.json(
      { error: "Submission delivery is temporarily unavailable. Please try again later.", code: "EMAIL_NOT_CONFIGURED" },
      { status: 503, headers: noStore }
    );
  }

  try {
    const sent = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: "Bearer " + key, "Content-Type": "application/json" },
      body: JSON.stringify({
        from, to: [to], reply_to: email,
        subject: "Liorvel [" + assessment.status.toUpperCase() + "]: " + company,
        text: content
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(12000)
    });
    if (!sent.ok) {
      const providerError = await sent.json().catch(() => null) as { name?: string; message?: string } | null;
      console.error("Liorvel inquiry email rejected by Resend", {
        httpStatus: sent.status,
        type: typeof providerError?.name === "string" ? providerError.name.slice(0, 80) : "unknown",
        reason: typeof providerError?.message === "string" ? providerError.message.slice(0, 300) : "unknown"
      });
      return NextResponse.json(
        { error: "We could not deliver your inquiry. Please try again later.", code: "EMAIL_PROVIDER_REJECTED" },
        { status: 502, headers: noStore }
      );
    }
    return NextResponse.json({ success: true }, { headers: noStore });
  } catch {
    console.error("Liorvel inquiry email transport unavailable");
    return NextResponse.json(
      { error: "Delivery is temporarily unavailable. Please try again later.", code: "EMAIL_PROVIDER_UNAVAILABLE" },
      { status: 502, headers: noStore }
    );
  }
}
