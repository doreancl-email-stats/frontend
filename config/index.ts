export const PULBIC_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
export const PUBLIC_API_URL_LOGIN = process.env.NEXT_PUBLIC_API_URL_LOGIN || 'https://localhost:3000/auth/google';
export const JWT_SECRET = process.env.JWT_SECRET || null;
export const PUBLIC_GOOGLE_ID = process.env.NEXT_PUBLIC_GOOGLE_ID || '';
export const GOOGLE_SECRET = process.env.GOOGLE_SECRET || '';
export const PUBLIC_BUGSNAG_APIKEY = process.env.NEXT_PUBLIC_BUGSNAG_APIKEY || null;
export const PUBLIC_WITH_LOCAL_STORAGE = process.env.NEXT_PUBLIC_WITH_LOCAL_STORAGE || false;


export const isLocalStorageEnabled = "true" === PUBLIC_WITH_LOCAL_STORAGE;
