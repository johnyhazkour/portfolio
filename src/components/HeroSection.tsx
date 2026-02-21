"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import HeroParticles from "./HeroParticles";
import Logo from "./Logo";

const roles = ["Web Expert", "Bug Fixer", "Shopify Pro", "SEO Specialist", "Security Expert", "Meta Integrator"];

// Floating data-badge decoration
function FloatingBadge({ style, children, delay = 0 }: { style?: React.CSSProperties; children: React.ReactNode; delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay, duration: 0.6, type: "spring", stiffness: 160 }}
            style={{
                position: "absolute",
                background: "rgba(5,5,16,0.85)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(0,212,255,0.2)",
                borderRadius: 14,
                padding: "10px 18px",
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "white",
                display: "flex",
                alignItems: "center",
                gap: 8,
                boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,212,255,0.08)",
                zIndex: 3,
                ...style,
            }}
        >
            <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay }}
            >
                {children}
            </motion.div>
        </motion.div>
    );
}

export default function HeroSection() {
    const [rolIdx, setRolIdx] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const heroRef = useRef<HTMLDivElement>(null);

    // Mouse parallax
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
    const orbX = useTransform(springX, [-300, 300], [-30, 30]);
    const orbY = useTransform(springY, [-300, 300], [-30, 30]);

    useEffect(() => {
        const handleMouse = (e: MouseEvent) => {
            const cx = window.innerWidth / 2;
            const cy = window.innerHeight / 2;
            mouseX.set(e.clientX - cx);
            mouseY.set(e.clientY - cy);
        };
        window.addEventListener("mousemove", handleMouse);
        return () => window.removeEventListener("mousemove", handleMouse);
    }, [mouseX, mouseY]);

    // Typewriter
    useEffect(() => {
        const word = roles[rolIdx];
        let t: NodeJS.Timeout;
        if (!isDeleting) {
            if (displayText.length < word.length) {
                t = setTimeout(() => setDisplayText(word.slice(0, displayText.length + 1)), 75);
            } else {
                t = setTimeout(() => setIsDeleting(true), 2400);
            }
        } else {
            if (displayText.length > 0) {
                t = setTimeout(() => setDisplayText(displayText.slice(0, -1)), 38);
            } else {
                setIsDeleting(false);
                setRolIdx((i) => (i + 1) % roles.length);
            }
        }
        return () => clearTimeout(t);
    }, [displayText, isDeleting, rolIdx]);

    const stats = [
        { value: "120+", label: "Projects" },
        { value: "23+", label: "Live Sites" },
        { value: "100%", label: "Satisfaction" },
        { value: "5★", label: "Rating" },
    ];

    return (
        <section
            id="hero"
            ref={heroRef}
            style={{
                position: "relative",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                background: "var(--gradient-hero)",
            }}
        >
            {/* ── Particle Canvas ─────────────────────── */}
            <HeroParticles />

            {/* ── Parallax orbs ─────────────────────── */}
            <motion.div style={{ x: orbX, y: orbY, position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
                <motion.div
                    animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.2, 0.12] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                        position: "absolute", top: "15%", left: "8%",
                        width: 500, height: 500, borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(124,58,237,0.22) 0%, transparent 70%)",
                        filter: "blur(60px)",
                    }}
                />
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.18, 0.1] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    style={{
                        position: "absolute", bottom: "10%", right: "5%",
                        width: 600, height: 600, borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(0,212,255,0.16) 0%, transparent 70%)",
                        filter: "blur(70px)",
                    }}
                />
                <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.14, 0.08] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
                    style={{
                        position: "absolute", top: "40%", right: "20%",
                        width: 350, height: 350, borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 70%)",
                        filter: "blur(50px)",
                    }}
                />
            </motion.div>

            {/* ── Grid lines overlay ──────────────────── */}
            <div style={{
                position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
                backgroundImage: `
          linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)
        `,
                backgroundSize: "60px 60px",
                maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
            }} />

            {/* ── Floating badges ─────────────────────── */}
            <FloatingBadge style={{ top: "22%", left: "6%", display: "none" }} delay={1.2}>
                🛡️ Security Expert
            </FloatingBadge>
            <FloatingBadge style={{ top: "28%", right: "6%", display: "none" }} delay={1.5}>
                🛒 Shopify Pro
            </FloatingBadge>
            <FloatingBadge style={{ bottom: "25%", left: "8%", display: "none" }} delay={1.8}>
                🔍 SEO/AEO/GEO/SGE
            </FloatingBadge>
            <FloatingBadge style={{ bottom: "20%", right: "7%", display: "none" }} delay={2.1}>
                📊 Meta Pixel API
            </FloatingBadge>

            {/* ── Main content ────────────────────────── */}
            <div
                className="container"
                style={{
                    position: "relative",
                    zIndex: 2,
                    padding: "130px 24px 80px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <div style={{
                    display: "grid",
                    gap: 60,
                    width: "100%",
                    alignItems: "center",
                    gridTemplateColumns: typeof window !== 'undefined' && window.innerWidth >= 1024 ? "1.2fr 1fr" : "1fr",
                    ...(typeof window !== 'undefined' && window.innerWidth >= 1024 ? { textAlign: "left" } : { textAlign: "center" })
                }} className="hero-grid">

                    {/* Left Side: Content */}
                    <div>
                        {/* Available badge */}
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            style={{ marginBottom: 32, display: "flex", justifyContent: "inherit" }}
                        >
                            <span className="badge badge-green" style={{ gap: 8 }}>
                                <motion.span
                                    animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                                    transition={{ duration: 1.8, repeat: Infinity }}
                                    style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent-green)", display: "inline-block" }}
                                />
                                available_for_new_projects
                            </span>
                        </motion.div>

                        {/* Code greeting */}
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            style={{ color: "var(--accent-cyan)", fontFamily: "var(--font-code)", fontSize: "0.85rem", marginBottom: 20, letterSpacing: "0.12em" }}
                        >
                            <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }}>&lt;</motion.span>
                            {" hello-world "}
                            <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}>/&gt;</motion.span>
                            {" — I am "}
                            <span style={{ color: "var(--accent-gold)" }}>Johny</span>
                        </motion.p>

                        {/* Main headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
                            style={{ fontSize: "clamp(2.3rem, 6vw, 4.4rem)", fontWeight: 800, lineHeight: 1.1, marginBottom: 16 }}
                        >
                            Your Digital{" "}
                            <span className="gradient-text">Problem Solver</span>
                        </motion.h1>

                        {/* Typewriter line */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.75, duration: 0.7 }}
                            style={{
                                fontSize: "clamp(1.1rem, 2.5vw, 1.8rem)",
                                fontWeight: 700,
                                marginBottom: 32,
                                height: "2.6rem",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: typeof window !== 'undefined' && window.innerWidth >= 1024 ? "flex-start" : "center",
                                gap: 10
                            }}
                        >
                            <span style={{ color: "var(--text-muted)", fontSize: "0.9em" }}>Expert</span>
                            <span style={{ color: "var(--accent-gold)", textShadow: "0 0 30px rgba(240,192,64,0.4)", minWidth: 200 }}>
                                {displayText}
                                <motion.span
                                    animate={{ opacity: [1, 0] }}
                                    transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
                                    style={{ display: "inline-block", width: 3, height: "1em", background: "var(--accent-gold)", marginLeft: 3, verticalAlign: "text-bottom", borderRadius: 2 }}
                                />
                            </span>
                        </motion.div>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 }}
                            style={{ color: "var(--text-secondary)", fontSize: "clamp(0.95rem, 1.8vw, 1.05rem)", maxWidth: 580, marginBottom: 44, lineHeight: 1.8 }}
                        >
                            I build, fix, and supercharge websites — from recovering hacked sites & cleaning{" "}
                            <span style={{ color: "var(--accent-cyan)" }}>Japanese keyword attacks</span>, to building premium{" "}
                            <span style={{ color: "var(--accent-gold)" }}>Shopify stores</span> and implementing next-gen{" "}
                            <span style={{ color: "#a78bfa" }}>AI-driven SEO</span> strategies.
                        </motion.p>

                        {/* CTA buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.05 }}
                            style={{ display: "flex", gap: 16, justifyContent: "inherit", flexWrap: "wrap", marginBottom: 60 }}
                        >
                            <motion.button
                                className="btn-primary"
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                                onClick={() => document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" })}
                                style={{ fontSize: "0.95rem", padding: "14px 32px" }}
                            >
                                <span>View My Work</span>
                                <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
                            </motion.button>
                            <motion.button
                                className="btn-secondary"
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                                style={{ fontSize: "0.95rem", padding: "14px 32px" }}
                            >
                                Let's Talk
                            </motion.button>
                        </motion.div>
                    </div>

                    {/* Right Side: Image / Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
                        style={{ position: "relative", display: "flex", justifyContent: "center" }}
                    >
                        {/* Image Backdrop Glow */}
                        <div style={{
                            position: "absolute", inset: "-10%",
                            background: "radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 60%)",
                            filter: "blur(40px)",
                            zIndex: -1
                        }} />

                        {/* Main Image Frame */}
                        <div style={{
                            position: "relative",
                            width: "min(400px, 85vw)",
                            aspectRatio: "1/1.2",
                            background: "rgba(255,255,255,0.03)",
                            borderRadius: "40px",
                            padding: 10,
                            border: "1px solid rgba(255,255,255,0.08)",
                            overflow: "hidden"
                        }}>
                            {/* Inner Border Glow */}
                            <div style={{
                                position: "absolute", inset: 0,
                                borderRadius: 30, pointerEvents: "none",
                                boxShadow: "inset 0 0 40px rgba(0,212,255,0.05)",
                                border: "1px solid rgba(255,255,255,0.05)",
                                zIndex: 1
                            }} />

                            <motion.div
                                whileHover={{ scale: 1.03 }}
                                transition={{ type: "spring", stiffness: 100 }}
                                style={{ width: "100%", height: "100%", position: "relative" }}
                            >
                                <img
                                    src="/johny.png?v=2"
                                    alt="Johny - Web Expert"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        borderRadius: "30px",
                                        filter: "contrast(1.05) brightness(1.1)",
                                    }}
                                    onError={(e) => {
                                        // Fallback if image not found
                                        const target = e.target as HTMLImageElement;
                                        target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80\u0026w=1000\u0026auto=format\u0026fit=crop";
                                    }}
                                />

                                {/* Floating indicators */}
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    style={{
                                        position: "absolute", bottom: "10%", right: "-10px",
                                        background: "rgba(5,5,16,0.9)", backdropFilter: "blur(30px)",
                                        border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px",
                                        padding: "12px 20px", display: "flex", alignItems: "center", gap: 10,
                                        boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
                                    }}
                                >
                                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--accent-green)", boxShadow: "0 0 10px var(--accent-green)" }} />
                                    <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "white", whiteSpace: "nowrap" }}>Online Support</span>
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* Stats row */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    style={{
                        marginTop: 80,
                        display: "inline-flex",
                        gap: 0,
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        borderRadius: 16,
                        overflow: "hidden",
                    }}
                >
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ background: "rgba(0,212,255,0.06)" }}
                            style={{
                                padding: "20px 32px",
                                textAlign: "center",
                                borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
                                cursor: "default",
                                transition: "background 0.2s",
                                ...(typeof window !== 'undefined' && window.innerWidth < 640 ? { padding: "12px 16px" } : {})
                            }}
                        >
                            <div style={{
                                fontSize: "clamp(1.2rem, 3vw, 1.7rem)", fontWeight: 800,
                                background: "var(--gradient-accent)",
                                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                            }}>
                                {stat.value}
                            </div>
                            <div style={{ color: "var(--text-muted)", fontSize: "0.68rem", marginTop: 4, letterSpacing: "0.04em", textTransform: "uppercase" }}>{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* CSS Overrides for responsive grid */}
            <style>{`
                @media (min-width: 1024px) {
                    .hero-grid { grid-template-columns: 1.2fr 1fr !important; text-align: left !important; }
                    .hero-grid > div:first-child { display: block !important; }
                }
                @media (max-width: 1023px) {
                    .hero-grid { text-align: center !important; }
                    .hero-grid > div:first-child { display: flex; flex-direction: column; align-items: center; }
                }
            `}</style>

            {/* ── Scroll indicator ─────────────────────── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
                style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}
            >
                <span style={{ color: "var(--text-muted)", fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>Scroll</span>
                <motion.div
                    style={{
                        width: 22, height: 36, border: "1.5px solid rgba(255,255,255,0.2)",
                        borderRadius: 11, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: 4,
                    }}
                >
                    <motion.div
                        animate={{ y: [0, 14, 0] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                        style={{ width: 4, height: 8, background: "var(--accent-cyan)", borderRadius: 2, boxShadow: "0 0 8px rgba(0,212,255,0.8)" }}
                    />
                </motion.div>
            </motion.div>

            {/* Show floating badges on desktop */}
            <style>{`@media (min-width: 1024px) { .hero-badge { display: flex !important; } }`}</style>
        </section>
    );
}
