import React, { useState, useEffect } from "react";
import logoLight from "../assets/logo-kairo-light.png";
import logoDark from "../assets/logo-kairo-dark.png";
import { FaLightbulb, FaRegLightbulb } from "react-icons/fa6";

interface NavbarProps {
  theme: "dark" | "light";
  onToggleTheme: () => void;
  onNavigatePage: (page: "home" | "about" | "privacy") => void;
  onScrollToSection: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onToggleTheme,
  onNavigatePage,
  onScrollToSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const logo = theme === "dark" ? logoDark : logoLight;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-(--sidebar-bg)/80 backdrop-blur-md border-b border-(--border)"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Official Logo with theme contrast matching */}
        <div
          onClick={() => onNavigatePage("home")}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <img
            src={logo}
            alt="Kairo Logo"
            className="h-12 sm:h-16 w-auto transition-transform group-hover:scale-105"
          />
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center gap-3.5 sm:gap-8 text-sm sm:text-lg text-(--text-secondary)">
          <button
            onClick={() => {
              onNavigatePage("home");
              setTimeout(() => onScrollToSection("hero"), 50);
            }}
            className="hover:text-(--text-primary) transition-colors cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={() => {
              onNavigatePage("home");
              setTimeout(() => onScrollToSection("demo"), 50);
            }}
            className="hover:text-(--text-primary) transition-colors cursor-pointer"
          >
            Demo
          </button>
          <button
            onClick={() => {
              onNavigatePage("home");
              setTimeout(() => onScrollToSection("features"), 50);
            }}
            className="hover:text-(--text-primary) transition-colors cursor-pointer"
          >
            Features
          </button>
          <button
            onClick={() => onNavigatePage("about")}
            className="hover:text-(--text-primary) transition-colors cursor-pointer"
          >
            About
          </button>
        </nav>

        {/* Theme Toggle Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleTheme}
            className="px-4 py-2 text-(--text-primary) transition-colors cursor-pointer"
            title="Toggle Light/Dark Theme"
          >
            {theme === "dark" ? (
              <FaRegLightbulb size={25} className="text-neutral-500" />
            ) : (
              <FaLightbulb size={25} className="text-amber-500" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
