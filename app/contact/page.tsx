import type { Metadata } from "next";
import { Footer, Header, QualificationForm, Reveal } from "../components/Experience";
export const metadata: Metadata = { title: "Request an Assessment", description: "Tell Liorvel about your company for an initial data opportunity review." };
export default function Contact(){
 return <div className="site"><Header/><main>
   <section className="page-hero page-hero-short"><Reveal className="page-hero-inner"><h1>Tell us about<br/><em>your company.</em></h1><p>We will review whether your business could be a fit for a data partnership.</p></Reveal></section>
   <section className="simple-content section-pad"><div className="section-width"><Reveal className="contact-form-center"><QualificationForm/></Reveal></div></section>
 </main><Footer/></div>;
}
