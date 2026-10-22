import type { Metadata } from "next";
import { Layers3, ScanSearch, Network, ShieldCheck } from "lucide-react";
import { Footer, Header, PrimaryLink, Reveal } from "../components/Experience";

export const metadata: Metadata = {
  title: "For Companies",
  description: "Find out whether your operational records, specialized knowledge, or structured data may be relevant to data partners.",
};

const examples = [
  { title: "Operational data", description: "Workflows, service histories, and process records.", icon: Layers3 },
  { title: "Industry knowledge", description: "Specialized documentation and domain expertise.", icon: ScanSearch },
  { title: "Structured histories", description: "Organized activity and outcomes over time.", icon: Network },
];

export default function Companies() {
  return <div className="site"><Header /><main>
    <section className="page-hero"><div className="page-hero-inner"><Reveal>
      <h1>Your business creates<br /><em>valuable information.</em></h1>
      <p>We assess whether your company&apos;s data may qualify for an introduction to a broker or licensing partner.</p>
      <div className="page-hero-cta"><PrimaryLink>Check your eligibility</PrimaryLink></div>
    </Reveal></div></section>

    <section className="page-body section-pad"><div className="section-width">
      <div className="section-intro-row">
        <Reveal><h2 className="section-heading">What we<br /><span>look for.</span></h2></Reveal>
        <Reveal delay={0.08}><p>Established companies with 30 or more employees, detailed process documentation, repeatable workflows, and mostly English-language records are often a strong fit. Historical Slack or Teams records from closed companies may also be considered.</p></Reveal>
      </div>
      <div className="asset-grid">
        {examples.map(({title, description, icon: Icon}, i) => <Reveal key={title} className="asset-item" delay={i * 0.08}>
          <div className="asset-icon"><Icon size={27} strokeWidth={1.35} /></div>
          <h3>{title}</h3><p>{description}</p>
        </Reveal>)}
      </div>
      <Reveal className="short-note"><ShieldCheck size={22} strokeWidth={1.35} /><p>Not every dataset qualifies. Rights, privacy, quality, scale, and buyer demand all matter. No raw data is needed for an initial review.</p></Reveal>
    </div></section>
  </main><Footer /></div>;
}
