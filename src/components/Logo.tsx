"use client";
import { motion } from "framer-motion";

interface LogoProps {
    size?: number;
    animate?: boolean;
}

export default function Logo({ size = 40, animate = true }: LogoProps) {
    return (
        <motion.span
            style={{ width: size, height: size, display: "inline-flex", position: "relative" }}
            whileHover={animate ? { scale: 1.05 } : {}}
        >
            <svg
                width={size}
                height={size}
                viewBox="0 0 80 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00d4ff" />
                        <stop offset="100%" stopColor="#7c3aed" />
                    </linearGradient>
                    <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f0c040" />
                        <stop offset="100%" stopColor="#e07b20" />
                    </linearGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Outer hex ring */}
                <motion.polygon
                    points="40,4 72,22 72,58 40,76 8,58 8,22"
                    fill="none"
                    stroke="url(#grad1)"
                    strokeWidth="1.5"
                    strokeDasharray="200"
                    strokeDashoffset="0"
                    filter="url(#glow)"
                    animate={animate ? { strokeDashoffset: [200, 0], opacity: [0, 1] } : {}}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                />

                {/* Inner hex */}
                <polygon
                    points="40,14 63,27 63,53 40,66 17,53 17,27"
                    fill="rgba(0,212,255,0.05)"
                    stroke="rgba(0,212,255,0.2)"
                    strokeWidth="0.5"
                />

                {/* J Letter */}
                <motion.text
                    x="40"
                    y="50"
                    textAnchor="middle"
                    fontFamily="Space Grotesk, sans-serif"
                    fontWeight="700"
                    fontSize="34"
                    fill="url(#grad1)"
                    filter="url(#glow)"
                    initial={animate ? { opacity: 0, y: 60 } : {}}
                    animate={animate ? { opacity: 1, y: 50 } : {}}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    J
                </motion.text>

                {/* Gold accent dots */}
                {[
                    { cx: 40, cy: 4 },
                    { cx: 72, cy: 22 },
                    { cx: 72, cy: 58 },
                    { cx: 40, cy: 76 },
                    { cx: 8, cy: 58 },
                    { cx: 8, cy: 22 },
                ].map((dot, i) => (
                    <motion.circle
                        key={i}
                        cx={dot.cx}
                        cy={dot.cy}
                        r="3"
                        fill="url(#grad2)"
                        initial={animate ? { scale: 0, opacity: 0 } : {}}
                        animate={animate ? { scale: 1, opacity: 1 } : {}}
                        transition={{ delay: 0.8 + i * 0.1, duration: 0.3 }}
                    />
                ))}

                {/* Corner circuit lines */}
                <motion.line
                    x1="72" y1="22" x2="80" y2="18"
                    stroke="url(#grad2)"
                    strokeWidth="1"
                    strokeDasharray="12"
                    initial={animate ? { opacity: 0 } : {}}
                    animate={animate ? { opacity: 0.7 } : {}}
                    transition={{ delay: 1.5 }}
                />
                <motion.line
                    x1="72" y1="58" x2="80" y2="62"
                    stroke="url(#grad2)"
                    strokeWidth="1"
                    strokeDasharray="12"
                    initial={animate ? { opacity: 0 } : {}}
                    animate={animate ? { opacity: 0.7 } : {}}
                    transition={{ delay: 1.6 }}
                />
            </svg>
        </motion.span>
    );
}
