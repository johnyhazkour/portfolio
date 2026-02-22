"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MessageCircle, Linkedin, Check, Copy, ArrowRight, Loader2 } from "lucide-react";
import { Reveal, LineReveal } from "./AnimationUtils";

const services = [
    "Website Development",
    "Bug Fixing & Recovery",
    "Shopify E-Commerce",
    "Meta Pixel / Catalog API",
    "Japanese Keyword Hack Cleanup",
    "SEO / AEO / GEO / SGE",
    "Performance Optimization",
    "Security & Malware Removal",
    "Other",
];

const contacts = [
    { icon: <Mail size={20} />, label: "Email", value: "johnyhazkour@gmail.com", href: "mailto:johnyhazkour@gmail.com", color: "#ffffff" },
    { icon: <MessageCircle size={20} />, label: "WhatsApp", value: "+961 71 234 567", href: "https://wa.me/96171234567", color: "#cccccc" },
    { icon: <Linkedin size={20} />, label: "LinkedIn", value: "In/johny-hazkour", href: "https://www.linkedin.com/in/johny-hazkour-8b40921ab", color: "#aaaaaa" },
];

type FieldName = "name" | "email" | "service" | "message";
type FormState = Record<FieldName, string>;
type Errors = Partial<Record<FieldName, string>>;

function validate(form: FormState): Errors {
    const errs: Errors = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email address";
    if (!form.message.trim()) errs.message = "Message is required";
    else if (form.message.trim().length < 20) errs.message = "Message too short (min 20 chars)";
    return errs;
}

function FloatingInput({
    label, id, type = "text", placeholder, value, onChange, error, required,
}: {
    label: string; id: FieldName; type?: string; placeholder: string;
    value: string; onChange: (v: string) => void; error?: string; required?: boolean;
}) {
    const [focused, setFocused] = useState(false);
    const filled = value.length > 0;

    return (
        <div style={{ position: "relative", paddingTop: 18 }}>
            {/* Floating label */}
            <label
                htmlFor={id}
                style={{
                    position: "absolute",
                    left: 16,
                    top: focused || filled ? 2 : 30,
                    fontSize: focused || filled ? "0.68rem" : "0.9rem",
                    color: error ? "#f87171" : focused ? "rgba(255,255,255,0.9)" : "var(--text-muted)",
                    fontWeight: 500,
                    pointerEvents: "none",
                    transition: "all 0.25s cubic-bezier(0.25,0.1,0.25,1)",
                    letterSpacing: focused || filled ? "0.06em" : "0",
                    textTransform: focused || filled ? "uppercase" : "none",
                    zIndex: 1,
                }}
            >
                {label}{required && " *"}
            </label>
            <input
                id={id}
                type={type}
                placeholder={focused ? placeholder : ""}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                style={{
                    width: "100%",
                    background: focused
                        ? "rgba(255,255,255,0.04)"
                        : "rgba(255,255,255,0.025)",
                    border: "none",
                    borderBottom: `2px solid ${error ? "#f87171" : focused ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.12)"
                        }`,
                    borderRadius: "12px 12px 0 0",
                    padding: "14px 16px 10px",
                    color: "white",
                    fontFamily: "var(--font-main)",
                    fontSize: "0.95rem",
                    outline: "none",
                    transition: "all 0.25s ease",
                    boxShadow: focused ? "0 4px 20px rgba(255,255,255,0.04)" : "none",
                }}
            />
            {/* Animated scan underline */}
            {focused && (
                <motion.div
                    layoutId={`underline-${id}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    style={{
                        position: "absolute",
                        bottom: error ? undefined : 0,
                        left: 0, right: 0,
                        height: 2,
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
                        transformOrigin: "50%",
                    }}
                />
            )}
            <AnimatePresence>
                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        style={{ color: "#f87171", fontSize: "0.73rem", marginTop: 4, marginLeft: 4 }}
                    >
                        {error}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function ContactSection() {
    const [form, setForm] = useState<FormState>({ name: "", email: "", service: "", message: "" });
    const [errors, setErrors] = useState<Errors>({});
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [focusedTextarea, setFocusedTextarea] = useState(false);
    const [copied, setCopied] = useState(false);

    const copyEmail = () => {
        navigator.clipboard.writeText("johnyhazkour@gmail.com");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const set = (field: FieldName) => (v: string) => {
        setForm((f) => ({ ...f, [field]: v }));
        if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const errs = validate(form);
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }
        setStatus("sending");
        try {
            // Using Web3Forms for static site compatibility
            const formData = new FormData();
            // Your permanent Web3Forms access key
            const WEB3FORMS_KEY = "a5a7f313-a6f1-4bb8-a838-f51f48c31eff";
            formData.append("access_key", WEB3FORMS_KEY);
            formData.append("name", form.name);
            formData.append("email", form.email);
            formData.append("service", form.service);
            formData.append("message", form.message);
            formData.append("from_name", "Portfolio Contact Form");
            formData.append("subject", `New Message from ${form.name}`);

            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await res.json();
            console.log("Web3Forms response:", data);
            if (data.success) {
                setStatus("sent");
                setForm({ name: "", email: "", service: "", message: "" });
            } else {
                throw new Error(data.message || "Failed to send message");
            }
        } catch (err: unknown) {
            console.error("Form error:", err);
            const message = err instanceof Error ? err.message : "Unexpected error during submission";
            setErrorMessage(message);
            setStatus("error");
        }
    };

    return (
        <section id="contact" style={{ padding: "120px 0", background: "var(--bg-secondary)", position: "relative", overflowX: "hidden" }}>
            {/* Background orbs */}
            <motion.div
                animate={{ opacity: [0.03, 0.07, 0.03] }}
                transition={{ duration: 6, repeat: Infinity }}
                style={{
                    position: "absolute", top: "15%", left: "-8%", width: 500, height: 500,
                    background: "radial-gradient(circle, rgba(255,255,255,1) 0%, transparent 70%)",
                    borderRadius: "50%", filter: "blur(80px)", zIndex: 0,
                }}
            />
            <motion.div
                animate={{ opacity: [0.02, 0.05, 0.02] }}
                transition={{ duration: 8, repeat: Infinity, delay: 2 }}
                style={{
                    position: "absolute", bottom: "10%", right: "-5%", width: 450, height: 450,
                    background: "radial-gradient(circle, rgba(255,255,255,1) 0%, transparent 70%)",
                    borderRadius: "50%", filter: "blur(80px)", zIndex: 0,
                }}
            />

            <div className="container" style={{ position: "relative", zIndex: 1 }}>
                {/* Section header */}
                <div style={{ textAlign: "center", marginBottom: 80 }}>
                    <Reveal>
                        <span className="badge badge-cyan" style={{ marginBottom: 20, display: "inline-flex" }}>
                            📬 Let's Work Together
                        </span>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, marginBottom: 16 }}>
                            Start Your{" "}
                            <span className="gradient-text">Digital Transformation</span>
                        </h2>
                    </Reveal>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <LineReveal delay={0.25} width="80px" style={{ margin: "0 auto 20px" }} />
                    </div>
                    <Reveal delay={0.3}>
                        <p style={{ color: "var(--text-secondary)", maxWidth: 520, margin: "0 auto", fontSize: "1rem" }}>
                            Tell me about your project. I'll get back within{" "}
                            <strong style={{ color: "white" }}>24 hours</strong>.
                        </p>
                    </Reveal>
                </div>

                <div className="contact-info-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 52, alignItems: "start" }}>

                    {/* ── Left: contact info ─────────── */}
                    <Reveal direction="left" delay={0.2}>
                        <div>
                            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: 24 }}>Contact Info</h3>

                            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 36 }}>
                                {contacts.map((c, i) => (
                                    <motion.a
                                        key={i}
                                        href={c.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ x: 8, borderColor: `${c.color}50`, background: `${c.color}08` }}
                                        style={{
                                            display: "flex", alignItems: "center", gap: 14,
                                            padding: "18px 20px",
                                            borderRadius: 14,
                                            background: "rgba(255,255,255,0.025)",
                                            border: "1px solid var(--border)",
                                            textDecoration: "none",
                                            transition: "border-color 0.2s, background 0.2s",
                                        }}
                                    >
                                        <div style={{
                                            width: 42, height: 42, borderRadius: 11,
                                            background: `${c.color}15`,
                                            border: `1px solid ${c.color}30`,
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            fontSize: "1.2rem", flexShrink: 0,
                                        }}>
                                            {c.icon}
                                        </div>
                                        <div>
                                            <div style={{ color: "var(--text-muted)", fontSize: "0.7rem", marginBottom: 2, letterSpacing: "0.07em", textTransform: "uppercase" }}>{c.label}</div>
                                            <div style={{ color: "white", fontSize: "0.9rem", fontWeight: 500 }}>{c.value}</div>
                                        </div>
                                    </motion.a>
                                ))}
                            </div>

                            {/* Emergency note */}
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                style={{
                                    padding: "18px 20px",
                                    borderRadius: 14,
                                    background: "linear-gradient(135deg, rgba(240,192,64,0.08), rgba(224,123,32,0.04))",
                                    border: "1px solid rgba(240,192,64,0.2)",
                                }}
                            >
                                <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: 1.8, margin: 0 }}>
                                    <span style={{ color: "var(--accent-gold)" }}>⚡ Emergency support available.</span>{" "}
                                    For hacked sites & critical errors, I offer rapid 24/7 recovery service.
                                </p>
                            </motion.div>

                            {/* Response time */}
                            <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 10 }}>
                                <motion.div
                                    animate={{ scale: [1, 1.3, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent-green)", boxShadow: "0 0 8px var(--accent-green)" }}
                                />
                                <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
                                    Typically responds in <strong style={{ color: "white" }}>2–4 hours</strong>
                                </span>
                            </div>
                        </div>
                    </Reveal>

                    {/* ── Right: form ────────────────── */}
                    <Reveal direction="right" delay={0.3}>
                        <AnimatePresence mode="wait">
                            {status === "sent" ? (
                                <motion.div
                                    key="success"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ type: "spring", stiffness: 200 }}
                                    style={{
                                        textAlign: "center", padding: "64px 40px",
                                        background: "rgba(0,255,170,0.04)",
                                        border: "1px solid rgba(0,255,170,0.2)",
                                        borderRadius: 24,
                                    }}
                                >
                                    <motion.div
                                        animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                                        transition={{ duration: 0.6 }}
                                        style={{ fontSize: "4rem", marginBottom: 20 }}
                                    >
                                        🎉
                                    </motion.div>
                                    <h3 style={{ fontSize: "1.6rem", fontWeight: 700, marginBottom: 12 }}>Message Sent!</h3>
                                    <p style={{ color: "var(--text-secondary)", marginBottom: 24 }}>
                                        Thank you! I'll get back to you at <strong style={{ color: "white" }}>{form.email}</strong> within 24 hours.
                                    </p>
                                    <LineReveal width="60px" style={{ margin: "0 auto" }} color="var(--accent-green)" />
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    onSubmit={handleSubmit}
                                    initial={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    noValidate
                                    style={{
                                        background: "rgba(255,255,255,0.02)",
                                        border: "1px solid var(--border)",
                                        borderRadius: 24,
                                        padding: "36px",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 24,
                                    }}
                                >
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                                        <FloatingInput label="Your Name" id="name" placeholder="John Smith" value={form.name} onChange={set("name")} error={errors.name} required />
                                        <FloatingInput label="Email" id="email" type="email" placeholder="you@example.com" value={form.email} onChange={set("email")} error={errors.email} required />
                                    </div>

                                    {/* Service selector */}
                                    <div>
                                        <label style={{ display: "block", color: "var(--text-muted)", fontSize: "0.68rem", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8, fontWeight: 500 }}>
                                            Service Needed
                                        </label>
                                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                            {services.map((s) => (
                                                <motion.button
                                                    key={s}
                                                    type="button"
                                                    whileHover={{ scale: 1.04 }}
                                                    whileTap={{ scale: 0.96 }}
                                                    onClick={() => set("service")(form.service === s ? "" : s)}
                                                    style={{
                                                        padding: "7px 16px",
                                                        borderRadius: 100,
                                                        border: `1px solid ${form.service === s ? "var(--accent-cyan)" : "var(--border)"}`,
                                                        background: form.service === s ? "rgba(0,212,255,0.12)" : "transparent",
                                                        color: form.service === s ? "var(--accent-cyan)" : "var(--text-secondary)",
                                                        fontSize: "0.78rem",
                                                        fontWeight: 500,
                                                        cursor: "pointer",
                                                        fontFamily: "var(--font-main)",
                                                        transition: "all 0.2s",
                                                    }}
                                                >
                                                    {s}
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Message textarea */}
                                    <div style={{ position: "relative", paddingTop: 18 }}>
                                        <label
                                            htmlFor="message"
                                            style={{
                                                position: "absolute",
                                                left: 16,
                                                top: focusedTextarea || form.message ? 2 : 30,
                                                fontSize: focusedTextarea || form.message ? "0.68rem" : "0.9rem",
                                                color: errors.message ? "#f87171" : focusedTextarea ? "var(--accent-cyan)" : "var(--text-muted)",
                                                fontWeight: 500,
                                                pointerEvents: "none",
                                                transition: "all 0.25s ease",
                                                letterSpacing: focusedTextarea || form.message ? "0.06em" : "0",
                                                textTransform: focusedTextarea || form.message ? "uppercase" : "none",
                                                zIndex: 1,
                                            }}
                                        >
                                            Project Details *
                                        </label>
                                        <textarea
                                            id="message"
                                            rows={5}
                                            placeholder={focusedTextarea ? "Describe your project, current issues, or what you need help with..." : ""}
                                            value={form.message}
                                            onChange={(e) => { set("message")(e.target.value); }}
                                            onFocus={() => setFocusedTextarea(true)}
                                            onBlur={() => setFocusedTextarea(false)}
                                            style={{
                                                width: "100%",
                                                background: focusedTextarea ? "rgba(0,212,255,0.04)" : "rgba(255,255,255,0.025)",
                                                border: "none",
                                                borderBottom: `2px solid ${errors.message ? "#f87171" : focusedTextarea ? "var(--accent-cyan)" : "rgba(255,255,255,0.12)"}`,
                                                borderRadius: "12px 12px 0 0",
                                                padding: "14px 16px 10px",
                                                color: "white",
                                                fontFamily: "var(--font-main)",
                                                fontSize: "0.95rem",
                                                outline: "none",
                                                resize: "vertical",
                                                lineHeight: 1.7,
                                                transition: "all 0.25s ease",
                                            }}
                                        />
                                        <AnimatePresence>
                                            {errors.message && (
                                                <motion.p
                                                    initial={{ opacity: 0, y: -6 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0 }}
                                                    style={{ color: "#f87171", fontSize: "0.73rem", marginTop: 4, marginLeft: 4 }}
                                                >
                                                    {errors.message}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* Error banner */}
                                    <AnimatePresence>
                                        {status === "error" && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0 }}
                                                style={{
                                                    padding: "12px 16px",
                                                    background: "rgba(248,113,113,0.1)",
                                                    border: "1px solid rgba(248,113,113,0.3)",
                                                    borderRadius: 10,
                                                    color: "#fca5a5",
                                                    fontSize: "0.85rem",
                                                }}
                                            >
                                                ❌ {errorMessage || "Something went wrong. Please try again."}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Submit button */}
                                    <motion.button
                                        type="submit"
                                        className="btn-primary"
                                        disabled={status === "sending"}
                                        whileHover={status !== "sending" ? { scale: 1.01 } : {}}
                                        whileTap={status !== "sending" ? { scale: 0.98 } : {}}
                                        style={{ width: "100%", fontSize: "1rem", padding: "17px", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}
                                    >
                                        {status === "sending" ? (
                                            <>
                                                <Loader2 className="animate-spin" size={20} />
                                                <span>Sending Project Details...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Send Message</span>
                                                <ArrowRight size={18} />
                                            </>
                                        )}
                                    </motion.button>

                                    <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 12 }}>
                                        <p style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>
                                            🔒 Secure direct delivery to johnyhazkour@gmail.com
                                        </p>
                                        <button
                                            type="button"
                                            onClick={copyEmail}
                                            style={{
                                                background: "none", border: "none", color: "var(--accent-cyan)",
                                                fontSize: "0.8rem", cursor: "pointer", display: "flex",
                                                alignItems: "center", justifyContent: "center", gap: 6,
                                                opacity: 0.8, transition: "opacity 0.2s"
                                            }}
                                            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                                            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.8")}
                                        >
                                            {copied ? <Check size={14} /> : <Copy size={14} />}
                                            {copied ? "Email Copied!" : "Click to copy email address as fallback"}
                                        </button>
                                    </div>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </Reveal>
                </div>
            </div>

            <style>{`
        @media (max-width: 1024px) {
          #contact > div.container > div:last-child {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
        @media (max-width: 768px) {
          #contact form > div:first-child {
            grid-template-columns: 1fr !important;
            gap: 15px !important;
          }
          #contact form {
            padding: 24px !important;
          }
        }
      `}</style>
        </section>
    );
}
