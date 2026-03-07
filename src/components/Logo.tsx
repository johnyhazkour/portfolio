"use client";
import { motion } from "framer-motion";
import Image from "next/image";

interface LogoProps {
    size?: number;
    animate?: boolean;
}

export default function Logo({ size = 140, animate = true }: LogoProps) {
    return (
        <motion.span
            style={{
                height: size,
                display: "inline-flex",
                position: "relative",
                alignItems: "center",
                justifyContent: "center",
            }}
            whileHover={animate ? { scale: 1.05 } : {}}
        >
            <Image
                src="/logo.png?v=10"
                alt="Logo"
                width={800}
                height={400}
                priority
                style={{
                    objectFit: "contain",
                    width: "auto",
                    height: "100%",
                    maxWidth: "none"
                }}
            />
        </motion.span>
    );
}
