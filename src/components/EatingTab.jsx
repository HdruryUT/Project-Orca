import { EATING_SCHEDULE } from "../data/nutrition.js";

export default function EatingTab() {
  const { intro, rows, principles } = EATING_SCHEDULE;
  return (
    <div className="card">
      <h2>Eating Schedule</h2>
      <div className="sub">{intro}</div>
      <table className="grid">
        <thead>
          <tr>
            <th style={{ width: "18%" }}>When</th>
            <th>Normal training day</th>
            <th>Long-run day (Sat)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.when}>
              <td className="when">{r.when}</td>
              <td>{r.normal}</td>
              <td>{r.long}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="callout" style={{ marginTop: 16 }}>{principles}</div>
    </div>
  );
}
