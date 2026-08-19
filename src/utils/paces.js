// Pace engine — turns a recent representative effort into personalized training paces.
// Uses Riegel's endurance model to predict race times across distances, then derives
// training zones from those predictions. All paces are in seconds per mile internally.

const MARATHON_MI = 26.2188;
const HALF_MI = 13.1094;
const FIVEK_MI = 3.10686;
const RIEGEL_EXP = 1.06;

// Predict the time (s) for `toMiles` given a known effort of `fromTime` s over `fromMiles`.
export function riegelPredict(fromMiles, fromTime, toMiles) {
  return fromTime * Math.pow(toMiles / fromMiles, RIEGEL_EXP);
}

// Format seconds-per-mile as "m:ss".
export function fmtPace(secPerMile) {
  if (!isFinite(secPerMile) || secPerMile <= 0) return "—";
  const total = Math.round(secPerMile);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

// Format a finish time in seconds as "h:mm:ss".
export function fmtDuration(sec) {
  if (!isFinite(sec) || sec <= 0) return "—";
  const total = Math.round(sec);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function range(lo, hi) {
  return `${fmtPace(lo)}–${fmtPace(hi)}`;
}

// Given a representative effort {miles, seconds}, compute all zones + predicted marathon.
export function computeZones(effort) {
  if (!effort || !effort.miles || !effort.seconds) return null;
  const { miles, seconds } = effort;

  const maraTime = riegelPredict(miles, seconds, MARATHON_MI);
  const mp = maraTime / MARATHON_MI;

  const halfTime = riegelPredict(miles, seconds, HALF_MI);
  const hp = halfTime / HALF_MI;

  const fiveKTime = riegelPredict(miles, seconds, FIVEK_MI);
  const fp = fiveKTime / FIVEK_MI;

  const zones = {
    easy: { label: "Easy", lo: mp + 60, hi: mp + 90 },
    recovery: { label: "Recovery", lo: mp + 90, hi: mp + 120 },
    long: { label: "Long", lo: mp + 45, hi: mp + 75 },
    marathon: { label: "Goal marathon", lo: mp - 5, hi: mp + 5 },
    halfmarathon: { label: "Goal half marathon", lo: hp - 5, hi: hp + 5 },
    tempo: { label: "Threshold / tempo", lo: hp - 5, hi: hp + 10 },
    intervals: { label: "Interval (5K effort)", lo: fp - 5, hi: fp + 5 },
    shakeout: { label: "Shakeout", lo: mp + 75, hi: mp + 105 },
  };

  return {
    zones,
    marathonSeconds: maraTime,
    marathonPace: mp,
    source: effort.source || "manual",
    basedOn: effort,
  };
}

export function zonePace(zones, key) {
  if (!zones) return null;
  const z = zones.zones[key];
  if (!z) return null;
  return { label: z.label, text: range(z.lo, z.hi), lo: z.lo, hi: z.hi };
}

export function zoneForWorkout(type) {
  switch (type) {
    case "easy": return "easy";
    case "recovery": return "recovery";
    case "long": return "long";
    case "tempo": return "tempo";
    case "intervals": return "intervals";
    case "shakeout": return "shakeout";
    case "race": return "marathon";
    case "halfmarathon": return "halfmarathon";
    default: return null;
  }
}

export function effortFromManual(miles, timeStr, source = "manual") {
  const parts = String(timeStr).split(":").map(Number);
  if (parts.some(isNaN) || !miles) return null;
  let sec = 0;
  if (parts.length === 3) sec = parts[0] * 3600 + parts[1] * 60 + parts[2];
  else if (parts.length === 2) sec = parts[0] * 60 + parts[1];
  else sec = parts[0];
  if (sec <= 0) return null;
  return { miles: Number(miles), seconds: sec, source };
}

export const DISTANCE_PRESETS = [
  { label: "5K", miles: FIVEK_MI },
  { label: "10K", miles: 6.21371 },
  { label: "10 miles", miles: 10 },
  { label: "Half marathon", miles: HALF_MI },
  { label: "Custom", miles: null },
];
