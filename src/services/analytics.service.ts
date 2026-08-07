import { API_ENDPOINTS } from '@/constants/api';
import { getWebsiteDomain } from '@/lib/website-auth';
import { apiFetch } from '@/services/apiFetch';

type WebsiteAuth = {
  token: string;
  websiteId: string;
};

type WebsiteTokenResponse = {
  token?: string;
  websiteId?: string;
  id?: string;

  website?: {
    id?: string;
    token?: string;
  };

  data?: {
    token?: string;
    websiteId?: string;
    id?: string;

    website?: {
      id?: string;
      token?: string;
    };

    data?: {
      token?: string;
      websiteId?: string;
      id?: string;

      website?: {
        id?: string;
        token?: string;
      };
    };
  };
};

export interface AnalyticsTrackPayload {
  visitorId: string;
  sessionId: string;
  eventType: string;
  pageUrl: string;
  pageTitle: string;
  referrer: string;
  userAgent: string;
  metadata?: Record<string, unknown>;
}

export interface AnalyticsTrackResponse {
  success: boolean;
  message: string;
  data?: Record<string, unknown>;
}

function readStoredWebsiteAuth(): WebsiteAuth | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const raw = window.localStorage.getItem('websiteAuth');

  if (!raw) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(raw);

    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      'token' in parsed &&
      'websiteId' in parsed &&
      typeof (parsed as { token?: unknown }).token === 'string' &&
      typeof (parsed as { websiteId?: unknown }).websiteId === 'string'
    ) {
      return {
        token: (parsed as { token: string }).token,
        websiteId: (parsed as { websiteId: string }).websiteId,
      };
    }
  } catch {
    return null;
  }

  return null;
}

function extractWebsiteToken(response: WebsiteTokenResponse): string | null {
  return (
    response.token ??
    response.data?.token ??
    response.data?.data?.token ??
    response.data?.website?.token ??
    response.data?.data?.website?.token ??
    response.website?.token ??
    null
  );
}

function extractWebsiteId(response: WebsiteTokenResponse): string | null {
  return (
    response.websiteId ??
    response.website?.id ??
    response.data?.website?.id ??
    response.data?.websiteId ??
    response.data?.data?.websiteId ??
    response.data?.data?.website?.id ??
    response.data?.data?.id ??
    response.data?.id ??
    response.id ??
    null
  );
}

/**
 * Get website authentication.
 *
 * Same authentication flow used by contact.service.ts
 */
async function ensureWebsiteAuth(domain: string): Promise<WebsiteAuth | null> {
  if (typeof window === 'undefined') {
    return null;
  }

  // First check localStorage
  const stored = readStoredWebsiteAuth();

  if (stored) {
    return stored;
  }

  // Request website token
  const tokenRes = await apiFetch<WebsiteTokenResponse>(
    `${API_ENDPOINTS.WEBSITE.TOKEN}?domain=${encodeURIComponent(domain)}`,
    {
      method: 'POST',
      requireAuth: false,

      headers: {
        'Content-Type': 'application/json',
        'x-website-domain': domain,
      },

      body: JSON.stringify({
        domain,
      }),
    },
  );

  const token = extractWebsiteToken(tokenRes);
  const websiteId = extractWebsiteId(tokenRes);

  if (token && websiteId) {
    const auth: WebsiteAuth = {
      token,
      websiteId,
    };

    window.localStorage.setItem('websiteAuth', JSON.stringify(auth));

    return auth;
  }

  //   console.error('Website token or website ID was not returned by token API.');

  return null;
}

function getApiErrorStatus(error: unknown): number | undefined {
  if (typeof error === 'object' && error !== null && 'statusCode' in error) {
    const statusCode = (error as { statusCode?: unknown }).statusCode;

    return typeof statusCode === 'number' ? statusCode : Number(statusCode);
  }

  if (typeof error === 'object' && error !== null && 'status' in error) {
    const status = (error as { status?: unknown }).status;

    return typeof status === 'number' ? status : Number(status);
  }

  return undefined;
}

/**
 * Track analytics event.
 */
export async function trackAnalyticsEvent(
  payload: AnalyticsTrackPayload,
): Promise<AnalyticsTrackResponse | null> {
  const domain = getWebsiteDomain();

  if (!domain) {
    // console.error('Website domain is not configured.');

    return null;
  }

  try {
    const auth = await ensureWebsiteAuth(domain);

    if (!auth?.token || !auth?.websiteId) {
      //   console.error('Website authentication is not available.');

      return null;
    }

    // IMPORTANT:
    // Analytics API uses the SAME authentication
    // headers as the working contact API.
    const headers: Record<string, string> = {
      Authorization: `Bearer ${auth.token}`,
      'x-website-id': auth.websiteId,
      'Content-Type': 'application/json',
    };

    // console.log('Analytics payload:', payload);

    const response = await apiFetch<AnalyticsTrackResponse>(API_ENDPOINTS.WEBSITE.ANALYTICS.TRACK, {
      method: 'POST',
      requireAuth: false,
      headers,
      body: JSON.stringify(payload),
    });

    // console.log('Analytics response:', response);

    return response;
  } catch (error: unknown) {
    const statusCode = getApiErrorStatus(error);

    // console.error('Analytics API error:', error);

    /**
     * If token expired, remove it,
     * get a fresh token and retry.
     */
    if (statusCode === 401 && typeof window !== 'undefined') {
      window.localStorage.removeItem('websiteAuth');

      try {
        const freshAuth = await ensureWebsiteAuth(domain);

        if (freshAuth?.token && freshAuth?.websiteId) {
          const retryHeaders: Record<string, string> = {
            Authorization: `Bearer ${freshAuth.token}`,
            'x-website-id': freshAuth.websiteId,
            'Content-Type': 'application/json',
          };

          const retryResponse = await apiFetch<AnalyticsTrackResponse>(
            API_ENDPOINTS.WEBSITE.ANALYTICS.TRACK,
            {
              method: 'POST',
              requireAuth: false,
              headers: retryHeaders,
              body: JSON.stringify(payload),
            },
          );

          //   console.log('Analytics retry response:', retryResponse);

          return retryResponse;
        }
      } catch (retryError) {
        // console.error('Analytics retry failed:', retryError);
      }
    }

    return null;
  }
}

/**
 * Generate or retrieve visitor ID.
 */
export function getOrCreateVisitorId(): string {
  const VISITOR_ID_KEY = 'analytics_visitor_id';

  if (typeof window === 'undefined') {
    return '';
  }

  let visitorId = window.localStorage.getItem(VISITOR_ID_KEY);

  if (!visitorId) {
    visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;

    window.localStorage.setItem(VISITOR_ID_KEY, visitorId);
  }

  return visitorId;
}

/**
 * Generate or retrieve session ID.
 */
export function getOrCreateSessionId(): string {
  const SESSION_ID_KEY = 'analytics_session_id';

  if (typeof window === 'undefined') {
    return '';
  }

  let sessionId = window.sessionStorage.getItem(SESSION_ID_KEY);

  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;

    window.sessionStorage.setItem(SESSION_ID_KEY, sessionId);
  }

  return sessionId;
}

/**
 * Track cookie consent.
 */
export async function trackCookieConsent(
  consentStatus: 'accepted' | 'essential',
  analyticsEnabled: boolean,
): Promise<AnalyticsTrackResponse | null> {
  if (typeof window === 'undefined') {
    return null;
  }

  const visitorId = getOrCreateVisitorId();

  const sessionId = getOrCreateSessionId();

  return trackAnalyticsEvent({
    visitorId,
    sessionId,
    eventType: 'cookie_consent',
    pageUrl: window.location.href,
    pageTitle: document.title,
    referrer: document.referrer || '',
    userAgent: navigator.userAgent,

    metadata: {
      consentStatus,
      analyticsEnabled,
      timestamp: new Date().toISOString(),
    },
  });
}
