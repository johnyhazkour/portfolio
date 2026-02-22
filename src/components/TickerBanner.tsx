"use client";
import { motion } from "framer-motion";

const items = [
    "🛡️ Website Security", "🛍️ Shopify Expert", "📊 Meta Pixel", "🔍 SEO / AEO / GEO / SGE",
    "🇯🇵 Japanese Hack Fix", "⚡ Bug Recovery", "🌐 Web Development", "📱 Responsive Design",
    "🚀 Performance Optimization", "🔐 Malware Removal", "💡 Catalog API", "🏆 5-Star Service",
];

export default function TickerBanner() {
    const doubled = [...items, ...items];

    return (
        <div style={{
            overflow: "hidden",
            background: "rgba(0,212,255,0.05)",
            borderTop: "1px solid rgba(0,212,255,0.15)",
            borderBottom: "1px solid rgba(0,212,255,0.15)",
            padding: "14px 0",
            position: "relative",
        }}>
            {/* Fade edges */}
            <div className="ticker-fade-left" style={{
                position: "absolute", left: 0, top: 0, bottom: 0,
                background: "linear-gradient(90deg, var(--bg-primary), transparent)",
                zIndex: 2, pointerEvents: "none",
            }} />
            <div className="ticker-fade-right" style={{
                position: "absolute", right: 0, top: 0, bottom: 0,
                background: "linear-gradient(270deg, var(--bg-primary), transparent)",
                zIndex: 2, pointerEvents: "none",
            }} />

            <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                style={{
                    display: "flex",
                    gap: 0,
                    width: "max-content",
                }}
            >
                {doubled.map((item, i) => (
                    <span key={i} className="ticker-item" style={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: "0 24px",
                        fontFamily: "var(--font-main)",
                        fontSize: "0.8rem",
                        fontWeight: 500,
                        color: i % 3 === 0 ? "var(--accent-cyan)" : i % 3 === 1 ? "var(--text-secondary)" : "var(--accent-gold)",
                        whiteSpace: "nowrap",
                        gap: 8,
                    }}>
                        {item}
                        <span style={{ color: "rgba(255,255,255,0.1)", marginLeft: 24 }}>◆</span>
                    </span>
                ))}
            </motion.div>
            <style>{`
                .ticker-fade-left, .ticker-fade-right { width: 40px; }
                @media (min-width: 768px) {
                    .ticker-fade-left, .ticker-fade-right { width: 120px !important; }
                    .ticker-item {
                        padding: 0 32px !important;
                        font-size: 0.85rem !important;
                    }
                    .ticker-item span {
                        margin-left: 32px !important;
                    }
                }
            `}</style>
        </div>
    );
}
