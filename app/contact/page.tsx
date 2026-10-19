import type { Metadata } from "next";
import { Footer, Header, QualificationForm, Reveal } from "../components/Experience";

export const metadata: Metadata = {
  title: "Request an Assessment",
  description: "Tell Liorvel about your company and its potential data assets. No raw or sensitive data required.",
};

export default function Contact() {
  return <div className="site"><Header /><main>
    <section className="page-hero contact-hero"><div className="page-hero-inner"><Reveal>
      <h1>Let&apos;s explore<br /><em>the opportunity.</em></h1>
      <p>Share a few details about your company. We&apos;ll review the potential fit.</p>
    </Reveal></div></section>

    <section id="qualification" className="page-body contact-section">
      <div className="section-width contact-layout compact-contact-layout">
        <Reveal className="contact-intro"><h2>Start here.</h2>
          <p>Only a high-level overview is needed. Please don&apos;t submit confidential information or raw datasets.</p>
          <p className="partner-note">Brokers and licensing partners can use this form for introductions too.</p>
        </Reveal>
        <Reveal delay={0.1}><QualificationForm /></Reveal>
      </div>
    </section>
  </main><Footer /></div>;
}
