// Strava redirects here after the user approves (or denies) access. Exchanges the
// one-time code for a refresh token, stores it in an httpOnly cookie, and bounces
// back to the app — the refresh token (not the short-lived access token) is what
// lets /api/strava/activities fetch fresh data on every visit with no re-auth.
import { setRefreshCookie } from "../_lib/strava.js";

export default async function handler(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const code = url.searchParams.get("code");
  const oauthError = url.searchParams.get("error");
  const proto = req.headers["x-forwarded-proto"] || "https";
  const origin = `${proto}://${req.headers.host}`;

  if (oauthError) {
    res.writeHead(302, { Location: `${origin}/?strava=denied` });
    res.end();
    return;
  }
  if (!code) {
    res.status(400).send("Missing authorization code from Strava.");
    return;
  }

  const clientId = process.env.STRAVA_CLIENT_ID;
  const clientSecret = process.env.STRAVA_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    res.status(500).send("Server is missing STRAVA_CLIENT_ID / STRAVA_CLIENT_SECRET.");
    return;
  }

  const tokenRes = await fetch("https://www.strava.com/oauth/token", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      grant_type: "authorization_code",
    }),
  });

  if (!tokenRes.ok) {
    res.status(502).send("Strava rejected the authorization code.");
    return;
  }

  const data = await tokenRes.json();
  setRefreshCookie(res, data.refresh_token);
  res.writeHead(302, { Location: `${origin}/?strava=connected` });
  res.end();
}
