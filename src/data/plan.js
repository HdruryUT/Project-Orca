// 10-week marathon training plan — Project Orca
// Race day: Sunday, October 11, 2026. Plan starts Monday, August 3, 2026.
// Each day: { type, miles, label, note?, reps? }
// type drives which pace zone is shown: easy | recovery | long | tempo | intervals | shakeout | race | rest | xt
// `tempoMiles` / `reps` describe the quality portion of a workout.

export const RACE_DATE = "2026-10-11";
export const PLAN_START = "2026-08-03";

export const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const rest = { type: "rest", miles: 0, label: "Rest" };
const xt = { type: "xt", miles: 0, label: "Rest / Cross-train" };

export const PLAN = [
  {
    week: 1, dates: "Aug 3–9", phase: "Base", focus: "Ease in, find your rhythm",
    days: {
      Mon: rest,
      Tue: { type: "easy", miles: 4, label: "Easy 4 + strides", strides: 4 },
      Wed: { type: "tempo", miles: 5, tempoMiles: 3, label: "Tempo 5 (3 @ threshold)" },
      Thu: { type: "easy", miles: 4, label: "Easy 4" },
      Fri: xt,
      Sat: { type: "long", miles: 10, label: "Long 10" },
      Sun: { type: "recovery", miles: 3, label: "Recovery 3" },
    },
  },
  {
    week: 2, dates: "Aug 10–16", phase: "Base", focus: "Build the base",
    days: {
      Mon: rest,
      Tue: { type: "easy", miles: 5, label: "Easy 5 + strides", strides: 4 },
      Wed: { type: "tempo", miles: 6, tempoMiles: 4, label: "Tempo 6 (4 @ threshold)" },
      Thu: { type: "easy", miles: 4, label: "Easy 4" },
      Fri: xt,
      Sat: { type: "long", miles: 12, label: "Long 12" },
      Sun: { type: "recovery", miles: 3, label: "Recovery 3" },
    },
  },
  {
    week: 3, dates: "Aug 17–23", phase: "Build", focus: "Add some speed",
    days: {
      Mon: rest,
      Tue: { type: "intervals", miles: 5, reps: "6 × 400m", label: "Intervals 5 (6 × 400m)" },
      Wed: { type: "easy", miles: 6, label: "Easy 6" },
      Thu: { type: "easy", miles: 5, label: "Easy 5" },
      Fri: xt,
      Sat: { type: "long", miles: 14, label: "Long 14" },
      Sun: { type: "recovery", miles: 4, label: "Recovery 4" },
    },
  },
  {
    week: 4, dates: "Aug 24–30", phase: "Cutback", focus: "Cutback — absorb & recover",
    days: {
      Mon: rest,
      Tue: { type: "easy", miles: 4, label: "Easy 4" },
      Wed: { type: "tempo", miles: 5, tempoMiles: 3, label: "Tempo 5 (3 @ threshold)" },
      Thu: { type: "easy", miles: 4, label: "Easy 4" },
      Fri: xt,
      Sat: { type: "long", miles: 11, label: "Long 11" },
      Sun: { type: "recovery", miles: 3, label: "Recovery 3" },
    },
  },
  {
    week: 5, dates: "Aug 31–Sep 6", phase: "Build", focus: "Push the long run",
    days: {
      Mon: rest,
      Tue: { type: "easy", miles: 6, label: "Easy 6 + strides", strides: 5 },
      Wed: { type: "tempo", miles: 7, tempoMiles: 5, label: "Tempo 7 (5 @ threshold)" },
      Thu: { type: "easy", miles: 5, label: "Easy 5" },
      Fri: xt,
      Sat: { type: "long", miles: 15, label: "Long 15" },
      Sun: { type: "recovery", miles: 4, label: "Recovery 4" },
    },
  },
  {
    week: 6, dates: "Sep 7–13", phase: "Build", focus: "Biggest build yet",
    days: {
      Mon: rest,
      Tue: { type: "intervals", miles: 6, reps: "8 × 400m", label: "Intervals 6 (8 × 400m)" },
      Wed: { type: "easy", miles: 7, label: "Easy 7" },
      Thu: { type: "easy", miles: 5, label: "Easy 5" },
      Fri: xt,
      Sat: { type: "long", miles: 17, label: "Long 17" },
      Sun: { type: "recovery", miles: 4, label: "Recovery 4" },
    },
  },
  {
    week: 7, dates: "Sep 14–20", phase: "Peak", focus: "Peak endurance",
    days: {
      Mon: rest,
      Tue: { type: "easy", miles: 6, label: "Easy 6 + strides", strides: 5 },
      Wed: { type: "tempo", miles: 8, tempoMiles: 6, label: "Tempo 8 (6 @ threshold)" },
      Thu: { type: "easy", miles: 5, label: "Easy 5" },
      Fri: xt,
      Sat: { type: "long", miles: 18, label: "Long 18" },
      Sun: { type: "recovery", miles: 4, label: "Recovery 4" },
    },
  },
  {
    week: 8, dates: "Sep 21–27", phase: "Peak", focus: "Peak week — the 20-miler",
    days: {
      Mon: rest,
      Tue: { type: "easy", miles: 6, label: "Easy 6" },
      Wed: { type: "tempo", miles: 8, tempoMiles: 6, label: "Tempo 8 (6 @ threshold)" },
      Thu: { type: "easy", miles: 5, label: "Easy 5" },
      Fri: xt,
      Sat: { type: "long", miles: 20, label: "Long 20" },
      Sun: { type: "recovery", miles: 4, label: "Recovery 4" },
    },
  },
  {
    week: 9, dates: "Sep 28–Oct 4", phase: "Taper", focus: "Taper — trim volume, keep sharp",
    days: {
      Mon: rest,
      Tue: { type: "easy", miles: 5, label: "Easy 5 + strides", strides: 4 },
      Wed: { type: "tempo", miles: 6, tempoMiles: 4, label: "Tempo 6 (4 @ threshold)" },
      Thu: { type: "easy", miles: 4, label: "Easy 4" },
      Fri: xt,
      Sat: { type: "long", miles: 13, label: "Long 13" },
      Sun: { type: "recovery", miles: 3, label: "Recovery 3" },
    },
  },
  {
    week: 10, dates: "Oct 5–11", phase: "Race week", focus: "Race week — rest, fuel, run",
    days: {
      Mon: rest,
      Tue: { type: "easy", miles: 4, label: "Easy 4" },
      Wed: { type: "easy", miles: 3, label: "Easy 3 + strides", strides: 4 },
      Thu: rest,
      Fri: { type: "shakeout", miles: 2, label: "Shakeout 2" },
      Sat: rest,
      Sun: { type: "race", miles: 26.2, label: "🏁 RACE — 26.2" },
    },
  },
];

export function weeklyMiles(week) {
  return Object.values(week.days).reduce((s, d) => s + (d.miles || 0), 0);
}

// Phase → accent color used across the UI
export const PHASE_COLOR = {
  Base: "#2A9D8F",
  Build: "#2A9D8F",
  Cutback: "#E9C46A",
  Peak: "#E76F51",
  Taper: "#E9C46A",
  "Race week": "#E76F51",
};
