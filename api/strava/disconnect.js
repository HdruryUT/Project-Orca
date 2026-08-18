import { clearRefreshCookie } from "../_lib/strava.js";

export default function handler(req, res) {
  clearRefreshCookie(res);
  res.status(200).json({ disconnected: true });
}
