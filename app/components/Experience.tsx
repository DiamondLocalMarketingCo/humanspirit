"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, Copy, Menu, X } from "lucide-react";

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
          <a className="nav-brand" href="/" aria-label="Liorvel home"><span className="brand-mark">L<span>.</span></span><span className="brand-word">LIORVEL</span></a>
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
    <div className="footer-top">
      <div className="footer-statement"><span className="eyebrow">A MORE CONNECTED DATA ECONOMY</span><h2>Potential is everywhere.<br/><span>Finding it takes perspective.</span></h2><PrimaryLink href="/contact" light>Start a conversation</PrimaryLink></div>
      <div className="footer-grid">
        <div><a href="/" className="footer-logo">LIORVEL<span>.</span></a><p>Independent data sourcing and partnership advisory.</p></div>
        <div><span className="footer-heading">Explore</span><a href="/">Overview</a><a href="/approach">Our approach</a><a href="/companies">For companies</a><a href="/contact">Inquiries</a></div>
        <div><span className="footer-heading">Connect</span><a href="/contact">Request an assessment <ArrowUpRight size={13}/></a><a href="/contact">Partner inquiries <ArrowUpRight size={13}/></a></div>
      </div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Liorvel. All rights reserved.</span><span>Independent advisory · No guaranteed introductions or outcomes.</span><a href="/legacy">Previous website <ArrowUpRight size={12}/></a></div>
  </footer>;
}

const faqs = [
  { q: "What does Liorvel do?", a: "We identify and assess potentially valuable business data, help determine whether an opportunity merits further review, and facilitate introductions to relevant data brokers, intermediaries, or licensing partners. We are an advisory and introduction service, not a guaranteed buyer." },
  { q: "Does my company need to prepare or upload data?", a: "No. An initial conversation is high-level. Please do not upload or send raw records, personal information, credentials, or confidential documents through our inquiry form." },
  { q: "What kinds of data are relevant?", a: "Potential examples include business workflows, operational documentation, process histories, support interactions, and other legitimately held records. Suitability depends on rights, quality, sensitivity, scale, and partner demand." },
  { q: "Is there a guaranteed payment or deal?", a: "No. An assessment does not guarantee a match, commercial proposal, license, introduction, or payment. Any arrangement is subject to independent evaluation and agreement by the relevant parties." },
  { q: "Will Liorvel share my information without permission?", a: "We ask for a high-level description first. Before details are shared with prospective third parties, the parties should establish appropriate permission, confidentiality terms, and data-handling boundaries." },
  { q: "Who negotiates the licensing agreement?", a: "Any eventual licensing or sale terms are negotiated and agreed by the relevant rights holder and commercial counterparty, with their own legal advice as appropriate. Liorvel's role may be limited to qualification and introductions." },
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
      <div className="form-heading"><span className="eyebrow">INITIAL QUALIFICATION</span><h2>Tell us a little<br/>about your company.</h2><p>A few details are enough to begin. We never ask for raw data at this stage.</p></div>
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
      <label className="form-consent"><input type="checkbox" name="consent" value="yes" required/><span>I authorize Liorvel to use my inquiry details to evaluate and respond to this request. I understand that submitting does not authorize sharing or licensing any company data.</span></label>
      <input className="spam-trap" aria-hidden="true" tabIndex={-1} name="fax" autoComplete="off"/>
      <button className="form-submit" disabled={status === "sending"} type="submit"><span>{status === "sending" ? "Sending inquiry..." : "Submit for review"}</span><ArrowUpRight size={18}/></button>
      {status === "success" && <p className="form-feedback success" role="status"><Check size={17}/>{message}</p>}
      {status === "error" && <div className="form-feedback error" role="alert"><p>{message}</p><button type="button" onClick={copySummary}><Copy size={15}/>{copied ? "Copied" : "Copy your inquiry details"}</button></div>}
      <p className="form-small-print">No files, sensitive records, or commitments required. Submission is not an offer to buy or license data.</p>
    </form>
  </div>;
}
