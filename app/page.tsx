import { ArrowDown, ArrowUpRight, ShieldCheck, ScanSearch, Network, Layers3 } from "lucide-react";
import { Footer, Header, PrimaryLink, Reveal, FAQ } from "./components/Experience";

const stages = [
  { number: "01", title: "Discovery", text: "We learn how your company operates and what kinds of information your work produces." },
  { number: "02", title: "Qualification", text: "We consider relevance, data rights, sensitivity, format, and potential market fit." },
  { number: "03", title: "Introductions", text: "Where appropriate, we connect you with a broker or partner for independent discussions." },
];
const assets = [
  { num: "01 /", title: "Operational intelligence", desc: "The records, workflows, and decisions that reflect how business happens in practice." },
  { num: "02 /", title: "Specialized knowledge", desc: "Domain-specific materials, industry procedures, and experience that general datasets may miss." },
  { num: "03 /", title: "Structured histories", desc: "Organized business activity and outcomes with relevant context, provenance, and appropriate rights." },
];
export default function Home() {
  return <div className="site">
    <Header/>
    <main>
      <section className="hero" aria-labelledby="home-heading">
        <div className="hero-art" aria-hidden="true"/><div className="hero-grid" aria-hidden="true"/>
        <div className="hero-inner">
          <Reveal className="hero-intro" delay={0.08}><span className="hero-kicker"><span className="status-dot"/> INDEPENDENT DATA ADVISORY</span></Reveal>
          <Reveal delay={0.16}><h1 id="home-heading">Your company&apos;s data<br/>may hold <em>untapped value.</em></h1></Reveal>
          <Reveal delay={0.25}><p className="hero-description">We assess business data opportunities, qualify companies, and connect promising assets with established data brokers and licensing partners.</p></Reveal>
          <Reveal delay={0.32}><div className="hero-actions"><PrimaryLink>Check your company&apos;s eligibility</PrimaryLink><a href="#how-it-works" className="text-link">Explore how it works <ArrowDown size={17}/></a></div></Reveal>
        </div>
        <div className="hero-bottom"><span>INTELLIGENCE BEGINS WITH DATA.</span><a href="#opportunity">DISCOVER MORE <ArrowDown size={15}/></a><span>01 / 05</span></div>
      </section>

      <section id="opportunity" className="manifesto-section section-pad">
        <div className="section-width manifesto-layout">
          <Reveal><div className="section-index"><span className="index-line"/>01 / THE OPPORTUNITY</div></Reveal>
          <Reveal delay={0.1}><h2 className="large-heading">Every business generates information.<br/><span>Not every business sees its potential.</span></h2></Reveal>
          <Reveal delay={0.18} className="manifesto-lower">
            <div className="soft-orbit"><span className="orbit-center">L<span>.</span></span><span className="orbit-ring ring-one"/><span className="orbit-ring ring-two"/></div>
            <div className="manifesto-copy"><p>From operational histories to specialized workflows, valuable information often lives inside everyday systems. As the data economy evolves, some of these assets may be relevant to new commercial uses.</p><p>Liorvel exists to help bridge the gap between companies that generate data and the specialists who evaluate and structure potential opportunities.</p><a className="underlined-link" href="/approach">Our approach <ArrowUpRight size={18}/></a></div>
          </Reveal>
        </div>
      </section>

      <section className="quote-band" aria-label="Our perspective"><div className="quote-band-bg" aria-hidden="true"/><Reveal className="quote-band-content"><span className="eyebrow">OUR PERSPECTIVE</span><h2>The future of intelligence<br/>is built on <i>real-world knowledge.</i></h2></Reveal></section>

      <section id="what-we-look-for" className="assets-section section-pad">
        <div className="section-width">
          <Reveal><div className="section-index"><span className="index-line"/>02 / WHAT WE LOOK FOR</div></Reveal>
          <div className="section-intro-row"><Reveal><h2 className="section-heading">The value is in<br/><span>the details.</span></h2></Reveal><Reveal delay={0.1}><p>Every company is different. We focus on understanding the nature of the information, its origin, and whether there may be a responsible path to market.</p></Reveal></div>
          <div className="asset-grid">{assets.map((asset, i) => <Reveal key={asset.num} delay={0.08 * i} className="asset-item"><span className="asset-number">{asset.num}</span><div className="asset-icon">{i === 0 ? <Layers3 size={27}/> : i === 1 ? <ScanSearch size={27}/> : <Network size={27}/>}</div><h3>{asset.title}</h3><p>{asset.desc}</p></Reveal>)}</div>
          <Reveal className="assets-note"><span><ShieldCheck size={17}/> RIGHTS & PRIVACY COME FIRST</span><p>Possession of data does not necessarily mean it can be licensed. Any opportunity requires independent legal, privacy, and commercial review.</p></Reveal>
        </div>
      </section>

      <section id="how-it-works" className="process-section section-pad">
        <div className="section-width">
          <Reveal><div className="section-index"><span className="index-line"/>03 / OUR PROCESS</div></Reveal>
          <div className="process-heading-row"><Reveal><h2 className="section-heading">From possibility<br/><span>to introduction.</span></h2></Reveal><Reveal delay={0.15}><p>A thoughtful first step. A selective process. The right connections when there is a fit.</p></Reveal></div>
          <div className="process-list">{stages.map((item, i) => <Reveal key={item.number} delay={i * 0.08} className="process-row"><span className="process-no">{item.number}</span><h3>{item.title}</h3><p>{item.text}</p><ArrowUpRight className="process-arrow" size={23} strokeWidth={1}/></Reveal>)}</div>
          <Reveal className="process-cta"><PrimaryLink href="/approach">Explore our process</PrimaryLink></Reveal>
        </div>
      </section>

      <section className="privacy-section section-pad"><div className="section-width privacy-layout"><Reveal className="privacy-symbol"><span className="privacy-symbol-ring"><ShieldCheck size={66} strokeWidth={0.8}/></span></Reveal><Reveal className="privacy-copy" delay={0.1}><span className="eyebrow">BUILT ON CONSIDERATION</span><h2>Value should never<br/>come at the expense<br/>of <em>trust.</em></h2><p>We begin with a high-level conversation, not a request for raw datasets. Confidentiality, ownership, authorized use, and sharing boundaries belong at the center of any serious data partnership.</p><a href="/companies" className="underlined-link">For data-owning companies <ArrowUpRight size={18}/></a></Reveal></div></section>

      <section className="faq-section section-pad"><div className="section-width faq-layout"><Reveal><div className="section-index"><span className="index-line"/>04 / CLARITY FIRST</div><h2 className="section-heading">Good questions.<br/><span>Clear answers.</span></h2></Reveal><Reveal delay={0.1}><FAQ/></Reveal></div></section>

      <section className="final-cta section-pad"><div className="final-cta-light" aria-hidden="true"/><Reveal className="final-cta-content"><span className="eyebrow">05 / THE NEXT STEP</span><h2>What is your data<br/><em>capable of?</em></h2><p>Start with a confidential, high-level introduction. We&apos;ll help assess whether further exploration makes sense.</p><PrimaryLink light>Request an initial assessment</PrimaryLink></Reveal></section>
    </main><Footer/>
  </div>;
}
