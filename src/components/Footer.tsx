"use client";
import { motion } from "framer-motion";
import Logo from "./Logo";
import { Reveal } from "./AnimationUtils";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const links = [
        { name: "About", href: "#about" },
        { name: "Services", href: "#services" },
        { name: "Portfolio", href: "#portfolio" },
        { name: "SEO/AI", href: "#seo" },
        { name: "Contact", href: "#contact" },
    ];

    const social = ["𝕏", "💼", "📸", "💬"];

    return (
        <footer style={{
            background: "var(--bg-primary)",
            borderTop: "1px solid var(--border)",
            padding: "80px 0 40px",
            position: "relative",
            overflow: "hidden",
        }}>
            <div className="container">
                <div className="footer-grid">
                    {/* Brand */}
                    <div className="footer-brand">
                        <Reveal>
                            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                                <Logo size={36} animate={false} />
                                <span style={{ fontSize: "1.2rem", fontWeight: 800 }}>
                                    Johny <span className="gradient-text">Dev</span>
                                </span>
                            </div>
                            <p style={{ color: "var(--text-secondary)", maxWidth: 320, lineHeight: 1.8, fontSize: "0.95rem" }}>
                                Professional web developer & security expert. Fixing broken websites and building future-proof digital experiences since 2018.
                            </p>
                            <div className="social-links" style={{ display: "flex", gap: 12, marginTop: 32 }}>
                                {social.map((s, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ scale: 1.15, background: "rgba(255,255,255,0.08)", borderColor: "var(--accent-cyan)" }}
                                        style={{
                                            width: 44, height: 44, borderRadius: 12,
                                            background: "rgba(255,255,255,0.03)",
                                            border: "1px solid var(--border)",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            cursor: "pointer", transition: "all 0.2s"
                                        }}
                                    >
                                        {s}
                                    </motion.div>
                                ))}
                            </div>
                        </Reveal>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-nav-col">
                        <h4 style={{ fontSize: "0.9rem", color: "white", fontWeight: 700, marginBottom: 24, textTransform: "uppercase", letterSpacing: "0.05em" }}>Navigation</h4>
                        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 14 }}>
                            {links.map((link) => (
                                <li key={link.name}>
                                    <a href={link.href} style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem", transition: "0.2s" }}
                                        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-cyan)")}
                                        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}>
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="footer-contact-col">
                        <h4 style={{ fontSize: "0.9rem", color: "white", fontWeight: 700, marginBottom: 24, textTransform: "uppercase", letterSpacing: "0.05em" }}>Let's Talk</h4>
                        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.8 }}>
                            johnyhazkour@gmail.com<br />
                            Emergency Support 24/7<br />
                            Beirut, Lebanon
                        </p>
                    </div>
                </div>

                <style>{`
                    .footer-grid {
                        display: grid;
                        grid-template-columns: 2fr 1fr 1fr;
                        gap: 60px;
                        margin-bottom: 80px;
                    }
                    @media (max-width: 1024px) {
                        .footer-grid {
                            grid-template-columns: 1fr !important;
                            gap: 48px !important;
                            margin-bottom: 48px !important;
                        }
                        .footer-brand, .footer-nav-col, .footer-contact-col {
                            grid-column: span 1 !important;
                            text-align: center !important;
                        }
                        .footer-brand div:first-child, .social-links {
                            justify-content: center !important;
                        }
                        .footer-brand p {
                            margin: 0 auto !important;
                        }
                    }
                `}</style>

                {/* Bottom Bar */}
                <div style={{
                    paddingTop: 40, borderTop: "1px solid var(--border)",
                    display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20
                }}>
                    <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }} suppressHydrationWarning>
                        © {currentYear} Johny Dev. All rights reserved.
                    </p>
                    <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                        Built with ❤️ using Next.js & Framer Motion
                    </p>
                </div>
            </div>
        </footer>
    );
}
