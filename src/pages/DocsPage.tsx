import React, { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Search, ChevronRight } from "lucide-react";

import { GettingStartedPage, GETTING_STARTED_TOC } from "./docs/GettingStartedPage";
import { HowItWorksPage, HOW_IT_WORKS_TOC } from "./docs/HowItWorksPage";
import { FeaturesPage, FEATURES_TOC } from "./docs/FeaturesPage";
import { AccountBillingPage, ACCOUNT_BILLING_TOC } from "./docs/AccountBillingPage";
import { FaqPage, FAQ_TOC } from "./docs/FaqPage";
import { PrivacyPolicyPage, PRIVACY_POLICY_TOC } from "./docs/PrivacyPolicyPage";
import type { TocItem } from "./docs/GettingStartedPage";

interface DocsPageProps {
  theme: "dark" | "light";
  initialTab?: DocTabId;
  onToggleTheme: () => void;
  onNavigateHome: () => void;
  onNavigatePage: (page: "home" | "about" | "privacy") => void;
  onScrollToSection: (id: string) => void;
}

export type DocTabId =
  | "getting-started"
  | "how-it-works"
  | "features"
  | "account-billing"
  | "faq"
  | "privacy";

interface SidebarMenuItem {
  id: DocTabId;
  title: string;
  toc: TocItem[];
}

const SIDEBAR_MENU_ITEMS: SidebarMenuItem[] = [
  { id: "getting-started", title: "Getting Started", toc: GETTING_STARTED_TOC },
  { id: "how-it-works", title: "How It Works", toc: HOW_IT_WORKS_TOC },
  { id: "features", title: "Features", toc: FEATURES_TOC },
  { id: "account-billing", title: "Account & Billing", toc: ACCOUNT_BILLING_TOC },
  { id: "faq", title: "FAQ", toc: FAQ_TOC },
  { id: "privacy", title: "Privacy Policy", toc: PRIVACY_POLICY_TOC },
];

export const DocsPage: React.FC<DocsPageProps> = ({
  theme,
  initialTab = "getting-started",
  onToggleTheme,
  onNavigateHome,
  onNavigatePage,
  onScrollToSection,
}) => {
  const [activeTab, setActiveTab] = useState<DocTabId>(initialTab);
  const [expandedTabs, setExpandedTabs] = useState<Record<string, boolean>>({
    [initialTab]: true,
  });
  const [activeTocId, setActiveTocId] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Sync activeTab state from URL path on load and when initialTab changes
  useEffect(() => {
    const path = window.location.pathname.toLowerCase().replace(/\/$/, "");
    let newTab: DocTabId = initialTab;
    if (path === "/docs/how-it-works") newTab = "how-it-works";
    else if (path === "/docs/features") newTab = "features";
    else if (path === "/docs/account-billing") newTab = "account-billing";
    else if (path === "/docs/faq") newTab = "faq";
    else if (path === "/docs/privacy") newTab = "privacy";
    else if (path === "/docs/getting-started" || path === "/docs") newTab = "getting-started";
    
    setActiveTab(newTab);
    setExpandedTabs((prev) => ({ ...prev, [newTab]: true }));
  }, [initialTab]);

  // Handle browser Back / Forward navigation (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase().replace(/\/$/, "");
      let newTab: DocTabId = "getting-started";
      if (path === "/docs/how-it-works") newTab = "how-it-works";
      else if (path === "/docs/features") newTab = "features";
      else if (path === "/docs/account-billing") newTab = "account-billing";
      else if (path === "/docs/faq") newTab = "faq";
      else if (path === "/docs/privacy") newTab = "privacy";
      
      setActiveTab(newTab);
      setExpandedTabs((prev) => ({ ...prev, [newTab]: true }));
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const currentMenuItem = SIDEBAR_MENU_ITEMS.find((item) => item.id === activeTab);
  const level1Toc = currentMenuItem?.toc ? currentMenuItem.toc.filter((item) => item.level === 1) : [];

  // Reset activeTocId to first level-1 item when tab changes
  useEffect(() => {
    if (level1Toc.length > 0) {
      setActiveTocId(level1Toc[0].id);
    } else {
      setActiveTocId("");
    }
  }, [activeTab]);

  // Scroll spy for highlighted level-1 sub-item
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      for (let i = level1Toc.length - 1; i >= 0; i--) {
        const item = level1Toc[i];
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveTocId(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [level1Toc]);

  const scrollToAnchor = (id: string) => {
    setActiveTocId(id);
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleTabChange = (tabId: string) => {
    const docTab = tabId as DocTabId;
    setActiveTab(docTab);
    setExpandedTabs((prev) => ({ ...prev, [docTab]: true }));
    window.scrollTo({ top: 0, behavior: "smooth" });

    const targetUrl = docTab === "privacy" ? "/privacy" : `/docs/${docTab}`;
    window.history.pushState({ tab: docTab }, "", targetUrl);
  };

  const toggleExpand = (tabId: DocTabId, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setExpandedTabs((prev) => ({
      ...prev,
      [tabId]: !prev[tabId],
    }));
  };

  const filteredMenuItems = SIDEBAR_MENU_ITEMS.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.toc.some((sub) => sub.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-(--bg) text-(--text-primary) flex flex-col font-sans selection:bg-accent/30 selection:text-white">
      {/* Shared Header Navigation */}
      <Navbar
        theme={theme}
        onToggleTheme={onToggleTheme}
        onNavigatePage={onNavigatePage}
        onScrollToSection={onScrollToSection}
      />

      {/* 2-Column Documentation Layout with expanded content area */}
      <div className="flex-1 max-w-350 mx-auto px-6 pt-18 pb-16 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Left Column: Category Navigation Sidebar */}
        <aside className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-(--border-strong) pb-6 lg:pb-0">
          <div className="sticky top-20 max-h-[calc(100vh-6rem)] flex flex-col justify-between overflow-y-auto pr-2 space-y-5">
            <div className="space-y-4">
              
              {/* Search Box */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-(--text-muted)" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search documentation..."
                  className="w-full pl-10 pr-3 py-2.5 text-base bg-(--sidebar-bg) text-(--text-primary) border border-(--border-strong) rounded-lg focus:border-accent focus:outline-none transition-colors"
                />
              </div>

              {/* Sidebar Collapsible Menu */}
              <nav className="space-y-1.5">
                {filteredMenuItems.map((item) => {
                  const isTabActive = activeTab === item.id;
                  const isExpanded = expandedTabs[item.id] ?? isTabActive;
                  const itemUrl = item.id === "privacy" ? "/privacy" : `/docs/${item.id}`;
                  const level1Toc = item.toc ? item.toc.filter((tocItem) => tocItem.level === 1) : [];
                  const hasToc = level1Toc.length > 0;

                  // Check if a sub-item in this tab is active
                  const activeSubItemExists = isTabActive && level1Toc.some((sub) => sub.id === activeTocId);
                  // Parent gets active background pill ONLY if no sub-item inside it is currently active
                  const isParentBgActive = isTabActive && !activeSubItemExists;

                  return (
                    <div key={item.id} className="space-y-1">
                      <a
                        href={itemUrl}
                        onClick={(e) => {
                          e.preventDefault();
                          if (isTabActive && hasToc) {
                            setExpandedTabs((prev) => ({ ...prev, [item.id]: !prev[item.id] }));
                          } else {
                            handleTabChange(item.id);
                          }
                        }}
                        className={`w-full text-left px-3.5 py-2.5 rounded-lg text-base transition-all flex items-center justify-between cursor-pointer ${
                          isParentBgActive
                            ? "bg-(--active) text-(--text-primary) font-semibold"
                            : isTabActive
                            ? "text-(--text-primary) font-semibold hover:bg-(--hover)"
                            : "text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--hover)"
                        }`}
                      >
                        <span>{item.title}</span>
                        {hasToc && (
                          <button
                            type="button"
                            onClick={(e) => toggleExpand(item.id, e)}
                            className="p-1 rounded hover:bg-black/10 dark:hover:bg-white/10 transition-transform cursor-pointer shrink-0"
                            title={isExpanded ? "Collapse" : "Expand"}
                          >
                            <ChevronRight
                              className={`w-4 h-4 transition-transform duration-200 ${
                                isExpanded ? "rotate-90 text-accent" : "rotate-0 text-(--text-muted)"
                              }`}
                            />
                          </button>
                        )}
                      </a>

                      {/* Collapsible Sub-items */}
                      {hasToc && isExpanded && (
                        <div className="ml-3 pl-3 border-l border-(--border-strong) space-y-1 py-1">
                          {level1Toc.map((tocItem) => {
                            const isSubActive = isTabActive && activeTocId === tocItem.id;
                            return (
                              <button
                                key={tocItem.id}
                                onClick={() => {
                                  if (activeTab !== item.id) {
                                    handleTabChange(item.id);
                                    setTimeout(() => scrollToAnchor(tocItem.id), 120);
                                  } else {
                                    scrollToAnchor(tocItem.id);
                                  }
                                }}
                                className={`w-full text-left py-2 px-3 rounded-lg text-base transition-colors block cursor-pointer truncate ${
                                  isSubActive
                                    ? "bg-(--active) text-(--text-primary) font-semibold"
                                    : "text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--hover)"
                                }`}
                              >
                                {tocItem.title}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>
            </div>

            
          </div>
        </aside>

        {/* Main Content Column: Expanded to 9 columns for spacious, easy reading */}
        <main className="lg:col-span-9 space-y-12 min-w-0 pl-0 lg:pl-4">
          {activeTab === "getting-started" && (
            <GettingStartedPage onNavigateTab={handleTabChange} />
          )}

          {activeTab === "how-it-works" && (
            <HowItWorksPage onNavigateTab={handleTabChange} />
          )}

          {activeTab === "features" && (
            <FeaturesPage onNavigateTab={handleTabChange} />
          )}

          {activeTab === "account-billing" && (
            <AccountBillingPage onNavigateTab={handleTabChange} />
          )}

          {activeTab === "faq" && (
            <FaqPage onNavigateTab={handleTabChange} onNavigateHome={onNavigateHome} />
          )}

          {activeTab === "privacy" && (
            <PrivacyPolicyPage onNavigateHome={onNavigateHome} />
          )}
        </main>
      </div>

      {/* Shared Footer Navigation */}
      <Footer
        theme={theme}
        onNavigatePage={onNavigatePage}
        onScrollToSection={onScrollToSection}
      />
    </div>
  );
};
