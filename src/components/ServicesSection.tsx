"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { SectionHeader } from "./AnimationUtils";

const services = [
    {
        icon: "🛡️",
        title: "Website Security & Recovery",
        badge: "Most Requested",
        badgeClass: "badge-gold",
        description: "Expert recovery of hacked, compromised, or broken websites. I diagnose and fix critical errors, restore lost data, and harden your site against future attacks.",
        features: [
            "Japanese keyword hack removal & Google cleanup",
            "Malware scanning & complete disinfection",
            "WordPress / CMS critical error fixes",
            "Database restoration & backup setup",
            "Security hardening & firewall configuration",
            "Google Search Console re-submission",
        ],
        color: "#f0c040",
        gradient: "linear-gradient(135deg, rgba(240,192,64,0.1), rgba(224,123,32,0.05))",
        borderColor: "rgba(240,192,64,0.2)",
    },
    {
        icon: "🛒",
        title: "Shopify E-Commerce",
        badge: "Expert Level",
        badgeClass: "badge-cyan",
        description: "Full Shopify store development, and conversion optimization to maximize your online sales.",
        features: [
            "Shopify theme design & development",
            "Product catalog setup & optimization",
            "Payment gateway integration",
            "Shopify shipping integration like Aramex, DHL, etc",
            "Speed & performance optimization",
            "Shopify SEO & structured data",
        ],
        color: "#00d4ff",
        gradient: "linear-gradient(135deg, rgba(0,212,255,0.1), rgba(0,212,255,0.02))",
        borderColor: "rgba(0,212,255,0.2)",
    },
    {
        icon: "📊",
        title: "Meta & Pixel Integration",
        badge: "Certified",
        badgeClass: "badge-purple",
        description: "Professional Meta Pixel setup, Catalog API integration, and advanced event tracking for precise ad targeting and maximum ROAS.",
        features: [
            "Meta Pixel implementation & verification",
            "Catalog API link & product feed setup",
            "Custom conversion events & audiences",
            "Server-side events (CAPI) integration",
            "Analytics & performance tracking",
        ],
        color: "#7c3aed",
        gradient: "linear-gradient(135deg, rgba(124,58,237,0.1), rgba(124,58,237,0.02))",
        borderColor: "rgba(124,58,237,0.2)",
    },
    {
        icon: "🌐",
        title: "Website Development",
        badge: "Full Stack",
        badgeClass: "badge-cyan",
        description: "From landing pages to complex web apps, I build fast, beautiful, and functional websites that drive results for businesses of all sizes.",
        features: [
            "WordPress / Elementor development",
            "Responsive mobile-first design",
            "Performance & Core Web Vitals optimization",
            "API integrations",
            "Website maintenance & updates",
        ],
        color: "#00ffaa",
        gradient: "linear-gradient(135deg, rgba(0,255,170,0.08), rgba(0,212,255,0.02))",
        borderColor: "rgba(0,255,170,0.2)",
    },
    {
        icon: "🔍",
        title: "SEO, AEO, GEO & SGE",
        badge: "AI-Powered",
        badgeClass: "badge-gold",
        description: "Next-generation search optimization covering traditional SEO, Answer Engine Optimization, Generative Engine Optimization, and Search Generative Experience readiness.",
        features: [
            "Technical SEO audit & implementation",
            "AEO — Optimizing for voice & AI assistants",
            "GEO — Generative Engine Optimization",
            "SGE — Google AI Overviews readiness",
            "Schema markup & structured data",
        ],
        color: "#ec4899",
        gradient: "linear-gradient(135deg, rgba(236,72,153,0.1), rgba(124,58,237,0.05))",
        borderColor: "rgba(236,72,153,0.2)",
    },
    {
        icon: "⚡",
        title: "Performance & Speed Optimization",
        badge: "Core Web Vitals",
        badgeClass: "badge-cyan",
        description: "Transform slow, underperforming websites into lightning-fast experiences. Improve your Google rankings and user retention through speed.",
        features: [
            "Core Web Vitals audit & optimization",
            "Image compression & lazy loading",
            "CDN setup & caching strategies",
            "Code minification & bundling",
            "Google PageSpeed to 90+ score",
        ],
        color: "#00d4ff",
        gradient: "linear-gradient(135deg, rgba(0,212,255,0.08), rgba(0,255,170,0.03))",
        borderColor: "rgba(0,212,255,0.15)",
    },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
    const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 60 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -8, scale: 1.01 }}
            style={{
                background: service.gradient,
                border: `1px solid ${service.borderColor}`,
                borderRadius: 20,
                padding: "32px",
                position: "relative",
                overflow: "hidden",
                transition: "box-shadow 0.3s ease",
                cursor: "default",
            }}
            onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 60px ${service.color}20, 0 0 0 1px ${service.borderColor}`;
            }}
            onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
            }}
        >
            {/* Glow top-right */}
            <div style={{
                position: "absolute", top: 0, right: 0, width: 200, height: 200,
                background: `radial-gradient(circle at top right, ${service.color}15, transparent 70%)`,
                borderRadius: "0 20px 0 0",
            }} />

            {/* Icon + Badge */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
                <div style={{
                    width: 60, height: 60, borderRadius: 14,
                    background: `${service.color}15`,
                    border: `1px solid ${service.color}30`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.8rem",
                }}>
                    {service.icon}
                </div>
                <span className={`badge ${service.badgeClass}`}>{service.badge}</span>
            </div>

            {/* Title */}
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: 12, color: "white" }}>
                {service.title}
            </h3>

            {/* Description */}
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: 24 }}>
                {service.description}
            </p>

            {/* Features list */}
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                {service.features.map((feat, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, color: "var(--text-secondary)", fontSize: "0.85rem" }}>
                        <span style={{ color: service.color, marginTop: 2, flexShrink: 0, fontSize: "0.7rem" }}>◆</span>
                        {feat}
                    </li>
                ))}
            </ul>
        </motion.div>
    );
}

export default function ServicesSection() {
    return (
        <section id="services" style={{ padding: "120px 0", background: "var(--bg-secondary)", overflowX: "hidden" }}>
            <div className="container">
                <SectionHeader
                    badge="🚀 What I Do"
                    title={<>Services That <span className="gradient-text">Deliver Results</span></>}
                    subtitle="From rescuing broken websites to building high-converting stores and optimizing for the AI-powered future of search — I cover the full spectrum of digital success."
                />

                {/* Grid */}
                <div
                    className="services-grid"
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
                        gap: 24,
                    }}>
                    {services.map((service, i) => (
                        <ServiceCard key={i} service={service} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
