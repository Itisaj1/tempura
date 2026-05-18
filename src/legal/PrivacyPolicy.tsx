import {LegalLayout} from './LegalLayout';

const UPDATED = '18 May 2026';

export const PrivacyPolicyPage = () => (
  <LegalLayout title="Privacy Policy" updated={UPDATED}>
    <p>
      Panko Studio (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) runs this marketing website to
      describe our product management and design services. This policy explains what personal
      information we collect, how we use it, and the choices you have.
    </p>

    <h2>Information we collect</h2>
    <p>We may collect the following categories of information:</p>
    <ul>
      <li>
        <strong>Contact details you submit.</strong> When you use our contact form, we receive your
        name, company, email address, and the topics you select.
      </li>
      <li>
        <strong>Technical and usage data.</strong> Our hosting provider and standard web server logs
        may record your IP address, browser type, device information, referring URL, and pages
        viewed. We do not use advertising or analytics cookies on this site (see our{' '}
        <a href="/cookies">Cookie Policy</a>).
      </li>
      <li>
        <strong>Communications.</strong> If you email us or correspond with us after submitting the
        form, we keep that correspondence to respond and manage our relationship.
      </li>
    </ul>

    <h2>How we use information</h2>
    <p>We use personal information to:</p>
    <ul>
      <li>Respond to enquiries and schedule conversations;</li>
      <li>Send a confirmation email when you submit the contact form (via our email service);</li>
      <li>Operate, secure, and improve the website;</li>
      <li>Comply with law and protect our rights.</li>
    </ul>
    <p>
      We do not sell your personal information. We do not use your data for automated decision-making
      that produces legal or similarly significant effects.
    </p>

    <h2>Service providers</h2>
    <p>We rely on trusted third parties to run the site, including:</p>
    <ul>
      <li>
        <strong>EmailJS</strong> — processes contact form submissions and sends notification and
        auto-reply emails on our behalf;
      </li>
      <li>
        <strong>Vercel</strong> (or equivalent hosting) — hosts the website and may process technical
        log data;
      </li>
      <li>
        <strong>Google Fonts</strong> — serves typography files when you load the site; Google may
        receive your IP address and basic request data.
      </li>
    </ul>
    <p>
      These providers process data under their own terms and privacy policies. We configure services
      where possible to limit use to what is needed to operate the site.
    </p>

    <h2>Legal bases (EEA/UK visitors)</h2>
    <p>
      If you are in the European Economic Area or the United Kingdom, we process personal data on
      these bases: <strong>contract</strong> or <strong>pre-contractual steps</strong> (responding to
      your enquiry), <strong>legitimate interests</strong> (operating and securing the website), and{' '}
      <strong>consent</strong> where required (for example, non-essential cookies if we add them
      later).
    </p>

    <h2>Retention</h2>
    <p>
      We keep contact form submissions and related correspondence for as long as needed to respond,
      pursue a business relationship, or comply with legal obligations—typically up to three years
      unless a longer period is required. Server logs are retained according to our host&apos;s
      default periods.
    </p>

    <h2>Your rights</h2>
    <p>
      Depending on where you live, you may have rights to access, correct, delete, or restrict use of
      your personal data, to object to certain processing, and to data portability. You may also
      lodge a complaint with your local data protection authority.
    </p>
    <p>
      To exercise these rights, contact us through the{' '}
      <a href="/#contact">contact form</a> and include &ldquo;Privacy request&rdquo; in your message.
      We will respond within a reasonable time.
    </p>

    <h2>International transfers</h2>
    <p>
      Our service providers may process data in the United States or other countries. Where required,
      we rely on appropriate safeguards such as standard contractual clauses or equivalent
      mechanisms.
    </p>

    <h2>Children</h2>
    <p>
      This site is not directed at children under 16. We do not knowingly collect personal
      information from children.
    </p>

    <h2>Changes</h2>
    <p>
      We may update this policy from time to time. The &ldquo;Last updated&rdquo; date at the top
      reflects the latest version. Continued use of the site after changes means you accept the
      updated policy.
    </p>

    <h2>Contact</h2>
    <p>
      Questions about this policy? Use the <a href="/#contact">contact form</a> on our website.
    </p>
  </LegalLayout>
);
