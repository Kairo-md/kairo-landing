import React from "react";
import { UserX, Shield, DollarSign, ArrowRight } from "lucide-react";
import { KairoButton } from "../../components/ui/KairoButton";
import type { TocItem } from "./GettingStartedPage";

export const ACCOUNT_BILLING_TOC: TocItem[] = [
  { id: "zero-accounts", title: "User Identity & Zero-Accounts", level: 1 },
  { id: "free-license", title: "Free Desktop License", level: 1 },
  {
    id: "data-sovereignty",
    title: "Data Sovereignty & Independence",
    level: 1,
  },
];

interface AccountBillingPageProps {
  onNavigateTab: (tab: string) => void;
}

export const AccountBillingPage: React.FC<AccountBillingPageProps> = ({
  onNavigateTab,
}) => {
  return (
    <div className="space-y-10">
      {/* User Identity & Zero-Account Policy */}
      <section id="zero-accounts" className="space-y-6">
        <h1 className="text-6xl font-bold tracking-tight text-(--text-primary) leading-tight">
          User Identity & Zero-Account Policy
        </h1>
        <p className="text-lg text-(--text-primary) leading-relaxed">
          Kairo operates without user authentication servers or identity
          management infrastructure.
        </p>

        <div className="p-6 bg-accent/10 border-l-4 border-accent rounded-r-lg space-y-3 text-lg text-(--text-primary)">
          <div className="font-bold text-accent text-base uppercase tracking-wider flex items-center gap-2">
            <UserX className="w-5 h-5" />
            Zero Credentials Guarantee
          </div>
          <p className="text-(--text-primary) leading-relaxed">
            You will never be asked for an email, username, password, credit
            card, or telephone number to use Kairo Desktop.
          </p>
        </div>

        <ul className="space-y-3 text-lg text-(--text-primary) list-disc pl-6 leading-relaxed">
          <li>
            <strong className="text-(--text-primary)">
              No Registration Required:
            </strong>{" "}
            Users are not required to provide email addresses, names, phone
            numbers, or credentials.
          </li>
          <li>
            <strong className="text-(--text-primary)">
              No User ID Tracking:
            </strong>{" "}
            The application does not generate or transmit hardware GUIDs or user
            identifiers to remote endpoints.
          </li>
          <li>
            <strong className="text-(--text-primary)">
              No Authentication Tokens:
            </strong>{" "}
            Kairo does not issue, store, or refresh OAuth tokens or web session
            cookies.
          </li>
        </ul>
      </section>

      {/* Free License Section */}
      <section
        id="free-license"
        className="space-y-6 pt-4 border-t border-(--border)"
      >
        <h2 className="text-3xl font-bold tracking-tight text-(--text-primary) pb-3 border-b border-(--border) flex items-center gap-2">
          <DollarSign className="w-6 h-6 text-accent" />
          100% Free Desktop License & Future Cloud Sync Model
        </h2>

        <p className="text-lg text-(--text-primary) leading-relaxed">
          Kairo Desktop core note-taking features are provided completely free of charge for personal,
          academic, and commercial use on Windows, macOS, and Linux platforms.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg">
          <div className="p-5 rounded-lg bg-(--sidebar-bg) border border-(--border) space-y-2">
            <div className="font-bold text-emerald-400 text-lg flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span>Free Local Desktop App</span>
            </div>
            <p className="text-(--text-primary) leading-relaxed">
              All core desktop note-taking features, including graph visualization, Tiptap Markdown
              editor, and local SQLite indexing are 100% free with zero paywalls.
            </p>
          </div>

          <div className="p-5 rounded-lg bg-(--sidebar-bg) border border-(--border) space-y-2">
            <div className="font-bold text-emerald-400 text-lg flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span>No Commercial Restrictions</span>
            </div>
            <p className="text-(--text-primary) leading-relaxed">
              Use Kairo Desktop for work, research, engineering, and enterprise
              documentation without licensing fees.
            </p>
          </div>
        </div>

        {/* Future Cloud Sync & Online Services Hint */}
        <div className="p-5 rounded-lg bg-(--sidebar-bg) border border-accent/40 space-y-2 text-lg text-(--text-primary)">
          <div className="font-bold text-accent text-base uppercase tracking-wider flex items-center gap-2">
            <span>Roadmap Note: Optional Cloud Sync Subscription</span>
          </div>
          <p className="text-(--text-primary) leading-relaxed">
            If online authentication and multi-device cross-platform cloud synchronization features are added in future roadmap updates, cloud sync services will be available as an <strong>optional monthly subscription</strong> to cover server infrastructure and operational costs. Local offline desktop note-taking will always remain completely free.
          </p>
        </div>
      </section>

      {/* Data Sovereignty */}
      <section
        id="data-sovereignty"
        className="space-y-4 pt-4 border-t border-(--border)"
      >
        <h2 className="text-2xl font-bold text-(--text-primary)">
          Data Sovereignty & Vendor Lock-in Exemption
        </h2>
        <p className="text-lg text-(--text-primary) leading-relaxed">
          Because your data is stored locally in open SQLite database schema and
          standard Markdown text files, you are never locked into a vendor
          ecosystem. You can back up or migrate your notes at any time.
        </p>

        <div className="pt-4">
          <KairoButton
            onClick={() => onNavigateTab("faq")}
            variant="primary"
            className="py-3 px-6 text-base font-semibold flex items-center gap-2"
          >
            <span>Next: FAQ & Support</span>
            <ArrowRight className="w-5 h-5" />
          </KairoButton>
        </div>
      </section>
    </div>
  );
};
