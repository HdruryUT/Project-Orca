// Long-run fueling estimator — carbs, fluid, and sodium targets from standard
// endurance-nutrition guidance (ACSM/ISSN-style ranges), scaled by run duration,
// body weight, heat, and sweat rate. Starting points to rehearse and adjust,
// not a prescription — see the callout in FuelCalcTab.

const LB_PER_KG = 2.20462;

const HEAT_MULT = { cool: 0.85, moderate: 1.0, hot: 1.25 };

export const HEAT_OPTIONS = [
  { value: "cool", label: "Cool (< 60°F)" },
  { value: "moderate", label: "Moderate (60–75°F)" },
  { value: "hot", label: "Hot (> 75°F)" },
];

export const SWEAT_OPTIONS = [
  { value: "average", label: "Average sweater" },
  { value: "heavy", label: "Heavy / salty sweater" },
];

// Carb guidance tiers by duration (g/hour), per common endurance-nutrition ranges.
export function carbRatePerHour(durationHours) {
  if (durationHours < 1) return { lo: 0, hi: 30 };
  if (durationHours <= 2.5) return { lo: 30, hi: 60 };
  return { lo: 60, hi: 90 };
}

export function computeFuelPlan({ distanceMiles, paceSecPerMile, weightLbs, heat = "moderate", sweat = "average" }) {
  if (!distanceMiles || !paceSecPerMile || !weightLbs) return null;

  const durationHours = (distanceMiles * paceSecPerMile) / 3600;
  const heatMult = HEAT_MULT[heat] ?? 1;

  const carb = carbRatePerHour(durationHours);
  const carbTotalLo = carb.lo * durationHours;
  const carbTotalHi = carb.hi * durationHours;

  // Fluid: ~6 mL/kg body weight/hour baseline in moderate conditions, scaled for heat.
  const weightKg = weightLbs / LB_PER_KG;
  const fluidPerHourMl = Math.round((weightKg * 6 * heatMult) / 10) * 10;
  const fluidTotalMl = fluidPerHourMl * durationHours;

  // Sodium: average vs. heavy/salty sweater baseline, scaled for heat.
  const sodiumBase = sweat === "heavy" ? 700 : 400;
  const sodiumPerHourMg = Math.round((sodiumBase * heatMult) / 10) * 10;
  const sodiumTotalMg = sodiumPerHourMg * durationHours;

  return {
    durationHours,
    carb: { perHourLo: carb.lo, perHourHi: carb.hi, totalLo: carbTotalLo, totalHi: carbTotalHi },
    fluid: { perHourMl: fluidPerHourMl, totalMl: fluidTotalMl },
    sodium: { perHourMg: sodiumPerHourMg, totalMg: sodiumTotalMg },
  };
}

export function mlToOz(ml) {
  return ml / 29.5735;
}

export function fmtHoursMinutes(hours) {
  if (!isFinite(hours) || hours <= 0) return "—";
  const totalMin = Math.round(hours * 60);
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

// e.g. "1:45" -> 6300 (m:ss/mile as seconds); "9:30" -> 570
export function parsePace(str) {
  const parts = String(str).trim().split(":").map(Number);
  if (parts.length !== 2 || parts.some(isNaN)) return null;
  const [m, s] = parts;
  if (m < 0 || s < 0 || s >= 60) return null;
  const total = m * 60 + s;
  return total > 0 ? total : null;
}

export function fmtPaceMinSec(secPerMile) {
  if (!isFinite(secPerMile) || secPerMile <= 0) return "";
  const total = Math.round(secPerMile);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}
