import React from "react";

const Marquee: React.FC = () => {
  const items = [
    "✦ FULL STACK",
    "✦ DEVELOPER",
    "✦ SYED HASSAN",
    "✦ OPEN TO WORK",
    "✦ REACT",
    "✦ NODE.JS",
    "✦ TYPESCRIPT",
    "✦ UI/UX DESIGN",
    "✦ WEB3",
  ];

  return (
    <div
      className="relative overflow-hidden py-3 my-0"
      style={{
        background: "rgba(108,99,255,0.05)",
        borderTop: "1px solid rgba(108,99,255,0.15)",
        borderBottom: "1px solid rgba(108,99,255,0.15)",
      }}
    >
      {/* Fading edges — use transparent so it works in both themes */}
      <div
        className="absolute left-0 top-0 bottom-0 w-20 z-10"
        style={{ background: "linear-gradient(to right, var(--marquee-fade, transparent), transparent)" }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-20 z-10"
        style={{ background: "linear-gradient(to left, var(--marquee-fade, transparent), transparent)" }}
      />

      {/* Marquee content — duplicated for seamless loop */}
      <div className="animate-marquee flex whitespace-nowrap select-none">
        {Array(2)
          .fill(null)
          .map((_, i) => (
            <div key={i} className="flex">
              {items.map((item, j) => (
                <span
                  key={j}
                  className="mx-6 text-xs font-bold tracking-[0.22em]"
                  style={{
                    color: j % 2 === 0 ? "rgba(108,99,255,0.85)" : "rgba(0,212,255,0.75)",
                    fontFamily: "'Plus Jakarta Sans', Inter, sans-serif",
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Marquee;
