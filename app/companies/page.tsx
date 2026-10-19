import type { Metadata } from "next";
import { Database, BookOpen, Network } from "lucide-react";
import { Footer, Header, PrimaryLink, Reveal, FAQ } from "../components/Experience";
export const metadata: Metadata = { title: "For Companies", description: "Find out whether your company's data could qualify for a broker or licensing partner introduction." };
const types=[
 {title:"Operational data",text:"Business processes, project histories and service records.",Icon:Database},
 {title:"Industry knowledge",text:"Technical documentation, guides and specialized records.",Icon:BookOpen},
 {title:"Workflow data",text:"Decisions, interactions and real-world task histories.",Icon:Network}
];
export default function Companies() {
 return <div className="site"><Header/><main>
  <section className="page-hero"><Reveal className="page-hero-inner"><h1>Explore the value<br/>of your <em>company data.</em></h1><p>We assess potential data assets and introduce suitable opportunities to established partners.</p><PrimaryLink>Check your eligibility</PrimaryLink></Reveal></section>
  <section className="data-section section-pad"><div className="section-width"><Reveal className="center-copy"><h2>What we look for</h2><p>Data with useful context, clear origin and rights that permit evaluation.</p></Reveal>
    <div className="data-grid">{types.map(({title,text,Icon},i)=><Reveal className="data-card" delay={i*.07} key={title}><Icon size={30} strokeWidth={1.2}/><h3>{title}</h3><p>{text}</p></Reveal>)}</div>
    <Reveal className="data-disclaimer"><p>Possessing information does not automatically mean it can be licensed. Every opportunity depends on privacy, legal and commercial review.</p></Reveal>
  </div></section>
  <section className="simple-content section-pad"><div className="section-width faq-layout"><Reveal className="center-copy"><h2>Common questions</h2></Reveal><Reveal><FAQ/></Reveal></div></section>
  <section className="closing-section section-pad"><Reveal className="center-copy"><h2>Start with a<br/>simple introduction.</h2><p>Tell us what your company does. No raw data required.</p><PrimaryLink light>Request an assessment</PrimaryLink></Reveal></section>
 </main><Footer/></div>;
}
