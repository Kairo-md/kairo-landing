import React from "react";
import { HelpCircle, ArrowRight } from "lucide-react";
import { KairoButton } from "../../components/ui/KairoButton";
import type { TocItem } from "./GettingStartedPage";

export const FAQ_TOC: TocItem[] = [
  { id: "faq-overview", title: "Frequently Asked Questions", level: 1 },
  { id: "status-faq", title: "What is the current release status of Kairo?", level: 1 },
  { id: "store-faq", title: "Where will Kairo be published?", level: 1 },
  { id: "tech-faq", title: "Why build with Tauri v2?", level: 1 },
  { id: "sync-faq", title: "Is my data synced to cloud?", level: 1 },
  { id: "roadmap-faq", title: "What is the cross-platform roadmap?", level: 1 },
];

interface FaqPageProps {
  onNavigateTab: (tab: string) => void;
  onNavigateHome: () => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onNavigateTab, onNavigateHome }) => {
  return (
    <div className="space-y-10">
      {/* FAQ Title */}
      <section id="faq-overview" className="space-y-4">
        <h1 className="text-6xl font-bold tracking-tight text-(--text-primary) leading-tight">
          Frequently Asked Questions (FAQ)
        </h1>
        <p className="text-lg text-(--text-primary) leading-relaxed">
          Everything you need to know about Kairo's development status, store availability, architecture, and roadmap.
        </p>
      </section>

      {/* FAQ Accordion Cards */}
      <section className="space-y-4 pt-4 border-t border-(--border)">
        <div id="status-faq" className="p-6 rounded-lg bg-(--sidebar-bg) border border-(--border) space-y-2">
          <h4 className="text-xl font-bold text-(--text-primary) flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-accent shrink-0" />
            What is the current release status of Kairo?
          </h4>
          <p className="text-lg text-(--text-primary) leading-relaxed pl-7">
            Kairo is currently running locally in active development. Core functionalities are being finalized and tested locally before the app is officially submitted to public desktop application stores.
          </p>
        </div>

        <div id="store-faq" className="p-6 rounded-lg bg-(--sidebar-bg) border border-(--border) space-y-2">
          <h4 className="text-xl font-bold text-(--text-primary) flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-accent shrink-0" />
            Where will Kairo be published & available for download?
          </h4>
          <p className="text-lg text-(--text-primary) leading-relaxed pl-7">
            Initial target platforms for launch are the <a href="https://apps.microsoft.com" target="_blank" rel="noreferrer" className="text-accent underline font-semibold hover:opacity-80">Microsoft Store</a> (Windows) and the <a href="https://flathub.org" target="_blank" rel="noreferrer" className="text-accent underline font-semibold hover:opacity-80">Fedora Software Store / Flathub</a> (Linux). Creating a personal product and mastering the store submission process for Windows & Linux is a core goal of this project.
          </p>
        </div>

        <div id="tech-faq" className="p-6 rounded-lg bg-(--sidebar-bg) border border-(--border) space-y-2">
          <h4 className="text-xl font-bold text-(--text-primary) flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-accent shrink-0" />
            Why was Kairo built using Tauri v2?
          </h4>
          <p className="text-lg text-(--text-primary) leading-relaxed pl-7">
            Kairo was built to explore and master <a href="https://v2.tauri.app" target="_blank" rel="noreferrer" className="text-accent underline font-semibold hover:opacity-80">Tauri v2</a>, leveraging <a href="https://www.rust-lang.org" target="_blank" rel="noreferrer" className="text-accent underline font-semibold hover:opacity-80">Rust</a> native security and performance alongside a clean <a href="https://react.dev" target="_blank" rel="noreferrer" className="text-accent underline font-semibold hover:opacity-80">React</a> frontend. This yields lightning-fast startup times and minimal memory consumption compared to traditional <a href="https://www.electronjs.org" target="_blank" rel="noreferrer" className="text-accent underline font-semibold hover:opacity-80">Electron</a> apps.
          </p>
        </div>

        <div id="sync-faq" className="p-6 rounded-lg bg-(--sidebar-bg) border border-(--border) space-y-2">
          <h4 className="text-xl font-bold text-(--text-primary) flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-accent shrink-0" />
            Is my data synced to any remote cloud server?
          </h4>
          <p className="text-lg text-(--text-primary) leading-relaxed pl-7">
            Currently, no. Kairo Desktop is 100% local-first, keeping all note files and SQLite databases strictly on your local disk. In future updates, if optional online authentication and multi-device cloud synchronization are introduced, cloud sync will be available as an <strong>optional monthly subscription</strong> to cover server infrastructure costs, while local desktop note taking remains 100% free.
          </p>
        </div>

        <div id="roadmap-faq" className="p-6 rounded-lg bg-(--sidebar-bg) border border-(--border) space-y-2">
          <h4 className="text-xl font-bold text-(--text-primary) flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-accent shrink-0" />
            What is the cross-platform roadmap?
          </h4>
          <p className="text-lg text-(--text-primary) leading-relaxed pl-7">
            The initial phase focuses on delivering a rock-solid Windows and Linux release. Broader multi-platform expansion (such as macOS and mobile) is planned on the roadmap for future development phases.
          </p>
        </div>
      </section>

      {/* Action Footer */}
      <section className="pt-4 border-t border-(--border)">
        <div className="p-6 rounded-lg border border-(--border-strong) bg-(--sidebar-bg) space-y-4">
          <h3 className="text-xl font-bold text-(--text-primary)">
            Looking for full Privacy Policy details?
          </h3>
          <p className="text-lg text-(--text-primary) leading-relaxed">
            Inspect our comprehensive 8-point local privacy specification and security charter.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <KairoButton
              onClick={() => onNavigateTab("privacy")}
              variant="primary"
              className="py-2.5 px-5 text-base font-semibold flex items-center gap-2"
            >
              <span>Read Full Privacy Policy Specification</span>
              <ArrowRight className="w-4 h-4" />
            </KairoButton>
            <KairoButton
              onClick={onNavigateHome}
              variant="outline"
              className="py-2.5 px-5 text-base font-semibold"
            >
              Back to Home Page
            </KairoButton>
          </div>
        </div>
      </section>
    </div>
  );
};
