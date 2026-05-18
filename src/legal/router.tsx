import type {ReactNode} from 'react';
import {CookiePolicyPage} from './CookiePolicy';
import {PrivacyPolicyPage} from './PrivacyPolicy';
import {TermsOfServicePage} from './TermsOfService';

const LEGAL_PAGES: Record<string, () => ReactNode> = {
  '/privacy': PrivacyPolicyPage,
  '/terms': TermsOfServicePage,
  '/cookies': CookiePolicyPage,
};

export const normalizePath = (pathname: string) => {
  const lower = pathname.toLowerCase();
  if (lower.length > 1 && lower.endsWith('/')) {
    return lower.slice(0, -1);
  }
  return lower || '/';
};

export const getLegalPage = (pathname: string) => LEGAL_PAGES[normalizePath(pathname)];
