import React, { useEffect, useRef, useState, useMemo } from "react";
import { Typewriter } from "react-simple-typewriter";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import AnimatedName from "./components/AnimatedName";
import ScrollProgressCircle from "./components/ScrollProgressCircle";
import {
  Download, Mail, Code2, Menu, X, Rocket, Clock, Copy, Check,
  ArrowRight, Zap, Layers, Sparkles, Globe, Star, ChevronRight, Sun, Moon,
} from "lucide-react";
import {
  FaBootstrap, FaReact, FaNodeJs, FaHtml5, FaCss3Alt,
  FaPython, FaGithub, FaLinkedin,
} from "react-icons/fa";
import {
  SiTailwindcss, SiMongodb, SiNextdotjs, SiExpress, SiTypescript,
  SiVite, SiCplusplus, SiSharp, SiOracle, SiFlask, SiThreedotjs,
  SiLinux, SiJavascript, SiFigma, SiGithub, SiGit,
} from "react-icons/si";
import { useInView as useScrollInView } from "react-intersection-observer";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import "./index.css";


/* ════════════════════════════ TYPES ════════════════════════════ */
interface Project {
  title: string;
  stack: string[];
  description: string;
  image: string;
  link: string;
  github?: string;
  category?: string;
}

/* ════════════════════════════ DATA ════════════════════════════ */
const PROFILE = {
  name: "Syed Hassan",
  fullName: "SYED HASSAN HUSSAIN SHAH",
  title: "Full-Stack Developer",
  location: "Gujranwala, Pakistan",
  email: "ssyedhassan667@gmail.com",
  github: "https://github.com/SyedHasanHussainShah",
  linkedin: "https://www.linkedin.com/in/syed-hassan-hussain-shah-a3351b2b5/",
};

const SKILL_ROTATION = [
  "React", "TypeScript", "Node.js", "Next.js", "Tailwind CSS",
  "Python", "Flask", "MongoDB", "Three.js", "Figma",
];

const PROJECTS: Project[] = [
  {
    title: "Islam 360",
    stack: ["React.js", "Vite", "Tailwind CSS", "Node.js", "Axios", "ShadCN UI", "Context API"],
    description: "A full‑featured Islamic utility app with prayer times, offline Dhikr, Tasbih counter, Islamic content, and an integrated AI chatbot trained on Islamic content. Deployed on Vercel.",
    image: "/Islam360.png",
    link: "https://islam-1xr3.vercel.app/",
    github: "https://github.com/SyedHasanHussainShah",
    category: "Full-Stack",
  },
  {
    title: "Spotify Clone",
    stack: ["React.js", "Vite", "Tailwind CSS", "Bootstrap", "JavaScript", "Spotify API"],
    description: "Spotify clone with dynamic playlists, real-time music streaming, and sleek UI powered by the Spotify API for authentic functionality.",
    image: "/Spotify.png",
    link: "https://my-spotify-clone.surge.sh/",
    github: "https://github.com/SyedHasanHussainShah",
    category: "Frontend",
  },
  {
    title: "Train Reservation System",
    stack: ["HTML", "Bootstrap", "Tailwind CSS", "JavaScript", "DB integration"],
    description: "Responsive booking platform with real‑time train data, secure ticket booking, cancellation, reminders, and account management. Optimized for mobile.",
    image: "/Train.png",
    link: "https://train-delta-bice.vercel.app/",
    github: "https://github.com/SyedHasanHussainShah",
    category: "Full-Stack",
  },
  {
    title: "ChainWallet DApp",
    stack: ["HTML", "CSS", "Tailwind", "JavaScript", "ethers.js", "QRCode.js", "OTPAuth", "Web3"],
    description: "Decentralized crypto wallet with MetaMask integration, ETH contract transfers, transaction history, 2FA security, contacts, and PDF/QR export; multi‑network support.",
    image: "/ChainVallet.png",
    link: "https://syedhasanhussainshah.github.io/bc/",
    github: "https://github.com/SyedHasanHussainShah",
    category: "Web3",
  },
  {
    title: "Drive Sense AI",
    stack: ["HTML", "Tailwind CSS", "Bootstrap", "Python", "Flask", "AI model training"],
    description: "AI-powered driving analysis with 92% hazard detection accuracy, adjustable sensitivity, and PDF/video reports using Flask & ML models.",
    image: "/DriveSense.png",
    link: "https://syedhasanhussainshah.github.io/Ai-project/",
    github: "https://github.com/SyedHasanHussainShah",
    category: "AI/ML",
  },
  {
    title: "Transpomate App",
    stack: ["C++", "DSA", "API", "HTML", "CSS", "JavaScript"],
    description: "Bus booking app to check availability, calculate distance, and estimate travel time with efficient algorithms and API integration.",
    image: "/Transpomate.png",
    link: "https://github.com/SyedHasanHussainShah/Transpomate-App-Admin-View-",
    github: "https://github.com/SyedHasanHussainShah/Transpomate-App-Admin-View-",
    category: "Full-Stack",
  },
  {
    title: "Pakistan Railway UI/UX",
    stack: ["Figma", "Figjam", "Stitch", "Claude"],
    description: "Redesigned Pakistan Railway website with improved UX, accessibility, and modern UI. Conducted user research, wireframing, and prototyping for a seamless booking experience.",
    image: "/Pak.png",
    link: "https://www.figma.com/design/86DQMPAYDyBMbs1pC4CBCw/",
    category: "Design",
  },
];

const EDUCATION = [
  {
    school: "University of Engineering and Technology Lahore — Gujranwala Campus",
    degree: "BSC Computer Science",
    period: "Expected Dec 2027",
    year: "2027",
    badge: "In Progress",
  },
  {
    school: "Punjab Colleges — Gujranwala",
    degree: "FSC Pre‑Engineering",
    period: "Dec 2023",
    year: "2023",
    badge: "Completed",
  },
];

const SKILLS_DATA = {
  Frontend: [
    { name: "HTML5", icon: <FaHtml5 className="text-orange-500" />, level: 95 },
    { name: "CSS3", icon: <FaCss3Alt className="text-blue-400" />, level: 90 },
    { name: "JavaScript", icon: <SiJavascript className="text-yellow-400" />, level: 75 },
    { name: "TypeScript", icon: <SiTypescript className="text-sky-500" />, level: 65 },
    { name: "React", icon: <FaReact className="text-sky-400" />, level: 82 },
    { name: "Next.js", icon: <SiNextdotjs />, level: 50 },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-400" />, level: 90 },
    { name: "Bootstrap", icon: <FaBootstrap className="text-purple-500" />, level: 85 },
    { name: "Three.js", icon: <SiThreedotjs className="text-blue-300" />, level: 40 },
    { name: "Vite", icon: <SiVite className="text-purple-400" />, level: 80 },
  ],
  Backend: [
    { name: "Node.js", icon: <FaNodeJs className="text-green-500" />, level: 80 },
    { name: "Express.js", icon: <SiExpress />, level: 48 },
    { name: "Python", icon: <FaPython className="text-yellow-400" />, level: 75 },
    { name: "Flask", icon: <SiFlask className="text-green-400" />, level: 60 },
    { name: "MongoDB", icon: <SiMongodb className="text-green-600" />, level: 70 },
    { name: "Oracle", icon: <SiOracle className="text-red-500" />, level: 70 },
  ],
  Tools: [
    { name: "C++", icon: <SiCplusplus className="text-sky-500" />, level: 80 },
    { name: "C#", icon: <SiSharp className="text-purple-400" />, level: 78 },
    { name: "Linux", icon: <SiLinux className="text-yellow-400" />, level: 70 },
    { name: "GitHub", icon: <SiGithub />, level: 85 },
    { name: "Git", icon: <SiGit className="text-red-500" />, level: 80 },
    { name: "Figma", icon: <SiFigma />, level: 75 },
    { name: "FigJam", icon: <SiFigma />, level: 70 },
  ],
};

const ALL_SKILLS_FLAT = [
  { name: "HTML5", icon: <FaHtml5 className="text-orange-500" /> },
  { name: "CSS3", icon: <FaCss3Alt className="text-blue-400" /> },
  { name: "JavaScript", icon: <SiJavascript className="text-yellow-400" /> },
  { name: "TypeScript", icon: <SiTypescript className="text-sky-500" /> },
  { name: "React", icon: <FaReact className="text-sky-400" /> },
  { name: "Next.js", icon: <SiNextdotjs /> },
  { name: "Tailwind", icon: <SiTailwindcss className="text-cyan-400" /> },
  { name: "Node.js", icon: <FaNodeJs className="text-green-500" /> },
  { name: "Python", icon: <FaPython className="text-yellow-400" /> },
  { name: "Flask", icon: <SiFlask className="text-green-400" /> },
  { name: "MongoDB", icon: <SiMongodb className="text-green-600" /> },
  { name: "C++", icon: <SiCplusplus className="text-sky-500" /> },
  { name: "Git", icon: <SiGit className="text-red-500" /> },
  { name: "Figma", icon: <SiFigma /> },
  { name: "Linux", icon: <SiLinux className="text-yellow-400" /> },
  { name: "Three.js", icon: <SiThreedotjs className="text-blue-300" /> },
  { name: "Vite", icon: <SiVite className="text-purple-400" /> },
  { name: "Bootstrap", icon: <FaBootstrap className="text-purple-500" /> },
];

const STATS = [
  { value: 6, suffix: "+", label: "Projects Built" },
  { value: 19, suffix: "+", label: "Technologies" },
  { value: 2, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Commitment" },
];

const NAV_LINKS = [
  { href: "#projects", label: "Work" },
  { href: "#education", label: "Education" },
  { href: "#skills", label: "Skills" },
  { href: "#looking-for", label: "Goals" },
  { href: "#resume", label: "Resume" },
  { href: "#contact", label: "Contact" },
];

/* ════════════════════════════ HOOKS ════════════════════════════ */
function useTheme(): [string, () => void] {
  const [theme, setTheme] = useState<string>(
    () => localStorage.getItem("theme") || "dark"
  );
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (theme === "dark") {
      root.classList.add("dark");
      body.classList.remove("light-mode");
      body.style.background = "#05050a";
      body.style.color = "#e8eaf0";
    } else {
      root.classList.remove("dark");
      body.classList.add("light-mode");
      body.style.background = "#f5f4ff";
      body.style.color = "#1a1830";
    }
    localStorage.setItem("theme", theme);
  }, [theme]);
  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  return [theme, toggle];
}

function useReveal() {
  const { ref, inView } = useScrollInView({ triggerOnce: true, threshold: 0.1 });
  const variants = useMemo(
    () => ({ hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0 } }),
    []
  );
  return { ref, variants, inView };
}

function useCounter(target: number, duration = 1500, startCounting = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!startCounting) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, startCounting]);
  return count;
}

/* ════════════════════════════ LOADER ════════════════════════════ */
function PageLoader({ done }: { done: boolean }) {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: "fixed", inset: 0, zIndex: 99999,
            background: "#05050a",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexDirection: "column", gap: 24,
          }}
        >
          {/* Logo mark */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
            }}
          >
            SYED HASSAN
          </motion.div>
          <div className="loader-ring" />
          {/* Progress line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            style={{ height: 1, background: "linear-gradient(90deg, #7c6cff, #00e5ff)", borderRadius: 999 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ════════════════════════════ CURSOR ════════════════════════════ */
const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [dotPos, setDotPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const onMove = (e: MouseEvent) => {
      setDotPos({ x: e.clientX, y: e.clientY });
    };
    const onEnter = () => setHovering(true);
    const onLeave = () => setHovering(false);
    window.addEventListener("mousemove", onMove);
    document.querySelectorAll("a, button, [role='button'], .proj-card").forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });
    return () => window.removeEventListener("mousemove", onMove);
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;
    let frame: number;
    const animate = () => {
      setPos((prev) => ({
        x: prev.x + (dotPos.x - prev.x) * 0.12,
        y: prev.y + (dotPos.y - prev.y) * 0.12,
      }));
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [dotPos, isMobile]);

  if (isMobile) return null;
  return (
    <>
      <div
        className={`cursor-ring ${hovering ? "hovering" : ""}`}
        style={{ transform: `translate(${pos.x - 18}px, ${pos.y - 18}px)` }}
      />
      <div
        className="cursor-dot"
        style={{ transform: `translate(${dotPos.x - 2.5}px, ${dotPos.y - 2.5}px)` }}
      />
    </>
  );
};

/* ════════════════════════════ NAVBAR ════════════════════════════ */
function Navbar({
  activeSection, navScrolled, isMenuOpen, setIsMenuOpen, isDark, toggleTheme,
}: {
  activeSection: string; navScrolled: boolean; isMenuOpen: boolean;
  setIsMenuOpen: (v: boolean) => void; isDark: boolean; toggleTheme: () => void;
}) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const iconBtn: React.CSSProperties = {
    background: "none",
    border: `1px solid ${isDark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.1)"}`,
    color: isDark ? "#e8eaf0" : "#1a1830",
    borderRadius: "50%", width: 36, height: 36, flexShrink: 0,
    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
    transition: "all 0.2s", touchAction: "manipulation", padding: 0,
  };

  return (
    <>
      <nav style={{ position: "fixed", top: 16, left: "50%", transform: "translateX(-50%)", zIndex: 1000, width: "calc(100% - 32px)", maxWidth: 900 }}>
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "10px 20px", borderRadius: 999,
            background: isDark ? "rgba(17,17,24,0.82)" : "rgba(255,255,255,0.82)",
            backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(108,99,255,0.2)",
            boxShadow: navScrolled ? "0 8px 40px rgba(0,0,0,0.35)" : "0 4px 24px rgba(0,0,0,0.2)",
            transition: "box-shadow 0.3s",
          }}
        >
          <a href="#home" style={{ textDecoration: "none", flexShrink: 0 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: "linear-gradient(135deg,#6c63ff,#00d4ff)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 15, color: "#fff", letterSpacing: "-0.5px", boxShadow: "0 0 14px rgba(108,99,255,0.5)" }}>SH</div>
          </a>

          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              {NAV_LINKS.map((link) => {
                const sId = link.href.replace("#", "");
                const active = activeSection === sId;
                return (
                  <a key={link.href} href={link.href} aria-current={active ? "page" : undefined}
                    className={`nav-link ${active ? "active" : ""}`}
                    style={{ padding: "6px 14px", borderRadius: 999, fontSize: 13, fontWeight: 600, textDecoration: "none", transition: "all 0.2s", color: isDark ? "rgba(241,245,249,0.8)" : "rgba(23,23,35,0.8)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#6c63ff"; (e.currentTarget as HTMLAnchorElement).style.background = "rgba(108,99,255,0.1)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = isDark ? "rgba(241,245,249,0.8)" : "rgba(23,23,35,0.8)"; (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
                  >{link.label}</a>
                );
              })}
            </div>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            {!isMobile && (
              <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" style={iconBtn} aria-label="GitHub"><FaGithub size={17} /></a>
            )}
            {!isMobile && (
              <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" style={iconBtn} aria-label="LinkedIn"><FaLinkedin size={17} style={{ color: "#0077b5" }} /></a>
            )}
            <button onClick={toggleTheme} aria-label="Toggle theme" style={{ ...iconBtn, overflow: "hidden" }}>
              <AnimatePresence mode="wait" initial={false}>
                {isDark ? (
                  <motion.div key="sun" initial={{ opacity: 0, y: 10, scale: 0.6 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.6 }} transition={{ duration: 0.25 }} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Sun size={16} style={{ color: "#fbbf24" }} />
                  </motion.div>
                ) : (
                  <motion.div key="moon" initial={{ opacity: 0, y: 10, scale: 0.6 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.6 }} transition={{ duration: 0.25 }} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Moon size={16} style={{ color: "#7c6cff" }} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
            {isMobile && (
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menu" style={iconBtn}>
                <AnimatePresence mode="wait" initial={false}>
                  {isMenuOpen ? (
                    <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }} style={{ display: "flex" }}><X size={16} /></motion.span>
                  ) : (
                    <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }} style={{ display: "flex" }}><Menu size={16} /></motion.span>
                  )}
                </AnimatePresence>
              </button>
            )}
          </div>
        </motion.div>

        <AnimatePresence>
          {isMenuOpen && isMobile && (
            <motion.div
              initial={{ opacity: 0, y: -16, scaleY: 0.9 }} animate={{ opacity: 1, y: 0, scaleY: 1 }} exit={{ opacity: 0, y: -16, scaleY: 0.9 }}
              transition={{ duration: 0.25 }}
              style={{ marginTop: 8, padding: "20px 24px", borderRadius: 24, background: isDark ? "rgba(10,10,18,0.97)" : "rgba(255,255,255,0.97)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(108,99,255,0.2)", boxShadow: "0 16px 48px rgba(0,0,0,0.3)", transformOrigin: "top center" }}
            >
              {NAV_LINKS.map((link, i) => (
                <motion.a key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                  style={{ display: "block", padding: "14px 4px", fontSize: 20, fontWeight: 700, color: isDark ? "#f1f5f9" : "#171723", textDecoration: "none", borderBottom: i < NAV_LINKS.length - 1 ? `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}` : "none", letterSpacing: "-0.02em", transition: "color 0.2s" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#6c63ff")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = isDark ? "#f1f5f9" : "#171723")}
                >{link.label}</motion.a>
              ))}
              <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
                <a href={PROFILE.github} target="_blank" rel="noreferrer" className="btn btn-glass" style={{ flex: 1, justifyContent: "center" }}><FaGithub size={14} /> GitHub</a>
                <a href={`mailto:${PROFILE.email}`} className="btn btn-brand" style={{ flex: 1, justifyContent: "center" }}><Mail size={14} /> Email</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}

/* ════════════════════════════ HERO ════════════════════════════ */
function Hero({ isDark }: { isDark: boolean }) {
  const { ref } = useReveal();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      id="home"
      ref={containerRef}
      style={{ minHeight: "100svh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", position: "relative", overflow: "hidden", paddingTop: "80px" }}
    >
      {/* Background glow blobs */}
      <div className="blob-a" style={{
        position: "absolute", top: "10%", left: "15%",
        width: "50vw", height: "50vw", maxWidth: 700, maxHeight: 700,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(124,108,255,0.16) 0%, transparent 65%)",
        filter: "blur(80px)", pointerEvents: "none",
      }} />
      <div className="blob-b" style={{
        position: "absolute", bottom: "5%", right: "10%",
        width: "40vw", height: "40vw", maxWidth: 600, maxHeight: 600,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,229,255,0.1) 0%, transparent 65%)",
        filter: "blur(80px)", pointerEvents: "none",
      }} />

      {/* Grid overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `
          linear-gradient(rgba(124,108,255,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(124,108,255,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px",
        maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
      }} />

      <motion.div
        ref={ref}
        style={{ y, opacity, position: "relative", zIndex: 10, textAlign: "center", padding: "0 clamp(16px, 5vw, 20px)", maxWidth: 1000, width: "100%" }}
      >
        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
          className="text-hero"
          style={{ marginBottom: 20 }}
        >
          <AnimatedName />
        </motion.h1>

        {/* Typewriter line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          style={{
            fontSize: "clamp(0.95rem, 3.5vw, 1.35rem)",
            color: isDark ? "rgba(200,205,220,0.6)" : "rgba(80,75,120,0.65)",
            marginBottom: 14, fontWeight: 400, letterSpacing: "-0.01em",
          }}
        >
          Working with{" "}
          <span style={{
            color: "#7c6cff", fontWeight: 600,
            borderBottom: "1px solid rgba(124,108,255,0.4)", paddingBottom: 2,
          }}>
            <Typewriter words={SKILL_ROTATION} loop={0} typeSpeed={65} deleteSpeed={35} delaySpeed={1500} />
          </span>
        </motion.div>

        {/* Descriptor */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{
            fontSize: "clamp(0.85rem, 3vw, 1.05rem)",
            color: isDark ? "rgba(200,205,220,0.5)" : "rgba(80,75,120,0.55)",
            maxWidth: 560, margin: "0 auto 32px", lineHeight: 1.75,
          }}
        >
          Full-stack developer from Gujranwala, Pakistan — crafting digital experiences that live at the intersection of{" "}
          <span style={{ color: "#7c6cff", fontWeight: 500 }}>elegant design</span> and{" "}
          <span style={{ color: "#00e5ff", fontWeight: 500 }}>robust engineering</span>.
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", alignItems: "center", marginBottom: 40 }}
        >
          <a href="#projects" className="btn btn-brand" style={{ fontSize: 14, padding: "13px 28px" }}>
            View my work <ArrowRight size={15} />
          </a>
          <a href="#contact" className="btn btn-glass" style={{ fontSize: 14, padding: "13px 28px" }}>
            Let's talk
          </a>
          <a
            href="https://drive.google.com/uc?export=download&id=113crhUwGj_f8VfkSnCUh__zPw9PJZfHb"
            target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13,
              color: isDark ? "rgba(200,205,220,0.5)" : "rgba(80,75,120,0.6)",
              textDecoration: "none", transition: "color 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#7c6cff")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = isDark ? "rgba(200,205,220,0.5)" : "rgba(80,75,120,0.6)")}
          >
            <Download size={13} /> Download CV
          </a>
        </motion.div>

        {/* Social links — mobile only */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="hero-socials"
          style={{ display: "flex", gap: 12, justifyContent: "center" }}
        >
          {[
            { href: PROFILE.github, icon: <FaGithub size={16} />, label: "GitHub" },
            { href: PROFILE.linkedin, icon: <FaLinkedin size={16} style={{ color: "#0077b5" }} />, label: "LinkedIn" },
          ].map((s) => (
            <motion.a
              key={s.label}
              href={s.href} target="_blank" rel="noopener noreferrer"
              aria-label={s.label}
              whileHover={{ y: -3 }}
              style={{
                width: 42, height: 42, borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: isDark ? "rgba(232,234,240,0.7)" : "rgba(26,24,48,0.6)",
                textDecoration: "none", transition: "box-shadow 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 20px rgba(124,108,255,0.4)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.boxShadow = "none")}
            >
              {s.icon}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="scroll-cue"
        style={{
          position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          color: "rgba(200,205,220,0.35)",
        }}
      >
        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase" }}>Scroll</span>
        <svg width="1" height="40" viewBox="0 0 1 40"><line x1="0.5" y1="0" x2="0.5" y2="40" stroke="currentColor" strokeWidth="1" strokeDasharray="4 3" /></svg>
      </motion.div>
    </section>
  );
}

/* ════════════════════════════ SKILL MARQUEE STRIP ════════════════════════════ */
function SkillStrip({ isDark }: { isDark: boolean }) {
  const items = [...ALL_SKILLS_FLAT, ...ALL_SKILLS_FLAT];
  return (
    <div style={{
      overflow: "hidden", padding: "28px 0",
      borderTop: "1px solid rgba(255,255,255,0.05)",
      borderBottom: "1px solid rgba(255,255,255,0.05)",
      background: isDark ? "rgba(124,108,255,0.03)" : "rgba(124,108,255,0.02)",
      position: "relative",
    }}>
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: 80, zIndex: 2,
        background: isDark
          ? "linear-gradient(to right, #05050a, transparent)"
          : "linear-gradient(to right, #f5f4ff, transparent)",
      }} />
      <div style={{
        position: "absolute", right: 0, top: 0, bottom: 0, width: 80, zIndex: 2,
        background: isDark
          ? "linear-gradient(to left, #05050a, transparent)"
          : "linear-gradient(to left, #f5f4ff, transparent)",
      }} />
      <div className="marquee-track">
        {items.map((skill, i) => (
          <span
            key={i}
            className="skill-chip"
            style={{ margin: "0 8px", fontSize: 12, cursor: "default" }}
          >
            <span style={{ fontSize: 15 }}>{skill.icon}</span>
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════ STATS ════════════════════════════ */
function StatsSection({ isDark }: { isDark: boolean }) {
  return (
    <section className="wrap" style={{ paddingTop: "clamp(3rem, 6vw, 5rem)", paddingBottom: "clamp(3rem, 6vw, 5rem)" }}>
      <div className="stats-grid" style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        gap: 1,
        borderRadius: 24,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(255,255,255,0.03)",
      }}>
        {STATS.map((stat, i) => {
          const ref = useRef<HTMLDivElement>(null);
          const inView = useInView(ref, { once: true, amount: 0.5 });
          const count = useCounter(stat.value, 1400, inView);
          return (
            <motion.div
              key={stat.label}
              ref={ref}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{
                padding: "clamp(24px, 4vw, 40px) clamp(16px, 3vw, 36px)",
                textAlign: "center",
                borderRight: i < STATS.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                background: "transparent",
              }}
            >
              <div style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "clamp(2.8rem, 5vw, 4rem)",
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: "-0.04em",
                background: "linear-gradient(135deg, #7c6cff, #00e5ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: 8,
              }}>
                {count}{stat.suffix}
              </div>
              <div style={{ fontSize: 13, color: isDark ? "rgba(200,205,220,0.45)" : "rgba(80,75,120,0.55)", fontWeight: 500 }}>
                {stat.label}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

/* ════════════════════════════ PROJECTS ════════════════════════════ */
function ProjectsSection({ isDark, setExpandedProject }: { isDark: boolean; setExpandedProject: (p: Project | null) => void }) {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const categories = ["All", "Full-Stack", "Frontend", "Web3", "AI/ML", "Design"];
  const filtered = activeFilter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="section-pad" style={{ padding: "7rem 0" }}>
      <div className="wrap">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
          style={{ marginBottom: 56 }}
        >
          <p className="eyebrow" style={{ marginBottom: 16 }}>Selected Work</p>
          <div className="section-header-row" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <h2 className="text-section">
              Projects that{" "}
              <span className="gx">ship.</span>
            </h2>
            <div className="filter-buttons">
              <div className="filter-buttons-inner">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    style={{
                      padding: "6px 14px", borderRadius: 99, fontSize: 12, fontWeight: 600,
                      background: activeFilter === cat ? "#7c6cff" : "rgba(255,255,255,0.05)",
                      border: `1px solid ${activeFilter === cat ? "#7c6cff" : "rgba(255,255,255,0.08)"}`,
                      color: activeFilter === cat ? "#fff" : isDark ? "rgba(200,205,220,0.6)" : "rgba(80,75,120,0.65)",
                      cursor: "pointer", transition: "all 0.2s",
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Featured — first project large */}
        {filtered[0] && (
          <motion.div
            layout
            key={filtered[0].title + "-featured"}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            onClick={() => setExpandedProject(filtered[0])}
            className="proj-card surface card-hover"
            style={{
              overflow: "hidden", marginBottom: 20, cursor: "pointer",
            }}
          >
            <div className="featured-project-grid" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr" }}>
              {/* Image */}
              <div className="featured-project-image" style={{ position: "relative", overflow: "hidden", minHeight: 380 }}>
                <img
                  src={filtered[0].image}
                  alt={filtered[0].title}
                  className="proj-img"
                  style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }}
                />
                <div className="proj-overlay" style={{ opacity: 1, background: "none" }}>
                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    padding: "5px 14px", borderRadius: 99,
                    background: "linear-gradient(135deg, #7c6cff, #00e5ff)",
                    fontSize: 10, fontWeight: 700, color: "#fff",
                    letterSpacing: "0.12em", textTransform: "uppercase",
                    boxShadow: "0 0 20px rgba(124,108,255,0.5)",
                  }}>
                    <Star size={10} /> Featured
                  </span>
                </div>
              </div>
              {/* Content */}
              <div className="featured-project-content" style={{ padding: "48px 44px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <p className="eyebrow" style={{ marginBottom: 14 }}>{filtered[0].category}</p>
                <h3 className="text-card-title" style={{
                  fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)",
                  fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 16, lineHeight: 1.1,
                }}>
                  {filtered[0].title}
                </h3>
                <p style={{
                  fontSize: 14, lineHeight: 1.75,
                  color: isDark ? "rgba(200,205,220,0.6)" : "rgba(80,75,120,0.65)",
                  marginBottom: 24,
                }}>
                  {filtered[0].description}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 32 }}>
                  {filtered[0].stack.slice(0, 5).map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                  {filtered[0].stack.length > 5 && <span className="tag">+{filtered[0].stack.length - 5}</span>}
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <a href={filtered[0].link} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}
                    className="btn btn-brand" style={{ fontSize: 13, padding: "10px 20px" }}>
                    <Globe size={13} /> Live Demo
                  </a>
                  {filtered[0].github && (
                    <a href={filtered[0].github} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}
                      className="btn btn-glass" style={{ fontSize: 13, padding: "10px 20px" }}>
                      <FaGithub size={13} /> Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Grid */}
        <div className="projects-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
          gap: 16,
        }}>
          {filtered.slice(1).map((p, idx) => (
            <motion.div
              layout
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: idx * 0.07, ease: [0.19, 1, 0.22, 1] }}
              onClick={() => setExpandedProject(p)}
              className="proj-card surface card-hover"
              style={{ borderRadius: 22, overflow: "hidden", cursor: "pointer" }}
            >
              {/* Image */}
              <div style={{ position: "relative", overflow: "hidden", height: 220 }}>
                <img src={p.image} alt={p.title} className="proj-img" style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
                <div className="proj-overlay">
                  <div style={{ display: "flex", gap: 8 }}>
                    <a href={p.link} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}
                      style={{
                        display: "inline-flex", alignItems: "center", gap: 5, padding: "7px 14px", borderRadius: 8,
                        background: "rgba(124,108,255,0.9)", color: "#fff", fontSize: 12, fontWeight: 700,
                        textDecoration: "none", backdropFilter: "blur(8px)",
                      }}>
                      <Globe size={11} /> Live
                    </a>
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}
                        style={{
                          display: "inline-flex", alignItems: "center", gap: 5, padding: "7px 14px", borderRadius: 8,
                          background: "rgba(255,255,255,0.12)", color: "#fff", fontSize: 12, fontWeight: 700,
                          textDecoration: "none", backdropFilter: "blur(8px)",
                        }}>
                        <FaGithub size={11} /> Code
                      </a>
                    )}
                  </div>
                </div>
                {/* Category badge */}
                {p.category && (
                  <div style={{
                    position: "absolute", top: 12, right: 12,
                    padding: "3px 10px", borderRadius: 99, fontSize: 10, fontWeight: 700,
                    background: "rgba(5,5,10,0.85)", border: "1px solid rgba(124,108,255,0.3)",
                    color: "#7c6cff", backdropFilter: "blur(8px)",
                  }}>
                    {p.category}
                  </div>
                )}
              </div>
              {/* Content */}
              <div style={{ padding: "22px 24px 24px" }}>
                <h3 style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: 17, fontWeight: 700, letterSpacing: "-0.02em",
                  marginBottom: 8, lineHeight: 1.25,
                }}>
                  {p.title}
                </h3>
                <p style={{
                  fontSize: 13, lineHeight: 1.65,
                  color: isDark ? "rgba(200,205,220,0.55)" : "rgba(80,75,120,0.6)",
                  marginBottom: 16,
                }}>
                  {p.description.length > 100 ? p.description.slice(0, 100) + "…" : p.description}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {p.stack.slice(0, 4).map((t) => <span key={t} className="tag" style={{ fontSize: 10 }}>{t}</span>)}
                  {p.stack.length > 4 && <span className="tag" style={{ fontSize: 10 }}>+{p.stack.length - 4}</span>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════ PROJECT MODAL ════════════════════════════ */
function ProjectModal({ project, onClose, isDark }: { project: Project; onClose: () => void; isDark: boolean }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 2000,
        background: "rgba(5,5,10,0.9)", backdropFilter: "blur(20px)",
        display: "flex", alignItems: "flex-end", justifyContent: "center",
        padding: 0,
      }}
      className="project-modal-backdrop"
    >
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 28, stiffness: 280 }}
        onClick={(e) => e.stopPropagation()}
        className="surface project-modal-inner"
        style={{
          width: "100%", maxWidth: 740, maxHeight: "92vh",
          overflowY: "auto", borderRadius: "28px 28px 0 0",
          margin: "0",
        }}
      >
        {/* Image */}
        <div className="project-modal-image" style={{ position: "relative", height: 280, overflow: "hidden", flexShrink: 0 }}>
          <img src={project.image} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(5,5,10,0.85) 0%, transparent 60%)" }} />
          <button
            onClick={onClose}
            style={{
              position: "absolute", top: 16, right: 16,
              width: 36, height: 36, borderRadius: "50%",
              background: "rgba(5,5,10,0.7)", backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <X size={16} />
          </button>
        </div>
        {/* Content */}
        <div className="project-modal-content" style={{ padding: "32px 36px 40px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>
            <div>
              <p className="eyebrow" style={{ marginBottom: 6 }}>{project.category}</p>
              <h3 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 26, fontWeight: 700, letterSpacing: "-0.03em" }}>
                {project.title}
              </h3>
            </div>
            <div className="project-modal-actions" style={{ display: "flex", gap: 10 }}>
              <a href={project.link} target="_blank" rel="noreferrer" className="btn btn-brand" style={{ fontSize: 13, padding: "9px 18px" }}>
                <Globe size={13} /> Live
              </a>
              {project.github && (
                <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-glass" style={{ fontSize: 13, padding: "9px 18px" }}>
                  <FaGithub size={13} /> Code
                </a>
              )}
            </div>
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: isDark ? "rgba(200,205,220,0.7)" : "rgba(80,75,120,0.7)", marginBottom: 28 }}>
            {project.description}
          </p>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#7c6cff", marginBottom: 12 }}>
              Tech Stack
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {project.stack.map((t) => <span key={t} className="tag" style={{ fontSize: 12 }}>{t}</span>)}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ════════════════════════════ SERVICES ════════════════════════════ */
const SERVICES = [
  { icon: <Code2 size={20} />, title: "Frontend Development", desc: "Pixel-perfect UIs with React, Next.js, TypeScript and Tailwind CSS. Framer Motion animations.", color: "#7c6cff", num: "01" },
  { icon: <Zap size={20} />, title: "Backend Development", desc: "Scalable REST APIs with Node.js, Express, Flask and MongoDB. Auth and third-party integrations.", color: "#00e5ff", num: "02" },
  { icon: <Sparkles size={20} />, title: "AI & Smart Features", desc: "ML-powered apps, chatbots, and intelligent features with Python & scikit-learn.", color: "#ff6b8a", num: "03" },
  { icon: <Layers size={20} />, title: "Web3 & Blockchain", desc: "Decentralized apps with MetaMask, ethers.js, 2FA, and multi-network support.", color: "#00ffa3", num: "04" },
  { icon: <Rocket size={20} />, title: "UI/UX Design", desc: "Intuitive, accessible experiences via research, wireframing, prototyping and Figma.", color: "#a78bfa", num: "05" },
];

function ServicesSection({ isDark }: { isDark: boolean }) {
  return (
    <section className="section-pad" style={{ padding: "7rem 0", background: isDark ? "rgba(124,108,255,0.025)" : "rgba(124,108,255,0.03)" }}>
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
          style={{ marginBottom: 48 }}
        >
          <p className="eyebrow" style={{ marginBottom: 16 }}>What I Do</p>
          <h2 className="text-section">
            Services &{" "}
            <span className="gx-warm">Expertise</span>
          </h2>
        </motion.div>

        {/* Horizontal accordion-style list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.19, 1, 0.22, 1] }}
              className="service-row"
              style={{
                display: "flex", alignItems: "center", gap: 28,
                padding: "24px 28px",
                borderRadius: i === 0 ? "20px 20px 0 0" : i === SERVICES.length - 1 ? "0 0 20px 20px" : 0,
                background: isDark ? "rgba(15,15,24,0.8)" : "rgba(255,255,255,0.85)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderBottom: i < SERVICES.length - 1 ? "none" : "1px solid rgba(255,255,255,0.06)",
                transition: "background 0.3s, box-shadow 0.3s",
                cursor: "default", position: "relative", overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = isDark
                  ? `rgba(${s.color === "#7c6cff" ? "124,108,255" : s.color === "#00e5ff" ? "0,229,255" : s.color === "#ff6b8a" ? "255,107,138" : s.color === "#00ffa3" ? "0,255,163" : "167,139,250"},0.06)`
                  : `rgba(124,108,255,0.03)`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = isDark ? "rgba(15,15,24,0.8)" : "rgba(255,255,255,0.85)";
              }}
            >
              {/* Number */}
              <span style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: 11, fontWeight: 700, letterSpacing: "0.1em",
                color: "rgba(200,205,220,0.25)", flexShrink: 0, width: 24,
              }}>{s.num}</span>
              {/* Icon */}
              <div style={{
                width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                background: `${s.color}15`, border: `1px solid ${s.color}25`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: s.color,
              }}>{s.icon}</div>
              {/* Title */}
              <div className="service-title-col" style={{ flex: "0 0 200px" }}>
                <h3 style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: 16, fontWeight: 700, letterSpacing: "-0.02em",
                }}>{s.title}</h3>
              </div>
              {/* Desc */}
              <p style={{
                flex: 1, fontSize: 13.5, lineHeight: 1.65,
                color: isDark ? "rgba(200,205,220,0.5)" : "rgba(80,75,120,0.6)",
              }}>{s.desc}</p>
              {/* Arrow */}
              <ChevronRight size={18} style={{ color: "rgba(200,205,220,0.2)", flexShrink: 0 }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════ EDUCATION ════════════════════════════ */
function EducationSection({ isDark }: { isDark: boolean }) {
  return (
    <section id="education" className="section-pad" style={{ padding: "7rem 0" }}>
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
          style={{ marginBottom: 56 }}
        >
          <p className="eyebrow" style={{ marginBottom: 16 }}>Background</p>
          <h2 className="text-section">Education</h2>
        </motion.div>

        <div className="timeline-wrapper" style={{ position: "relative", paddingLeft: 48 }}>
          <div className="timeline-line" />
          {EDUCATION.map((edu, i) => (
            <motion.div
              key={edu.school}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.19, 1, 0.22, 1] }}
              style={{ marginBottom: 32, position: "relative" }}
            >
              {/* Dot */}
              <div className="timeline-dot" style={{
                position: "absolute", left: -36, top: 4,
                width: 12, height: 12, borderRadius: "50%",
                background: "linear-gradient(135deg, #7c6cff, #00e5ff)",
                boxShadow: "0 0 16px rgba(124,108,255,0.6)",
              }} />
              <div className="education-card surface card-hover" style={{ padding: "24px 28px", borderRadius: 20 }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 10 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontFamily: "Space Grotesk, sans-serif",
                      fontSize: "clamp(15px, 3vw, 17px)", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 4,
                    }}>
                      {edu.degree}
                    </div>
                    <div style={{ fontSize: 13, color: isDark ? "rgba(200,205,220,0.55)" : "rgba(80,75,120,0.6)" }}>
                      {edu.school}
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 12, color: isDark ? "rgba(200,205,220,0.4)" : "rgba(80,75,120,0.5)" }}>
                      {edu.period}
                    </span>
                    <span style={{
                      padding: "3px 10px", borderRadius: 99, fontSize: 10, fontWeight: 700,
                      background: edu.badge === "In Progress" ? "rgba(124,108,255,0.15)" : "rgba(0,255,163,0.1)",
                      border: `1px solid ${edu.badge === "In Progress" ? "rgba(124,108,255,0.3)" : "rgba(0,255,163,0.25)"}`,
                      color: edu.badge === "In Progress" ? "#7c6cff" : "#00ffa3",
                    }}>
                      {edu.badge}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════ SKILLS ════════════════════════════ */
function SkillsSection({ isDark }: { isDark: boolean }) {
  const [activeTab, setActiveTab] = useState<keyof typeof SKILLS_DATA>("Frontend");
  const tabs = Object.keys(SKILLS_DATA) as (keyof typeof SKILLS_DATA)[];

  return (
    <section id="skills" className="section-pad" style={{ padding: "7rem 0", background: isDark ? "rgba(124,108,255,0.025)" : "rgba(124,108,255,0.03)" }}>
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
          style={{ marginBottom: 48 }}
        >
          <p className="eyebrow" style={{ marginBottom: 16 }}>Technical Proficiency</p>
          <h2 className="text-section">
            Skills &{" "}
            <span className="gx">Stack</span>
          </h2>
        </motion.div>

        {/* Tab switcher */}
        <div className="skills-tab-row" style={{ display: "flex", gap: 6, marginBottom: 36, borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 16 }}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "8px 20px", borderRadius: 99, fontSize: 13, fontWeight: 600,
                background: activeTab === tab ? "#7c6cff" : "transparent",
                border: `1px solid ${activeTab === tab ? "#7c6cff" : "rgba(255,255,255,0.08)"}`,
                color: activeTab === tab ? "#fff" : isDark ? "rgba(200,205,220,0.6)" : "rgba(80,75,120,0.65)",
                cursor: "pointer", transition: "all 0.2s",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="skills-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 240px), 1fr))", gap: 12 }}
          >
            {SKILLS_DATA[activeTab].map((skill, i) => {
              const ref = useRef<HTMLDivElement>(null);
              const inView = useInView(ref, { once: true, amount: 0.4 });
              return (
                <motion.div
                  key={skill.name}
                  ref={ref}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.04 }}
                  className="surface card-hover"
                  style={{ padding: "20px 22px", borderRadius: 16 }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 20 }}>{skill.icon}</span>
                      <span style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 600, fontSize: 14, letterSpacing: "-0.01em" }}>
                        {skill.name}
                      </span>
                    </div>
                    <span style={{
                      fontSize: 12, fontWeight: 700,
                      background: "linear-gradient(135deg, #7c6cff, #00e5ff)",
                      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    }}>
                      {skill.level}%
                    </span>
                  </div>
                  <div className="bar-track">
                    <motion.div
                      className="bar-fill"
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${skill.level}%` } : {}}
                      transition={{ duration: 1.2, delay: 0.2 + i * 0.04, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ════════════════════════════ LOOKING FOR ════════════════════════════ */
function LookingForSection({ isDark }: { isDark: boolean }) {
  const items = [
    { title: "Full-Stack Projects", desc: "End-to-end web apps from DB design to polished UI." },
    { title: "Freelance Contracts", desc: "Short or long-term builds, from MVP to production." },
    { title: "Open Source", desc: "Meaningful contributions to impactful projects." },
    { title: "Internships", desc: "Learning alongside teams building real products." },
  ];

  return (
    <section id="looking-for" className="section-pad" style={{ padding: "7rem 0" }}>
      <div className="wrap">
        <div className="looking-for-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          >
            <p className="eyebrow" style={{ marginBottom: 16 }}>Open To</p>
            <h2 className="text-section" style={{ marginBottom: 24 }}>
              What I'm{" "}
              <span className="gx-full">looking for</span>
            </h2>
            <p style={{
              fontSize: 15, lineHeight: 1.8,
              color: isDark ? "rgba(200,205,220,0.55)" : "rgba(80,75,120,0.6)",
              marginBottom: 36,
            }}>
              I'm actively seeking opportunities to work on challenging problems, contribute to impactful products, and collaborate with teams who care deeply about what they build.
            </p>
            <a href="#contact" className="btn btn-brand" style={{ fontSize: 14, padding: "13px 28px" }}>
              Get in touch <ArrowRight size={15} />
            </a>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 180px), 1fr))", gap: 12 }}>
            {items.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="surface card-hover"
                style={{ padding: "24px 22px", borderRadius: 18 }}
              >
                <div style={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: "linear-gradient(135deg, #7c6cff, #00e5ff)",
                  marginBottom: 14,
                }} />
                <h4 style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: 14, fontWeight: 700, letterSpacing: "-0.01em",
                  marginBottom: 8,
                }}>{item.title}</h4>
                <p style={{ fontSize: 12.5, lineHeight: 1.6, color: isDark ? "rgba(200,205,220,0.5)" : "rgba(80,75,120,0.55)" }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════ RESUME ════════════════════════════ */
function ResumeSection({ isDark }: { isDark: boolean }) {
  return (
    <section id="resume" className="section-pad" style={{ padding: "7rem 0", background: isDark ? "rgba(124,108,255,0.025)" : "rgba(124,108,255,0.03)" }}>
      <div className="wrap" style={{ textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
        >
          <p className="eyebrow" style={{ marginBottom: 16 }}>Download</p>
          <h2 className="text-section" style={{ marginBottom: 20 }}>
            My <span className="gx">Résumé</span>
          </h2>
          <p style={{
            fontSize: 15, color: isDark ? "rgba(200,205,220,0.5)" : "rgba(80,75,120,0.6)",
            maxWidth: 440, margin: "0 auto 36px", lineHeight: 1.7,
          }}>
            A full overview of my experience, education, and technical skills.
          </p>
          <div className="resume-cta">
            <a
              href="https://drive.google.com/uc?export=download&id=113crhUwGj_f8VfkSnCUh__zPw9PJZfHb"
              target="_blank" rel="noopener noreferrer"
              className="btn btn-brand"
              style={{ fontSize: 14, padding: "14px 32px" }}
            >
              <Download size={15} /> Download PDF
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ════════════════════════════ CONTACT ════════════════════════════ */
function ContactSection({ isDark, sendEmail, copied, copyEmail }: {
  isDark: boolean; sendEmail: (e: React.FormEvent<HTMLFormElement>) => void;
  copied: boolean; copyEmail: () => void;
}) {
  return (
    <section id="contact" className="section-pad" style={{ padding: "7rem 0" }}>
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
          style={{ marginBottom: 64 }}
        >
          <p className="eyebrow" style={{ marginBottom: 16 }}>Get In Touch</p>
          <h2 className="text-section">
            Let's build{" "}
            <span className="gx">something.</span>
          </h2>
        </motion.div>

        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 40, alignItems: "start" }}>
          {/* Left info */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
            style={{ display: "flex", flexDirection: "column", gap: 24 }}
          >
            <div>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: isDark ? "rgba(200,205,220,0.55)" : "rgba(80,75,120,0.6)", marginBottom: 32 }}>
                Whether it's a new project, a collaboration, or just saying hi — my inbox is always open. I typically respond within 24 hours.
              </p>

              {/* Availability */}
              <div className="surface" style={{ padding: "20px 24px", borderRadius: 18, marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ position: "relative", flexShrink: 0 }}>
                    <span className="ping" style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#00ffa3", opacity: 0.5 }} />
                    <span style={{ display: "block", width: 10, height: 10, borderRadius: "50%", background: "#00ffa3", position: "relative" }} />
                  </span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#00ffa3" }}>
                    Available for new projects
                  </span>
                </div>
              </div>

              {/* Email copy */}
              <div
                className="email-copy-card surface card-hover"
                style={{ padding: "16px 18px", borderRadius: 18, display: "flex", alignItems: "center", gap: 12, cursor: "pointer", overflow: "hidden" }}
                onClick={copyEmail}
              >
                <Mail size={18} style={{ color: "#7c6cff", flexShrink: 0 }} />
                <span style={{ flex: 1, fontSize: "clamp(11px, 3vw, 14px)", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{PROFILE.email}</span>
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.span key="c" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                      style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 700, color: "#00ffa3" }}>
                      <Check size={12} /> Copied
                    </motion.span>
                  ) : (
                    <motion.span key="cp" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                      style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 600, color: "#7c6cff" }}>
                      <Copy size={12} /> Copy
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Socials */}
            <div className="contact-socials" style={{ display: "flex", gap: 10 }}>
              {[
                { href: PROFILE.github, icon: <FaGithub size={16} />, label: "GitHub" },
                { href: PROFILE.linkedin, icon: <FaLinkedin size={16} style={{ color: "#0077b5" }} />, label: "LinkedIn" },
              ].map((s) => (
                <motion.a
                  key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  className="btn btn-glass"
                  style={{ fontSize: 13, padding: "10px 18px", flex: 1, justifyContent: "center" }}
                >
                  {s.icon} {s.label}
                </motion.a>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8, color: isDark ? "rgba(200,205,220,0.35)" : "rgba(80,75,120,0.45)", fontSize: 12 }}>
              <Clock size={13} /> Typically responds within 24 hours
            </div>
          </motion.div>

          {/* Right form */}
          <motion.form
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
            onSubmit={sendEmail}
            className="surface"
            style={{ padding: "clamp(24px, 5vw, 36px)", borderRadius: 28, display: "flex", flexDirection: "column", gap: 20 }}
          >
            <div className="contact-form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label htmlFor="cnt-name" style={{ display: "block", marginBottom: 8, fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#7c6cff" }}>Name</label>
                <input id="cnt-name" name="name" type="text" placeholder="Your name" required className="field" />
              </div>
              <div>
                <label htmlFor="cnt-email" style={{ display: "block", marginBottom: 8, fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#7c6cff" }}>Email</label>
                <input id="cnt-email" name="email" type="email" placeholder="your@email.com" required className="field" />
              </div>
            </div>
            <div>
              <label htmlFor="cnt-subject" style={{ display: "block", marginBottom: 8, fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#7c6cff" }}>Subject</label>
              <input id="cnt-subject" name="subject" type="text" placeholder="What's this about?" required className="field" />
            </div>
            <div>
              <label htmlFor="cnt-message" style={{ display: "block", marginBottom: 8, fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#7c6cff" }}>Message</label>
              <textarea id="cnt-message" name="message" placeholder="Tell me about your project or opportunity…" rows={5} required className="field" style={{ resize: "vertical", minHeight: 130 }} />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02, boxShadow: "0 16px 48px rgba(124,108,255,0.55)" }}
              whileTap={{ scale: 0.98 }}
              className="btn btn-brand"
              style={{ width: "100%", justifyContent: "center", padding: "15px", fontSize: 15, fontWeight: 700, borderRadius: 14, fontFamily: "Space Grotesk, sans-serif" }}
            >
              <Mail size={16} /> Send Message
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════ FOOTER ════════════════════════════ */
function Footer({ isDark }: { isDark: boolean }) {
  return (
    <footer style={{
      borderTop: "1px solid rgba(255,255,255,0.06)",
      background: isDark ? "#05050a" : "#f0efff",
    }}>
      {/* CTA strip */}
      <div style={{
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "60px 0",
        textAlign: "center",
      }}>
        <div className="wrap">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)",
              fontWeight: 700, letterSpacing: "-0.03em",
              marginBottom: 20,
            }}
          >
            Have an idea?{" "}
            <span className="gx">Let's make it real.</span>
          </motion.p>
          <a href="#contact" className="btn btn-brand" style={{ fontSize: 14, padding: "13px 28px" }}>
            Start a conversation <ArrowRight size={15} />
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="wrap" style={{ padding: "24px 0" }}>
        <div className="footer-bottom" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 7,
              background: "linear-gradient(135deg, #7c6cff, #00e5ff)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: 11, color: "#fff",
            }}>SH</div>
            <span style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 13, fontWeight: 600, color: isDark ? "rgba(200,205,220,0.6)" : "rgba(80,75,120,0.7)" }}>
              Syed Hassan Hussain Shah
            </span>
          </div>
          <p style={{ fontSize: 12, color: isDark ? "rgba(200,205,220,0.3)" : "rgba(80,75,120,0.4)" }}>
            Designed & built with ♥ in Gujranwala, Pakistan
          </p>
          <div style={{ display: "flex", gap: 16 }}>
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer"
              style={{ color: isDark ? "rgba(200,205,220,0.4)" : "rgba(80,75,120,0.5)", textDecoration: "none", fontSize: 13, transition: "color 0.2s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#7c6cff")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = isDark ? "rgba(200,205,220,0.4)" : "rgba(80,75,120,0.5)")}
            ><FaGithub size={16} /></a>
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer"
              style={{ color: isDark ? "rgba(200,205,220,0.4)" : "rgba(80,75,120,0.5)", textDecoration: "none", fontSize: 13, transition: "color 0.2s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#0077b5")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = isDark ? "rgba(200,205,220,0.4)" : "rgba(80,75,120,0.5)")}
            ><FaLinkedin size={16} /></a>
            <a href={`mailto:${PROFILE.email}`}
              style={{ color: isDark ? "rgba(200,205,220,0.4)" : "rgba(80,75,120,0.5)", textDecoration: "none", fontSize: 13, transition: "color 0.2s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#7c6cff")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = isDark ? "rgba(200,205,220,0.4)" : "rgba(80,75,120,0.5)")}
            ><Mail size={16} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ════════════════════════════ EASTER EGG ════════════════════════════ */
function EasterEgg({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed", inset: 0, zIndex: 50,
        background: "linear-gradient(135deg, #7c6cff, #00e5ff, #ff6b8a)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      <button style={{ position: "absolute", top: 20, right: 20, background: "none", border: "none", color: "#fff", fontSize: 24, cursor: "pointer" }} onClick={onClose}><X /></button>
      <div style={{ textAlign: "center", color: "#fff" }}>
        <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 42, fontWeight: 700, marginBottom: 12 }}>You found the secret!</h2>
        <p style={{ fontSize: 20, opacity: 0.9 }}>Curiosity is a developer's superpower 🚀</p>
      </div>
    </motion.div>
  );
}

/* ════════════════════════════ APP ════════════════════════════ */
export default function App() {
  const [theme, toggleTheme] = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedProject, setExpandedProject] = useState<Project | null>(null);
  const [easterEggActive, setEasterEggActive] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loaderDone, setLoaderDone] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [navScrolled, setNavScrolled] = useState(false);

  const isDark = theme === "dark";

  // Loader
  useEffect(() => {
    const t = setTimeout(() => setLoaderDone(true), 1600);
    return () => clearTimeout(t);
  }, []);

  // Active section tracking
  useEffect(() => {
    const ids = ["home", "projects", "education", "skills", "looking-for", "resume", "contact"];
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Scroll tint
  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Easter egg
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "u") setEasterEggActive((p) => !p);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Swal.fire({
      title: "Sending…",
      text: "Please wait.",
      allowOutsideClick: false,
      background: "#0f0f18",
      color: "#e8eaf0",
      didOpen: () => { Swal.showLoading(); },
    });
    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        e.currentTarget,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Message Sent!",
          text: "Thank you for reaching out. I'll reply soon.",
          showConfirmButton: false,
          timer: 2500,
          background: "#0f0f18",
          color: "#e8eaf0",
        });
        e.currentTarget.reset();
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Something went wrong. Please email me directly.",
          background: "#0f0f18",
          color: "#e8eaf0",
        });
      });
  };

  return (
    <div style={{ minHeight: "100vh", background: isDark ? "#05050a" : "#f5f4ff", color: isDark ? "#e8eaf0" : "#1a1830", overflowX: "hidden" }}>
      <PageLoader done={loaderDone} />
      <CustomCursor />
      <ScrollProgressCircle />

      {/* Easter egg */}
      <AnimatePresence>
        {easterEggActive && <EasterEgg onClose={() => setEasterEggActive(false)} />}
      </AnimatePresence>

      {/* Navbar */}
      <Navbar
        activeSection={activeSection}
        navScrolled={navScrolled}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />

      {/* Hero */}
      <Hero isDark={isDark} />

      {/* Skill strip */}
      <SkillStrip isDark={isDark} />

      {/* Main content */}
      <main>
        {/* Stats */}
        <StatsSection isDark={isDark} />

        {/* Projects */}
        <ProjectsSection isDark={isDark} setExpandedProject={setExpandedProject} />

        {/* Services */}
        <ServicesSection isDark={isDark} />

        {/* Education */}
        <EducationSection isDark={isDark} />

        {/* Skills */}
        <SkillsSection isDark={isDark} />

        {/* Looking For */}
        <LookingForSection isDark={isDark} />

        {/* Resume */}
        <ResumeSection isDark={isDark} />

        {/* Contact */}
        <ContactSection
          isDark={isDark}
          sendEmail={sendEmail}
          copied={copied}
          copyEmail={copyEmail}
        />
      </main>

      {/* Footer */}
      <Footer isDark={isDark} />

      {/* Project Modal */}
      <AnimatePresence>
        {expandedProject && (
          <ProjectModal
            project={expandedProject}
            onClose={() => setExpandedProject(null)}
            isDark={isDark}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
