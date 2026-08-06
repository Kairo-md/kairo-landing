import React from "react";
import { Database, Server, Cpu, HardDrive, ArrowRight } from "lucide-react";
import { KairoButton } from "../../components/ui/KairoButton";
import type { TocItem } from "./GettingStartedPage";

export const HOW_IT_WORKS_TOC: TocItem[] = [
  { id: "architecture-overview", title: "Architecture & Tauri v2 Overview", level: 1 },
  { id: "sqlite-storage", title: "Local File System & SQLite Database", level: 1 },
  { id: "frontend-backend", title: "Frontend & Native Shell Integration", level: 1 },
];

interface HowItWorksPageProps {
  onNavigateTab: (tab: string) => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onNavigateTab }) => {
  return (
    <div className="space-y-10">
      {/* Title & Architecture Overview */}
      <section id="architecture-overview" className="space-y-4">
        <h1 className="text-6xl font-bold tracking-tight text-(--text-primary) leading-tight">
          How Kairo Works
        </h1>
        <p className="text-lg text-(--text-primary) leading-relaxed">
          Kairo combines a high-performance <strong><a href="https://www.rust-lang.org" target="_blank" rel="noreferrer" className="text-accent underline hover:opacity-80">Rust</a> + <a href="https://v2.tauri.app" target="_blank" rel="noreferrer" className="text-accent underline hover:opacity-80">Tauri</a></strong> desktop shell with a modern <strong><a href="https://react.dev" target="_blank" rel="noreferrer" className="text-accent underline hover:opacity-80">React</a> + <a href="https://tiptap.dev" target="_blank" rel="noreferrer" className="text-accent underline hover:opacity-80">Tiptap</a></strong> rich text editor and <strong><a href="https://d3js.org" target="_blank" rel="noreferrer" className="text-accent underline hover:opacity-80">D3.js</a></strong> force graph simulation engine.
        </p>

        <div className="p-6 bg-accent/10 border-l-4 border-accent rounded-r-lg space-y-2 text-lg text-(--text-primary)">
          <div className="font-bold text-accent text-base uppercase tracking-wider flex items-center gap-2">
            <Cpu className="w-5 h-5" />
            100% Native Offline Computation
          </div>
          <p className="text-(--text-primary) leading-relaxed">
            Note editing, <a href="https://tiptap.dev" target="_blank" rel="noreferrer" className="text-accent underline hover:opacity-80">Tiptap</a> rendering, Markdown parsing, and <a href="https://d3js.org" target="_blank" rel="noreferrer" className="text-accent underline hover:opacity-80">D3</a> force-directed graph calculations are computed entirely on your local CPU and GPU without initiating background network HTTP requests or cloud synchronizations.
          </p>
        </div>
      </section>

      {/* SQLite Local Storage Specification */}
      <section id="sqlite-storage" className="space-y-6 pt-4 border-t border-(--border)">
        <h2 className="text-3xl font-bold tracking-tight text-(--text-primary) pb-3 border-b border-(--border)">
          Local File System & SQLite Database Architecture
        </h2>

        <p className="text-lg text-(--text-primary) leading-relaxed">
          All application data - including note bodies, titles, Markdown syntax elements, bidirectional <code className="px-1.5 py-0.5 rounded bg-(--hover) text-accent font-mono text-base border border-(--border-strong)">[[WikiLink]]</code> relationships, graph node positions, and media attachments - are written directly to your operating system local hard drive via <a href="https://v2.tauri.app" target="_blank" rel="noreferrer" className="text-accent underline hover:opacity-80">Tauri</a> native file system API and local <a href="https://www.sqlite.org" target="_blank" rel="noreferrer" className="text-accent underline hover:opacity-80">SQLite</a> database engine.
        </p>

        {/* Default Local Storage Paths */}
        <div id="default-paths" className="p-5 rounded-lg bg-(--sidebar-bg) border border-(--border-strong) font-mono text-base sm:text-lg text-accent space-y-2">
          <div className="text-(--text-muted) text-sm font-sans font-semibold uppercase tracking-wider flex items-center gap-2">
            <Database className="w-4 h-4 text-accent" />
            Default Local Storage Paths
          </div>
          <div>
            <strong className="text-(--text-primary) font-sans">Windows:</strong> %APPDATA%\kairo\data.sqlite
          </div>
          <div>
            <strong className="text-(--text-primary) font-sans">macOS:</strong> ~/Library/Application Support/kairo/data.sqlite
          </div>
          <div>
            <strong className="text-(--text-primary) font-sans">Linux:</strong> ~/.config/kairo/data.sqlite
          </div>
        </div>

        <p className="text-lg text-(--text-primary) leading-relaxed">
          The <a href="https://www.sqlite.org" target="_blank" rel="noreferrer" className="text-accent underline hover:opacity-80">SQLite</a> database file is completely self-contained. Users maintain full physical and programmatic access to inspect, copy, encrypt, or migrate their data file using standard OS tools or database inspection utilities.
        </p>
      </section>

      {/* Frontend & Native Shell */}
      <section id="frontend-backend" className="space-y-4 pt-4 border-t border-(--border)">
        <h2 className="text-2xl font-bold text-(--text-primary)">
          Frontend & Native Shell Integration
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg">
          <div className="p-5 rounded-lg bg-(--sidebar-bg) border border-(--border) space-y-2">
            <div className="font-bold text-accent text-lg flex items-center gap-2">
              <Server className="w-5 h-5" />
              <span>Rust System Layer</span>
            </div>
            <p className="text-(--text-primary) leading-relaxed">
              Provides direct file system access, high-speed <a href="https://www.sqlite.org" target="_blank" rel="noreferrer" className="text-accent underline hover:opacity-80">SQLite</a> indexing, and native system tray / menu controls.
            </p>
          </div>

          <div className="p-5 rounded-lg bg-(--sidebar-bg) border border-(--border) space-y-2">
            <div className="font-bold text-accent text-lg flex items-center gap-2">
              <HardDrive className="w-5 h-5" />
              <span>React UI Layer</span>
            </div>
            <p className="text-(--text-primary) leading-relaxed">
              Delivers instant <a href="https://tiptap.dev" target="_blank" rel="noreferrer" className="text-accent underline hover:opacity-80">Tiptap</a> Markdown editing, interactive <a href="https://d3js.org" target="_blank" rel="noreferrer" className="text-accent underline hover:opacity-80">D3</a> graph rendering, and responsive UI components.
            </p>
          </div>
        </div>

        <div className="pt-4">
          <KairoButton
            onClick={() => onNavigateTab("features")}
            variant="primary"
            className="py-3 px-6 text-base font-semibold flex items-center gap-2"
          >
            <span>Next: Features & Shortcuts</span>
            <ArrowRight className="w-5 h-5" />
          </KairoButton>
        </div>
      </section>
    </div>
  );
};
