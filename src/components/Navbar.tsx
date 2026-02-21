"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Logo from "./Logo";

const navLinks = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "SEO/AI", href: "#seo" },
];

const menuVariants: Variants = {
    closed: {
        opacity: 0,
        x: "100%",
        transition: {
            duration: 0.5,
            ease: "easeInOut",
            staggerChildren: 0.1,
            staggerDirection: -1,
        },
    },
    open: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut",
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const linkVariants: Variants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 },
};

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        const handleResize = () => {
            if (window.innerWidth > 992 && mobileOpen) {
                setMobileOpen(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleResize);

        // Prevent body scroll when menu is open
        if (mobileOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
            document.body.style.overflow = "unset";
        };
    }, [mobileOpen]);

    const scrollTo = (id: string) => {
        setMobileOpen(false);
        const el = document.querySelector(id);
        if (el) {
            const offset = 80;
            const elementPosition = el.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                style={{
                    position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
                    padding: scrolled ? "12px 0" : "24px 0",
                    background: scrolled ? "rgba(5, 5, 16, 0.85)" : "transparent",
                    backdropFilter: scrolled ? "blur(20px)" : "none",
                    borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
                    transition: "padding 0.35s cubic-bezier(0.22, 1, 0.36, 1), background 0.35s ease",
                }}
            >
                <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    {/* Logo */}
                    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{
                        background: "none", border: "none", cursor: "pointer",
                        display: "flex", alignItems: "center", gap: 12
                    }}>
                        <Logo size={scrolled ? 30 : 34} animate={false} />
                        <span style={{
                            fontSize: scrolled ? "1rem" : "1.1rem",
                            fontWeight: 800,
                            letterSpacing: "-0.02em",
                            transition: "all 0.3s ease",
                            color: "white"
                        }}>
                            Johny<span className="gradient-text"> Dev</span>
                        </span>
                    </button>

                    {/* Desktop Links */}
                    <nav role="navigation" className="desktop-nav" style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        {navLinks.map((link) => (
                            <button
                                key={link.label}
                                onClick={() => scrollTo(link.href)}
                                className="nav-link"
                                style={{
                                    background: "none", border: "none", cursor: "pointer",
                                    padding: "8px 16px", fontSize: "0.85rem", fontWeight: 600,
                                    color: "rgba(255,255,255,0.7)", transition: "all 0.3s ease",
                                    position: "relative"
                                }}
                            >
                                {link.label}
                                <span className="underline"></span>
                            </button>
                        ))}
                        <button
                            onClick={() => scrollTo("#contact")}
                            className="btn-primary"
                            style={{ padding: "9px 22px", fontSize: "0.85rem", marginLeft: 8 }}
                        >
                            <span>Hire Me</span>
                        </button>
                    </nav>

                    {/* Mobile Toggle */}
                    <button
                        className="mobile-toggle"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle Menu"
                        style={{
                            background: "none", border: "none", cursor: "pointer",
                            display: "none", position: "relative", zIndex: 1001,
                            width: 30, height: 20
                        }}
                    >
                        <span style={{
                            position: "absolute", top: 0, left: 0, width: "100%", height: 2,
                            background: "white", borderRadius: 2, transition: "0.3s ease",
                            transform: mobileOpen ? "translateY(9px) rotate(45deg)" : "none"
                        }} />
                        <span style={{
                            position: "absolute", top: 9, left: 0, width: mobileOpen ? "100%" : "70%", height: 2,
                            background: "white", borderRadius: 2, transition: "0.3s ease",
                            opacity: mobileOpen ? 0 : 1
                        }} />
                        <span style={{
                            position: "absolute", bottom: 0, left: 0, width: "100%", height: 2,
                            background: "white", borderRadius: 2, transition: "0.3s ease",
                            transform: mobileOpen ? "translateY(-9px) rotate(-45deg)" : "none"
                        }} />
                    </button>
                </div>
            </motion.header>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        variants={menuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        style={{
                            position: "fixed", inset: 0, background: "rgba(5,5,16,0.95)", zIndex: 999,
                            backdropFilter: "blur(20px)",
                            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10
                        }}
                    >
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 15, width: "100%" }}>
                            {navLinks.map((link) => (
                                <motion.button
                                    key={link.label}
                                    variants={linkVariants}
                                    onClick={() => scrollTo(link.href)}
                                    style={{
                                        background: "none", border: "none", color: "white",
                                        fontSize: "2.5rem", fontWeight: 800, letterSpacing: "-0.03em",
                                        padding: "10px 20px"
                                    }}
                                >
                                    <span className="mobile-link-text">{link.label}</span>
                                </motion.button>
                            ))}
                            <motion.button
                                variants={linkVariants}
                                onClick={() => scrollTo("#contact")}
                                className="btn-primary"
                                style={{ padding: "18px 48px", marginTop: 30, fontSize: "1.1rem" }}
                            >
                                Hire Me
                            </motion.button>
                        </div>

                        {/* Background Ornament for Mobile Menu */}
                        <div style={{
                            position: "absolute", bottom: "-10%", left: "-10%", width: "60%", height: "60%",
                            background: "radial-gradient(circle, rgba(0,212,255,0.15) 0%, rgba(5,5,16,0) 70%)",
                            filter: "blur(60px)", pointerEvents: "none", zIndex: -1
                        }} />
                        <div style={{
                            position: "absolute", top: "-10%", right: "-10%", width: "60%", height: "60%",
                            background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, rgba(5,5,16,0) 70%)",
                            filter: "blur(60px)", pointerEvents: "none", zIndex: -1
                        }} />
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                .nav-link:hover { color: white !important; }
                .nav-link .underline {
                    position: absolute; bottom: 4px; left: 16px; right: 16px;
                    height: 1.5px; background: var(--gradient-accent);
                    transform: scaleX(0); transform-origin: right;
                    transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
                }
                .nav-link:hover .underline {
                    transform: scaleX(1); transform-origin: left;
                }
                
                .mobile-link-text {
                    position: relative;
                    transition: all 0.3s ease;
                }
                .mobile-link-text:hover {
                    color: var(--accent-cyan);
                    transform: skewX(-5deg);
                }

                @media (max-width: 992px) {
                    .desktop-nav { display: none !important; }
                    .mobile-toggle { display: block !important; }
                }

                @media (max-width: 480px) {
                    header { padding: 16px 0 !important; }
                }
            `}</style>
        </>
    );
}

