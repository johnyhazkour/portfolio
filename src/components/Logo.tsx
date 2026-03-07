"use client";
import { motion } from "framer-motion";
import Image from "next/image";

interface LogoProps {
    size?: number;
    animate?: boolean;
}

export default function Logo({ size = 40, animate = true }: LogoProps) {
    return (
        <motion.span
            style={{
                width: size,
                height: size,
                display: "inline-flex",
                position: "relative",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden"
            }}
            whileHover={animate ? { scale: 1.05 } : {}}
        >
            <Image
                src="/logo.png?v=4"
                alt="Logo"
                width={size}
                height={size}
                style={{
                    objectFit: "contain",
                    width: "100%",
                    height: "100%"
                }}
            />
        </motion.span>
    );
}
