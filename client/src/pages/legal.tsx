// Legal & informational pages — Disclaimer, Privacy, Terms, Contact.
// Hash-routed: /#/disclaimer, /#/privacy, /#/terms, /#/contact
// All copy is hand-written for CoverageIQ — concise, defensible, plain English.
import { ChevronLeft } from "lucide-react";
import { Logo } from "@/components/logo";

const LAST_UPDATED = "May 2026";
const CONTACT_EMAIL = "scottvg@oneMDmedical.com";

function PageShell({
  title,
  meta,
  children,
}: {
  title: string;
  meta: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="flex-shrink-0 border-b-2 border-foreground bg-background">
        <div className="max-w-[1100px] mx-auto px-4 lg:px-6 py-2.5 flex items-center gap-3">
          <a href="#/" className="flex items-center gap-2" data-testid="link-home">
            <Logo className="w-7 h-7" />
            <div className="leading-tight">
              <div className="font-serif font-black text-[16px] tracking-tight">
                CoverageIQ
              </div>
              <div className="font-script text-[11px] text-muted-foreground -mt-0.5">
                an antimicrobial atlas
              </div>
            </div>
          </a>
        </div>
      </header>

      <main className="flex-1 legal-page">
        <a href="#/" className="legal-page__back" data-testid="link-back">
          <ChevronLeft className="w-3.5 h-3.5" />
          Back to atlas
        </a>
        <h1>{title}</h1>
        <div className="legal-page__meta">{meta}</div>
        {children}
      </main>

      <footer className="flex-shrink-0 border-t-2 border-foreground bg-card">
        <div className="max-w-[1100px] mx-auto px-4 lg:px-6 py-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground flex items-center justify-between">
          <span>CoverageIQ · v0.1</span>
          <span>Created by Scott A. Van Gemert, MD · 2026</span>
        </div>
      </footer>
    </div>
  );
}

export function DisclaimerPage() {
  return (
    <PageShell title="Medical disclaimer" meta={`Last updated · ${LAST_UPDATED}`}>
      <div className="legal-page__callout">
        <strong>CoverageIQ is an educational reference for clinicians and trainees.</strong>{" "}
        It is not a substitute for individual clinical judgment, your local
        antibiogram, infectious-disease consultation, or peer-reviewed primary
        literature. Coverage values reflect typical US adult practice and may
        not apply to your patient.
      </div>

      <h2>Not medical advice</h2>
      <p>
        Nothing on CoverageIQ constitutes the practice of medicine, the
        provision of medical advice, or the formation of a clinician-patient
        relationship. The site is for general educational use only. If you are
        a patient or family member, do not use CoverageIQ to make decisions
        about your own care — please consult a licensed clinician.
      </p>

      <h2>No warranties</h2>
      <p>
        Antimicrobial regimens evolve as resistance patterns shift, new agents
        come to market, and guidelines are revised. CoverageIQ is provided
        <strong> "as is" without any warranty</strong> of accuracy,
        completeness, currency, fitness for a particular purpose, or
        non-infringement. Citations point to the published guidelines that
        informed the matrix at the time of curation; the published guideline is
        always the authoritative source.
      </p>

      <h2>Always defer to:</h2>
      <ul>
        <li>Your local antibiogram and institutional protocols.</li>
        <li>The most recent IDSA, AASLD, ATS, NIH, or specialty-society guideline.</li>
        <li>Your hospital antimicrobial stewardship team and ID consultants.</li>
        <li>FDA-approved prescribing information for dosing, contraindications, monitoring, and pregnancy/lactation guidance.</li>
        <li>Renal/hepatic adjustment, drug-drug interactions, and allergy histories specific to the patient in front of you.</li>
      </ul>

      <h2>Pediatric, neonatal, and special populations</h2>
      <p>
        Coverage data is curated for <strong>adult inpatient and outpatient
        practice</strong>. It does not address pediatric dosing, neonatal
        regimens, pregnancy-specific recommendations, hemodialysis-specific
        adjustments, or transplant-specific prophylaxis. Use the appropriate
        specialty reference for those populations.
      </p>

      <h2>Reporting errors</h2>
      <p>
        If you find an error, missing organism, outdated regimen, or
        guideline-conflicting recommendation, please email{" "}
        <a href={`mailto:${CONTACT_EMAIL}?subject=CoverageIQ%20correction`}>
          {CONTACT_EMAIL}
        </a>{" "}
        with the syndrome/drug/bug in question and a citation. Corrections are
        prioritized.
      </p>

      <h2>Liability</h2>
      <p>
        To the maximum extent permitted by law, the author is not liable for
        any direct, indirect, incidental, consequential, or special damages
        arising from your use of, or reliance on, the information presented on
        CoverageIQ.
      </p>
    </PageShell>
  );
}

export function PrivacyPage() {
  return (
    <PageShell title="Privacy policy" meta={`Last updated · ${LAST_UPDATED}`}>
      <p>
        CoverageIQ is a single-page educational reference. This site is built
        to be privacy-respectful and minimal by design.
      </p>

      <h2>What we collect</h2>
      <p>
        <strong>Personal data: none.</strong> CoverageIQ does not require
        sign-in, does not maintain user accounts, and does not collect names,
        email addresses, IP-linked profiles, or any patient-related
        information. Please do not enter protected health information (PHI)
        into the site — it is not designed to receive it.
      </p>

      <h2>What the browser stores</h2>
      <p>
        CoverageIQ does not use cookies, localStorage, sessionStorage, IndexedDB,
        or any device fingerprinting. Theme and module preferences are kept
        only in volatile React state for the active session and discarded on
        page reload.
      </p>

      <h2>Hosting and logs</h2>
      <p>
        The site is served as a static asset bundle from{" "}
        <a
          href="https://www.cloudflare.com/privacy/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Cloudflare
        </a>
        . Cloudflare may retain standard request metadata (IP address, user
        agent, requested URL, referrer, timestamp) for security and abuse
        prevention as described in their privacy policy. CoverageIQ does not
        operate its own analytics, tracking pixels, or third-party advertising
        scripts.
      </p>

      <h2>External links</h2>
      <p>
        Each cited guideline links to its published source (IDSA, AASLD,
        peer-reviewed journals). Once you click such a link, the target
        site's privacy policy applies. CoverageIQ has no visibility into your
        activity on those sites.
      </p>

      <h2>Children's privacy</h2>
      <p>
        CoverageIQ is intended for clinicians, trainees, and adult learners.
        We do not knowingly collect information from children under 13.
      </p>

      <h2>Contact</h2>
      <p>
        Privacy questions, takedown requests, or requests for corrections may
        be sent to{" "}
        <a href={`mailto:${CONTACT_EMAIL}?subject=CoverageIQ%20privacy`}>
          {CONTACT_EMAIL}
        </a>
        . If this policy changes materially, the date above will be updated.
      </p>
    </PageShell>
  );
}

export function TermsPage() {
  return (
    <PageShell title="Terms of use" meta={`Last updated · ${LAST_UPDATED}`}>
      <p>
        By accessing or using CoverageIQ, you agree to these terms. If you do
        not agree, please do not use the site.
      </p>

      <h2>1. Educational purpose</h2>
      <p>
        CoverageIQ is provided strictly as an educational reference. It is not
        a clinical decision-support tool, electronic medical record, dosing
        calculator, or substitute for professional judgment. See the{" "}
        <a href="#/disclaimer">Medical disclaimer</a> for full scope.
      </p>

      <h2>2. License to use</h2>
      <p>
        You are granted a non-exclusive, revocable, non-transferable license
        to view and learn from the content on CoverageIQ for personal and
        professional educational purposes. You may not:
      </p>
      <ul>
        <li>Sell, sublicense, or commercially redistribute the content.</li>
        <li>Scrape, mirror, or rehost the site or its underlying data.</li>
        <li>
          Use the site to provide an automated decision-support, prescribing,
          or alerting service to third parties.
        </li>
        <li>
          Misrepresent CoverageIQ data as primary literature or as carrying any
          regulatory clearance.
        </li>
      </ul>

      <h2>3. No warranty</h2>
      <p>
        CoverageIQ is provided "as is" and "as available," without warranty of
        any kind, express or implied, including without limitation any
        warranties of accuracy, currency, fitness for a particular purpose,
        merchantability, or non-infringement.
      </p>

      <h2>4. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, the author and any
        contributors shall not be liable for any indirect, incidental,
        consequential, special, or exemplary damages, including damages
        related to clinical outcomes, arising from or related to your use of
        CoverageIQ. Aggregate liability is capped at zero dollars (USD $0)
        because no fee is charged.
      </p>

      <h2>5. Intellectual property</h2>
      <p>
        Source code, design, illustrations, and curated coverage data are
        © 2026 Scott A. Van Gemert. Cited guidelines remain the property of
        their respective publishers. Drug names and class trademarks belong to
        their respective owners.
      </p>

      <h2>6. Changes</h2>
      <p>
        These terms may be updated at any time. Material changes will be
        reflected by an updated "last updated" date above. Continued use of
        the site after changes constitutes acceptance of the updated terms.
      </p>

      <h2>7. Governing law</h2>
      <p>
        These terms are governed by the laws of the State of Illinois, USA,
        without regard to its conflict-of-law provisions.
      </p>

      <h2>8. Contact</h2>
      <p>
        Questions about these terms may be directed to{" "}
        <a href={`mailto:${CONTACT_EMAIL}?subject=CoverageIQ%20terms`}>
          {CONTACT_EMAIL}
        </a>
        .
      </p>
    </PageShell>
  );
}

export function ContactPage() {
  return (
    <PageShell title="Contact" meta="Get in touch">
      <p>
        CoverageIQ is built and maintained by{" "}
        <strong>Scott A. Van Gemert, MD</strong>, an internal medicine resident
        at Southern Illinois University and incoming hospitalist at St. John's
        Hospital (Vituity), Springfield, IL.
      </p>

      <div className="legal-page__callout">
        <strong>Best way to reach me:</strong>{" "}
        <a
          href={`mailto:${CONTACT_EMAIL}?subject=CoverageIQ%20feedback`}
          data-testid="link-contact-email"
        >
          {CONTACT_EMAIL}
        </a>
      </div>

      <h2>What I'd love to hear about</h2>
      <ul>
        <li>
          <strong>Coverage corrections.</strong> If a regimen is wrong, a bug
          is missing, or a guideline has been updated, send the syndrome name
          and a citation — these get prioritized.
        </li>
        <li>
          <strong>Feature requests.</strong> Want pediatric dosing, OPAT
          conversions, allergy de-labeling logic, or a new module
          (anti-mycobacterials, anti-parasitics)? Tell me.
        </li>
        <li>
          <strong>Bugs, layout glitches, theme issues.</strong> Tell me your
          browser and a one-sentence description.
        </li>
        <li>
          <strong>Collaboration.</strong> If you're an ID pharmacist or
          stewardship physician interested in helping curate a section, please
          reach out.
        </li>
      </ul>

      <h2>What I can't help with</h2>
      <p>
        I cannot answer specific clinical questions about a patient you are
        caring for. Please use your institution's antimicrobial stewardship
        team, ID consult service, or attending physician for that.
      </p>

      <h2>Other</h2>
      <p>
        Source code lives at{" "}
        <a
          href="https://github.com/svg2280/CoverageIQ"
          target="_blank"
          rel="noopener noreferrer"
          data-testid="link-contact-github"
        >
          github.com/svg2280/CoverageIQ
        </a>
        . Issues and pull requests welcome.
      </p>
    </PageShell>
  );
}
