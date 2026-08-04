import { RACE_DAY } from "../data/nutrition.js";

export default function RaceDayTab() {
  return (
    <div className="card">
      <h2>Race Week &amp; Fueling</h2>
      <div className="sub">Everything from carb-load to the finish line. Rehearse the fueling on your Week 6–8 long runs.</div>
      {RACE_DAY.map((block) => (
        <div key={block.section}>
          <div className="section-title">{block.section}</div>
          <table className="grid">
            <tbody>
              {block.rows.map((r) => (
                <tr key={r.when}>
                  <td className="when" style={{ width: "22%" }}>{r.when}</td>
                  <td>{r.what}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      <div className="callout" style={{ marginTop: 16 }}>
        Rehearse it: practice this exact fueling — breakfast, gels, drink — on your long runs so race day has zero
        surprises. Your gut can be trained just like your legs.
      </div>
    </div>
  );
}
