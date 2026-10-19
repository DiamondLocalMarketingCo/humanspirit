import { ArrowDown, ArrowUpRight, Layers3, ScanSearch, Network, ShieldCheck } from "lucide-react";
import { Footer, Header, PrimaryLink, Reveal, FAQ } from "./components/Experience";

const examples = [
  { title: "Operational records", description: "Workflows, service histories, and business processes.", icon: Layers3 },
  { title: "Specialized knowledge", description: "Industry documentation and technical expertise.", icon: ScanSearch },
  { title: "Structured data", description: "Organized activity and outcomes with useful context.", icon: Network },
];

const steps = [
  { title: "Discover", description: "We learn about your business and the information it produces." },
  { title: "Qualify", description: "We assess potential fit, quality, rights, and privacy considerations." },
  { title: "Connect", description: "Where appropriate, we introduce you to a relevant broker or licensing partner." },
];

export default function Home() {
  return <div className="site">
    <Header />
    <main>
      <section className="hero" aria-labelledby="home-heading">
        <div className="hero-art" aria-hidden="true" />
        <div className="hero-inner">
          <Reveal delay={0.1}><h1 id="home-heading">Your company&apos;s data<br />may hold <em>untapped value.</em></h1></Reveal>
          <Reveal delay={0.19}><p className="hero-description">We assess business data opportunities and introduce qualified companies to data brokers and licensing partners.</p></Reveal>
          <Reveal delay={0.25}><div className="hero-actions">
            <PrimaryLink>Request a data assessment</PrimaryLink>
            <a href="#how-it-works" className="text-link">How it works <ArrowDown size={17} /></a>
          </div></Reveal>
        </div>
      </section>

      <section id="opportunity" className="assets-section section-pad">
        <div className="section-width">
          <div className="section-intro-row">
            <Reveal><h2 className="section-heading">Value in the<br /><span>everyday.</span></h2></Reveal>
            <Reveal delay={0.08}><p>Companies generate information through ordinary work. Some of it may be useful to data buyers and licensing partners.</p></Reveal>
          </div>
          <div className="asset-grid">
            {examples.map(({ title, description, icon: Icon }, i) => <Reveal key={title} delay={i * 0.08} className="asset-item">
              <div className="asset-icon"><Icon size={27} strokeWidth={1.35}/></div>
              <h3>{title}</h3>
              <p>{description}</p>
            </Reveal>)}
          </div>
          <Reveal className="assets-note">
            <span><ShieldCheck size={17} /> Rights and privacy first</span>
            <p>Eligibility depends on data rights, quality, sensitivity, and partner demand.</p>
          </Reveal>
        </div>
      </section>

      <section id="how-it-works" className="process-section section-pad">
        <div className="section-width">
          <Reveal><h2 className="section-heading">We qualify.<br /><span>We connect.</span></h2></Reveal>
          <div className="process-list concise-process-list">
            {steps.map((step, i) => <Reveal key={step.title} delay={i * 0.07} className="process-row concise-process-row">
              <h3>{step.title}</h3><p>{step.description}</p><ArrowUpRight className="process-arrow" size={21} strokeWidth={1.1} />
            </Reveal>)}
          </div>
          <Reveal className="process-cta"><a className="underlined-link" href="/approach">About our approach <ArrowUpRight size={17} /></a></Reveal>
        </div>
      </section>

      <section className="faq-section section-pad">
        <div className="section-width faq-layout">
          <Reveal><h2 className="section-heading">Questions,<br /><span>answered.</span></h2></Reveal>
          <Reveal delay={0.08}><FAQ /></Reveal>
        </div>
      </section>
    </main>
    <Footer />
  </div>;
}
