"use client";
import { motion } from "framer-motion";
import { SectionHeader, Reveal, StaggerReveal } from "./AnimationUtils";

const testimonials = [
    {
        name: "Sarah K.", role: "Store Owner", avatar: "👩‍💼",
        text: "Johny recovered my hacked Shopify store in hours! Google deindexed us, but he got our rankings back in a week. Pure magic.",
        service: "Security Recovery", color: "var(--accent-gold)"
    },
    {
        name: "Mike D.", role: "CEO, Tech Hub", avatar: "👨‍💻",
        text: "The Meta Pixel integration transformed our ROI. We went from 1.2x to 5x ROAS in a month. Johny is an absolute expert.",
        service: "Meta Integration", color: "var(--accent-cyan)"
    },
    {
        name: "Lena R.", role: "Marketing Director", avatar: "👩‍💻",
        text: "He rebuilt our entire corporate site. The SEO performance is stellar — we're ranking for every target keyword now.",
        service: "Web Dev + SEO", color: "var(--accent-purple)"
    },
    {
        name: "Ahmad T.", role: "E-comm Founder", avatar: "🛍️",
        text: "Fast, reliable, and knows exactly how to fix 'unfixable' errors. The Japanese hack cleanup was life-saving for our business.",
        service: "Critical Bug Fix", color: "var(--accent-green)"
    },
];

export default function TestimonialsSection() {
    return (
        <section style={{ padding: "120px 0" }}>
            <div className="container">
                <SectionHeader
                    badge="⭐ Success Reports"
                    title={<>Client <span className="gradient-text">Feedback</span></>}
                    subtitle="Don't just take my word for it. Here is what my clients have to say about our collaborations."
                />

                <StaggerReveal staggerDelay={0.1} style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
                    gap: 24,
                }}>
                    {testimonials.map((t, i) => (
                        <div key={i} style={{
                            background: "rgba(255,255,255,0.02)",
                            border: `1px solid var(--border)`,
                            borderRadius: 24,
                            padding: 32,
                            position: "relative",
                        }}>
                            <div style={{ fontSize: "1.2rem", color: t.color, marginBottom: 16 }}>★★★★★</div>
                            <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "0.95rem", fontStyle: "italic", marginBottom: 24 }}>
                                &ldquo;{t.text}&rdquo;
                            </p>
                            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                                <div style={{
                                    width: 48, height: 48, borderRadius: "50%",
                                    background: `${t.color}15`, border: `1px solid ${t.color}30`,
                                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem"
                                }}>
                                    {t.avatar}
                                </div>
                                <div>
                                    <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "white" }}>{t.name}</h4>
                                    <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{t.role}</p>
                                </div>
                            </div>
                            <div style={{
                                position: "absolute", top: 24, right: 24,
                                fontSize: "0.6rem", padding: "4px 10px", borderRadius: 100, border: `1px solid ${t.color}30`, color: t.color
                            }}>
                                {t.service}
                            </div>
                        </div>
                    ))}
                </StaggerReveal>
            </div>
        </section>
    );
}
