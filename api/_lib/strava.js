// Shared helpers for the Strava OAuth serverless functions. Filenames/dirs starting
// with "_" are ignored by Vercel's zero-config routing, so this file isn't itself
// exposed as an endpoint.

const REFRESH_COOKIE = "strava_refresh_token";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 180; // ~180 days — Strava refresh tokens don't expire on their own

export function parseCookies(header) {
  const out = {};
  if (!header) return out;
  for (const part of header.split(";")) {
    const idx = part.indexOf("=");
    if (idx === -1) continue;
    out[part.slice(0, idx).trim()] = decodeURIComponent(part.slice(idx + 1).trim());
  }
  return out;
}

export function setRefreshCookie(res, refreshToken) {
  res.setHeader(
    "Set-Cookie",
    `${REFRESH_COOKIE}=${refreshToken}; HttpOnly; Secure; SameSite=Lax; Path=/api/strava; Max-Age=${COOKIE_MAX_AGE}`
  );
}

export function clearRefreshCookie(res) {
  res.setHeader(
    "Set-Cookie",
    `${REFRESH_COOKIE}=; HttpOnly; Secure; SameSite=Lax; Path=/api/strava; Max-Age=0`
  );
}

export function getRefreshToken(req) {
  return parseCookies(req.headers.cookie)[REFRESH_COOKIE];
}

// Exchanges a refresh token for a fresh access token. Returns null on failure.
export async function refreshAccessToken(refreshToken) {
  const clientId = process.env.STRAVA_CLIENT_ID;
  const clientSecret = process.env.STRAVA_CLIENT_SECRET;
  const res = await fetch("https://www.strava.com/oauth/token", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });
  if (!res.ok) return null;
  return res.json(); // { access_token, refresh_token, expires_at }
}
