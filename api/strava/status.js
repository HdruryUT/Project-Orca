// Lets the frontend check connection state without ever touching the httpOnly cookie itself.
import { getRefreshToken } from "../_lib/strava.js";

export default function handler(req, res) {
  res.status(200).json({ connected: Boolean(getRefreshToken(req)) });
}
