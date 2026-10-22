"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, Copy, Menu, X } from "lucide-react";

const navigation = [
  { label: "Overview", href: "/" },
  { label: "Our approach", href: "/approach" },
  { label: "For companies", href: "/companies" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  return (
    <>
      <motion.div className="reading-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
      <header className="site-header">
        <nav className="nav-pill" aria-label="Main navigation">
          <a className="nav-brand" href="/" aria-label="Liorvel home"><img className="brand-logo" src="/liorvel_logo_white_transparent_true_alpha.png" alt="Liorvel" width={154} height={64} /></a>
          <div className="nav-links">{navigation.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}</div>
          <a className="nav-contact" href="/contact">Get in touch <ArrowUpRight size={15} strokeWidth={1.7} /></a>
          <button type="button" className="nav-mobile-toggle" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
        {open && <div id="mobile-navigation" className="mobile-menu">
          {navigation.map((item) => <a href={item.href} onClick={() => setOpen(false)} key={item.href}>{item.label}<ArrowUpRight size={18}/></a>)}
          <a className="mobile-menu-cta" href="/contact" onClick={() => setOpen(false)}>Request an assessment <ArrowRight size={18} /></a>
        </div>}
      </header>
    </>
  );
}

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div className={className} initial={reducedMotion ? false : { opacity: 0, y: 32, filter: "blur(7px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, amount: 0.14, margin: "0px 0px -30px 0px" }}
      transition={{ duration: reducedMotion ? 0 : 0.9, delay: reducedMotion ? 0 : delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}

export function PrimaryLink({ href = "/contact", children, light = false }: { href?: string; children: ReactNode; light?: boolean }) {
  return <a className={"primary-link " + (light ? "primary-link-light" : "")} href={href}><span>{children}</span><span className="primary-link-icon"><ArrowUpRight size={19} strokeWidth={1.75}/></span></a>;
}

export function Footer() {
  return <footer className="site-footer">
    <div className="footer-top compact-footer-top">
      <div className="footer-statement compact-footer-statement">
        <h2>Have data worth <em>exploring?</em></h2>
        <PrimaryLink href="/contact" light>Request an assessment</PrimaryLink>
      </div>
      <div className="footer-grid compact-footer-grid">
        <div><a href="/" className="footer-logo" aria-label="Liorvel home"><img className="footer-brand-logo" src="/liorvel_logo_white_transparent_true_alpha.png" alt="Liorvel" width={174} height={72}/></a>
        </div>
        <div><span className="footer-heading">Explore</span><a href="/">Home</a><a href="/approach">Our approach</a><a href="/companies">For companies</a></div>
        <div><span className="footer-heading">Connect</span><a href="/contact">Contact <ArrowUpRight size={13}/></a><a href="/contact">Request an assessment <ArrowUpRight size={13}/></a></div>
      </div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Liorvel</span><span>Independent company assessments. Partnerships and compensation are not guaranteed.</span><a href="/legacy">Previous website <ArrowUpRight size={12}/></a></div>
  </footer>;
}

const faqs = [
  { q: "What does Liorvel do?", a: "We conduct an initial review of company information, operational systems, and potential data licensing opportunities. Where there is a promising fit, we contact the company to discuss a possible introduction to a relevant third-party program or licensing partner." },
  { q: "What kinds of companies are a good fit?", a: "We generally prioritize established businesses with 30 or more employees, repeatable workflows, meaningful internal documentation, and business records primarily in English. Companies in the United States and other English-speaking markets may have the strongest initial fit, but every opportunity is reviewed individually." },
  { q: "Can a company that has closed qualify?", a: "Potentially. Certain historical-data opportunities may consider formerly operating companies with around 25 or more past employees and substantial Slack or Microsoft Teams records. Availability, geography, access rights, and the completeness of the archives all require review." },
  { q: "What types of data are relevant?", a: "Examples include standard operating procedures, internal knowledge bases, documented workflows, project and support histories, quality assurance processes, CRM metadata, and other records of how work is performed. We assess context, structure, provenance, and usefulness, not simply the volume of files." },
  { q: "Do I need to upload actual company data?", a: "No. This preliminary assessment asks only for general information about your company, systems, and available records. Please do not upload or include customer details, confidential documents, access credentials, or proprietary datasets." },
  { q: "What happens after I submit?", a: "Liorvel reviews the information and may contact you for clarification or to discuss an introduction. Completing this form is not an application to a third-party program and does not guarantee acceptance or an offer." },
  { q: "Who owns the data if there is a licensing agreement?", a: "Ownership, licensing rights, allowed uses, security controls, and retention terms must be defined in a separate agreement between the company and the receiving partner. Submitting this form does not transfer ownership or authorize disclosure of underlying datasets." },
  { q: "How is potential company compensation determined?", a: "The value of any opportunity depends on data quality, uniqueness, scale, operational complexity, permitted uses, and the terms negotiated with a receiving partner. Published ranges are illustrative, not a quote or a guaranteed payment." },
  { q: "Does Liorvel receive referral compensation?", a: "Liorvel may receive referral compensation when an introduction results in a qualifying partnership. There is no charge to submit a preliminary assessment." },
  { q: "What if I do not meet the standard criteria?", a: "You can still submit your details for individual consideration. We will clearly indicate possible eligibility gaps, and submission does not override a partner's requirements." },
];

export function FAQ() {
  const [active, setActive] = useState<number | null>(0);
  return <div className="faq-list">{faqs.map((item, i) => <div className={"faq-item " + (active === i ? "open" : "")} key={item.q}>
    <button type="button" aria-expanded={active === i} onClick={() => setActive(active === i ? null : i)}><span>{item.q}</span><span className="faq-icon">{active === i ? "−" : "+"}</span></button>
    {active === i && <div className="faq-answer"><p>{item.a}</p></div>}
  </div>)}</div>;
}

export function QualificationForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [summary, setSummary] = useState("");
  const [copied, setCopied] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const collected = ["name", "email", "company", "website", "sector", "dataType", "details"].map((k) => k + ": " + String(data[k] || "Not provided")).join("\n");
    setSummary(collected);
    setStatus("sending");
    setMessage("");
    try {
      const res = await fetch("/api/inquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const payload: { error?: string } = await res.json();
      if (!res.ok) throw new Error(payload.error || "The inquiry could not be delivered.");
      setStatus("success");
      setMessage("Your inquiry has been sent. We will review the information you provided.");
      form.reset();
    } catch (e) {
      setStatus("error");
      setMessage(e instanceof Error ? e.message : "Delivery is temporarily unavailable.");
    }
  }
  async function copySummary() {
    try { await navigator.clipboard.writeText(summary); setCopied(true); }
    catch { setCopied(false); setMessage("Copy is unavailable in this browser. Please try again later."); }
  }
  return <div className="qualification-form-wrap">
    <form className="qualification-form" onSubmit={submit}>
      <div className="form-heading"><h2>Company details</h2><p>Brief information is enough to start. No files or confidential records.</p></div>
      <div className="form-pair">
        <label>Full name <span>*</span><input name="name" type="text" placeholder="Your name" required autoComplete="name" maxLength={150}/></label>
        <label>Work email <span>*</span><input name="email" type="email" placeholder="you@company.com" required autoComplete="email" maxLength={254}/></label>
      </div>
      <div className="form-pair">
        <label>Company name <span>*</span><input name="company" type="text" placeholder="Company or organization" required maxLength={160}/></label>
        <label>Company website<input name="website" type="text" placeholder="company.com" maxLength={200}/></label>
      </div>
      <div className="form-pair">
        <label>Industry <span>*</span><select name="sector" required defaultValue=""><option value="" disabled>Select industry</option><option>Software / technology</option><option>Professional services</option><option>Commerce / retail</option><option>Logistics / transportation</option><option>Industrial / manufacturing</option><option>Healthcare / life sciences</option><option>Media / information</option><option>Other</option></select></label>
        <label>Potential data type <span>*</span><select name="dataType" required defaultValue=""><option value="" disabled>Select data category</option><option>Operational records / workflows</option><option>Business documentation</option><option>Support or service histories</option><option>Industry-specific structured data</option><option>Other / not sure</option></select></label>
      </div>
      <label>Tell us about the opportunity<textarea name="details" rows={5} maxLength={2000} placeholder="A high-level description of your business and the types of data you generate. Please do not include confidential details or personal records."/></label>
      <label className="form-consent"><input type="checkbox" name="consent" value="yes" required/><span>Liorvel may use these details to review and respond to my inquiry. This does not authorize sharing or licensing any company data.</span></label>
      <input className="spam-trap" aria-hidden="true" tabIndex={-1} name="fax" autoComplete="off"/>
      <button className="form-submit" disabled={status === "sending"} type="submit"><span>{status === "sending" ? "Sending inquiry..." : "Submit for review"}</span><ArrowUpRight size={18}/></button>
      {status === "success" && <p className="form-feedback success" role="status"><Check size={17}/>{message}</p>}
      {status === "error" && <div className="form-feedback error" role="alert"><p>{message}</p><button type="button" onClick={copySummary}><Copy size={15}/>{copied ? "Copied" : "Copy your inquiry details"}</button></div>}
      
    </form>
  </div>;
}
