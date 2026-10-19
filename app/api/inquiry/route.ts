import { NextRequest, NextResponse } from "next/server";
export const runtime = "nodejs";

function clean(value: unknown, max: number) { return typeof value === "string" ? value.trim().slice(0, max) : ""; }

export async function POST(req: NextRequest) {
  let data: Record<string, unknown>;
  try {
    const raw = await req.text();
    if (raw.length > 12000) return NextResponse.json({error:"The submission is too long."},{status:413});
    data = JSON.parse(raw) as Record<string, unknown>;
    if (!data || Array.isArray(data) || typeof data !== "object") throw new Error("Invalid data");
  } catch { return NextResponse.json({error:"Please check the form details and try again."},{status:400}); }
  if (clean(data.fax,100)) return NextResponse.json({success:true});
  const name=clean(data.name,150), email=clean(data.email,254), company=clean(data.company,160),
    website=clean(data.website,200), sector=clean(data.sector,100), dataType=clean(data.dataType,100), details=clean(data.details,2000);
  if (!name || !company || !sector || !dataType || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || data.consent !== "yes") return NextResponse.json({error:"Complete all required fields and confirm consent."},{status:400});
  const key=process.env.RESEND_API_KEY, to=process.env.LIORVEL_INQUIRY_EMAIL, from=process.env.LIORVEL_FROM_EMAIL;
  if (!key || !to || !from) return NextResponse.json({error:"Online delivery is not configured yet. You can copy the completed inquiry below and keep it for later."},{status:503});
  const content=["New Liorvel company assessment inquiry","", "Full name: "+name,"Work email: "+email,"Company: "+company,"Website: "+(website||"Not provided"),"Industry: "+sector,"Data category: "+dataType,"Details: "+(details||"Not provided"),"Consent: confirmed for inquiry review only"].join("\n");
  try {
    const result=await fetch("https://api.resend.com/emails",{method:"POST",headers:{"Authorization":"Bearer "+key,"Content-Type":"application/json"},body:JSON.stringify({from,to:[to],reply_to:email,subject:"Liorvel company inquiry: "+company,text:content}),cache:"no-store"});
    if (!result.ok) return NextResponse.json({error:"Delivery is temporarily unavailable. Please try again later."},{status:502});
    return NextResponse.json({success:true});
  } catch {return NextResponse.json({error:"Delivery is temporarily unavailable. Please try again later."},{status:502});}
}
