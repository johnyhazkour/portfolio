"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { SectionHeader, Reveal } from "./AnimationUtils";

const websites = [
    { url: "https://totalfenceconcepts.com/", name: "Total Fence Concepts", category: "Business", color: "#ffffff", image: "/portfolio/images/totalfence.png" },
    { url: "https://larabaakliny.com/", name: "Lara Baakl Iny", category: "Personal", color: "#cccccc", image: "/portfolio/images/larabaakl.png" },
    { url: "https://orcaunion.com", name: "Orca Union", category: "Corporate", color: "#eeeeee", image: "/portfolio/images/orca.png" },
    { url: "https://www.adamsfood-kuwait.com/", name: "Adams Food Kuwait", category: "Food & Delivery", color: "#dddddd", image: "/portfolio/images/adamsfood.png" },
    { url: "https://labelsbyme.com/", name: "Labels By Me", category: "E-Commerce", color: "#aaaaaa", image: "/portfolio/images/labels.png" },
    { url: "https://fiduciary1st.com/", name: "Fiduciary 1st", category: "Finance", color: "#ffffff", image: "/portfolio/images/fiduciary.png" },
    { url: "https://trypocketplan.com/", name: "Pocket Plan", category: "SaaS", color: "#bbbbbb", image: "/portfolio/images/pocketplan.png" },
    { url: "https://vetchat.live/", name: "VetChat Live", category: "Healthcare", color: "#cccccc", image: "/portfolio/images/vetchat.png" },
    { url: "https://accelerator.pocketplan.io/", name: "Pocket Plan Accelerator", category: "SaaS", color: "#eeeeee", image: "/portfolio/images/accelerator.png" },
    { url: "https://yachtseagate.com/", name: "Yacht Sea Gate", category: "Luxury", color: "#ffffff", image: "/portfolio/images/yacht.png" },
    { url: "https://mirnaelnar.com", name: "Mirna El Nar", category: "Personal", color: "#dddddd", image: "/portfolio/images/mirna.png" },
    { url: "https://sorbettilb.com/", name: "Sorbetti LB", category: "Food & Delivery", color: "#aaaaaa", image: "/portfolio/images/sorbetti.png" },
    { url: "https://roomgallery.com/", name: "Room Gallery", category: "Design", color: "#cccccc", image: "/portfolio/images/roomgallery.png" },
    { url: "https://antaakhi.org/", name: "Antaakhi", category: "Non-Profit", color: "#bbbbbb", image: "/portfolio/images/antaakhi.png" },
    { url: "https://octometrix.com/", name: "Octometrix", category: "Tech", color: "#eeeeee", image: "/portfolio/images/octometrix.png" },
    { url: "https://nakhoulcorp.com/", name: "Nakhoul Corp", category: "Corporate", color: "#ffffff", image: "/portfolio/images/nakhoul.png" },
    { url: "https://healthtechalley.org", name: "Health Tech Alley", category: "Healthcare", color: "#dddddd", image: "/portfolio/images/healthtech.png" },
    { url: "https://hubrenovationsnyc.com/", name: "Hub Renovations NYC", category: "Construction", color: "#cccccc", image: "/portfolio/images/hubNYC.png" },
    { url: "https://www.eyenetlb.com/", name: "Eyenet LB", category: "Optical", color: "#ffffff", image: "/portfolio/images/eyenet.png" },
    { url: "https://propertyprosuite.com/", name: "Property Pro Suite", category: "Real Estate", color: "#bbbbbb", image: "/portfolio/images/propertypro.png" },
    { url: "https://emplus.me/", name: "EM Plus", category: "Personal", color: "#eeeeee", image: "/portfolio/images/emplus.png" },
    { url: "https://zawajio.com/", name: "Zawajio", category: "Social", color: "#aaaaaa", image: "/portfolio/images/zawajio.png" },
    { url: "https://pocketplan.io/", name: "Pocketplan.io", category: "SaaS", color: "#ffffff", image: "/portfolio/images/pocketio.png" },
];

const categories = ["All", "SaaS", "E-Commerce", "Business", "Healthcare", "Corporate"];

function WebsiteCard({ site }: { site: typeof websites[0] }) {
    const [hovered, setHovered] = useState(false);
    const domain = new URL(site.url).hostname.replace("www.", "");

    return (
        <motion.div
            layout
            whileHover={{ y: -10 }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{ position: "relative" }}
        >
            <a href={site.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                <div style={{
                    background: `rgba(255,255,255,0.02)`,
                    border: `1px solid ${hovered ? site.color : "var(--border)"}`,
                    borderRadius: 20,
                    padding: 24,
                    transition: "all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)",
                    boxShadow: hovered ? `0 20px 60px ${site.color}15` : "none",
                }}>
                    {/* Mock Browser UI */}
                    <div style={{
                        background: "rgba(0,0,0,0.3)",
                        borderRadius: 12,
                        overflow: "hidden",
                        marginBottom: 20,
                        border: "1px solid rgba(255,255,255,0.05)",
                    }}>
                        <div style={{
                            background: "rgba(255,255,255,0.05)",
                            padding: "10px 14px",
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                        }}>
                            <div style={{ display: "flex", gap: 5 }}>
                                {["#ff5f56", "#ffbd2e", "#27c93f"].map((c, i) => (
                                    <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: c }} />
                                ))}
                            </div>
                            <div style={{
                                flex: 1, background: "rgba(255,255,255,0.03)",
                                borderRadius: 4, padding: "2px 10px",
                                fontSize: "0.6rem", color: "rgba(255,255,255,0.3)", textAlign: "center",
                            }}>
                                {domain}
                            </div>
                        </div>
                        <div style={{
                            height: 180,
                            width: "100%",
                            background: `linear-gradient(135deg, ${site.color}05, transparent)`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            position: "relative",
                            overflow: "hidden"
                        }}>
                            <Image
                                src={`${site.image}?v=1`}
                                alt={site.name}
                                fill
                                style={{
                                    objectFit: "cover",
                                    transition: "transform 0.5s ease",
                                    transform: hovered ? "scale(1.1)" : "scale(1)",
                                    opacity: 0.8
                                }}
                            />

                            {/* Animated scan line on hover */}
                            {hovered && (
                                <motion.div
                                    initial={{ top: "-100%" }}
                                    animate={{ top: "100%" }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                    style={{
                                        position: "absolute", left: 0, right: 0, height: "2px",
                                        background: `linear-gradient(90deg, transparent, ${site.color}, transparent)`,
                                        zIndex: 2,
                                    }}
                                />
                            )}
                        </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div>
                            <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "white", marginBottom: 6 }}>{site.name}</h4>
                            <span className="badge" style={{
                                background: `${site.color}10`, borderColor: `${site.color}20`, color: site.color,
                                fontSize: "0.65rem", padding: "4px 10px"
                            }}>
                                {site.category}
                            </span>
                        </div>
                        <div style={{
                            width: 36, height: 36, borderRadius: "50%",
                            background: "rgba(255,255,255,0.05)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: "0.9rem", color: "white",
                            transition: "all 0.3s",
                            ...(hovered ? { background: "rgba(255,255,255,0.15)", color: "black", transform: "rotate(45deg)" } : {})
                        }}>
                            ↗
                        </div>
                    </div>
                </div>
            </a>
        </motion.div>
    );
}

export default function PortfolioSection() {
    const [activeCat, setActiveCat] = useState("All");

    const filtered = activeCat === "All"
        ? websites
        : websites.filter(w => w.category === activeCat);

    return (
        <section id="portfolio" style={{ padding: "120px 0", overflowX: "hidden" }}>
            <div className="container">
                <SectionHeader
                    badge="💼 Portfolio"
                    title={<>23+ Success <span className="gradient-text">Stories</span> Delivered</>}
                    subtitle="I take pride in every line of code. From luxury brands to SaaS platforms, here's a look at the projects I've brought to life."
                />

                {/* Filter */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 60 }}>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCat(cat)}
                            className="btn-secondary"
                            style={{
                                padding: "8px 22px", borderRadius: 100, fontSize: "0.85rem",
                                background: activeCat === cat ? "rgba(255,255,255,0.1)" : "transparent",
                                borderColor: activeCat === cat ? "var(--accent-cyan)" : "var(--border)",
                                color: activeCat === cat ? "var(--accent-cyan)" : "var(--text-secondary)",
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid with stagger */}
                <AnimatePresence mode="popLayout">
                    <motion.div
                        layout
                        className="portfolio-grid"
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
                            gap: 24,
                        }}
                    >
                        {filtered.map((site, i) => (
                            <Reveal key={site.url} delay={i * 0.05} direction="scale">
                                <WebsiteCard site={site} />
                            </Reveal>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
