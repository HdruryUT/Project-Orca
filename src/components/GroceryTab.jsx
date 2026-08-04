import { GROCERY } from "../data/nutrition.js";
import { useLocalStorage } from "../hooks/useLocalStorage.js";

export default function GroceryTab() {
  const [checked, setChecked] = useLocalStorage("orca.grocery", {});
  const allItems = GROCERY.flatMap((g) => g.items.map((i) => `${g.group}::${i}`));
  const doneCount = allItems.filter((k) => checked[k]).length;

  const toggle = (key) => setChecked((c) => ({ ...c, [key]: !c[key] }));
  const clearAll = () => setChecked({});

  return (
    <div className="card">
      <h2>Grocery List</h2>
      <div className="sub">A runner's staple shop, organized by aisle. Checks are saved on this device.</div>
      <div className="progress">
        <b>{doneCount}</b> / {allItems.length} in the cart
        <button className="btn ghost small" style={{ marginLeft: 12 }} onClick={clearAll}>
          Clear all
        </button>
      </div>
      <div className="grocery-cols">
        {GROCERY.map((g) => (
          <div className="check-group" key={g.group}>
            <h3>{g.group}</h3>
            {g.items.map((item) => {
              const key = `${g.group}::${item}`;
              const done = !!checked[key];
              return (
                <label className={`check ${done ? "done" : ""}`} key={key}>
                  <input type="checkbox" checked={done} onChange={() => toggle(key)} />
                  <span className="name">{item}</span>
                </label>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
