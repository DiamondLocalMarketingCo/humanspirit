import type { Metadata } from "next";
import { Header, Footer } from "../components/Experience";
import QualificationWizard from "../components/QualificationWizard";

export const metadata: Metadata = {
  title: "Check Your Data",
  description: "A short, secure preliminary assessment of your company's systems, operations and potential data licensing opportunity. No raw data required."
};

export default function Contact() {
  return <div className="site">
    <Header />
    <main className="intake-page">
      <section className="intake-header">
        <h1>Check your data.</h1>
        <p>Check your preliminary fit for active or defunct company data opportunities. Liorvel screens inquiries independently; this is not micro1's official application.</p>
      </section>
      <section className="intake-form-section" id="qualification" aria-label="Company qualification form">
        <QualificationWizard />
      </section>
    </main>
    <Footer />
  </div>;
}
