import { ArrowDown, ArrowUpRight, Database, BookOpen, ShieldCheck, Network, ArrowRight } from "lucide-react";
import { Footer, Header, PrimaryLink, Reveal } from "./components/Experience";

const dataTypes = [
  { title: "Operational records", text: "Process histories, service activity and structured business records.", Icon: Database },
  { title: "Specialized knowledge", text: "Industry documents, technical procedures and internal know-how.", Icon: BookOpen },
  { title: "Real-world workflows", text: "How work is completed, decisions are made and outcomes recorded.", Icon: Network },
];

export default function Home() {
  return <div className="site"><Header/><main>
    <section className="hero" aria-labelledby="home-heading">
      <div className="hero-art" aria-hidden="true"/>
      <div className="hero-inner">
        <Reveal><h1 id="home-heading">Unlock the potential<br/>of your <em>business data.</em></h1></Reveal>
        <Reveal delay={.12}><p className="hero-description">We qualify company data opportunities and connect businesses with relevant brokers and licensing partners.</p></Reveal>
        <Reveal delay={.2}><div className="hero-actions"><PrimaryLink>Check your eligibility</PrimaryLink></div></Reveal>
      </div>
      <a className="hero-down" href="#potential" aria-label="Explore the website"><ArrowDown size={19}/></a>
    </section>

    <section id="potential" className="intro-section section-pad">
      <div className="section-width">
        <Reveal className="center-copy"><h2>Valuable data may already<br/>exist in your business.</h2><p>Everyday operations produce information that can be useful beyond its original purpose. We help companies explore whether a licensing opportunity exists.</p></Reveal>
        <Reveal className="orbit-visual" delay={.1}><img src="/art/orbital-intelligence.webp" alt="Abstract orbital connections representing data opportunities" loading="lazy"/></Reveal>
      </div>
    </section>

    <section className="data-section section-pad">
      <div className="section-width">
        <Reveal className="center-copy"><h2>What kind of data?</h2><p>We look at business information with clear origins, appropriate rights and potential market relevance.</p></Reveal>
        <div className="data-grid">{dataTypes.map(({title,text,Icon},i)=><Reveal className="data-card" delay={i*.08} key={title}><Icon size={30} strokeWidth={1.2}/><h3>{title}</h3><p>{text}</p></Reveal>)}</div>
      </div>
    </section>

    <section id="how-it-works" className="steps-section section-pad">
      <div className="section-width">
        <Reveal className="center-copy"><h2>How it works</h2><p>A straightforward path from initial review to possible introductions.</p></Reveal>
        <div className="steps-grid">
          <Reveal className="step-card"><span className="step-symbol"><Database size={25} strokeWidth={1.25}/></span><h3>Tell us about your company</h3><p>Share a brief overview of the data you generate.</p></Reveal>
          <Reveal className="step-card" delay={.09}><span className="step-symbol"><ShieldCheck size={25} strokeWidth={1.25}/></span><h3>We assess the opportunity</h3><p>We consider suitability, rights, quality and partner demand.</p></Reveal>
          <Reveal className="step-card" delay={.18}><span className="step-symbol"><Network size={25} strokeWidth={1.25}/></span><h3>Connect if there is a fit</h3><p>Qualified companies may be introduced to relevant partners.</p></Reveal>
        </div>
        <Reveal className="center-action"><a className="underlined-link" href="/approach">More about our approach <ArrowUpRight size={18}/></a></Reveal>
      </div>
    </section>

    <section className="trust-section section-pad">
      <div className="section-width trust-layout">
        <Reveal className="trust-text"><h2>Privacy and control<br/><span>come first.</span></h2><p>We start with a conversation, not your datasets. Any potential sharing requires appropriate rights, permission and agreements.</p><a className="underlined-link" href="/companies">For companies <ArrowUpRight size={18}/></a></Reveal>
        <Reveal className="trust-art" delay={.1}><img src="/art/orbital-intelligence.webp" alt="Circular network symbol representing secure data connections" loading="lazy"/></Reveal>
      </div>
    </section>

    <section className="closing-section section-pad"><Reveal className="center-copy"><h2>What could your<br/>data be worth?</h2><p>Start with a brief company assessment. No files or commitment required.</p><PrimaryLink light>Request an assessment</PrimaryLink></Reveal></section>
  </main><Footer/></div>;
}
