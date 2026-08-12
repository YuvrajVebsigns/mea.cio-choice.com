/**
 * Service for handling website email subscriptions
 */

import { API_ENDPOINTS } from '@/constants/api';
import { getWebsiteDomain } from '@/lib/website-auth';
import { apiFetch } from '@/services/apiFetch';
import {
  WebsiteAuth,
  WebsiteTokenResponse,
  readStoredWebsiteAuth,
  extractWebsiteToken,
  extractWebsiteId,
  getApiErrorStatus,
} from '@/lib/website-auth-utils';

export type SubscribeSubmission = {
  email: string;
};

type SubscribeResponse = {
  success?: boolean;
  message?: string;
  data?: {
    email: string;
    websiteId: string;
    subscribedAt: string;
    source: string;
    isVerified: boolean;
    id: string;
  };
};

async function ensureWebsiteAuth(domain: string): Promise<WebsiteAuth | null> {
  if (typeof window === 'undefined') return null;

  const stored = readStoredWebsiteAuth();
  if (stored) return stored;

  const tokenRes = await apiFetch<WebsiteTokenResponse>(
    `/api/v1/website/token?domain=${encodeURIComponent(domain)}`,
    {
      method: 'POST',
      requireAuth: false,
      headers: {
        'Content-Type': 'application/json',
        'x-website-domain': domain,
      },
      body: JSON.stringify({ domain }),
    },
  );

  const token = extractWebsiteToken(tokenRes);
  const websiteId = extractWebsiteId(tokenRes);

  if (token && websiteId) {
    const value: WebsiteAuth = { token, websiteId };
    window.localStorage.setItem('websiteAuth', JSON.stringify(value));
    return value;
  }

  return null;
}

export async function submitWebsiteSubscribe(payload: SubscribeSubmission) {
  const domain = getWebsiteDomain();
  const auth = await ensureWebsiteAuth(domain);

  const headers: Record<string, string> = {};
  if (auth?.token) headers.Authorization = `Bearer ${auth.token}`;
  if (auth?.websiteId) headers['x-website-id'] = auth.websiteId;

  try {
    const response = await apiFetch<SubscribeResponse>(API_ENDPOINTS.WEBSITE.SUBSCRIBES, {
      method: 'POST',
      requireAuth: false,
      headers,
      body: JSON.stringify(payload),
    });

    return response;
  } catch (error: unknown) {
    const statusCode = getApiErrorStatus(error);

    if (statusCode === 401 && typeof window !== 'undefined') {
      window.localStorage.removeItem('websiteAuth');

      const freshAuth = await ensureWebsiteAuth(domain);

      if (freshAuth?.token) {
        const retryHeaders: Record<string, string> = {
          Authorization: `Bearer ${freshAuth.token}`,
          'x-website-id': freshAuth.websiteId,
        };

        return apiFetch<SubscribeResponse>(API_ENDPOINTS.WEBSITE.SUBSCRIBES, {
          method: 'POST',
          requireAuth: false,
          headers: retryHeaders,
          body: JSON.stringify(payload),
        });
      }
    }

    throw error;
  }
}
