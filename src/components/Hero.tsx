import React, { useState, useEffect } from "react";
import { KairoButton } from "./ui/KairoButton";
// import catImg from "../assets/cat.png";
import bgImg from "../assets/background.png";
import { GoDesktopDownload } from "react-icons/go";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface HeroProps {
  theme: "dark" | "light";
  onScrollToDownload: () => void;
  onScrollToDemo: () => void;
  accentColor?: string;
  onSelectAccentColor?: (colorHex: string) => void;
}

const ACCENT_COLORS = [
  { name: "Sage Green", hex: "#5E6F52" },
  { name: "Warm Olive", hex: "#8B6B4A" },
  { name: "Terracotta Rust", hex: "#A35C4A" },
  { name: "Slate Blue", hex: "#5A6E8A" },
  { name: "Vintage Gold", hex: "#B08D3B" },
  { name: "Soft Plum", hex: "#6F5A7A" },
];

const TYPING_PHRASES = [
  "Take notes and share",
  "Connect your ideas",
  "Build your knowledge",
];

export const Hero: React.FC<HeroProps> = ({
  onScrollToDownload,
  onScrollToDemo,
  accentColor = "#5E6F52",
  onSelectAccentColor,
}) => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = TYPING_PHRASES[phraseIndex];
    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText.length < currentPhrase.length) {
      // Typing forward
      timer = setTimeout(() => {
        setDisplayText(currentPhrase.slice(0, displayText.length + 1));
      }, 70);
    } else if (!isDeleting && displayText.length === currentPhrase.length) {
      // Pause at full word
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2200);
    } else if (isDeleting && displayText.length > 0) {
      // Backspacing
      timer = setTimeout(() => {
        setDisplayText(currentPhrase.slice(0, displayText.length - 1));
      }, 40);
    } else if (isDeleting && displayText.length === 0) {
      // Switch to next phrase
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % TYPING_PHRASES.length);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIndex]);

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-24 pb-16 md:pt-28 md:pb-24 flex items-center bg-(--bg) border-b border-(--border) overflow-hidden shadow-none"
    >
      {/* Background Image Sub-layer */}
      <div
        className="absolute inset-0 pointer-events-none bg-cover bg-center bg-no-repeat opacity-25 dark:opacity-20 transition-opacity"
        style={{ backgroundImage: `url(${bgImg})` }}
      />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Heading, Copy, Actions */}
        <div className="lg:col-span-7 relative z-20 space-y-10">
          {/* Headline - Preventing line wrap on typed text */}
          <div className="flex flex-col justify-center">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-light text-(--text-primary) tracking-tight leading-[0.95]">
              <span className="whitespace-nowrap inline-block">
                {displayText}
                {/* Blinking Typewriter Cursor */}
                <span
                  className="inline-block w-1 sm:w-1.5 h-[0.85em] ml-1.5 align-middle animate-pulse transition-colors"
                  style={{ backgroundColor: accentColor }}
                />
              </span>

              <br />

              <div className="flex flex-wrap items-center gap-10">
                {/* Accent script font strictly on line 2 */}
                <span
                  className="font-script text-9 font-normal inline-block transform -rotate-1 transition-colors duration-300"
                  style={{ color: accentColor }}
                >
                  with{" "}
                  <span className="relative inline-block px-1">
                    <span style={{ color: accentColor }}>Kairo</span>
                    {/* Repeating Animated Underline Stroke */}
                    <svg
                      className="absolute -bottom-2 left-0 w-full h-3.5 overflow-visible pointer-events-none"
                      viewBox="0 0 100 20"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M2 14 Q 25 4, 50 12 T 98 10"
                        stroke={accentColor}
                        strokeWidth="4"
                        strokeLinecap="round"
                        className="animate-underline-stroke"
                      />
                    </svg>
                  </span>
                </span>

                {/* Six Color Accent Picker Horizontally Inline */}
                <div className="flex items-center relative z-30 gap-2.5 mt-5 p-2.5 w-fit transition-all self-center">
                  {ACCENT_COLORS.map((c) => {
                    const isSelected =
                      accentColor.toLowerCase() === c.hex.toLowerCase();
                    return (
                      <button
                        key={c.hex}
                        type="button"
                        onClick={() => onSelectAccentColor?.(c.hex)}
                        title={`Set accent color to ${c.name}`}
                        className={`w-8 h-8 rounded-lg transition-all duration-200 flex items-center justify-center cursor-pointer relative ${
                          isSelected
                            ? "scale-110 z-10"
                            : "hover:scale-105 opacity-65 hover:opacity-100"
                        }`}
                        style={{
                          backgroundColor: c.hex,
                          outline: isSelected ? `2.5px solid ${c.hex}` : "none",
                          outlineOffset: isSelected ? "4px" : "0px",
                          boxShadow: isSelected
                            ? `0 0 14px ${c.hex}90`
                            : "none",
                        }}
                      ></button>
                    );
                  })}
                </div>
              </div>
            </h1>
          </div>

          {/* Actions with KairoButton */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <KairoButton
              variant="primary"
              onClick={onScrollToDownload}
              className="py-3.5 px-7 text-lg font-normal"
              style={{ backgroundColor: accentColor }}
            >
              <GoDesktopDownload
                className="inline-block mr-2 -mt-0.5"
                size={20}
              />
              Download v0.6.1
            </KairoButton>

            <KairoButton
              variant="outline"
              onClick={onScrollToDemo}
              className="py-3.5 px-7 text-lg font-normal"
            >
              Try Interactive Demo
            </KairoButton>
          </div>
        </div>

        {/* Right Column: Cat Illustration inside solid organic blob */}
        <div className="lg:col-span-5 relative z-10 flex justify-center items-center">
          <div className="relative w-full max-w-md sm:max-w-lg aspect-square flex items-center justify-center">
            {/* Organic solid blob shape */}
            <div
              className="absolute inset-4 rounded-[38%_62%_63%_37%/41%_44%_56%_59%] transition-all duration-300 opacity-25 dark:opacity-30"
              style={{ backgroundColor: accentColor }}
            ></div>

            {/* Centered & Balanced Lottie Container */}
            <div className="relative z-10 flex items-center justify-center transform scale-100 sm:scale-125 lg:scale-135 -translate-y-3 pointer-events-none">
              <DotLottieReact
                src="https://lottie.host/cf53b37e-75cc-41ab-841c-1e55d236a9c2/zRTTXZfA7o.lottie"
                loop
                autoplay
                className="w-3xl max-w-3xl h-full object-contain transition-transform duration-300 pointer-events-auto hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
