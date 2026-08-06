import React from "react";
import { ShieldCheck, Database, WifiOff } from "lucide-react";
import { KairoButton } from "../../components/ui/KairoButton";
import type { TocItem } from "./GettingStartedPage";

export const PRIVACY_POLICY_TOC: TocItem[] = [
  { id: "scope", title: "1. Core Privacy Principles", level: 1 },
  { id: "storage", title: "2. Local Database & File Storage", level: 1 },
  { id: "accounts", title: "3. Zero-Account Policy", level: 1 },
  { id: "telemetry", title: "4. Zero Telemetry Specification", level: 1 },
  { id: "network", title: "5. Network Isolation & Offline Usage", level: 1 },
  { id: "sovereignty", title: "6. Data Sovereignty & Portability", level: 1 },
  { id: "disk-security", title: "7. Security & Encryption", level: 1 },
];

interface PrivacyPolicyPageProps {
  onNavigateHome: () => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigateHome }) => {
  return (
    <div className="space-y-10">
      {/* Title */}
      <section className="space-y-4">
        <h1 className="text-6xl font-bold tracking-tight text-(--text-primary) leading-tight">
          Privacy Policy & Local-First Security Specification
        </h1>
        <p className="text-lg text-(--text-primary) leading-relaxed">
          Formal specification governing data handling, local storage architecture, and zero-telemetry enforcement for Kairo Desktop (v0.6.1+).
        </p>
      </section>

      {/* Section 1: Scope & Core Privacy Principles */}
      <section id="scope" className="space-y-6 pt-4 border-t border-(--border)">
        <h2 className="text-3xl font-bold tracking-tight text-(--text-primary) pb-3 border-b border-(--border)">
          1. Scope & Core Privacy Principles
        </h2>

        <p className="text-lg text-(--text-primary) leading-relaxed">
          This Privacy Specification governs the data architecture, local handling practices, and local storage specifications for the{" "}
          <strong>Kairo Desktop Application</strong> (v0.6.1+).
        </p>

        {/* Zero Remote Collection Banner */}
        <div className="p-6 bg-accent/10 border-l-4 border-accent rounded-r-lg text-lg text-(--text-primary) leading-relaxed space-y-2">
          <div className="font-bold text-accent text-base uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-5 h-5" />
            Core Architectural Principle: Zero Remote Collection
          </div>
          <p className="text-(--text-primary) leading-relaxed">
            Kairo is engineered strictly as a local-first software client. The application does not collect, process, index, aggregate, or upload personal notes, Markdown text, bidirectional link indexes, or usage logs to external cloud infrastructure.
          </p>
        </div>
      </section>

      {/* Section 2: Storage & SQLite Architecture */}
      <section id="storage" className="space-y-6 pt-4">
        <h2 className="text-3xl font-bold tracking-tight text-(--text-primary) pb-3 border-b border-(--border)">
          2. Local File System & SQLite Database Architecture
        </h2>

        <p className="text-lg text-(--text-primary) leading-relaxed">
          All application data - including note bodies, titles, Markdown syntax elements, bidirectional <code className="px-1.5 py-0.5 rounded bg-(--hover) text-accent font-mono text-base border border-(--border-strong)">[[WikiLink]]</code> relationships, graph node positions, and media attachments - are written directly to your operating system local hard drive via <a href="https://v2.tauri.app" target="_blank" rel="noreferrer" className="text-accent underline font-semibold hover:opacity-80">Tauri</a> native file system API and local <a href="https://www.sqlite.org" target="_blank" rel="noreferrer" className="text-accent underline font-semibold hover:opacity-80">SQLite</a> database engine.
        </p>

        {/* Default Local Storage Paths */}
        <div id="storage-paths" className="p-5 rounded-lg bg-(--sidebar-bg) border border-(--border-strong) font-mono text-base sm:text-lg text-accent space-y-2">
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
          The SQLite database file is completely self-contained. Users maintain full physical and programmatic access to inspect, copy, encrypt, or migrate their data file using standard OS tools or database inspection utilities.
        </p>
      </section>

      {/* Section 3: User Identity */}
      <section id="accounts" className="space-y-6 pt-4">
        <h2 className="text-3xl font-bold tracking-tight text-(--text-primary) pb-3 border-b border-(--border)">
          3. User Identity & Zero-Account Policy
        </h2>

        <p className="text-lg text-(--text-primary) leading-relaxed">
          Kairo operates without user authentication servers or identity management infrastructure.
        </p>

        <ul className="space-y-3 text-lg text-(--text-primary) list-disc pl-6 leading-relaxed">
          <li>
            <strong className="text-(--text-primary)">No Registration Required:</strong> Users are not required to provide email addresses, names, phone numbers, or credentials.
          </li>
          <li>
            <strong className="text-(--text-primary)">No User ID Tracking:</strong> The application does not generate or transmit hardware GUIDs or user identifiers to remote endpoints.
          </li>
          <li>
            <strong className="text-(--text-primary)">No Authentication Tokens:</strong> Kairo does not issue, store, or refresh OAuth tokens or web session cookies.
          </li>
        </ul>
      </section>

      {/* Section 4: Telemetry */}
      <section id="telemetry" className="space-y-6 pt-4">
        <h2 className="text-3xl font-bold tracking-tight text-(--text-primary) pb-3 border-b border-(--border)">
          4. Zero Telemetry & Analytics Specification
        </h2>

        <p className="text-lg text-(--text-primary) leading-relaxed">
          The Kairo executable package contains zero embedded analytics frameworks, tracking SDKs, or crash-telemetry libraries.
        </p>

        <ul className="space-y-3 text-lg text-(--text-primary) list-disc pl-6 leading-relaxed">
          <li>
            <strong className="text-(--text-primary)">Third-Party Analytics:</strong> Zero integration with Google Analytics, Mixpanel, Segment, PostHog, or Amplitude.
          </li>
          <li>
            <strong className="text-(--text-primary)">Crash Reporting:</strong> Zero automated error reporting or stack trace submission to Sentry or Bugsnag.
          </li>
          <li>
            <strong className="text-(--text-primary)">Usage Metrics:</strong> Zero tracking of note counts, session durations, graph complexity, or feature invocation counts.
          </li>
        </ul>
      </section>

      {/* Section 5: Network Isolation */}
      <section id="network" className="space-y-6 pt-4">
        <h2 className="text-3xl font-bold tracking-tight text-(--text-primary) pb-3 border-b border-(--border)">
          5. Network Isolation & Offline Specification
        </h2>

        <p className="text-lg text-(--text-primary) leading-relaxed">
          The application executes in a network-isolated local environment. Note editing, Tiptap rendering, Markdown parsing, and D3 force-directed graph calculations are computed entirely on your local CPU and GPU.
        </p>

        <div className="p-5 rounded-lg bg-(--sidebar-bg) border border-(--border) flex items-center gap-4 text-lg text-(--text-primary)">
          <WifiOff className="w-8 h-8 text-accent shrink-0" />
          <span>
            Kairo does not initiate background network ping requests, pulse signals, or auto-sync HTTP connections during operation.
          </span>
        </div>
      </section>

      {/* Section 6: Architecture Comparison Matrix */}
      <section id="comparison" className="space-y-6 pt-4">
        <h2 className="text-3xl font-bold tracking-tight text-(--text-primary) pb-3 border-b border-(--border)">
          6. Architecture Comparison Matrix
        </h2>

        <p className="text-lg text-(--text-primary) leading-relaxed">
          Technical comparison matrix between Kairo local-first architecture and conventional cloud-hosted note software:
        </p>

        <div className="overflow-x-auto rounded-lg border border-(--border) bg-(--sidebar-bg)">
          <table className="w-full text-left text-base sm:text-lg">
            <thead>
              <tr className="border-b border-(--border) text-(--text-secondary) uppercase tracking-wider bg-(--hover)/50">
                <th className="py-3 px-4 font-semibold">Technical Parameter</th>
                <th className="py-3 px-4 text-accent font-bold">Kairo Desktop</th>
                <th className="py-3 px-4 text-(--text-muted)">Traditional Cloud Apps</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-(--border) text-(--text-primary)">
              <tr>
                <td className="py-3.5 px-4 font-medium">Data Storage Location</td>
                <td className="py-3.5 px-4 text-emerald-400 font-medium">Local Disk / SQLite Database</td>
                <td className="py-3.5 px-4 text-(--text-muted)">Remote Cloud Database</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium">Authentication Obligation</td>
                <td className="py-3.5 px-4 text-emerald-400 font-medium">None (0 Accounts)</td>
                <td className="py-3.5 px-4 text-(--text-muted)">Mandatory Credentials</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium">Network Dependency</td>
                <td className="py-3.5 px-4 text-emerald-400 font-medium">100% Native Offline</td>
                <td className="py-3.5 px-4 text-(--text-muted)">Requires Online Sync</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium">Analytics & Telemetry</td>
                <td className="py-3.5 px-4 text-emerald-400 font-medium">Zero Telemetry SDKs</td>
                <td className="py-3.5 px-4 text-(--text-muted)">Active Telemetry Frameworks</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium">Data Sovereignty & Control</td>
                <td className="py-3.5 px-4 text-emerald-400 font-medium">Full User Ownership</td>
                <td className="py-3.5 px-4 text-(--text-muted)">Vendor Lock-in Risk</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 7: Data Sovereignty */}
      <section id="sovereignty" className="space-y-6 pt-4">
        <h2 className="text-3xl font-bold tracking-tight text-(--text-primary) pb-3 border-b border-(--border)">
          7. Data Sovereignty & Portability Specifications
        </h2>

        <p className="text-lg text-(--text-primary) leading-relaxed">
          Users retain full physical and legal ownership of all data files generated within Kairo. Data portability is guaranteed by open standards:
        </p>

        <ul className="space-y-3 text-lg text-(--text-primary) list-disc pl-6 leading-relaxed">
          <li>
            <strong className="text-(--text-primary)">Open Database Format:</strong> All index metadata is stored in standard SQLite schema.
          </li>
          <li>
            <strong className="text-(--text-primary)">Standard Markdown Content:</strong> Note bodies are stored as standard Markdown text files.
          </li>
          <li>
            <strong className="text-(--text-primary)">Export Flexibility:</strong> Users can back up, move, or sync their local files using personal tools (e.g., Git, Syncthing, or local backup drives).
          </li>
        </ul>
      </section>

      {/* Section 8: OS Disk Encryption */}
      <section id="disk-security" className="space-y-6 pt-4">
        <h2 className="text-3xl font-bold tracking-tight text-(--text-primary) pb-3 border-b border-(--border)">
          8. Operating System Disk Encryption & Security
        </h2>

        <p className="text-lg text-(--text-primary) leading-relaxed">
          Kairo leverages operating system-level encryption mechanisms to secure data at rest. Protection of local database files relies on native OS disk security features (e.g. Windows BitLocker, macOS FileVault, or Linux LUKS).
        </p>
      </section>

      {/* Document Verification & Specification Summary Box */}
      <section id="summary" className="pt-6">
        <div className="p-8 rounded-xl border border-(--border-strong) bg-(--sidebar-bg) space-y-4">
          <h3 className="text-2xl font-bold text-(--text-primary)">
            Document Verification & Specification Summary
          </h3>
          <p className="text-lg text-(--text-primary) leading-relaxed">
            This specification confirms that Kairo Desktop v0.6.1 operates under a 100% local-first privacy charter with zero remote data collection.
          </p>
          <div className="pt-2">
            <KairoButton
              onClick={onNavigateHome}
              variant="primary"
              className="py-3 px-6 text-base font-semibold"
            >
              Back to Kairo Desktop Landing
            </KairoButton>
          </div>
        </div>
      </section>
    </div>
  );
};
