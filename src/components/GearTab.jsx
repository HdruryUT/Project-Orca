import { GEAR } from "../data/nutrition.js";
import { useLocalStorage } from "../hooks/useLocalStorage.js";

export default function GearTab() {
  const [checked, setChecked] = useLocalStorage("orca.gear", {});
  const allItems = GEAR.flatMap((g) => g.items.map((i) => `${g.group}::${i.name}`));
  const doneCount = allItems.filter((k) => checked[k]).length;
  const toggle = (key) => setChecked((c) => ({ ...c, [key]: !c[key] }));

  return (
    <div className="card">
      <h2>Race Day Gear</h2>
      <div className="sub">Head-to-toe checklist. Everything tested on a training run first — nothing new on race day.</div>
      <div className="progress">
        <b>{doneCount}</b> / {allItems.length} packed &amp; tested
        <button className="btn ghost small" style={{ marginLeft: 12 }} onClick={() => setChecked({})}>
          Clear all
        </button>
      </div>
      {GEAR.map((g) => (
        <div className="check-group" key={g.group}>
          <h3>{g.group}</h3>
          {g.items.map((item) => {
            const key = `${g.group}::${item.name}`;
            const done = !!checked[key];
            return (
              <label className={`check ${done ? "done" : ""}`} key={key}>
                <input type="checkbox" checked={done} onChange={() => toggle(key)} />
                <span>
                  <span className="name">{item.name}</span>
                  <br />
                  <span className="note">{item.note}</span>
                </span>
              </label>
            );
          })}
        </div>
      ))}
    </div>
  );
}
