import type { Metadata } from "next";
import { Footer, Header, PrimaryLink, Reveal } from "../components/Experience";
export const metadata: Metadata = { title: "Our Approach", description: "How Liorvel qualifies data opportunities and makes appropriate partner introductions." };
const stages = [
  {title:"Discover",text:"Tell us about your company, workflows and the information you produce."},
  {title:"Assess",text:"We review relevance, rights, quality and potential partner demand."},
  {title:"Connect",text:"If there is a fit, we may introduce you to a broker or licensing partner."}
];
export default function Approach() {
 return <div className="site"><Header/><main>
  <section className="page-hero"><Reveal className="page-hero-inner"><h1>From information<br/>to <em>opportunity.</em></h1><p>We help companies understand their potential data assets and reach the right specialists.</p></Reveal></section>
  <section className="section-pad simple-content"><div className="section-width">
    <Reveal className="center-copy"><h2>A clear process.</h2><p>No complex preparation. An initial review starts with a short conversation.</p></Reveal>
    <div className="steps-grid">{stages.map((stage,i)=><Reveal className="step-card" delay={.08*i} key={stage.title}><h3>{stage.title}</h3><p>{stage.text}</p></Reveal>)}</div>
  </div></section>
  <section className="trust-section section-pad"><div className="section-width trust-layout"><Reveal className="trust-text"><h2>Company control<br/><span>at every stage.</span></h2><p>We do not require raw datasets upfront. You decide what to disclose and whether to pursue any opportunity. Introductions and payments are never guaranteed.</p><PrimaryLink>Start an assessment</PrimaryLink></Reveal><Reveal className="trust-art"><img src="/art/orbital-intelligence.webp" alt="Illustrated orbital network" loading="lazy"/></Reveal></div></section>
 </main><Footer/></div>;
}
