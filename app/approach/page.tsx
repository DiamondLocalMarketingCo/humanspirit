import type { Metadata } from "next";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { Footer, Header, PrimaryLink, Reveal } from "../components/Experience";

export const metadata: Metadata = {
  title: "Our Approach",
  description: "How Liorvel assesses business data opportunities and introduces qualified companies to relevant partners.",
};

const steps = [
  { title: "Discover", description: "We learn what your company does and what information its work generates." },
  { title: "Evaluate", description: "We consider relevance, quality, provenance, ownership, privacy, and potential market fit." },
  { title: "Introduce", description: "Where there is a fit, we may connect you to an independent broker or licensing partner." },
];

export default function Approach() {
  return <div className="site"><Header /><main>
    <section className="page-hero"><div className="page-hero-inner"><Reveal>
      <h1>Finding the right<br /><em>data connections.</em></h1>
      <p>We help businesses explore data opportunities, then make introductions when there is a suitable match.</p>
    </Reveal></div></section>

    <section className="page-body section-pad"><div className="section-width">
      <Reveal><h2 className="section-heading">A clear, considered<br /><span>process.</span></h2></Reveal>
      <div className="process-list concise-process-list">
        {steps.map((step, i) => <Reveal key={step.title} delay={i * 0.06} className="process-row concise-process-row">
          <h3>{step.title}</h3><p>{step.description}</p><ArrowUpRight className="process-arrow" size={21} />
        </Reveal>)}
      </div>
      <Reveal className="short-note"><ShieldCheck size={22} strokeWidth={1.35} />
        <p>We start with a high-level conversation. Any sharing or licensing must respect applicable rights, permissions, and confidentiality requirements.</p>
      </Reveal>
      <Reveal className="process-cta"><PrimaryLink>Request an assessment</PrimaryLink></Reveal>
    </div></section>
  </main><Footer /></div>;
}
