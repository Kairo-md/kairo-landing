import React from "react";
import { KairoButton } from "./ui/KairoButton";
import catCornerImg from "../assets/cat-corner.png";
import { FaWindows, FaApple, FaLinux } from "react-icons/fa6";

export const DownloadSection: React.FC = () => {
  const releases = [
    {
      os: "Windows",
      icon: FaWindows,
      filename: "Kairo_0.6.1_x64-setup.exe",
      badge: "64-bit Installer",
      requirements: "Windows 10 / 11",
      recommended: true,
      disabled: false,
      buttonText: "Download for Windows",
      downloadUrl: "https://github.com/Kairo-md/kairo-releases/releases/download/v0.6.1/Kairo_0.6.1_x64-setup.exe",
    },
    {
      os: "macOS",
      icon: FaApple,
      filename: "Kairo_0.6.1_x64.dmg",
      badge: "Apple Silicon & Intel",
      requirements: "macOS 12.0+",
      recommended: false,
      disabled: true,
      buttonText: "Coming Soon (macOS)",
      downloadUrl: "#",
    },
    {
      os: "Linux",
      icon: FaLinux,
      filename: "Kairo_0.6.1_amd64.AppImage",
      badge: "AppImage / .deb",
      requirements: "Ubuntu, Debian, Fedora",
      recommended: false,
      disabled: true,
      buttonText: "Coming Soon (Linux)",
      downloadUrl: "#",
    },
  ];

  return (
    <section
      id="download"
      className="py-24 bg-(--sidebar-bg) text-(--text-primary) border-b border-(--border) shadow-none relative z-20"
    >
      {/* Cat Mascot Overlapping directly onto Footer Background */}
      <img
        src={catCornerImg}
        alt="Kairo Cat Mascot"
        className="absolute z-30 bottom-8 right-36 6 h-80 sm:h-96 md:h-112 lg:h-128 w-auto object-contain pointer-events-none transition-transform duration-300 hover:scale-105"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-20">
        {/* Section Header - Left Aligned */}
        <div className="text-left max-w-3xl mb-12 space-y-3">
          <h2 className="text-5xl sm:text-6xl font-light text-(--text-primary) tracking-tight">
            Download Kairo Desktop
          </h2>
          <p className="text-base text-(--text-secondary) font-normal">
            Choose your operating system to get started with 100% private
            offline notes.
          </p>
        </div>

        {/* Download Cards Grid Aligned Left (justify-start) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl lg:max-w-5xl justify-start items-stretch">
          {releases.map((rel, idx) => {
            const IconComp = rel.icon;
            return (
              <div
                key={idx}
                className={`p-7 rounded-md border transition-all flex flex-col justify-between relative shadow-none group ${
                  rel.recommended
                    ? "bg-(--bg)/95 backdrop-blur-sm border-accent"
                    : rel.disabled
                      ? "bg-(--bg)/70 backdrop-blur-sm border-(--border) opacity-75"
                      : "bg-(--bg)/95 backdrop-blur-sm border-(--border-strong) hover:border-accent"
                }`}
              >
                {rel.recommended && (
                  <div className="absolute -top-3 left-6 px-3 py-1 bg-accent text-white text-xs font-bold rounded-md uppercase tracking-wider shadow-none">
                    Recommended
                  </div>
                )}

                <div className="text-left">
                  <div className="flex items-center gap-3">
                    {/* Big OS Icon */}
                    <div
                      className={`mb-4 transition-transform duration-300 ${
                        rel.disabled
                          ? "text-(--text-muted)"
                          : "text-accent group-hover:scale-110"
                      }`}
                    >
                      <IconComp className="w-12 h-12" />
                    </div>

                    <h3 className="text-2xl font-medium italic text-(--text-primary)/80 mb-1">
                      {rel.os}
                    </h3>
                  </div>
                  <p className="text-xs font-mono text-(--text-secondary) mb-4 bg-(--hover) px-2 py-1 rounded inline-block">
                    {rel.filename}
                  </p>

                  <div className="space-y-1.5 mb-8 text-sm text-(--text-secondary) font-medium">
                    <div> {rel.badge}</div>
                    <div> {rel.requirements}</div>
                  </div>
                </div>

                {rel.disabled ? (
                  <KairoButton
                    disabled
                    variant="outline"
                    className="w-full py-3 text-sm opacity-50 cursor-not-allowed pointer-events-none bg-(--hover)/50 text-(--text-muted) border-(--border)"
                  >
                    {rel.buttonText}
                  </KairoButton>
                ) : (
                  <a href={rel.downloadUrl} className="w-full">
                    <KairoButton
                      variant={rel.recommended ? "primary" : "outline"}
                      className="w-full py-3"
                    >
                      {rel.buttonText}
                    </KairoButton>
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
