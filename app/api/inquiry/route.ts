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
  // Prefer the configured, authenticated mail transport. Until Vercel
  // environment access is available, route form messages through FormSubmit.
  // That provider requires the recipient to confirm the mailbox once.
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LIORVEL_INQUIRY_EMAIL || "mdarwish0523@gmail.com";
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

  try {
    if (key && from) {
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
          signal: AbortSignal.timeout(10000)
        });
        if (sent.ok) return NextResponse.json({ success: true }, { headers: noStore });
      } catch {
        // A transport outage should not prevent the alternative route.
      }
    }

    // No client-side API keys, no public destination address in the page.
    // First use sends a mailbox activation email; messages remain queued
    // until the recipient confirms that email.
    const fallback = await fetch("https://formsubmit.co/ajax/" + encodeURIComponent(to), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // FormSubmit checks the page origin; Node fetch has no Referer by default.
        Referer: "https://www.liorvel.com/contact",
        Origin: "https://www.liorvel.com"
      },
      body: JSON.stringify({
        name, email,
        company,
        _subject: "New Liorvel assessment: " + company,
        _template: "table",
        _captcha: "false",
        _url: "https://www.liorvel.com/contact",
        message: content
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(12000)
    });
    const result = await fallback.json().catch(() => null) as { success?: boolean | string; message?: string } | null;
    // FormSubmit often returns HTTP 200 even for a rejected message, using
    // the string "false". Only its explicit "true" confirms acceptance.
    if (!fallback.ok || String(result?.success) !== "true") {
      const activationPending = /activat|confirm.*email/i.test(result?.message || "");
      console.warn("Liorvel form email transport rejected", {
        provider: "formsubmit",
        httpStatus: fallback.status,
        reason: activationPending ? "recipient_activation_pending" : "provider_rejected"
      });
      return NextResponse.json({
        error: activationPending
          ? "Email notifications must be activated before submissions can be delivered. Please try again after activation."
          : "Delivery is temporarily unavailable. Please try again later."
      }, { status: 502, headers: noStore });
    }
    return NextResponse.json({ success: true }, { headers: noStore });
  } catch {
    return NextResponse.json({ error: "Delivery is temporarily unavailable. Please try again later." }, { status: 502, headers: noStore });
  }
}
