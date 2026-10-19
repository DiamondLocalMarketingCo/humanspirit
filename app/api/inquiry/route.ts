import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}
const rightsChoices = ["Yes, subject to review", "Not sure / needs approval", "No / restricted"];
const allowedSizes = ["1–10", "11–50", "51–200", "201–1,000", "1,001–5,000", "5,001+", "Prefer not to say"];

export async function POST(req: NextRequest) {
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
  if (clean(data.fax, 100)) return NextResponse.json({success:true});

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
  const systems = Array.isArray(data.systems)
    ? data.systems.filter((v):v is string=>typeof v==="string").slice(0,28).map(v=>v.trim().slice(0,80)).filter(Boolean)
    : [];

  if (!company || !sector || !allowedSizes.includes(employees) || !dataType || !rightsChoices.includes(rights) ||
      !name || !role || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || systems.length === 0 || data.consent !== "yes" ||
      (founded && !/^(18|19|20)\d{2}$/.test(founded))) {
    return NextResponse.json({error:"Please complete the required fields and confirm permission to contact you."},{status:400});
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.LIORVEL_INQUIRY_EMAIL;
  const from = process.env.LIORVEL_FROM_EMAIL;
  if (!key || !to || !from) {
    return NextResponse.json({error:"Email delivery isn't configured yet. Please copy your answers for later."},{status:503});
  }

  const content = [
    "New Liorvel company assessment", "",
    "Company: " + company,
    "Website: " + (website || "Not provided"),
    "Industry: " + sector,
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
    const sent = await fetch("https://api.resend.com/emails", {
      method:"POST",
      headers:{"Authorization":"Bearer "+key,"Content-Type":"application/json"},
      body:JSON.stringify({from,to:[to],reply_to:email,subject:"Liorvel assessment: "+company,text:content}),
      cache:"no-store"
    });
    if (!sent.ok) return NextResponse.json({error:"Delivery is temporarily unavailable. Please try again later."},{status:502});
    return NextResponse.json({success:true});
  } catch {
    return NextResponse.json({error:"Delivery is temporarily unavailable. Please try again later."},{status:502});
  }
}
