import { useState } from "react";
import { RACE_DAY, RACE_PACING } from "../data/nutrition.js";
import { useLocalStorage } from "../hooks/useLocalStorage.js";

const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5 MB

function CourseMapCard() {
  const [mapImage, setMapImage] = useLocalStorage("orca.courseMapImage", null);
  const [error, setError] = useState(null);

  function handleFile(e) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("That file isn't an image — try a PNG, JPG, or similar.");
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setError("That image is over 5 MB — try a cropped screenshot instead.");
      return;
    }
    setError(null);
    const reader = new FileReader();
    reader.onload = () => setMapImage({ src: reader.result, name: file.name });
    reader.onerror = () => setError("Couldn't read that image — try again.");
    reader.readAsDataURL(file);
  }

  return (
    <div className="card">
      <h2>Course Map</h2>
      <div className="sub">Upload a screenshot of the course map or elevation profile to keep it handy on race day.</div>

      {error && <div className="banner warn">{error}</div>}

      {mapImage ? (
        <div className="map-preview">
          <img src={mapImage.src} alt={mapImage.name || "Course map"} />
          <div className="btn-row" style={{ marginTop: 10 }}>
            <label className="btn ghost small" style={{ cursor: "pointer" }}>
              Replace
              <input type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />
            </label>
            <button className="btn ghost small" onClick={() => setMapImage(null)}>Remove</button>
            <a className="btn ghost small" href={mapImage.src} download={mapImage.name || "course-map.png"}>
              Download ↓
            </a>
          </div>
        </div>
      ) : (
        <label className="btn ghost" style={{ cursor: "pointer", display: "inline-block" }}>
          Upload image…
          <input type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />
        </label>
      )}
      <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 8 }}>Stored only in this browser (up to 5 MB).</div>
    </div>
  );
}

export default function RaceDayTab() {
  return (
    <div>
      <CourseMapCard />

      <div className="card">
        <h2>Race Pacing Plan</h2>
        <div className="sub">{RACE_PACING.intro}</div>
        <table className="grid">
          <tbody>
            {RACE_PACING.sections.map((s) => (
              <tr key={s.range}>
                <td style={{ width: "26%" }}>
                  <b>{s.range}</b>
                  <div className="muted" style={{ fontSize: 12 }}>{s.terrain}</div>
                </td>
                <td>{s.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="callout" style={{ marginTop: 16 }}>{RACE_PACING.summary}</div>
      </div>

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
          Rehearse it: practice this exact fueling — pre-run snack, gels, drink — on your long runs so race day has
          zero surprises. Your gut can be trained just like your legs.
        </div>
      </div>
    </div>
  );
}
