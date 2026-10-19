import type { Metadata } from "next";
import { Check, LockKeyhole, MessageSquareText, Shield } from "lucide-react";
import { Footer, Header, QualificationForm, Reveal } from "../components/Experience";
export const metadata: Metadata = { title: "Request an Assessment", description: "Request a high-level initial review of your company and potential data assets. No raw or sensitive data required." };
export default function Contact() {
  return <div className="site"><Header/><main>
    <section className="page-hero" style={{minHeight:490}}><div className="page-hero-inner"><Reveal><span className="eyebrow">A CONVERSATION STARTS HERE / 03</span><h1>A first step toward<br/><em>what comes next.</em></h1><p>Tell us about your business and the information it creates. We will evaluate the potential fit for further discussion.</p></Reveal></div></section>
    <section id="qualification" className="page-body section-pad"><div className="section-width contact-layout">
      <Reveal className="contact-intro"><span className="eyebrow">REQUEST AN ASSESSMENT</span><h2>Simple.<br/>Considered.<br/><em>Confidentiality-minded.</em></h2><p>A preliminary inquiry is not an application to sell data. It helps us understand whether your company and its potential information assets warrant further evaluation.</p>
        <div className="contact-points"><div className="contact-point"><span><Check size={15}/></span>High-level company details only</div><div className="contact-point"><span><LockKeyhole size={15}/></span>No raw datasets or sensitive records</div><div className="contact-point"><span><MessageSquareText size={15}/></span>No obligation to pursue an introduction</div></div>
      </Reveal>
      <Reveal delay={.15}><QualificationForm/></Reveal>
    </div></section>
    <section className="wide-statement"><Reveal><span className="eyebrow">PARTNERSHIP DISCUSSIONS</span><h2>Represent a data broker<br/>or licensing team?</h2><p>Use the same inquiry form and describe the nature of your partnership interest in the final field.</p></Reveal></section>
  </main><Footer/></div>;
}
