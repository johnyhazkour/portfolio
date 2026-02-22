"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SectionDividerProps {
    delay?: number;
    height?: number | string;
    color?: string;
    center?: boolean;
}

export default function SectionDivider({
    delay = 0.1,
    height = 100,
    color = "rgba(255, 255, 255, 0.4)",
    center = true
}: SectionDividerProps) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-10% 0px" });

    return (
        <div
            ref={ref}
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                height: height,
                margin: "20px auto",
                pointerEvents: "none",
                zIndex: 100
            }}
        >
            {/* Glowing Dot */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                transition={{ duration: 0.5, delay }}
                style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#ffffff",
                    boxShadow: "0 0 15px 2px rgba(255, 255, 255, 0.8)",
                    marginBottom: -2
                }}
            />

            {/* Vertical Line */}
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={inView ? { height: "100%", opacity: 1 } : { height: 0, opacity: 0 }}
                transition={{
                    duration: 1.5,
                    delay: delay + 0.2,
                    ease: [0.25, 0.1, 0.25, 1]
                }}
                style={{
                    width: "1.5px",
                    background: `linear-gradient(to bottom, #ffffff, rgba(255,255,255,0.1))`,
                    boxShadow: "0 0 10px rgba(255, 255, 255, 0.1)"
                }}
            />
        </div>
    );
}
