import { useState } from "react";
import { RACE_DATE } from "./data/plan.js";
import { computeZones } from "./utils/paces.js";
import { useLocalStorage } from "./hooks/useLocalStorage.js";
import ScheduleTab from "./components/ScheduleTab.jsx";
import EatingTab from "./components/EatingTab.jsx";
import GroceryTab from "./components/GroceryTab.jsx";
import RaceDayTab from "./components/RaceDayTab.jsx";
import GearTab from "./components/GearTab.jsx";
import SettingsTab from "./components/SettingsTab.jsx";

const TABS = [
  { id: "schedule", label: "🏃 Schedule" },
  { id: "eating", label: "🥗 Eating" },
  { id: "grocery", label: "🛒 Grocery" },
  { id: "raceday", label: "🏁 Race Day" },
  { id: "gear", label: "🎽 Gear" },
  { id: "paces", label: "⚙️ Paces & Strava" },
];

function daysUntilRace() {
  const race = new Date(RACE_DATE + "T00:00:00");
  const now = new Date();
  return Math.max(0, Math.ceil((race - now) / (24 * 3600 * 1000)));
}

export default function App() {
  const [tab, setTab] = useState("schedule");
  const [effort, setEffort] = useLocalStorage("orca.effort", null);
  const zones = computeZones(effort);
  const days = daysUntilRace();

  return (
    <div className="app">
      <header className="header">
        <h1>Project Orca — Marathon</h1>
        <div className="meta">
          <span>🗓 Race day: <b>Sunday, October 11, 2026</b></span>
          <span className="countdown">{days} days to go</span>
          <span>{zones ? "Paces personalized ✓" : "Paces not set — see the Paces tab"}</span>
        </div>
      </header>

      <nav className="tabs">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`tab-btn ${tab === t.id ? "active" : ""}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      {tab === "schedule" && <ScheduleTab zones={zones} />}
      {tab === "eating" && <EatingTab />}
      {tab === "grocery" && <GroceryTab />}
      {tab === "raceday" && <RaceDayTab />}
      {tab === "gear" && <GearTab />}
      {tab === "paces" && <SettingsTab effort={effort} onSetEffort={setEffort} />}

      <div className="footer">Project Orca · local training companion · your data stays in this browser</div>
    </div>
  );
}
