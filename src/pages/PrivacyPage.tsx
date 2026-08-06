import React from "react";
import { DocsPage } from "./DocsPage";

interface PrivacyPageProps {
  theme: "dark" | "light";
  onToggleTheme: () => void;
  onNavigateHome: () => void;
  onNavigatePage: (page: "home" | "about" | "privacy") => void;
  onScrollToSection: (id: string) => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = (props) => {
  return <DocsPage {...props} initialTab="privacy" />;
};
