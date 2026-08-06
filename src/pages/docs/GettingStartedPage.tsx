import React from "react";
import { ShieldCheck, HardDrive, FileCode2, ArrowRight } from "lucide-react";
import { KairoButton } from "../../components/ui/KairoButton";

export interface TocItem {
  id: string;
  title: string;
  level: 1 | 2;
}

export const GETTING_STARTED_TOC: TocItem[] = [
  { id: "overview", title: "Overview & Current Status", level: 1 },
  { id: "why-kairo", title: "Why Kairo & The Vision", level: 1 },
  { id: "prerequisites", title: "Target Platforms & Stores", level: 1 },
];

interface GettingStartedPageProps {
  onNavigateTab: (tab: string) => void;
}

export const GettingStartedPage: React.FC<GettingStartedPageProps> = ({
  onNavigateTab,
}) => {
  return (
    <div className="space-y-10">
      {/* Page Title & Intro */}
      <section id="overview" className="space-y-4">
        <h1 className="text-6xl font-bold tracking-tight text-(--text-primary) leading-tight">
          What is Kairo?
        </h1>
        <p className="text-lg text-(--text-primary) leading-relaxed">
          Kairo is a desktop <strong>Note-taking application (Note taking app)</strong> featuring an integrated local-first knowledge graph. Built from the ground up using <a href="https://v2.tauri.app" target="_blank" rel="noreferrer" className="text-accent underline font-semibold hover:opacity-80">Tauri v2</a> and <a href="https://react.dev" target="_blank" rel="noreferrer" className="text-accent underline font-semibold hover:opacity-80">React</a>, Kairo is designed specifically for note taking, personal knowledge management, speed, and privacy - keeping 100% of your notes and index databases stored locally on your hard drive.
        </p>
        <p className="text-lg text-(--text-primary) leading-relaxed">
          The application is currently running locally in active development
          while finalizing upcoming features prior to its official desktop store
          release.
        </p>
      </section>

      {/* Developer Story & Vision */}
      <section
        id="why-kairo"
        className="space-y-6 pt-4 border-t border-(--border)"
      >
        <h2 className="text-3xl font-bold tracking-tight text-(--text-primary)">
          Why Kairo & The Vision
        </h2>

        <p className="text-lg text-(--text-primary) leading-relaxed">
          Kairo was born out of a personal ambition to build an independent,
          privacy-focused desktop product and master the entire end-to-end
          publishing pipeline on official application stores:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div
            id="secure-foundation"
            className="p-5 rounded-lg bg-(--sidebar-bg) border border-(--border) space-y-2"
          >
            <div className="flex items-center gap-2 text-accent font-semibold text-lg">
              <ShieldCheck className="w-5 h-5" />
              <span>Store Release Goals</span>
            </div>
            <p className="text-lg text-(--text-primary) leading-relaxed">
              Targeting official store listings on{" "}
              <a href="https://apps.microsoft.com" target="_blank" rel="noreferrer" className="text-accent underline font-semibold hover:opacity-80">Microsoft Store (Windows)</a> and{" "}
              <a href="https://flathub.org" target="_blank" rel="noreferrer" className="text-accent underline font-semibold hover:opacity-80">Fedora Software Store / Flathub (Linux)</a> to
              fulfill a dream of having a personal published app on desktop
              stores.
            </p>
          </div>

          <div
            id="smaller-app-size"
            className="p-5 rounded-lg bg-(--sidebar-bg) border border-(--border) space-y-2"
          >
            <div className="flex items-center gap-2 text-accent font-semibold text-lg">
              <HardDrive className="w-5 h-5" />
              <span>Modern Tauri v2 Stack</span>
            </div>
            <p className="text-lg text-(--text-primary) leading-relaxed">
              Leveraging <a href="https://v2.tauri.app" target="_blank" rel="noreferrer" className="text-accent underline font-semibold hover:opacity-80">Tauri v2</a> with <a href="https://www.rust-lang.org" target="_blank" rel="noreferrer" className="text-accent underline font-semibold hover:opacity-80">Rust</a> backend logic for
              lightning-fast startup, ultra-small binary footprint, and zero{" "}
              <a href="https://www.electronjs.org" target="_blank" rel="noreferrer" className="text-accent underline font-semibold hover:opacity-80">Electron</a> overhead.
            </p>
          </div>

          <div
            id="flexible-architecture"
            className="p-5 rounded-lg bg-(--sidebar-bg) border border-(--border) space-y-2"
          >
            <div className="flex items-center gap-2 text-accent font-semibold text-lg">
              <FileCode2 className="w-5 h-5" />
              <span>Focused Roadmap</span>
            </div>
            <p className="text-lg text-(--text-primary) leading-relaxed">
              Initial releases focus on mastering Windows & Linux desktop builds
              first. Cross-platform expansion is planned down the roadmap as
              development progresses.
            </p>
          </div>
        </div>
      </section>

      {/* System Prerequisites Section */}
      <section
        id="prerequisites"
        className="space-y-4 pt-4 border-t border-(--border)"
      >
        <h2 className="text-2xl font-bold text-(--text-primary)">
          System Requirements & Target Platforms
        </h2>
        <p className="text-lg text-(--text-primary) leading-relaxed">
          Kairo runs natively on standard 64-bit operating systems. Primary
          launch targets for initial store builds:
        </p>

        <div className="p-5 rounded-lg bg-(--sidebar-bg) border border-(--border-strong) space-y-3 font-mono text-base sm:text-lg">
          <div className="text-accent font-semibold uppercase tracking-wider font-sans text-sm">
            Target Release Platforms
          </div>
          <div>
            <strong className="text-(--text-primary)">Windows:</strong> Windows
            10 / 11 (Microsoft Store package & MSI installer)
          </div>
          <div>
            <strong className="text-(--text-primary)">Linux:</strong> Fedora 34+
            (Fedora RPM / Flatpak store distribution)
          </div>
          <div>
            <strong className="text-(--text-primary)">Future Expansion:</strong>{" "}
            Additional operating systems planned in subsequent development
            phases
          </div>
        </div>

        <div className="pt-2">
          <KairoButton
            onClick={() => onNavigateTab("how-it-works")}
            variant="primary"
            className="py-3 px-6 text-base font-semibold flex items-center gap-2"
          >
            <span>Next: Architecture & Tauri v2 Deep Dive</span>
            <ArrowRight className="w-5 h-5" />
          </KairoButton>
        </div>
      </section>
    </div>
  );
};
