import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import {
  Phone,
  Clock,
  DollarSign,
  Zap,
  CheckCircle,
  Mail,
  MapPin,
  ExternalLink,
  ShieldCheck,
  PlugZap,
  MessageSquare,
  FileText,
} from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ASPIRE_LOGO =
  "https://raw.githubusercontent.com/scottyowen4683/Aspirereception/refs/heads/feature/ai-receptionist/frontend/aspire.png";
const LOCAL_BUY_LOGO =
  "https://raw.githubusercontent.com/scottyowen4683/Aspirereception/refs/heads/feature/ai-receptionist/frontend/src/localbuy.png";

const DEMO_NUMBER = "+61 7 4357 2749";
const BOOKING_URL =
  "https://calendly.com/scott-owen-aspire/ai-receptionist-demo";

const Home = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const SCRIPT_ID = "leadconnector-chatbot";
    if (document.getElementById(SCRIPT_ID)) return;

    const s = document.createElement("script");
    s.id = SCRIPT_ID;
    s.src = "https://widgets.leadconnectorhq.com/loader.js";
    s.setAttribute(
      "data-resources-url",
      "https://widgets.leadconnectorhq.com/chat-widget/loader.js"
    );
    s.setAttribute("data-widget-id", "68de330a0160d118b515f4b6");
    document.body.appendChild(s);
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${API}/contact`, formData);
      if (response.data.status === "success") {
        toast.success("Message Sent!", {
          description: "We’ll get back to you within 24 hours.",
        });
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        toast.error("Error", { description: "Unexpected response from server." });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error", {
        description:
          "Failed to send message. Please try again or email us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-slate-200 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <img src={ASPIRE_LOGO} alt="Aspire.AI" className="h-12 w-auto" />
          <nav className="hidden md:flex gap-8 items-center">
            {[
              ["#about", "About"],
              ["#services", "Services"],
              ["#automations", "Automations"],
              ["#features", "Features"],
              ["#pricing", "Pricing"],
              ["#contact", "Contact"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="text-slate-700 hover:text-blue-600 transition-colors font-medium"
              >
                {label}
              </a>
            ))}
            <a
              href="https://aspireexecutive.com.au"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-700 hover:text-blue-600 transition-colors font-medium flex items-center gap-1"
            >
              Executive Search <ExternalLink className="h-3 w-3" />
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-6 text-center max-w-5xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="block text-slate-900">Your business, on autopilot.</span>
            <span className="block text-blue-600 mt-1">
              AI that works like your best employee.
            </span>
          </h1>
          <p className="text-xl text-slate-700 mb-8 leading-relaxed max-w-3xl mx-auto">
            Aspire.AI gives you a digital team that never clocks off. It answers
            calls, messages customers, follows up leads, sends quotes, and
            automates the work that slows you down.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href={BOOKING_URL}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-md"
            >
              Book a Demo
            </a>
            <a
              href={`tel:${DEMO_NUMBER.replace(/\s/g, "")}`}
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg rounded-md flex items-center gap-2"
            >
              <Phone className="h-5 w-5" />
              Call the AI Demo: {DEMO_NUMBER}
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            AI that helps small businesses work smarter
          </h2>
          <p className="text-lg text-slate-700 mb-6">
            Aspire.AI builds intelligent reception and automation systems for
            businesses of all sizes — so owners can save time, reduce admin, and
            never miss a customer again.
          </p>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 bg-gradient-to-br from-blue-50 to-slate-50">
        <div className="container mx-auto px-6 max-w-6xl text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Smart Business Automation
          </h2>
          <p className="text-xl text-slate-600 mb-12">
            Turn missed calls and admin tasks into booked jobs and repeat customers.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Feature
              icon={<Clock />}
              title="Always On"
              text="Answers calls and messages instantly — 24/7."
            />
            <Feature
              icon={<DollarSign />}
              title="Cost-Effective"
              text="Save thousands a month compared with extra staff."
            />
            <Feature
              icon={<Zap />}
              title="Up and Running Fast"
              text="Go live in days, not months."
            />
            <Feature
              icon={<Phone />}
              title="Dependable"
              text="Consistent, professional responses every time."
            />
          </div>
        </div>
      </section>

      {/* Smart Automations (powered by n8n) */}
      <section
        id="automations"
        className="py-20 bg-gradient-to-br from-blue-600 to-indigo-600 text-white"
      >
        <div className="container mx-auto px-6 max-w-6xl text-center">
          <h2 className="text-4xl font-bold mb-6">Smart Automations That Do the Work for You</h2>
          <p className="text-lg mb-12 text-blue-100">
            Behind the scenes, Aspire.AI connects the dots between your phone,
            CRM, email, and payment systems — so things just happen automatically.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {[
              ["💬 Instant Quotes", "AI captures job details and emails or texts a quote automatically."],
              ["📧 Auto Follow-Ups", "Sends reminders for missed calls or unanswered quotes."],
              ["💳 Invoicing & Payments", "Creates invoices and payment links through Xero or Stripe."],
              ["⭐ Review & Referral Boost", "Requests Google reviews and tracks new referrals."],
              ["📅 Smart Scheduling", "Books and reschedules jobs across your team calendar."],
              ["📈 Weekly Summary", "Email digest of new leads, bookings, and revenue captured."],
              ["🧠 Lead Scoring", "Ranks new enquiries so you focus on high-value customers."],
              ["🔗 Integrations", "Connects to Gmail, Outlook, Google Sheets, or your CRM."],
            ].map(([title, desc]) => (
              <div
                key={title}
                className="bg-white/10 rounded-2xl p-6 hover:bg-white/20 transition-all"
              >
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-blue-100 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 bg-gradient-to-br from-blue-50 to-slate-50">
        <div className="container mx-auto px-6 text-center max-w-6xl">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Advanced Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Feature
              icon={<ShieldCheck />}
              title="Data Compliance"
              text="Privacy Act 1988 & APP aligned. Australian data residency."
            />
            <Feature
              icon={<PlugZap />}
              title="Seamless Integration"
              text="Connects easily with your existing tools and CRMs."
            />
            <Feature
              icon={<MessageSquare />}
              title="Voice + Chat AI"
              text="Unified inbound experience via phone and website chat."
            />
            <Feature
              icon={<FileText />}
              title="Full Transcripts"
              text="Access full conversation transcripts for quality and insight."
            />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section
        id="pricing"
        className="py-16 bg-gradient-to-br from-blue-50 to-slate-50"
      >
        <div className="container mx-auto px-6 max-w-6xl text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            Pricing & Packages
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <Package
              name="Starter"
              price="$1,500 / mo"
              features={[
                "1 AI receptionist (voice or chat)",
                "Smart follow-ups",
                "Basic dashboard",
              ]}
            />
            <Package
              name="Growth"
              price="$2,500 / mo"
              highlighted
              features={[
                "Voice + chat agents",
                "Automations (quotes, reminders, reviews)",
                "Integrations & reporting",
              ]}
            />
            <Package
              name="Pro"
              price="$3,500+ / mo"
              features={[
                "Multi-location or custom workflows",
                "Full automation suite",
                "Dedicated support",
              ]}
            />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="py-20 bg-gradient-to-br from-slate-900 to-blue-900 text-white"
      >
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Automate Your Business?
            </h2>
            <p className="text-xl text-blue-100">
              Let Aspire.AI handle the calls, follow-ups, and admin — so you can
              focus on growth.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Email Us</p>
                    <a
                      href="mailto:scott@aspireexecutive.com.au"
                      className="text-blue-200 hover:text-white transition-colors"
                    >
                      scott@aspireexecutive.com.au
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Location</p>
                    <p className="text-blue-200">Australia</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ExternalLink className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Executive Services</p>
                    <a
                      href="https://aspireexecutive.com.au"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-200 hover:text-white transition-colors"
                    >
                      aspireexecutive.com.au
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white placeholder:text-blue-200"
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white placeholder:text-blue-200"
                />
                <input
                  name="phone"
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white placeholder:text-blue-200"
                />
                <textarea
                  name="message"
                  placeholder="Tell us about your needs..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white placeholder:text-blue-200"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-3 font-medium"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <img src={ASPIRE_LOGO} alt="Aspire.AI" className="h-8 w-auto" />
            <span className="text-sm">
              © {new Date().getFullYear()} Aspire.AI — Powered by Aspire Executive Solutions.
            </span>
          </div>
          <div className="flex gap-6">
            <a href="#about" className="hover:text-white">About</a>
            <a href="#services" className="hover:text-white">Services</a>
            <a href="#automations" className="hover:text-white">Automations</a>
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#pricing" className="hover:text-white">Pricing</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

/* Helper Components */
const Feature = ({ icon, title, text }) => (
  <div className="rounded-2xl border-2 border-slate-200 hover:border-blue-600 transition-all hover:shadow-xl group bg-white p-6">
    <div className="bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
      {React.cloneElement(icon, {
        className: "h-7 w-7 text-blue-600 group-hover:text-white transition-colors",
      })}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
    <p className="text-slate-600 text-sm">{text}</p>
  </div>
);

const Package = ({ name, price, features, highlighted }) => (
  <div
    className={`rounded-2xl p-6 ${
      highlighted
        ? "border border-blue-300 bg-blue-50"
        : "border border-slate-200 bg-white"
    }`}
  >
    <p className="text-sm font-semibold">{name}</p>
    <p className="mt-2 text-3xl font-extrabold">{price}</p>
    <ul className="mt-4 space-y-2 text-sm text-slate-700">
      {features.map((f) => (
        <li key={f}>• {f}</li>
      ))}
    </ul>
    <a
      href="#contact"
      className="mt-6 inline-block rounded-xl px-4 py-2 text-white font-semibold bg-blue-600 hover:bg-blue-700"
    >
      Contact Us Now
    </a>
  </div>
);

export default Home;
