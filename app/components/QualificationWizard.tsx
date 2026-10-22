"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, CheckCircle2, Copy, LockKeyhole } from "lucide-react";
import { assessCompany } from "../lib/assessment";

const groups = [
  { label: "Messaging, email & files", tools: ["Slack", "Microsoft Teams", "Gmail", "Outlook", "Google Drive", "SharePoint"] },
  { label: "CRM, support & calls", tools: ["HubSpot", "Salesforce", "Zendesk", "Intercom", "ServiceTitan", "Other CRM"] },
  { label: "Projects, finance & operations", tools: ["Jira", "Linear", "GitHub", "QuickBooks", "Shopify", "Internal systems"] },
];
const extraTools = ["Notion", "Asana", "Monday.com", "Figma", "Dropbox", "ERP software", "Spreadsheets", "Paper records", "Other / not sure"];
const sectors = ["Technology / software", "Professional services", "Industrial / manufacturing", "Retail / e-commerce", "Logistics / transportation", "Construction / field services", "Healthcare / life sciences", "Financial services", "Media / information", "Hospitality", "Other"];
const sizes = ["1–10", "11–24", "25–29", "30–49", "50–200", "201–1,000", "1,001+", "Prefer not to say"];
const countries = ["United States", "United Kingdom", "Canada", "India", "Australia", "Singapore", "Ireland", "Netherlands", "Germany", "France", "Other"];
const dataTypes = ["Operational workflows & records", "Customer support / service operations", "Domain-specific documents", "Transaction / commerce activity", "Technical / product records", "Mixed / not sure yet", "Other"];
const stages = ["Systems", "Company", "Assessment", "Contact"];
type FormData = {
  systems: string[]; company: string; website: string; sector: string; employees: string;
  founded: string; dataType: string; rights: string; name: string; email: string; role: string;
  details: string; consent: boolean; fax: string;
  companyStatus: string; country: string; english: string; documentation: string; workflows: string; communications: string;
};
const initial: FormData = {
  systems: [], company: "", website: "", sector: "", employees: "", founded: "",
  dataType: "", rights: "", name: "", email: "", role: "", details: "", consent: false, fax: "",
  companyStatus: "operating", country: "", english: "", documentation: "", workflows: "", communications: ""
};
const summarize = (f: FormData) => [
  "Company: " + f.company, "Website: " + (f.website || "Not provided"),
  "Industry: " + f.sector, "Employees: " + f.employees,
  "Founded: " + (f.founded || "Not provided"), "Systems: " + f.systems.join(", "),
  "Data type: " + f.dataType, "Authority to explore licensing: " + f.rights,
  "Contact: " + f.name, "Email: " + f.email, "Role: " + f.role,
  "Status: " + f.companyStatus, "Country: " + f.country, "English: " + f.english,
  "Documentation: " + f.documentation, "Workflows: " + f.workflows, "Chat history: " + f.communications,
  "Preliminary fit: " + assessCompany(f).status, "Notes: " + (f.details || "Not provided")
].join("\n");

export default function QualificationWizard() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(initial);
  const [expanded, setExpanded] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [copyData, setCopyData] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);
  const assessment = assessCompany(form);
  function change<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm(prev => ({ ...prev, [key]: value }));
    setError("");
  }
  function toggleSystem(system: string) {
    change("systems", form.systems.includes(system) ? form.systems.filter(x => x !== system) : [...form.systems, system]);
  }
  function validate(n: number): string {
    if (n === 0 && form.systems.length === 0) return "Choose at least one tool, or select 'Other / not sure'.";
    if (n === 1) {
      if (!form.company.trim() || !form.sector || !form.employees || !form.dataType || !form.rights || !form.country || !form.english || !form.documentation || !form.workflows || (form.companyStatus === "closed" && !form.communications)) return "Complete the required company details to continue.";
      if (form.founded && !/^(18|19|20)\d{2}$/.test(form.founded)) return "Enter a valid four-digit founding year.";
    }
    if (n === 3) {
      if (!form.name.trim() || !form.role.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Enter your name, role, and a valid email address.";
      if (!form.consent) return "Confirm that we may contact you about your inquiry.";
    }
    return "";
  }
  function next() {
    const validation = validate(step);
    if (validation) { setError(validation); return; }
    setError("");
    setStep(Math.min(3, step + 1));
    cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function back() {
    setError(""); setStep(Math.max(0, step - 1));
    cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (step !== 3 || status === "sending") return;
    const validation = validate(3);
    if (validation) { setError(validation); return; }
    setStatus("sending"); setMessage(""); setError("");
    setCopyData(summarize(form)); setCopied(false);
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, consent: form.consent ? "yes" : "no" })
      });
      const payload: { error?: string } = await response.json();
      if (!response.ok) throw new Error(payload.error || "We could not deliver your inquiry.");
      setStatus("success"); setMessage("Your inquiry was delivered to Liorvel for preliminary review. An official micro1 referral application through a unique referral link would be a separate next step.");
    } catch(e) {
      setStatus("error"); setMessage(e instanceof Error ? e.message : "Delivery is temporarily unavailable.");
    }
  }
  async function copyInquiry() {
    try { await navigator.clipboard.writeText(copyData); setCopied(true); }
    catch { setMessage("Copying is unavailable in this browser."); }
  }

  return <div className="wizard">
    <div className="wizard-steps" aria-label="Application progress">
      {stages.map((stage, index) => <div key={stage} className={"wizard-step " + (index === step ? "is-current" : "") + (index < step ? " is-complete" : "")} aria-current={index === step ? "step" : undefined}>
        <span className="wizard-step-circle">{index < step ? <Check size={13} strokeWidth={2.5}/> : index + 1}</span>
        <span>{stage}</span>
      </div>)}
    </div>

    <div className="wizard-card" ref={cardRef}>
      {status === "success" ? <div className="wizard-done" role="status">
        <CheckCircle2 size={43} strokeWidth={1.5} />
        <h2>Inquiry received.</h2><p>{message}</p><a href="/" className="wizard-primary">Return home <ArrowUpRight size={18}/></a>
      </div> : <form noValidate onSubmit={submit}>
        <div className="wizard-card-top"><span>Step {step + 1} of 4</span><div className="wizard-meter" role="progressbar" aria-label="Application progress" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={4}><span style={{ width: ((step + 1) / 4 * 100) + "%" }}/></div></div>

        {step === 0 && <div className="wizard-stage" key="systems">
          <h2>What systems does your company use?</h2>
          <p className="wizard-explain">Choose the tools that hold your business information. This helps us understand your data environment.</p>
          {groups.map(group => <fieldset className="wizard-tool-group" key={group.label}><legend>{group.label}</legend><div className="wizard-tools">
            {group.tools.map(tool => <label key={tool} className={"wizard-tool " + (form.systems.includes(tool) ? "selected" : "")}>
              <input type="checkbox" checked={form.systems.includes(tool)} onChange={() => toggleSystem(tool)} />
              <span className="wizard-check">{form.systems.includes(tool) && <Check size={12} strokeWidth={2.5}/>}</span><span>{tool}</span>
            </label>)}
          </div></fieldset>)}
          {expanded && <fieldset className="wizard-tool-group"><legend>More tools and records</legend><div className="wizard-tools">{extraTools.map(tool => <label key={tool} className={"wizard-tool " + (form.systems.includes(tool) ? "selected" : "")}>
            <input type="checkbox" checked={form.systems.includes(tool)} onChange={() => toggleSystem(tool)}/>
            <span className="wizard-check">{form.systems.includes(tool) && <Check size={12} strokeWidth={2.5}/>}</span><span>{tool}</span>
          </label>)}</div></fieldset>}
          <button className="wizard-expand" type="button" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>{expanded ? "Show fewer tools" : "Don't see your tools? Show more"}</button>
        </div>}

        {step === 1 && <div className="wizard-stage" key="company">
          <h2>Tell us about your company.</h2>
          <p className="wizard-explain">A few details help us assess suitability. Estimates are fine.</p>
          <div className="wizard-field-stack">
            <div className="wizard-field-pair"><label>Business status <span>*</span><select value={form.companyStatus} onChange={e=>change("companyStatus",e.target.value)}><option value="operating">Currently operating</option><option value="closed">No longer operating</option></select></label><label>Country <span>*</span><select value={form.country} onChange={e=>change("country",e.target.value)}><option value="">Select country</option>{countries.map(s=><option key={s}>{s}</option>)}</select></label></div>
            <label>Company name <span>*</span><input value={form.company} maxLength={160} onChange={e=>change("company",e.target.value)} placeholder="Company or organization" autoComplete="organization" /></label>
            <label>Company website <span className="optional">Optional</span><input value={form.website} maxLength={200} onChange={e=>change("website",e.target.value)} placeholder="example.com" autoComplete="url"/></label>
            <div className="wizard-field-pair"><label>Industry <span>*</span><select value={form.sector} onChange={e=>change("sector",e.target.value)}><option value="">Select an industry</option>{sectors.map(s=><option key={s}>{s}</option>)}</select></label>
            <label>{form.companyStatus === "closed" ? "Employees before closure" : "Current employees"} <span>*</span><select value={form.employees} onChange={e=>change("employees",e.target.value)}><option value="">Company size</option>{sizes.map(s=><option key={s}>{s}</option>)}</select></label></div>
            <div className="wizard-field-pair"><label>Year founded <span className="optional">Optional</span><input inputMode="numeric" value={form.founded} onChange={e=>change("founded",e.target.value)} placeholder="e.g. 2017" maxLength={4}/></label>
            <label>Primary data type <span>*</span><select value={form.dataType} onChange={e=>change("dataType",e.target.value)}><option value="">Select category</option>{dataTypes.map(s=><option key={s}>{s}</option>)}</select></label></div>
            <div className="wizard-field-pair"><label>Internal documentation <span>*</span><select value={form.documentation} onChange={e=>change("documentation",e.target.value)}><option value="">Select depth</option><option>Strong / established</option><option>Some</option><option>Very little</option></select></label><label>Repeatable workflows <span>*</span><select value={form.workflows} onChange={e=>change("workflows",e.target.value)}><option value="">Select one</option><option>Yes</option><option>Some</option><option>No</option></select></label></div>
            <label>Language of documentation <span>*</span><select value={form.english} onChange={e=>change("english",e.target.value)}><option value="">Select one</option><option value="Yes">Primarily English</option><option value="Some">Partly English</option><option value="No">Not English</option></select></label>
            {form.companyStatus === "closed" && <label>Slack / Microsoft Teams history <span>*</span><select value={form.communications} onChange={e=>change("communications",e.target.value)}><option value="">Select volume</option><option>Extensive</option><option>Substantial</option><option>Limited</option><option>None</option></select></label>}
            <label>Can your company explore sharing or licensing this data? <span>*</span><select value={form.rights} onChange={e=>change("rights",e.target.value)}><option value="">Select an answer</option><option value="Yes, subject to review">Yes, subject to review</option><option value="Not sure / needs approval">Not sure / needs approval</option><option value="No / restricted">No / restricted</option></select></label>
          </div>
        </div>}

        {step === 2 && <div className="wizard-stage" key="assessment" aria-live="polite">
          <h2>{assessment.label}.</h2>
          <p className="wizard-explain">An independent preliminary screening based on micro1 published and referral-dashboard criteria. This is not an official micro1 decision.</p>
          <div className={"wizard-assessment wizard-assessment-" + assessment.status}><strong>{assessment.program}</strong>
          {assessment.blockers.map(v=><p key={v}>• {v}</p>)}
          {assessment.checks.map(v=><p key={v}>• {v}</p>)}
          {assessment.status === "likely" && <p>Your information appears to meet common initial criteria, subject to verification and program availability.</p>}</div>
          <p className="wizard-explain">{assessment.status === "unlikely" ? "You do not appear to qualify under the standard requirements. You can still submit for individual consideration, without any expectation of approval." : "Continue to leave contact information for Liorvel to review."}</p>
        </div>}
        {step === 3 && <div className="wizard-stage" key="contact">
          <h2>Who should we contact?</h2>
          <p className="wizard-explain">One last step. We’ll only use these details to respond to your inquiry.</p>
          <div className="wizard-field-stack">
            <div className="wizard-field-pair"><label>Full name <span>*</span><input value={form.name} onChange={e=>change("name",e.target.value)} maxLength={150} autoComplete="name" placeholder="Your name"/></label>
            <label>Work email <span>*</span><input type="email" value={form.email} onChange={e=>change("email",e.target.value)} maxLength={254} autoComplete="email" placeholder="you@company.com"/></label></div>
            <label>Your role at the company <span>*</span><input value={form.role} onChange={e=>change("role",e.target.value)} maxLength={120} placeholder="e.g. Founder, Operations Director" autoComplete="organization-title"/></label>
            <label>Anything else we should know? <span className="optional">Optional</span><textarea rows={4} value={form.details} onChange={e=>change("details",e.target.value)} maxLength={1200} placeholder="A general overview is enough. No sensitive records, customer data or confidential files."/></label>
            <label className="wizard-consent"><input type="checkbox" checked={form.consent} onChange={e=>change("consent",e.target.checked)}/><span>I agree that Liorvel may review this inquiry and contact me. This does not authorize sharing or licensing company data. I understand Liorvel may receive a referral reward if an eligible partnership results.</span></label>
          </div>
        </div>}
        <label className="wizard-honeypot" aria-hidden="true">Fax number<input autoComplete="off" tabIndex={-1} value={form.fax} onChange={e=>change("fax",e.target.value)}/></label>
        {error && <div className="wizard-error" role="alert">{error}</div>}
        {status === "error" && <div className="wizard-error" role="alert">{message}<button type="button" onClick={copyInquiry}><Copy size={14}/> {copied ? "Copied" : "Copy your inquiry"}</button></div>}
        <div className="wizard-actions">{step > 0 ? <button className="wizard-back" type="button" onClick={back} disabled={status==="sending"}><ArrowLeft size={17}/> Back</button> : <span />}
          {step < 3 ? <button className="wizard-primary" type="button" onClick={next}>Continue <ArrowRight size={18}/></button> :
            <button className="wizard-primary" type="submit" disabled={status==="sending"}>{status==="sending" ? "Sending..." : "Submit for consideration"} <ArrowUpRight size={18}/></button>}
        </div>
      </form>}
    </div>
    <p className="wizard-privacy"><LockKeyhole size={15}/> No connections, logins, or raw datasets are requested. Liorvel operates independently from micro1.</p>
  </div>;
}
