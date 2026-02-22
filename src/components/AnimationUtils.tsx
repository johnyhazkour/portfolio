"use client";
import { useRef, ReactNode, useState, useEffect } from "react";
import { motion, useInView, Variants } from "framer-motion";

interface RevealProps {
    children: ReactNode;
    delay?: number;
    direction?: "up" | "down" | "left" | "right" | "scale" | "none";
    className?: string;
    style?: React.CSSProperties;
    once?: boolean;
}

export function Reveal({
    children,
    delay = 0,
    direction = "up",
    className,
    style,
    once = true,
}: RevealProps) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once, margin: "-60px" });

    const variants: Variants = {
        hidden: {
            opacity: 0,
            y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
            x: direction === "left" ? 60 : direction === "right" ? -60 : 0,
            scale: direction === "scale" ? 0.85 : 1,
        },
        visible: {
            opacity: 1, y: 0, x: 0, scale: 1,
            transition: {
                duration: 0.7,
                delay,
                ease: [0.25, 0.1, 0.25, 1],
            },
        },
    };

    return (
        <motion.div
            ref={ref}
            variants={variants}
            initial="hidden"
            animate={mounted && inView ? "visible" : "hidden"}
            className={className}
            style={style}
        >
            {children}
        </motion.div>
    );
}

// Staggered children reveal
interface StaggerProps {
    children: ReactNode;
    staggerDelay?: number;
    className?: string;
    style?: React.CSSProperties;
}

export function StaggerReveal({ children, staggerDelay = 0.1, className, style }: StaggerProps) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });

    const container: Variants = {
        hidden: {},
        visible: {
            transition: { staggerChildren: staggerDelay },
        },
    };

    const item: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1, y: 0,
            transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
        },
    };

    return (
        <motion.div
            ref={ref}
            variants={container}
            initial="hidden"
            animate={mounted && inView ? "visible" : "hidden"}
            className={className}
            style={style}
        >
            {Array.isArray(children)
                ? children.map((child, i) => (
                    <motion.div key={i} variants={item}>
                        {child}
                    </motion.div>
                ))
                : <motion.div variants={item}>{children}</motion.div>}
        </motion.div>
    );
}

// Line reveal — animated horizontal line that draws in from left
interface LineRevealProps {
    color?: string;
    width?: string;
    delay?: number;
    style?: React.CSSProperties;
}

export function LineReveal({
    color = "var(--gradient-accent)",
    width = "100%",
    delay = 0,
    style,
}: LineRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <div ref={ref} style={{ position: "relative", overflow: "hidden", height: 2, width, ...style }}>
            <motion.div
                initial={{ scaleX: 0, transformOrigin: "0%" }}
                animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1, delay, ease: [0.25, 0.1, 0.25, 1] }}
                style={{
                    position: "absolute",
                    inset: 0,
                    background: color,
                    boxShadow: `0 0 8px rgba(255,255,255,0.3)`,
                }}
            />
        </div>
    );
}

// Section header with animated line
interface SectionHeaderProps {
    badge?: string;
    title: ReactNode;
    subtitle?: string;
    badgeClass?: string;
    center?: boolean;
}

export function SectionHeader({ badge, title, subtitle, badgeClass = "badge-cyan", center = true }: SectionHeaderProps) {
    return (
        <div style={{ textAlign: center ? "center" : "left", marginBottom: 80 }}>
            {badge && (
                <Reveal delay={0}>
                    <span className={`badge ${badgeClass}`} style={{ marginBottom: 20, display: "inline-flex" }}>
                        {badge}
                    </span>
                </Reveal>
            )}
            <Reveal delay={0.1}>
                <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, marginBottom: 16, fontFamily: "var(--font-title)" }}>
                    {title}
                </h2>
            </Reveal>
            {subtitle && (
                <>
                    <Reveal delay={0.2}>
                        <div style={{ display: "flex", justifyContent: center ? "center" : "flex-start" }}>
                            <LineReveal
                                delay={0.3}
                                width="80px"
                                style={{ marginBottom: 20, ...(center ? { margin: "0 auto 20px" } : {}) }}
                            />
                        </div>
                    </Reveal>
                    <Reveal delay={0.3}>
                        <p style={{ color: "var(--text-secondary)", maxWidth: 580, margin: center ? "0 auto" : undefined, fontSize: "1.05rem", lineHeight: 1.8 }}>
                            {subtitle}
                        </p>
                    </Reveal>
                </>
            )}
        </div>
    );
}
