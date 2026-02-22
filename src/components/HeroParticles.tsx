"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function HeroParticles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animId: number;
        let W = canvas.offsetWidth;
        let H = canvas.offsetHeight;
        canvas.width = W;
        canvas.height = H;

        const resize = () => {
            W = canvas.width = canvas.offsetWidth;
            H = canvas.height = canvas.offsetHeight;
        };
        window.addEventListener("resize", resize);

        // Particle system
        const NUM = 120;
        const particles: { x: number; y: number; vx: number; vy: number; size: number; color: string; opacity: number; pulse: number }[] = [];

        const colors = ["#00d4ff", "#7c3aed", "#f0c040", "#ec4899", "#00ffaa"];

        for (let i = 0; i < NUM; i++) {
            particles.push({
                x: Math.random() * W,
                y: Math.random() * H,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                size: Math.random() * 2 + 0.5,
                color: colors[Math.floor(Math.random() * colors.length)],
                opacity: Math.random() * 0.7 + 0.1,
                pulse: Math.random() * Math.PI * 2,
            });
        }

        // Mouse interaction
        let mouse = { x: W / 2, y: H / 2 };
        const onMouse = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };
        window.addEventListener("mousemove", onMouse);

        const draw = () => {
            ctx.clearRect(0, 0, W, H);

            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0, 212, 255, ${0.08 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            // Draw mouse connections
            particles.forEach((p) => {
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 180) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 212, 255, ${0.3 * (1 - dist / 180)})`;
                    ctx.lineWidth = 0.8;
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();

                    // Repel effect
                    p.vx -= (dx / dist) * 0.02;
                    p.vy -= (dy / dist) * 0.02;
                }
            });

            // Update and draw particles
            particles.forEach((p) => {
                p.pulse += 0.02;
                p.x += p.vx;
                p.y += p.vy;

                // Dampen
                p.vx *= 0.98;
                p.vy *= 0.98;

                // Boundary bounce
                if (p.x < 0) { p.x = 0; p.vx *= -1; }
                if (p.x > W) { p.x = W; p.vx *= -1; }
                if (p.y < 0) { p.y = 0; p.vy *= -1; }
                if (p.y > H) { p.y = H; p.vy *= -1; }

                const size = p.size * (1 + Math.sin(p.pulse) * 0.3);
                ctx.beginPath();
                ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.opacity * (0.7 + Math.sin(p.pulse) * 0.3);
                ctx.fill();
                ctx.globalAlpha = 1;

                // Glow
                const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 6);
                grd.addColorStop(0, p.color + "40");
                grd.addColorStop(1, "transparent");
                ctx.fillStyle = grd;
                ctx.beginPath();
                ctx.arc(p.x, p.y, size * 6, 0, Math.PI * 2);
                ctx.fill();
            });

            animId = requestAnimationFrame(draw);
        };

        draw();
        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onMouse);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                zIndex: 1,
            }}
        />
    );
}
