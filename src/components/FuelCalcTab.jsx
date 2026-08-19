import { useState } from "react";
import { zonePace } from "../utils/paces.js";
import { currentPosition } from "../utils/schedule.js";
import {
  computeFuelPlan, HEAT_OPTIONS, SWEAT_OPTIONS, mlToOz, fmtHoursMinutes, parsePace, fmtPaceMinSec,
} from "../utils/fuel.js";
import { useLocalStorage } from "../hooks/useLocalStorage.js";

function defaultDistance() {
  const pos = currentPosition();
  const today = pos.today;
  return today && today.type === "long" && today.miles ? String(today.miles) : "10";
}

export default function FuelCalcTab({ zones }) {
  const longPace = zonePace(zones, "long");
  const [distance, setDistance] = useState(defaultDistance);
  const [paceStr, setPaceStr] = useState(() => (longPace ? fmtPaceMinSec((longPace.lo + longPace.hi) / 2) : ""));
  const [weight, setWeight] = useLocalStorage("orca.bodyWeightLbs", "");
  const [heat, setHeat] = useState("moderate");
  const [sweat, setSweat] = useState("average");

  const distanceMiles = Number(distance);
  const paceSecPerMile = parsePace(paceStr);
  const weightLbs = Number(weight);

  const valid = distanceMiles > 0 && paceSecPerMile && weightLbs > 0;
  const plan = valid ? computeFuelPlan({ distanceMiles, paceSecPerMile, weightLbs, heat, sweat }) : null;

  const carbMid = plan ? (plan.carb.totalLo + plan.carb.totalHi) / 2 : 0;
  const gels = plan ? Math.round(carbMid / 23) : 0;
  const caps = plan ? Math.round(plan.sodium.totalMg / 300) : 0;
  const fluidOz = plan ? Math.round(mlToOz(plan.fluid.totalMl)) : 0;
  const fluidOzPerHour = plan ? Math.round(mlToOz(plan.fluid.perHourMl)) : 0;

  return (
    <div>
      <div className="card">
        <h2>Long-Run Fuel Calculator</h2>
        <div className="sub">
          Carb, fluid, and sodium targets for a run, based on distance, pace, body weight, heat, and sweat rate.
        </div>

        <div className="fuel-inputs">
          <div className="field">
            <label>Distance (miles)</label>
            <input className="input" type="number" min="0" step="0.1" value={distance} onChange={(e) => setDistance(e.target.value)} />
          </div>
          <div className="field">
            <label>Pace (min:sec / mile)</label>
            <input className="input" placeholder="e.g. 9:30" value={paceStr} onChange={(e) => setPaceStr(e.target.value)} />
            {longPace && <div className="hint">Prefilled from your Long pace — edit if this run is different.</div>}
          </div>
          <div className="field">
            <label>Body weight (lbs)</label>
            <input className="input" type="number" min="0" placeholder="e.g. 165" value={weight} onChange={(e) => setWeight(e.target.value)} />
          </div>
          <div className="field">
            <label>Conditions</label>
            <select className="select" value={heat} onChange={(e) => setHeat(e.target.value)}>
              {HEAT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div className="field">
            <label>Sweat rate</label>
            <select className="select" value={sweat} onChange={(e) => setSweat(e.target.value)}>
              {SWEAT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        {!valid ? (
          <div className="banner warn" style={{ marginTop: 4 }}>
            Enter a distance, pace, and body weight to see your targets.
          </div>
        ) : (
          <>
            <div className="banner info" style={{ marginTop: 4 }}>
              <b>{fmtHoursMinutes(plan.durationHours)}</b> on the move at {paceStr}/mi over {distanceMiles} mi.
            </div>

            <div className="fuel-grid">
              <div className="stat">
                <div className="lbl">Carbs</div>
                <div className="big small">{plan.carb.perHourLo}–{plan.carb.perHourHi}<span className="of">g/hr</span></div>
                <div className="lbl">{Math.round(plan.carb.totalLo)}–{Math.round(plan.carb.totalHi)} g total · ~{gels} gels</div>
              </div>
              <div className="stat accent-teal">
                <div className="lbl">Fluid</div>
                <div className="big small">{fluidOzPerHour}<span className="of">oz/hr</span></div>
                <div className="lbl">~{fluidOz} oz total ({Math.round(plan.fluid.totalMl)} mL)</div>
              </div>
              <div className="stat accent-orange">
                <div className="lbl">Sodium</div>
                <div className="big small">{plan.sodium.perHourMg}<span className="of">mg/hr</span></div>
                <div className="lbl">{Math.round(plan.sodium.totalMg)} mg total · ~{caps} electrolyte caps</div>
              </div>
            </div>
          </>
        )}

        <div className="callout" style={{ marginTop: 16 }}>
          These are general starting points from standard endurance-nutrition ranges, not a prescription — sweat
          rate, gut tolerance, and heat acclimation vary a lot person to person. Rehearse whatever plan you land on
          during training long runs, well before race day, and adjust based on how you actually feel. Not medical
          advice.
        </div>
      </div>
    </div>
  );
}
