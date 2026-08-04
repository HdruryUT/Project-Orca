// Inline orca mark — no external image needed, scales crisply, works offline.
export default function OrcaLogo({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label="Orca logo">
      <defs>
        <linearGradient id="orcaSea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3f93e8" />
          <stop offset="1" stopColor="#123a63" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="32" fill="url(#orcaSea)" />
      <g>
        {/* tail stock + flukes */}
        <path fill="#0b1720" d="M17 31 C12 30 8 28 5 24 C7 29 8 31 8.5 32 C8 33 7 36 5 40 C9 37 13 34 17 33 Z" />
        {/* dorsal fin (tall, upright) */}
        <path fill="#0b1720" d="M30 24 C29.5 15 30 9 31 6 C33 9.5 35 16 37.5 24 Z" />
        {/* pectoral fin */}
        <path fill="#0b1720" d="M39 41 C39.5 46 37 49.5 33 51 C35.5 46 35.5 43 37.5 40.5 Z" />
        {/* body */}
        <path fill="#0b1720" d="M16 30 C16 24 24 22 33 22 C44 22 52 27 57 33 C56.5 34.5 55.5 35.5 54 36.5 C49 41 42 43 34 43 C25 43 18 40 16 34 C15.4 32.7 15.4 31.3 16 30 Z" />
        {/* white belly */}
        <path fill="#eef4fb" d="M20 39 C28 43.5 40 43.5 50 38 C47.5 41.5 43 43.5 38 43.8 C31 44.3 24.5 42.5 20 39 Z" />
        {/* saddle patch */}
        <ellipse cx="27" cy="27" rx="3" ry="1.6" fill="#9fc4e8" opacity="0.55" transform="rotate(-8 27 27)" />
        {/* white eye patch */}
        <ellipse cx="48" cy="29.5" rx="3.1" ry="1.9" fill="#eef4fb" transform="rotate(-18 48 29.5)" />
        {/* eye */}
        <circle cx="49.4" cy="30.4" r="1.15" fill="#0b1720" />
      </g>
    </svg>
  );
}
