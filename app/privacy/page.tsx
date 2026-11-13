import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, Eye, FileText, Bell, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | HEVANIYA",
  description: "Privacy Policy and data practices for HEVANIYA luxury event venue.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar theme="dark" />
      <div className="min-h-screen bg-cream text-[#2F3E2F] pt-28 md:pt-36 pb-20">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#425042]/70 hover:text-[#425042] transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>

          {/* Header */}
          <div className="border-b border-[#2F3E2F]/15 pb-10 mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-[#C6A75E] font-medium mb-3">
              Legal & Transparency
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal text-[#2F3E2F] tracking-tight mb-4">
              Privacy Policy
            </h1>
            <p className="text-sm text-[#425042]/70 font-light">
              Last updated: November 2026 • Effective Date: November 2026
            </p>
          </div>

          {/* Quick Summary Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
            <div className="p-5 border border-[#2F3E2F]/10 bg-white/40">
              <ShieldCheck className="w-5 h-5 text-[#C6A75E] mb-3" />
              <h4 className="text-sm font-medium uppercase tracking-wider mb-1">Data Protection</h4>
              <p className="text-xs text-[#425042]/80 leading-relaxed font-light">
                We handle your guest and celebration details with strict confidentiality and care.
              </p>
            </div>
            <div className="p-5 border border-[#2F3E2F]/10 bg-white/40">
              <Eye className="w-5 h-5 text-[#C6A75E] mb-3" />
              <h4 className="text-sm font-medium uppercase tracking-wider mb-1">No Third-Party Sale</h4>
              <p className="text-xs text-[#425042]/80 leading-relaxed font-light">
                Your personal details are never rented or sold to advertisers or marketing lists.
              </p>
            </div>
            <div className="p-5 border border-[#2F3E2F]/10 bg-white/40">
              <Lock className="w-5 h-5 text-[#C6A75E] mb-3" />
              <h4 className="text-sm font-medium uppercase tracking-wider mb-1">Secure Inquiries</h4>
              <p className="text-xs text-[#425042]/80 leading-relaxed font-light">
                All booking submissions and contact forms are encrypted and securely stored.
              </p>
            </div>
          </div>

          {/* Policy Body */}
          <div className="space-y-10 text-sm md:text-base font-light text-[#425042]/90 leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-serif text-[#2F3E2F] font-normal">
                1. Introduction
              </h2>
              <p>
                Welcome to <strong>HEVANIYA</strong> (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;). We are committed to safeguarding the privacy and confidentiality of our guests, clients, and visitors who explore our riverside estate or utilize our online platforms. This Privacy Policy details our practices concerning the collection, use, and disclosure of your personal data when you access our website or engage with our event inquiry services.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-serif text-[#2F3E2F] font-normal">
                2. Information We Collect
              </h2>
              <p>
                We collect personal information that you voluntarily provide to us when expressing interest in our event venues, scheduling site visits, or subscribing to our updates. This includes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#425042]/80">
                <li>
                  <strong>Contact Information:</strong> Full name, email address, telephone number, and postal address.
                </li>
                <li>
                  <strong>Event &amp; Booking Particulars:</strong> Intended dates, estimated guest count, occasion type (wedding, corporate retreat, private celebration), catering preferences, and bespoke requirements.
                </li>
                <li>
                  <strong>Technical &amp; Usage Data:</strong> IP address, browser type, device identifiers, and page visit metrics collected automatically via standard analytics tools.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-serif text-[#2F3E2F] font-normal">
                3. How We Use Your Information
              </h2>
              <p>
                The information collected is used exclusively for legitimate business and hospitality purposes, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#425042]/80">
                <li>Responding to your reservations, scheduling private viewings, and preparing custom proposals.</li>
                <li>Communicating event coordination milestones, logistical confirmations, and hospitality arrangements.</li>
                <li>Ensuring the security, safety, and proper maintenance of our estate grounds and digital infrastructure.</li>
                <li>Improving our web presence, user experience, and curated service offerings.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-serif text-[#2F3E2F] font-normal">
                4. Information Sharing &amp; Disclosure
              </h2>
              <p>
                HEVANIYA does not sell, barter, or rent your personal information to third parties. We may disclose selective information solely to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#425042]/80">
                <li>
                  <strong>Verified Service Partners:</strong> Trusted vendors (such as catering directors, sound &amp; lighting technicians, or decor specialists) who assist in executing your celebration, bound by strict confidentiality obligations.
                </li>
                <li>
                  <strong>Legal &amp; Regulatory Authorities:</strong> When mandated by statutory requirements, court orders, or to protect the safety and legal rights of HEVANIYA and its guests.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-serif text-[#2F3E2F] font-normal">
                5. Data Security &amp; Storage
              </h2>
              <p>
                We implement rigorous technical and organizational security measures to protect your personal details against unauthorized access, alteration, disclosure, or accidental destruction. Your data is stored on secure cloud environments and access is strictly limited to authorized personnel.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-serif text-[#2F3E2F] font-normal">
                6. Cookies &amp; Tracking Technologies
              </h2>
              <p>
                Our website may utilize essential and analytical cookies to remember user preferences and understand audience traffic trends. You can manage or disable cookie settings in your web browser at any time without hindering essential site navigation.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-serif text-[#2F3E2F] font-normal">
                7. Your Rights
              </h2>
              <p>
                Depending on applicable data privacy laws, you may have the right to request access to the personal data we hold about you, request corrections or updates, or ask for deletion of your records from our active databases. To exercise these rights, please contact our concierge team.
              </p>
            </section>

            <section className="space-y-3 pt-6 border-t border-[#2F3E2F]/10">
              <h2 className="text-xl md:text-2xl font-serif text-[#2F3E2F] font-normal">
                8. Contact Our Team
              </h2>
              <p>
                If you have questions, feedback, or concerns regarding this Privacy Policy, please contact our privacy concierge:
              </p>
              <div className="p-6 bg-white/50 border border-[#2F3E2F]/10 space-y-2 text-xs md:text-sm">
                <p><strong>HEVANIYA Estate</strong></p>
                <p>Vaikom, Kottayam, Kerala, India</p>
                <p>Email: <a href="mailto:info@hevaniya.com" className="text-[#C6A75E] hover:underline">info@hevaniya.com</a></p>
                <p>Telephone: +91 8907 252255</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

