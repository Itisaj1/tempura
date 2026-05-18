import {LegalLayout} from './LegalLayout';

const UPDATED = '18 May 2026';

export const CookiePolicyPage = () => (
  <LegalLayout title="Cookie Policy" updated={UPDATED}>
    <p>
      This Cookie Policy explains how Panko Studio uses cookies and similar technologies on this
      marketing website. It should be read together with our{' '}
      <a href="/privacy">Privacy Policy</a>.
    </p>

    <h2>Do we use a cookie banner?</h2>
    <p>
      <strong>Not at this time.</strong> We do not run advertising pixels, social plugins that track
      you across sites, or analytics tools that set marketing cookies. Because we only use what is
      needed to deliver the site (and limited third-party resources described below), we do not
      currently show a consent banner. If we add non-essential cookies later, we will update this
      policy and provide a way to manage your preferences.
    </p>

    <h2>What are cookies?</h2>
    <p>
      Cookies are small text files stored on your device when you visit a website. Similar technologies
      include local storage, session storage, and pixels. They can be &ldquo;session&rdquo; (deleted
      when you close the browser) or &ldquo;persistent&rdquo; (kept until they expire or you delete
      them).
    </p>

    <h2>How we use cookies and similar tech</h2>

    <h3>Strictly necessary</h3>
    <p>
      We do not rely on cookies for core site features such as navigation or the contact form. The
      site may still store minimal technical data in server logs when you request pages (handled by
      our host, not as browser cookies you can see in settings).
    </p>

    <h3>Third-party resources</h3>
    <p>When you load or use the Site, these third parties may set or read cookies or similar data:</p>
    <ul>
      <li>
        <strong>Google Fonts</strong> — we load Outfit and Inter from Google&apos;s servers. Google may
        log your IP address and user-agent. See{' '}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
          Google&apos;s Privacy Policy
        </a>
        .
      </li>
      <li>
        <strong>EmailJS</strong> — when you submit the contact form, EmailJS processes your message
        in the browser and on their servers. That interaction is governed by{' '}
        <a href="https://www.emailjs.com/legal/privacy-policy/" target="_blank" rel="noopener noreferrer">
          EmailJS&apos;s privacy policy
        </a>
        .
      </li>
      <li>
        <strong>Hosting (Vercel)</strong> — our host may use cookies or logs for security, performance,
        and reliability. See{' '}
        <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
          Vercel&apos;s Privacy Policy
        </a>
        .
      </li>
    </ul>

    <h2>What we do not use</h2>
    <ul>
      <li>Google Analytics, Meta Pixel, or similar analytics/advertising cookies;</li>
      <li>Social media embeds that track you without interaction;</li>
      <li>Personalization or retargeting cookies.</li>
    </ul>

    <h2>Managing cookies</h2>
    <p>
      You can block or delete cookies through your browser settings. Blocking all cookies may affect
      how some websites work; this site should remain usable if you block third-party cookies, though
      fonts may fall back to system typefaces if Google Fonts is blocked.
    </p>
    <p>
      For guidance:{' '}
      <a
        href="https://www.allaboutcookies.org/manage-cookies/"
        target="_blank"
        rel="noopener noreferrer"
      >
        allaboutcookies.org
      </a>
      .
    </p>

    <h2>Changes</h2>
    <p>
      We will update this policy if our use of cookies changes. Check the date at the top of this
      page for the latest version.
    </p>

    <h2>Contact</h2>
    <p>
      Questions? Use the <a href="/#contact">contact form</a> or see our{' '}
      <a href="/privacy">Privacy Policy</a>.
    </p>
  </LegalLayout>
);
