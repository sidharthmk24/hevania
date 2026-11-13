import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { ArrowLeft, Scale, Clock, ShieldAlert, Sparkles, Building2, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions | HEVANIYA",
  description: "Terms and conditions governing event bookings and estate usage at HEVANIYA.",
};

export default function TermsAndConditionsPage() {
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
              Hospitality &amp; Venue Agreement
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal text-[#2F3E2F] tracking-tight mb-4">
              Terms &amp; Conditions
            </h1>
            <p className="text-sm text-[#425042]/70 font-light">
              Last updated: November 2026 • Effective Date: November 2026
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
            <div className="p-5 border border-[#2F3E2F]/10 bg-white/40">
              <Scale className="w-5 h-5 text-[#C6A75E] mb-3" />
              <h4 className="text-sm font-medium uppercase tracking-wider mb-1">Clear Bookings</h4>
              <p className="text-xs text-[#425042]/80 leading-relaxed font-light">
                Transparent reservations, scheduling, and buyout agreements tailored to your celebration.
              </p>
            </div>
            <div className="p-5 border border-[#2F3E2F]/10 bg-white/40">
              <Sparkles className="w-5 h-5 text-[#C6A75E] mb-3" />
              <h4 className="text-sm font-medium uppercase tracking-wider mb-1">Estate Preservation</h4>
              <p className="text-xs text-[#425042]/80 leading-relaxed font-light">
                Guidelines in place to protect our natural riverside landscape and peaceful ambience.
              </p>
            </div>
            <div className="p-5 border border-[#2F3E2F]/10 bg-white/40">
              <Building2 className="w-5 h-5 text-[#C6A75E] mb-3" />
              <h4 className="text-sm font-medium uppercase tracking-wider mb-1">Vendor Synergy</h4>
              <p className="text-xs text-[#425042]/80 leading-relaxed font-light">
                Smooth coordination standards for catering, decor, and technical production crews.
              </p>
            </div>
          </div>

          {/* Terms Content */}
          <div className="space-y-10 text-sm md:text-base font-light text-[#425042]/90 leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-serif text-[#2F3E2F] font-normal">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing this website, submitting an inquiry, or executing a reservation agreement with <strong>HEVANIYA</strong> (&ldquo;HEVANIYA,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), you acknowledge and agree to comply with and be bound by these Terms &amp; Conditions. If you do not agree with any part of these terms, please do not use our services or proceed with a booking.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-serif text-[#2F3E2F] font-normal">
                2. Venue Inquiries &amp; Reservations
              </h2>
              <p>
                All website submissions, tour inquiries, and availability indicators are subject to formal confirmation by HEVANIYA. A reservation is officially confirmed only upon:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#425042]/80">
                <li>Mutual execution of our bespoke Event License Agreement.</li>
                <li>Receipt of the specified non-refundable reservation deposit.</li>
                <li>Approval of event scope, schedule, and expected guest headcount.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-serif text-[#2F3E2F] font-normal">
                3. Cancellation &amp; Rescheduling Policy
              </h2>
              <p>
                Due to the exclusive nature of our estate and limited booking availability, cancellations and rescheduling requests are subject to the specific terms set out in your Event License Agreement. Notice of cancellation must be submitted in writing. While booking deposits are generally non-refundable, rescheduling requests made well in advance may be accommodated at management discretion subject to date availability.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-serif text-[#2F3E2F] font-normal">
                4. Estate Conduct &amp; Safety Guidelines
              </h2>
              <p>
                To preserve the tranquil riverside setting and ensure guest safety, all hosts and their attendees must adhere to the following standards:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#425042]/80">
                <li>
                  <strong>Environmental Harmony:</strong> No harmful chemicals, single-use plastics, or damaging installations are permitted on the estate lawns or waterfront perimeter.
                </li>
                <li>
                  <strong>Sound Regulations:</strong> Outdoor amplified sound must comply with local government noise curfew regulations and HEVANIYA estate guidelines.
                </li>
                <li>
                  <strong>Riverside Safety:</strong> Guests must exercise caution near the riverbank. Unsupervised access to water bodies or unauthorized watercraft docking is prohibited.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-serif text-[#2F3E2F] font-normal">
                5. Third-Party Vendors &amp; Production Crews
              </h2>
              <p>
                Clients may engage outside decorators, florists, caterers, and entertainment teams, provided that all vendors complete our pre-event technical review, sign the estate vendor compliance protocol, and provide proof of appropriate insurance where required. HEVANIYA reserves the right to deny setup to vendors who fail to meet safety standards.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-serif text-[#2F3E2F] font-normal">
                6. Intellectual Property &amp; Photography
              </h2>
              <p>
                The branding, images, logos, copy, and architectural representations featured on this website are the proprietary property of HEVANIYA. Commercial photography, drone recording, or videography across the estate grounds requires prior written permission from estate management.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-serif text-[#2F3E2F] font-normal">
                7. Limitation of Liability
              </h2>
              <p>
                HEVANIYA is not liable for indirect, incidental, or consequential damages resulting from unforeseen weather disruptions, power failures beyond our generator capability, or the conduct of individual guests and independent third-party vendors. Hosts are strongly encouraged to obtain event cancellation and liability coverage.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-serif text-[#2F3E2F] font-normal">
                8. Governing Law &amp; Jurisdiction
              </h2>
              <p>
                These Terms &amp; Conditions and any disputes arising under or related to your use of HEVANIYA facilities or services shall be governed by and construed in accordance with the laws of India, subject to the exclusive jurisdiction of the competent courts in Kerala, India.
              </p>
            </section>

            <section className="space-y-3 pt-6 border-t border-[#2F3E2F]/10">
              <h2 className="text-xl md:text-2xl font-serif text-[#2F3E2F] font-normal">
                9. Inquiries Regarding Terms
              </h2>
              <p>
                For any clarifications regarding our venue policies, contract terms, or special accommodations, please contact our concierge:
              </p>
              <div className="p-6 bg-white/50 border border-[#2F3E2F]/10 space-y-2 text-xs md:text-sm">
                <p><strong>HEVANIYA Estate Management</strong></p>
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

