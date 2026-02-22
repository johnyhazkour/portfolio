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
                <div className="footer-flex">
                    {/* Brand */}
                    <div className="footer-brand">
                        <Reveal>
                            <div className="footer-logo-wrapper" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                                <Logo size={36} animate={false} />
                                <span style={{ fontSize: "1.2rem", fontWeight: 800 }}>
                                    Johny <span className="gradient-text">Dev</span>
                                </span>
                            </div>
                            <p style={{ color: "var(--text-secondary)", maxWidth: 320, lineHeight: 1.8, fontSize: "0.95rem" }}>
                                Professional web developer & security expert. Fixing broken websites and building future-proof digital experiences since 2018.
                            </p>
                        </Reveal>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-nav-col">
                        <h4 style={{ fontSize: "0.9rem", color: "white", fontWeight: 700, marginBottom: 24, textTransform: "uppercase", letterSpacing: "0.05em" }}>Navigation</h4>
                        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 14 }}>
                            {links.map((link) => (
                                <li key={link.name}>
                                    <a href={link.href} style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem", transition: "0.2s" }}
                                        onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
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
                        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.8, wordBreak: "break-all" }}>
                            johnyhazkour@gmail.com<br />
                            Emergency Support 24/7<br />
                            Beirut, Lebanon
                        </p>
                    </div>
                </div>

                <style>{`
                    .footer-flex {
                        display: flex;
                        justify-content: space-between;
                        gap: 60px;
                        margin-bottom: 80px;
                        flex-wrap: wrap;
                    }
                    .footer-brand { flex: 2 1 300px; }
                    .footer-nav-col { flex: 1 1 150px; }
                    .footer-contact-col { flex: 1 1 200px; }

                    @media (max-width: 991px) {
                        .footer-flex {
                            flex-direction: column;
                            align-items: center;
                            text-align: center;
                            gap: 40px;
                        }
                        .footer-brand, .footer-nav-col, .footer-contact-col {
                            flex: 1 1 100%;
                            width: 100%;
                        }
                        .footer-logo-wrapper {
                            justify-content: center;
                        }
                        .footer-brand p {
                            margin: 0 auto;
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
                </div>
            </div>
        </footer>
    );
}
