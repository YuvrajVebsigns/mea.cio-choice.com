export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://backend.uatcoremedia.vebsigns.com';

export const WEBSITE_DOMAIN = process.env.NEXT_PUBLIC_WEBSITE_DOMAIN || '';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    REFRESH: '/auth/refresh',
  },

  WEBSITE: {
    CONTACTS: '/api/v1/website/contacts',

    TOKEN: '/api/v1/website/token',

    ANALYTICS: {
      TRACK: '/api/v1/website/analytics/track',
    },

    PAGES: {
      BASE: '/api/v1/website/pages',
      BY_SLUG: (slug: string) => `/api/v1/website/pages/${encodeURIComponent(slug)}`,
    },

    ATTENDEES: {
      REGISTER: '/api/v1/website/attendees/register',
    },

    EVENTS: {
      BASE: '/api/v1/website/events',
      BY_ID: (id: string) => `/api/v1/website/events/${encodeURIComponent(id)}`,
    },

    BLOGS: {
      BASE: '/api/v1/website/blogs',
      BY_ID: (id: string) => `/api/v1/website/blogs/${encodeURIComponent(id)}`,
    },

    BLOG_COMMENTS: {
      BASE: (id: string) => `/api/v1/website/blogs/${encodeURIComponent(id)}/comments`,
    },

    SPONSORS: {
      BASE: '/api/v1/website/sponsors',
      BY_ID: (id: string) => `/api/v1/website/sponsors/${encodeURIComponent(id)}`,
    },

    SUBSCRIBES: '/api/v1/website/subscribes',
  },

  USERS: {
    BASE: '/users',
    BY_ID: (id: string) => `/users/${encodeURIComponent(id)}`,
  },

  MEDIA: {
    BASE: '/media',
    UPLOAD: '/media/upload',
  },
} as const;
