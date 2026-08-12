/**
 * Shared utilities for website authentication across services
 */

export type WebsiteAuth = {
  token: string;
  websiteId: string;
};

export type WebsiteTokenResponse = {
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

export function readStoredWebsiteAuth(): WebsiteAuth | null {
  if (typeof window === 'undefined') return null;

  const raw = window.localStorage.getItem('websiteAuth');
  if (!raw) return null;

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

export function extractWebsiteToken(response: WebsiteTokenResponse): string | null {
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

export function extractWebsiteId(response: WebsiteTokenResponse): string | null {
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

export function getApiErrorStatus(error: unknown): number | undefined {
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
