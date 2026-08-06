import React, { useState } from "react";
import logoDark from "../assets/warmdrobe-no-background.png";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa6";
import { Send } from "lucide-react";

interface FooterProps {
  theme?: "dark" | "light";
  onNavigatePage: (page: "home" | "about" | "privacy") => void;
  onScrollToSection: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigatePage,
  onScrollToSection,
}) => {
  const [feedback, setFeedback] = useState("");

  const handleSendFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;
    window.location.href = `mailto:contact@kairo.app?subject=Kairo App Feedback&body=${encodeURIComponent(feedback)}`;
    setFeedback("");
  };

  return (
    <footer className="relative z-10 bg-black text-neutral-400 py-16 border-t border-neutral-800 mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Brand Col */}
        <div className="md:col-span-5 space-y-3">
          <div className="flex items-center gap-3">
            <img src={logoDark} alt="Kairo Logo" className="h-12 w-auto" />
          </div>

          <p className="text-sm text-neutral-300 max-w-sm leading-relaxed">
            Local-first note-taking and knowledge graph visualizer desktop
            application. Engineered with <a href="https://v2.tauri.app" target="_blank" rel="noreferrer" className="text-accent underline font-semibold hover:opacity-80">Tauri</a>, <a href="https://www.rust-lang.org" target="_blank" rel="noreferrer" className="text-accent underline font-semibold hover:opacity-80">Rust</a>, <a href="https://react.dev" target="_blank" rel="noreferrer" className="text-accent underline hover:opacity-80">React</a>, and <a href="https://tiptap.dev" target="_blank" rel="noreferrer" className="text-accent underline font-semibold hover:opacity-80">Tiptap</a>.
          </p>

          <div className="text-xs text-neutral-500 pt-2 font-medium">
            © {new Date().getFullYear()} Kairo Application. All rights reserved.
          </div>
        </div>

        {/* Navigation Links */}
        <div className="md:col-span-3 space-y-3">
          <div className="text-xs font-bold text-neutral-300 uppercase tracking-wider mb-4">
            Quick Links & Privacy policy
          </div>
          <ul className="space-y-2.5 text-sm font-medium">
            <li>
              <button
                onClick={() => {
                  onNavigatePage("home");
                  setTimeout(() => onScrollToSection("features"), 50);
                }}
                className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                Features
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  onNavigatePage("home");
                  setTimeout(() => onScrollToSection("demo"), 50);
                }}
                className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                Interactive Graph Demo
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigatePage("about")}
                className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                Documentation Page
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigatePage("privacy")}
                className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                Privacy Policy Page
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  onNavigatePage("home");
                  setTimeout(() => onScrollToSection("download"), 50);
                }}
                className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                Download Releases
              </button>
            </li>
          </ul>
        </div>

        {/* Connect & Feedback */}
        <div className="md:col-span-4 space-y-3">
          <div className="text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
            Connect & Feedback
          </div>

          {/* Feedback Form */}
          <form onSubmit={handleSendFeedback} className="space-y-2 mt-8">
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Send your feedback or suggestions..."
              rows={3}
              className="w-full p-2.5 text-xs bg-neutral-900 text-neutral-200 border border-neutral-800 rounded-md focus:border-accent focus:outline-none resize-none transition-colors"
            />
            {/* Social Icons (GitHub, LinkedIn, Mail) */}
            <div className="flex gap-5">
              <div className="flex items-center gap-2.5 pb-1">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 text-neutral-400 hover:text-white  transition-colors"
                  title="GitHub"
                >
                  <FaGithub size={25} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 text-neutral-400 hover:text-white transition-colors"
                  title="LinkedIn"
                >
                  <FaLinkedin size={25} />
                </a>
                <a
                  href="mailto:contact@kairo.app"
                  className="p-2 text-neutral-400 hover:text-white transition-colors"
                  title="Mail"
                >
                  <FaEnvelope size={25} />
                </a>
              </div>
              <button
                type="submit"
                className="w-full h-9 py-2.5 px-4 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-medium rounded-md flex items-center justify-center gap-2 transition-colors cursor-pointer border border-neutral-700"
              >
                <Send size={16} />
                <span>Send Feedback via Email</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </footer>
  );
};
