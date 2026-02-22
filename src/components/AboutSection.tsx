"use client";
import { motion } from "framer-motion";
import { SectionHeader, Reveal, StaggerReveal } from "./AnimationUtils";

const skills = [
    { label: "WordPress / Elementor", level: 98, color: "var(--accent-cyan)" },
    { label: "Shopify E-Commerce", level: 95, color: "var(--accent-green)" },
    { label: "Meta Pixel & CAPI", level: 96, color: "var(--accent-pink)" },
    { label: "Security & Hack Recovery", level: 99, color: "var(--accent-gold)" },
    { label: "SEO / AEO / GEO / SGE", level: 93, color: "var(--accent-cyan)" },
    { label: "Japanese Keyword Hack Fix", level: 99, color: "var(--accent-gold)" },
    { label: "Performance Optimization", level: 94, color: "var(--accent-purple)" },
];

const expertise = [
    { icon: "🇯🇵", title: "Japanese Keyword Hack", desc: "Expert removal of Japanese SEO spam injections. Full cleanup and Google recovery." },
    { icon: "🔐", title: "Hacked Site Recovery", desc: "Complete restoration of compromised websites. Malware removal and security hardening." },
    { icon: "⚡", title: "Critical Error Fixes", desc: "Rapid diagnosis and resolution of PHP errors, database corruption, and conflicts." },
    { icon: "🛍️", title: "Shopify Expert", desc: "Custom themes, Liquid coding, app integration, and conversion optimization." },
    { icon: "📱", title: "Meta Catalog API", desc: "Full product feed creation, Commerce Manager setup, and dynamic ads configuration." },
    { icon: "🌐", title: "Website Reactivation", desc: "Reviving suspended, expired, or broken websites. Hosting and domain recovery." },
];

function SkillBar({ skill, index }: { skill: typeof skills[0]; index: number }) {
    return (
        <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ color: "white", fontSize: "0.85rem", fontWeight: 600 }}>{skill.label}</span>
                <span style={{ color: skill.color, fontSize: "0.85rem", fontWeight: 700 }}>{skill.level}%</span>
            </div>
            <div style={{ height: 6, background: "rgba(255,255,255,0.05)", borderRadius: 6, overflow: "hidden" }}>
                <Reveal direction="none" delay={0.2 + (index * 0.1)}>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                        style={{
                            height: "100%",
                            background: skill.color,
                            borderRadius: 6,
                            boxShadow: `0 0 15px ${skill.color}40`,
                        }}
                    />
                </Reveal>
            </div>
        </div>
    );
}

export default function AboutSection() {
    return (
        <section id="about" style={{ padding: "120px 0", position: "relative", overflowX: "hidden" }}>
            <div className="container">
                <SectionHeader
                    badge="👋 About Me"
                    title={<>The Expert Behind <span className="gradient-text">Your Success</span></>}
                />

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, marginBottom: 80, alignItems: "center" }} className="about-grid">
                    {/* Bio & Image */}
                    <Reveal direction="left">
                        <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
                            {/* Image Container */}
                            <div style={{ position: "relative", width: "fit-content" }}>
                                <div style={{
                                    position: "absolute", inset: -15,
                                    background: "var(--gradient-accent)",
                                    opacity: 0.15, filter: "blur(20px)", borderRadius: 30, zIndex: -1
                                }} />
                                <div style={{
                                    width: 140, height: 140, borderRadius: 24,
                                    overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)",
                                    background: "rgba(255,255,255,0.03)", padding: 6
                                }}>
                                    <img
                                        src="/johny.png?v=2"
                                        alt="Johny"
                                        style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 18 }}
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80\u0026w=1000\u0026auto=format\u0026fit=crop";
                                        }}
                                    />
                                </div>
                            </div>

                            <div>
                                <h3 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: 20 }}>Johny — Your Digital Guardian</h3>
                                <p style={{ color: "var(--text-secondary)", lineHeight: 1.9, marginBottom: 24, fontSize: "1.05rem" }}>
                                    I'm a full-stack web expert with a passion for solving the toughest digital problems. From rescuing websites that have been hacked and left for dead, to building high-converting Shopify stores from scratch.
                                </p>
                                <p style={{ color: "var(--text-secondary)", lineHeight: 1.9, marginBottom: 24, fontSize: "1.05rem" }}>
                                    My specialty? <strong style={{ color: "var(--accent-gold)" }}>Japanese keyword hack recovery</strong>. I've cleaned dozens of sites and restored their Google rankings after devastating SEO spam injections.
                                </p>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                                    {["🛒 Shopify Expert", "🛡️ Recovery Pro", "📊 Meta Partner", "🔍 SEO Strategist"].map((item, i) => (
                                        <span key={i} className="badge badge-cyan" style={{ fontSize: "0.7rem", padding: "6px 14px" }}>{item}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Reveal>

                    {/* Skills */}
                    <div style={{ paddingTop: 10 }}>
                        {skills.map((skill, i) => (
                            <SkillBar key={i} skill={skill} index={i} />
                        ))}
                    </div>
                </div>

                {/* Expertise cards */}
                <StaggerReveal staggerDelay={0.08} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: 20 }}>
                    {expertise.map((item, i) => (
                        <div key={i} className="glass-card" style={{ padding: "28px", display: "flex", flexDirection: "column", gap: 16 }}>
                            <div style={{ fontSize: "2.2rem" }}>{item.icon}</div>
                            <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "white" }}>{item.title}</h4>
                            <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
                        </div>
                    ))}
                </StaggerReveal>
            </div>

            <style>{`
        @media (max-width: 991px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 50px !important; }
        }
      `}</style>
        </section>
    );
}
