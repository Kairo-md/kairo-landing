import React from "react";
import { Sparkles, Command, FileText, ArrowRight } from "lucide-react";
import { KairoButton } from "../../components/ui/KairoButton";
import type { TocItem } from "./GettingStartedPage";

export const FEATURES_TOC: TocItem[] = [
  { id: "core-features", title: "Core Features", level: 1 },
  { id: "keyboard-shortcuts", title: "Keyboard Shortcuts", level: 1 },
  { id: "wikilinks-graph", title: "WikiLinks & D3 Graph", level: 1 },
];

interface FeaturesPageProps {
  onNavigateTab: (tab: string) => void;
}

export const FeaturesPage: React.FC<FeaturesPageProps> = ({
  onNavigateTab,
}) => {
  return (
    <div className="space-y-10">
      {/* Title & Core Features */}
      <section id="core-features" className="space-y-4">
        <h1 className="text-6xl font-bold tracking-tight text-(--text-primary) leading-tight">
          Features & Keyboard Shortcuts
        </h1>
        <p className="text-lg text-(--text-primary) leading-relaxed">
          Kairo provides a full suite of modern note-taking tools, including{" "}
          <a href="https://tiptap.dev" target="_blank" rel="noreferrer" className="text-accent underline font-semibold hover:opacity-80">Tiptap</a> rich Markdown shortcuts, task checkboxes, code syntax blocks,
          and built-in global desktop shortcuts.
        </p>
      </section>

      {/* Keyboard Shortcuts Section */}
      <section
        id="keyboard-shortcuts"
        className="space-y-6 pt-4 border-t border-(--border)"
      >
        <h2 className="text-3xl font-bold tracking-tight text-(--text-primary) pb-3 border-b border-(--border) flex items-center gap-2">
          <Command className="w-6 h-6 text-accent" />
          Global & In-App Keyboard Shortcuts
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg">
          <div className="p-4 rounded-lg bg-(--sidebar-bg) border border-(--border) flex justify-between items-center">
            <span className="text-(--text-primary) font-medium text-lg">
              Quick Search / Command Palette
            </span>
            <kbd className="px-2.5 py-1 bg-(--hover) border border-(--border-strong) rounded text-accent font-mono font-bold text-sm">
              Ctrl + K
            </kbd>
          </div>
          <div className="p-4 rounded-lg bg-(--sidebar-bg) border border-(--border) flex justify-between items-center">
            <span className="text-(--text-primary) font-medium text-lg">
              Toggle Split View Editor
            </span>
            <kbd className="px-2.5 py-1 bg-(--hover) border border-(--border-strong) rounded text-accent font-mono font-bold text-sm">
              Ctrl + \
            </kbd>
          </div>
          <div className="p-4 rounded-lg bg-(--sidebar-bg) border border-(--border) flex justify-between items-center">
            <span className="text-(--text-primary) font-medium text-lg">
              Toggle <a href="https://d3js.org" target="_blank" rel="noreferrer" className="text-accent underline font-semibold hover:opacity-80">D3</a> Force Graph View
            </span>
            <kbd className="px-2.5 py-1 bg-(--hover) border border-(--border-strong) rounded text-accent font-mono font-bold text-sm">
              Ctrl + G
            </kbd>
          </div>
          <div className="p-4 rounded-lg bg-(--sidebar-bg) border border-(--border) flex justify-between items-center">
            <span className="text-(--text-primary) font-medium text-lg">
              Create New Note
            </span>
            <kbd className="px-2.5 py-1 bg-(--hover) border border-(--border-strong) rounded text-accent font-mono font-bold text-sm">
              Ctrl + N
            </kbd>
          </div>
          <div className="p-4 rounded-lg bg-(--sidebar-bg) border border-(--border) flex justify-between items-center">
            <span className="text-(--text-primary) font-medium text-lg">
              Toggle Bold Text
            </span>
            <kbd className="px-2.5 py-1 bg-(--hover) border border-(--border-strong) rounded text-accent font-mono font-bold text-sm">
              Ctrl + B
            </kbd>
          </div>
          <div className="p-4 rounded-lg bg-(--sidebar-bg) border border-(--border) flex justify-between items-center">
            <span className="text-(--text-primary) font-medium text-lg">
              Toggle Italic Text
            </span>
            <kbd className="px-2.5 py-1 bg-(--hover) border border-(--border-strong) rounded text-accent font-mono font-bold text-sm">
              Ctrl + I
            </kbd>
          </div>
        </div>
      </section>

      {/* WikiLinks & D3 Graph */}
      <section
        id="wikilinks-graph"
        className="space-y-4 pt-4 border-t border-(--border)"
      >
        <h2 className="text-2xl font-bold text-(--text-primary) flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-accent" />
          WikiLinks & Bidirectional Graph Visualization
        </h2>
        <p className="text-lg text-(--text-primary) leading-relaxed">
          Type{" "}
          <code className="px-1.5 py-0.5 rounded bg-(--hover) text-accent font-mono text-base border border-(--border-strong)">
            [[Note Title]]
          </code>{" "}
          anywhere in your note to instantly link pages together. Kairo
          automatically generates a dynamic force-directed graph representation
          of all note relationships in real-time.
        </p>

        <div className="p-5 rounded-lg bg-(--sidebar-bg) border border-(--border) space-y-2 text-lg text-(--text-primary)">
          <div className="font-bold text-(--text-primary) text-lg flex items-center gap-2">
            <FileText className="w-5 h-5 text-accent" />
            Automatic Graph Indexing
          </div>
          <p className="text-(--text-primary) leading-relaxed">
            Relationships are indexed inside your local SQLite database with
            zero cloud delay. Clicking any node in the graph navigates straight
            to the target note.
          </p>
        </div>

        <div className="pt-4">
          <KairoButton
            onClick={() => onNavigateTab("account-billing")}
            variant="primary"
            className="py-3 px-6 text-base font-semibold flex items-center gap-2"
          >
            <span>Next: Account & Billing Specifications</span>
            <ArrowRight className="w-5 h-5" />
          </KairoButton>
        </div>
      </section>
    </div>
  );
};
