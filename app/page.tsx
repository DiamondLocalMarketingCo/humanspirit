import { ArrowDown, ArrowUpRight, Layers3, ScanSearch, Network, ShieldCheck } from "lucide-react";
import Image from "next/image";
import mountainBackdrop from "./webbackground.webp";
import spectralArt from "./6a1721ed070156fbb2676424_6a05c67a478d77009ec4ec81_Rectangle 828797 (1).webp";
import { Footer, Header, PrimaryLink, Reveal, FAQ } from "./components/Experience";

const examples = [
  { title: "Operational records", description: "Workflows, service histories, and business processes.", icon: Layers3 },
  { title: "Specialized knowledge", description: "Industry documentation and technical expertise.", icon: ScanSearch },
  { title: "Structured data", description: "Organized activity and outcomes with useful context.", icon: Network },
];

const steps = [
  { title: "Discover", description: "We learn about your business and the information it produces." },
  { title: "Qualify", description: "We review data quality, company scale, rights, and privacy requirements." },
  { title: "Connect", description: "If there is a potential match, we contact you about next steps and a possible introduction." },
];

export default function Home() {
  return <div className="site site-home">
    <Header heroVariant />
    <main>
      <section className="hero" aria-labelledby="home-heading">
        <div className="hero-art" aria-hidden="true"><Image src={mountainBackdrop} alt="" fill priority sizes="100vw" className="hero-landscape-image" /></div>
        <div className="hero-inner">
          <Reveal delay={0.1}><h1 id="home-heading" aria-label="Monetize your company’s operational data.">
            <span className="hero-value-desktop" aria-hidden="true">
              <span className="hero-value-line">Monetize your company&apos;s</span>
              <span className="hero-value-line"><em>operational data.</em></span>
            </span>
            <span className="hero-value-mobile" aria-hidden="true">
              <span className="hero-value-line">Monetize your</span>
              <span className="hero-value-line">company&apos;s</span>
              <span className="hero-value-line"><em>operational data.</em></span>
            </span>
          </h1></Reveal>
          <Reveal delay={0.19}><p className="hero-description">We help companies explore the potential value of their operational data and connect promising opportunities with established licensing partners.</p></Reveal>
          <Reveal delay={0.25}><div className="hero-actions">
            <PrimaryLink>Check your eligibility</PrimaryLink>
            <a href="#how-it-works" className="text-link">How it works <ArrowDown size={17} /></a>
          </div></Reveal>
          <Reveal delay={0.32}>
            <div className="hero-deal-figure" aria-label="Illustrative transaction values from $100,000 to $2 million or more; results not guaranteed">
              <strong>$100K–$2M+</strong>
              <span>Illustrative data partnership range</span>
              <small>Subject to evaluation and negotiated terms. No guaranteed payout.</small>
            </div>
          </Reveal>
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
            <p>We generally look for established operations, documented processes, repeatable workflows, clear data rights, and primarily English-language records.</p>
          </Reveal>
        </div>
      </section>

      <section id="how-it-works" className="process-section section-pad">
        <div className="process-feature">
          <div className="process-feature-art" style={{ backgroundImage: `url("${spectralArt.src}")` }} aria-hidden="true" />
          <Reveal><h2 className="section-heading">We qualify.<br /><span>We connect.</span></h2></Reveal>
        </div>
        <div className="section-width">
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
