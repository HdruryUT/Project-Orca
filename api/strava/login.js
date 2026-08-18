// Redirects to Strava's OAuth consent screen. Linked from the "Connect Strava" button.
export default function handler(req, res) {
  const clientId = process.env.STRAVA_CLIENT_ID;
  if (!clientId) {
    res.status(500).send("Server is missing the STRAVA_CLIENT_ID environment variable.");
    return;
  }

  const proto = req.headers["x-forwarded-proto"] || "https";
  const redirectUri = `${proto}://${req.headers.host}/api/strava/callback`;

  const params = new URLSearchParams({
    client_id: clientId,
    response_type: "code",
    redirect_uri: redirectUri,
    approval_prompt: "auto",
    scope: "read,activity:read_all",
  });

  res.writeHead(302, { Location: `https://www.strava.com/oauth/authorize?${params.toString()}` });
  res.end();
}
