import { useEffect, useState } from "react";

export default function ScrollProgressCircle() {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollPercent(Math.round(scrolled));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const r = 22;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (scrollPercent / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      style={{
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        zIndex: 50,
        width: 56,
        height: 56,
        borderRadius: "50%",
        background: "rgba(17,17,24,0.9)",
        border: "1px solid rgba(108,99,255,0.2)",
        backdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        boxShadow: "0 0 20px rgba(108,99,255,0.2)",
        transition: "box-shadow 0.3s ease",
        opacity: scrollPercent > 3 ? 1 : 0,
        pointerEvents: scrollPercent > 3 ? "auto" : "none",
      }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLButtonElement).style.boxShadow =
          "0 0 30px rgba(108,99,255,0.5)")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLButtonElement).style.boxShadow =
          "0 0 20px rgba(108,99,255,0.2)")
      }
    >
      <svg width="52" height="52" viewBox="0 0 52 52" style={{ position: "absolute" }}>
        <defs>
          <linearGradient id="scrollGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6c63ff" />
            <stop offset="100%" stopColor="#00d4ff" />
          </linearGradient>
        </defs>
        {/* Track */}
        <circle
          cx="26"
          cy="26"
          r={r}
          fill="none"
          stroke="rgba(108,99,255,0.12)"
          strokeWidth="3"
        />
        {/* Progress */}
        <circle
          cx="26"
          cy="26"
          r={r}
          fill="none"
          stroke="url(#scrollGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 26 26)"
          style={{ transition: "stroke-dashoffset 0.1s ease" }}
        />
      </svg>
      {/* Up arrow */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#6c63ff"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ position: "relative", zIndex: 1 }}
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
}
