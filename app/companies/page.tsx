import type { Metadata } from "next";
import { ArrowUpRight, DatabaseZap, LockKeyhole, ScanSearch, Layers3 } from "lucide-react";
import { Footer, Header, PrimaryLink, Reveal } from "../components/Experience";
export const metadata: Metadata = { title: "For Companies", description: "Explore whether your organization's operational information may qualify for a broker or licensing partner introduction." };
const factors = [
  { n: "01", title: "Relevance", text: "Could the information be useful for real-world analysis, advanced systems, or specialist research?" },
  { n: "02", title: "Rights and permissions", text: "Does your company have the necessary rights and approvals to explore a potential license or transfer?" },
  { n: "03", title: "Quality and context", text: "Are the records sufficiently organized, accurate, contextual, and documented for meaningful evaluation?" },
  { n: "04", title: "Scale and continuity", text: "What history, volume, geographic coverage, or recurring generation does the information represent?" }
];
export default function Companies() {
  return <div className="site"><Header/><main>
    <section className="page-hero"><div className="page-hero-inner"><Reveal><span className="eyebrow">FOR DATA-OWNING COMPANIES / 02</span><h1>Value may exist in<br/><em>what you already do.</em></h1><p>Your company builds knowledge every day through its operations. We help assess whether the information behind those operations has a potential path to a data partnership.</p><div style={{marginTop:34}}><PrimaryLink>Explore your eligibility</PrimaryLink></div></Reveal></div></section>
    <section className="page-body section-pad"><div className="section-width">
      <div className="editorial-split"><Reveal><div><span className="eyebrow">A CLOSER LOOK</span><h2>Often overlooked.<br/><span style={{color:"#85858d"}}>Potentially relevant.</span></h2></div></Reveal><Reveal delay={.1}><div><p>Companies often hold records that explain how work is done: how decisions are made, services are delivered, issues are resolved, and processes evolve.</p><p>These categories are examples, not a promise of eligibility. Every opportunity requires consideration of legal rights, privacy, commercial demand, and practical quality.</p></div></Reveal></div>
      <div className="numbered-cards"><Reveal className="numbered-card"><Layers3 size={29} color="#c4b5ff"/><h3>Operational histories</h3><p>Business processes, service histories, and organized operational activity.</p></Reveal><Reveal className="numbered-card" delay={.08}><DatabaseZap size={29} color="#c4b5ff"/><h3>Specialized records</h3><p>Domain knowledge, structured industry information, and technical documentation.</p></Reveal><Reveal className="numbered-card" delay={.16}><ScanSearch size={29} color="#c4b5ff"/><h3>Workflow context</h3><p>How teams approach, perform, and improve real-world tasks over time.</p></Reveal></div>
    </div></section>
    <section className="page-body section-pad" style={{background:"#19191c"}}><div className="section-width">
      <Reveal><div className="section-index"><span className="index-line"/>WHAT WE CONSIDER</div><h2 className="section-heading">A promising asset requires<br/><span>more than volume.</span></h2></Reveal>
      <div className="requirements">{factors.map((f, i) => <Reveal key={f.n} delay={.08*i} className="requirement"><span>{f.n} / QUALIFICATION</span><h3>{f.title}</h3><p>{f.text}</p></Reveal>)}</div>
    </div></section>
    <section className="privacy-section section-pad"><div className="section-width editorial-split"><Reveal><div><span className="eyebrow"><LockKeyhole size={16} style={{verticalAlign:"middle",marginRight:10}}/>PRIVACY AND CONTROL</span><h2>Start with a conversation.<br/><em>Not your datasets.</em></h2></div></Reveal><Reveal delay={.12}><div><p>An initial inquiry needs only a company overview and a general description of potential information assets. Do not share confidential documents, personal records, credentials, or other sensitive material.</p><p>Any later sharing must be authorized, appropriately scoped, and subject to applicable rights and agreements.</p><PrimaryLink>Request a first review</PrimaryLink></div></Reveal></div></section>
    <section className="wide-statement"><Reveal><span className="eyebrow">GET STARTED</span><h2>Let's explore the possibility.</h2><p>Tell us what your company does. We will evaluate whether a further discussion is appropriate.</p><PrimaryLink light>Check your eligibility</PrimaryLink></Reveal></section>
  </main><Footer/></div>;
}
