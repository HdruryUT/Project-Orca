import { useState } from "react";
import { weeklyMiles } from "../data/plan.js";

// Hand-rolled inline-SVG bar chart — emphasis form: one hue (the current week) +
// gray (every other week as context). No legend needed for a single series; the
// card's own title/subtitle name what's plotted. Colors are the app's existing
// CSS custom properties, so light/dark both fall out for free.

const VW = 720;
const VH = 210;
const PAD = { top: 26, right: 8, bottom: 28, left: 34 };
const BAR_MAX = 24; // cap — never fill the slot, let the leftover be air
const RADIUS = 4; // rounded top, square baseline

function niceMax(raw) {
  return Math.max(10, Math.ceil(raw / 10) * 10);
}

export default function MileageChart({ plan, activeWeekIndex = null }) {
  const [hover, setHover] = useState(null);

  const weeks = plan.map((w) => ({
    week: w.week,
    dates: w.dates,
    phase: w.phase,
    miles: weeklyMiles(w),
  }));

  const plotW = VW - PAD.left - PAD.right;
  const plotH = VH - PAD.top - PAD.bottom;
  const baselineY = PAD.top + plotH;
  const max = niceMax(Math.max(...weeks.map((w) => w.miles)));
  const slotW = plotW / weeks.length;
  const yFor = (v) => baselineY - (v / max) * plotH;

  const ticks = [0, max / 2, max];

  const hoveredWeek = hover != null ? weeks[hover] : null;
  const tw = 122;
  const th = 40;
  const hoverSlotX = hover != null ? PAD.left + hover * slotW : 0;
  const tipCx = hover != null
    ? Math.min(Math.max(hoverSlotX + slotW / 2, PAD.left + tw / 2 + 2), VW - PAD.right - tw / 2 - 2)
    : 0;
  const tipTopY = hover != null ? Math.max(2, yFor(hoveredWeek.miles) - th - 8) : 0;

  return (
    <svg
      viewBox={`0 0 ${VW} ${VH}`}
      style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}
      role="img"
      aria-label="Planned miles per week across the training plan"
    >
      {ticks.map((t) => (
        <g key={t}>
          <line x1={PAD.left} x2={VW - PAD.right} y1={yFor(t)} y2={yFor(t)} stroke="var(--line)" strokeWidth="1" />
          <text x={PAD.left - 6} y={yFor(t) + 3} textAnchor="end" fontSize="10" fill="var(--muted)">{t}</text>
        </g>
      ))}

      {weeks.map((w, i) => {
        const slotX = PAD.left + i * slotW;
        const barX = slotX + (slotW - BAR_MAX) / 2;
        const barTopY = yFor(w.miles);
        const barH = baselineY - barTopY;
        const r = Math.min(RADIUS, barH / 2, BAR_MAX / 2);
        const isActive = i === activeWeekIndex;
        const isHover = i === hover;
        const fill = isActive ? "var(--blue)" : "var(--muted)";

        return (
          <g key={w.week}>
            <rect x={barX} y={barTopY} width={BAR_MAX} height={barH} rx={r} ry={r} fill={fill} opacity={isActive ? 1 : 0.55} />
            {barH > r && (
              <rect x={barX} y={barTopY + r} width={BAR_MAX} height={Math.max(0, barH - r)} fill={fill} opacity={isActive ? 1 : 0.55} />
            )}
            {isHover && (
              <rect
                x={barX - 2} y={barTopY - 2} width={BAR_MAX + 4} height={barH + 2} rx={r + 2} ry={r + 2}
                fill="none" stroke="var(--ink)" strokeOpacity="0.35" strokeWidth="1.5"
              />
            )}
            {isActive && hover !== i && (
              <text x={slotX + slotW / 2} y={barTopY - 6} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--ink)">
                {w.miles}
              </text>
            )}
            <text x={slotX + slotW / 2} y={baselineY + 16} textAnchor="middle" fontSize="10" fill="var(--muted)">
              W{w.week}
            </text>

            {/* Generous hit target — the whole slot column, not just the thin bar */}
            <rect
              x={slotX} y={PAD.top} width={slotW} height={plotH}
              fill="transparent"
              tabIndex={0}
              role="button"
              aria-label={`Week ${w.week}, ${w.dates}, ${w.phase} phase, ${w.miles} miles planned`}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
              style={{ cursor: "pointer" }}
            />
          </g>
        );
      })}

      {hoveredWeek && (
        <g pointerEvents="none">
          <rect x={tipCx - tw / 2} y={tipTopY} width={tw} height={th} rx="8" fill="var(--solid)" />
          <text x={tipCx} y={tipTopY + 16} textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">
            Week {hoveredWeek.week} · {hoveredWeek.miles} mi
          </text>
          <text x={tipCx} y={tipTopY + 30} textAnchor="middle" fontSize="10" fill="#fff" opacity="0.85">
            {hoveredWeek.dates} · {hoveredWeek.phase}
          </text>
        </g>
      )}
    </svg>
  );
}
