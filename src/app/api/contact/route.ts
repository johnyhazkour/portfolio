import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, service, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Please fill in Name, Email, and Message." }, { status: 400 });
    }

    const gmailUser = process.env.GMAIL_USER || "johnyhazkour@gmail.com";
    const gmailPass = process.env.GMAIL_APP_PASSWORD;

    if (!gmailPass || gmailPass === "your_16_char_app_password_here") {
      console.error("GMAIL_APP_PASSWORD is not configured in .env.local");
      return NextResponse.json({
        error: "Contact system is temporarily in maintenance. Please use the 'Copy Email' fallback below the form."
      }, { status: 503 });
    }

    // Create transporter using Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    const htmlBody = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; background: #050510; color: #ffffff; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; background: #0a0a1f; border: 1px solid rgba(0,212,255,0.2); border-radius: 16px; overflow: hidden; }
          .header { background: linear-gradient(135deg, #00d4ff22, #7c3aed22); padding: 40px 32px; text-align: center; border-bottom: 1px solid rgba(0,212,255,0.15); }
          .header h1 { margin: 0; font-size: 1.8rem; color: #00d4ff; }
          .header p { margin: 8px 0 0; color: rgba(255,255,255,0.6); font-size: 0.9rem; }
          .content { padding: 32px; }
          .field { margin-bottom: 24px; }
          .label { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.4); margin-bottom: 6px; }
          .value { color: #ffffff; font-size: 1rem; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 12px 16px; }
          .message-value { white-space: pre-wrap; line-height: 1.7; }
          .badge { display: inline-block; padding: 4px 14px; border-radius: 100px; font-size: 0.8rem; background: rgba(0,212,255,0.15); color: #00d4ff; border: 1px solid rgba(0,212,255,0.3); }
          .footer { padding: 20px 32px; border-top: 1px solid rgba(255,255,255,0.06); text-align: center; font-size: 0.8rem; color: rgba(255,255,255,0.3); }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📬 New Contact Request</h1>
            <p>Someone submitted your portfolio contact form</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">From</div>
              <div class="value">${name}</div>
            </div>
            <div class="field">
              <div class="label">Email</div>
              <div class="value"><a href="mailto:${email}" style="color:#00d4ff;text-decoration:none;">${email}</a></div>
            </div>
            ${service ? `<div class="field"><div class="label">Service Requested</div><div class="value"><span class="badge">🚀 ${service}</span></div></div>` : ""}
            <div class="field">
              <div class="label">Message</div>
              <div class="value message-value">${message.replace(/\n/g, "<br>")}</div>
            </div>
          </div>
          <div class="footer">
            Sent from johnydev.com portfolio contact form • ${new Date().toLocaleString("en-GB", { dateStyle: "full", timeStyle: "short" })}
          </div>
        </div>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: `"Johny Dev Portfolio" <${process.env.GMAIL_USER || "johnyhazkour@gmail.com"}>`,
      to: "johnyhazkour@gmail.com",
      replyTo: email,
      subject: `🌐 New Portfolio Inquiry from ${name}${service ? ` — ${service}` : ""}`,
      html: htmlBody,
      text: `New contact from ${name} (${email})\n\nService: ${service || "Not specified"}\n\nMessage:\n${message}`,
    });

    // Also send auto-reply to the sender
    await transporter.sendMail({
      from: `"Johny Dev" <${process.env.GMAIL_USER || "johnyhazkour@gmail.com"}>`,
      to: email,
      subject: `✅ Got your message, ${name.split(" ")[0]}! I'll be in touch soon.`,
      html: `
        <div style="font-family:'Segoe UI',Arial,sans-serif;background:#050510;color:#fff;padding:40px;max-width:500px;margin:0 auto;border-radius:16px;border:1px solid rgba(0,212,255,0.2);">
          <h2 style="color:#00d4ff;margin-top:0;">Thanks for reaching out! 🎉</h2>
          <p style="color:rgba(255,255,255,0.7);line-height:1.8;">Hi ${name.split(" ")[0]}, I've received your message and will get back to you within <strong style="color:#fff;">24 hours</strong>.</p>
          <p style="color:rgba(255,255,255,0.7);line-height:1.8;">In the meantime, feel free to check out more of my work at <a href="https://johnydev.com" style="color:#00d4ff;">johnydev.com</a>.</p>
          <hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:24px 0;"/>
          <p style="color:rgba(255,255,255,0.4);font-size:0.8rem;margin:0;">— Johny Dev | Web Expert & Digital Specialist</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json({ error: "Failed to send email. Please try again." }, { status: 500 });
  }
}
