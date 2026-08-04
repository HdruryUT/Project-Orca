// App logo — the running-orca badge (white background removed, transparent PNG).
import logoUrl from "../assets/orca-logo.png";

export default function OrcaLogo({ size = 44 }) {
  return (
    <img
      src={logoUrl}
      width={size}
      height={size}
      alt="Project Orca logo"
      style={{ display: "block", borderRadius: "50%" }}
    />
  );
}
