import {LegalLayout} from './LegalLayout';

const UPDATED = '18 May 2026';

export const TermsOfServicePage = () => (
  <LegalLayout title="Terms of Service" updated={UPDATED}>
    <p>
      These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the Panko Studio
      marketing website (the &ldquo;Site&rdquo;). By using the Site, you agree to these Terms. If you
      do not agree, please do not use the Site.
    </p>

    <h2>About the Site</h2>
    <p>
      The Site presents information about Panko Studio&apos;s product management and design services.
      Content on the Site—including pricing summaries, timelines, and capabilities—is for general
      information only. It is not a binding offer. Any engagement with Panko Studio is subject to a
      separate written agreement (proposal, statement of work, or contract) signed by both parties.
    </p>

    <h2>Permitted use</h2>
    <p>You may use the Site for lawful, personal or internal business purposes. You may not:</p>
    <ul>
      <li>Use the Site in any way that violates applicable law;</li>
      <li>Attempt to gain unauthorized access to our systems or networks;</li>
      <li>Scrape, harvest, or automate access to the Site in a manner that burdens our infrastructure;</li>
      <li>Reverse engineer or copy the Site except as allowed by law;</li>
      <li>Misrepresent your affiliation with Panko Studio or use our brand without permission.</li>
    </ul>

    <h2>Intellectual property</h2>
    <p>
      The Site and its content—including text, layout, graphics, logos, and case-study
      placeholders—are owned by Panko Studio or our licensors and protected by intellectual property
      laws. You may not reproduce, distribute, or create derivative works from Site content without
      our prior written consent, except for temporary copies needed to view the Site in a browser.
    </p>
    <p>
      Client work shown on the Site (when published) remains subject to separate agreements with those
      clients. Do not reuse client materials from the Site without permission.
    </p>

    <h2>Contact form</h2>
    <p>
      When you submit the contact form, you confirm that the information you provide is accurate and
      that you consent to our processing of that information as described in our{' '}
      <a href="/privacy">Privacy Policy</a>. We may decline or ignore submissions that are abusive,
      spam, or unrelated to our services.
    </p>

    <h2>Third-party links</h2>
    <p>
      The Site may link to third-party websites (for example, LinkedIn). We are not responsible for
      their content, policies, or practices. Your use of third-party sites is at your own risk.
    </p>

    <h2>Disclaimer</h2>
    <p>
      THE SITE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY
      KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
      PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SITE WILL BE UNINTERRUPTED,
      ERROR-FREE, OR FREE OF HARMFUL COMPONENTS.
    </p>

    <h2>Limitation of liability</h2>
    <p>
      TO THE MAXIMUM EXTENT PERMITTED BY LAW, PANKO STUDIO AND ITS DIRECTORS, EMPLOYEES, AND
      CONTRACTORS WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE
      DAMAGES, OR ANY LOSS OF PROFITS, DATA, OR GOODWILL, ARISING FROM YOUR USE OF THE SITE.
    </p>
    <p>
      OUR TOTAL LIABILITY FOR ANY CLAIM RELATING TO THE SITE WILL NOT EXCEED ONE HUNDRED U.S. DOLLARS
      (USD $100) OR THE AMOUNT YOU PAID US IN THE TWELVE MONTHS BEFORE THE CLAIM, WHICHEVER IS
      GREATER—EXCEPT WHERE LIABILITY CANNOT BE LIMITED BY LAW.
    </p>

    <h2>Indemnity</h2>
    <p>
      You agree to indemnify and hold harmless Panko Studio from claims arising out of your misuse of
      the Site or violation of these Terms, except to the extent caused by our negligence or willful
      misconduct.
    </p>

    <h2>Governing law</h2>
    <p>
      These Terms are governed by the laws of the State of Delaware, United States, without regard to
      conflict-of-law rules. Courts in Delaware will have exclusive jurisdiction over disputes
      relating to the Site, except where mandatory consumer protection laws in your country require
      otherwise.
    </p>

    <h2>Changes</h2>
    <p>
      We may revise these Terms at any time by posting an updated version on the Site. Your continued
      use after the effective date constitutes acceptance of the revised Terms.
    </p>

    <h2>Contact</h2>
    <p>
      Questions about these Terms? Use the <a href="/#contact">contact form</a> on our website.
    </p>
  </LegalLayout>
);
