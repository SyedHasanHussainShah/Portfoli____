import { useState, useEffect } from "react";

export default function AnimatedName() {
  const name = "Syed Hassan";
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 120;

    const timer = setTimeout(() => {
      setText((prev) =>
        isDeleting
          ? name.substring(0, prev.length - 1)
          : name.substring(0, prev.length + 1)
      );

      if (!isDeleting && text === name) {
        setTimeout(() => setIsDeleting(true), 2500);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting]);

  return (
    <h1 className="heading-xl">
      <span
        style={{
          display: "block",
          fontSize: "clamp(1.1rem, 3vw, 1.4rem)",
          fontWeight: 300,
          marginBottom: "0.35em",
          color: "rgba(148,163,184,0.85)",
          letterSpacing: "0.02em",
        }}
      >
        Hi, I'm
      </span>
      <span
        className="gradient-text"
        style={{ display: "block", minHeight: "1.1em" }}
      >
        {text}
        <span
          style={{
            display: "inline-block",
            width: "3px",
            height: "0.85em",
            background: "#6c63ff",
            marginLeft: "2px",
            verticalAlign: "middle",
            animation: "blink 1s step-end infinite",
          }}
        />
      </span>
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </h1>
  );
}
