"use client";
import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgressLine() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 200,
        damping: 35,
        restDelta: 0.001,
    });

    const [pct, setPct] = useState(0);

    useEffect(() => {
        return scrollYProgress.on("change", (v) => setPct(Math.round(v * 100)));
    }, [scrollYProgress]);

    return (
        <>
            {/* Main progress line */}
            <motion.div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    transformOrigin: "0%",
                    scaleX,
                    background: "linear-gradient(90deg, #00d4ff, #7c3aed, #ec4899, #f0c040)",
                    zIndex: 9998,
                    boxShadow: "0 0 12px rgba(0,212,255,0.8), 0 0 24px rgba(124,58,237,0.4)",
                }}
            />

            {/* Glowing orb at the tip */}
            <motion.div
                style={{
                    position: "fixed",
                    top: -3,
                    left: 0,
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: "#00d4ff",
                    zIndex: 9999,
                    boxShadow: "0 0 10px 4px rgba(0,212,255,0.9)",
                    x: `calc(${pct}% - 5px)`,
                    opacity: pct > 1 ? 1 : 0,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 35 }}
            />

            {/* Percentage badge (appears after 10%) */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: pct > 10 ? 1 : 0, scale: pct > 10 ? 1 : 0.8 }}
                transition={{ duration: 0.3 }}
                style={{
                    position: "fixed",
                    bottom: 24,
                    right: 24,
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: "rgba(5,5,16,0.95)",
                    border: "2px solid rgba(0,212,255,0.5)",
                    backdropFilter: "blur(12px)",
                    zIndex: 9999,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 20px rgba(0,212,255,0.4)",
                    cursor: "pointer",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    color: "#00d4ff",
                    fontFamily: "var(--font-code)",
                }}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(0,212,255,0.5)" }}
                whileTap={{ scale: 0.9 }}
                title="Back to top"
            >
                {pct > 95 ? "↑" : `${pct}%`}
            </motion.div>
        </>
    );
}
