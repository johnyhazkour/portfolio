"use client";
import { motion } from "framer-motion";
import { SectionHeader, Reveal, StaggerReveal } from "./AnimationUtils";

const seoServices = [
    {
        acronym: "SEO",
        full: "Search Engine Optimization",
        icon: "🔍",
        color: "#ffffff",
        description: "The foundation of online visibility. I conduct deep technical audits, fix crawlability issues, and optimize on-page elements to ensure your site ranks for the right keywords.",
        process: [
            "Technical audit & Core Web Vitals optimization",
            "Keyword research & competitive analysis",
            "On-page optimization & Metadata tuning",
            "Structured data & Schema implementation",
        ],
        tools: ["Search Console", "Ahrefs", "Screaming Frog"],
    },
    {
        acronym: "AEO",
        full: "Answer Engine Optimization",
        icon: "🤖",
        color: "#cccccc",
        description: "AEO prepares your content to be the answer chosen by AI assistants like Google Assistant, Siri, Alexa, and ChatGPT. I structure your data to be cited by AI.",
        process: [
            "FAQ schema & Q&A content structuring",
            "Featured snippet optimization",
            "Conversational search reformatting",
            "Voice search keyword targeting",
        ],
        tools: ["SchemaApp", "AnswerThePublic", "Google NLP"],
    },
    {
        acronym: "GEO",
        full: "Generative Engine Optimization",
        icon: "🧠",
        color: "#aaaaaa",
        description: "The cutting edge of search. I optimize your content to appear in AI-generated answers from ChatGPT, Perplexity, and Gemini — ensuring your brand is the chosen reference.",
        process: [
            "AI citation analysis & source positioning",
            "Topical authority content clustering",
            "Machine-readable structured data strategy",
        ],
        tools: ["Perplexity", "ChatGPT Plus", "Claude 3.5"],
    },
    {
        acronym: "SGE",
        full: "Search Generative Experience",
        icon: "✨",
        color: "#eeeeee",
        description: "Google's AI Overviews now dominate search results. I optimize your site to appear in these summaries, giving you prime real estate above all organic results.",
        process: [
            "AI Overview eligibility keyword audit",
            "Content summaries for AI extraction",
            "Definitive answer block mapping",
            "Source credibility signal optimization",
        ],
        tools: ["BrightEdge", "Semrush AI", "Surfer SEO"],
    },
];

function SEOCard({ service, index }: { service: typeof seoServices[0]; index: number }) {
    const isEven = index % 2 === 0;

    return (
        <div style={{ marginBottom: 40 }}>
            <Reveal direction={isEven ? "left" : "right"}>
                <div className="seo-grid" style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid var(--border)",
                    borderRadius: 24,
                    overflow: "hidden",
                }}>
                    {/* Visual Side */}
                    <div style={{
                        padding: "50px 40px",
                        background: `linear-gradient(135deg, ${service.color}10, transparent)`,
                        borderRight: isEven ? "1px solid var(--border)" : "none",
                        borderLeft: !isEven ? "1px solid var(--border)" : "none",
                        order: isEven ? 0 : 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                    }}>
                        <div style={{ fontSize: "4rem", marginBottom: 20 }}>{service.icon}</div>
                        <h3 style={{ fontSize: "3rem", fontWeight: 900, color: service.color, lineHeight: 1 }}>{service.acronym}</h3>
                        <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 8 }}>{service.full}</p>
                        <div style={{ display: "flex", gap: 10, marginTop: 24, flexWrap: "wrap", justifyContent: "center" }}>
                            {service.tools.map(t => (
                                <span key={t} style={{ fontSize: "0.65rem", padding: "4px 12px", border: `1px solid ${service.color}30`, borderRadius: 100, color: service.color }}>{t}</span>
                            ))}
                        </div>
                    </div>

                    {/* Content Side */}
                    <div style={{ padding: "40px", order: isEven ? 1 : 0 }}>
                        <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 24, fontSize: "1.05rem" }}>
                            {service.description}
                        </p>
                        <h4 style={{ fontSize: "0.9rem", color: "white", fontWeight: 700, marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.05em" }}>Workflow Steps:</h4>
                        <ul style={{ listStyle: "none", gap: 12, display: "flex", flexDirection: "column" }}>
                            {service.process.map((step, i) => (
                                <li key={i} style={{ display: "flex", gap: 12, color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                                    <span style={{ color: service.color, fontWeight: 700 }}>0{i + 1}</span>
                                    {step}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Reveal>
        </div>
    );
}

export default function SEOSection() {
    return (
        <section id="seo" style={{ padding: "120px 0", background: "var(--bg-secondary)", overflowX: "hidden" }}>
            <div className="container">
                <SectionHeader
                    badge="🚀 AI-Search Strategy"
                    title={<>Future-Proof <span className="gradient-text">Search Growth</span></>}
                    subtitle="Search is no longer just about Google. I build strategies that win on AI search engines, voice assistants, and LLM generative environments."
                />

                {seoServices.map((service, i) => (
                    <SEOCard key={service.acronym} service={service} index={i} />
                ))}

                <Reveal delay={0.4}>
                    <div style={{
                        marginTop: 40, padding: "24px", borderRadius: 20,
                        background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)",
                        textAlign: "center"
                    }}>
                        <p style={{ color: "rgba(255,255,255,0.7)", margin: 0, fontSize: "0.9rem" }}>
                            💡 <strong style={{ color: "white" }}>AI-Driven Efficiency:</strong> I leverage LLMs like ChatGPT to perform high-speed data analysis and content mapping for maximum SEO yield.
                        </p>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
