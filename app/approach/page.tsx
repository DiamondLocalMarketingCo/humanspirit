import type { Metadata } from "next";
import { ArrowUpRight, CheckCircle2, ShieldCheck, Waypoints } from "lucide-react";
import { Footer, Header, PrimaryLink, Reveal } from "../components/Experience";
export const metadata: Metadata = { title: "Our Approach", description: "A considered process for assessing potential data assets, qualifying opportunities, and making appropriate industry introductions." };
const steps = [
  { n: "01", title: "Understand the business", text: "We begin with the way an organization works: its systems, processes, operational history, and the information produced along the way." },
  { n: "02", title: "Explore the data opportunity", text: "We assess the nature of the information at a high level, including its potential relevance, accessibility, structure, provenance, and limitations." },
  { n: "03", title: "Review readiness and rights", text: "Potential opportunities need responsible review. Rights to use and share data, contractual restrictions, privacy, and consent may determine whether a path forward exists." },
  { n: "04", title: "Make a considered introduction", text: "If the opportunity appears suitable, Liorvel may introduce the company to an independent broker, intermediary, or licensing specialist for further evaluation." }
];
export default function Approach() {
  return <div className="site"><Header/><main>
    <section className="page-hero"><div className="page-hero-inner"><Reveal><span className="eyebrow">THE LIORVEL APPROACH / 01</span><h1>Thoughtful sourcing.<br/><em>Meaningful connections.</em></h1><p>An independent bridge between the businesses generating potentially valuable information and the specialists who can evaluate what comes next.</p></Reveal></div></section>
    <section className="page-body section-pad"><div className="section-width">
      <div className="editorial-split"><Reveal><div><span className="eyebrow">HOW WE WORK</span><h2>Our work begins<br/>with understanding.</h2></div></Reveal><Reveal delay={0.12}><div><p>Real-world business information is nuanced. It is shaped by context, quality, provenance, rights, and the way it was produced.</p><p>We do not approach companies with a one-size-fits-all offer. Our role is to explore whether an opportunity makes sense, and to help qualified companies reach appropriate counterparties.</p></div></Reveal></div>
      <div className="process-list" style={{ marginTop: 90 }}>{steps.map((s, i) => <Reveal className="process-row" key={s.n} delay={i * .05}><span className="process-no">{s.n}</span><h3>{s.title}</h3><p>{s.text}</p><ArrowUpRight size={22} className="process-arrow"/></Reveal>)}</div>
    </div></section>
    <section className="wide-statement"><Reveal><span className="eyebrow">INDEPENDENCE MATTERS</span><h2>We facilitate conversations.<br/><em>We do not promise outcomes.</em></h2><p>An introduction is a starting point, not a guarantee of a transaction. Each party makes its own commercial and legal decisions.</p><PrimaryLink href="/contact">Begin your assessment</PrimaryLink></Reveal></section>
    <section className="page-body section-pad"><div className="section-width"><Reveal><div className="section-index"><span className="index-line"/>PRINCIPLES</div><h2 className="section-heading">A careful approach<br/><span>at every stage.</span></h2></Reveal>
      <div className="numbered-cards"><Reveal className="numbered-card"><ShieldCheck size={28} color="#c4b5ff"/><h3>Responsible scope</h3><p>Early conversations are designed to stay high-level. No raw records are needed to request a review.</p></Reveal><Reveal className="numbered-card" delay={.08}><Waypoints size={28} color="#c4b5ff"/><h3>Relevant partners</h3><p>Potential introductions are considered in light of partner requirements, readiness, and commercial fit.</p></Reveal><Reveal className="numbered-card" delay={.16}><CheckCircle2 size={28} color="#c4b5ff"/><h3>Company control</h3><p>Organizations decide whether to advance, what to disclose, and which proposals, if any, to accept.</p></Reveal></div>
    </div></section>
  </main><Footer/></div>;
}
