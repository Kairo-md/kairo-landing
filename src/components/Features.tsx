import React from "react";

export const Features: React.FC = () => {
  const steps = [
    {
      id: "capture",
      title: "CAPTURE",
      bgColor: "#5b8fb9", // Soft Slate Teal
      desc: "Effortlessly capture raw thoughts, code snippets, and daily notes in clean Markdown.",
      arrowPos: "bottom", // Arrow points DOWN to description below
    },
    {
      id: "connect",
      title: "CONNECT",
      bgColor: "#3a7d5c", // Forest Emerald Green
      desc: "Link ideas bi-directionally using [[WikiLinks]] to form an interconnected second brain.",
      arrowPos: "top", // Arrow points UP to description above
    },
    {
      id: "visualize",
      title: "VISUALIZE",
      bgColor: "#c49a45", // Muted Ochre Gold
      desc: "Explore dynamic D3 knowledge graph clusters to discover hidden relationships in real-time.",
      arrowPos: "bottom", // Arrow points DOWN to description below
    },
    {
      id: "refine",
      title: "REFINE",
      bgColor: "#9e4759", // Muted Burgundy Red
      desc: "Dual pane split-view editing with Tiptap engine for effortless drafting & referencing.",
      arrowPos: "top", // Arrow points UP to description above
    },
    {
      id: "sovereign",
      title: "SOVEREIGN",
      bgColor: "#5c374c", // Dark Wine / Plum
      desc: "100% offline local SQLite storage with zero cloud tracking, analytics, or telemetry.",
      arrowPos: "bottom", // Arrow points DOWN to description below
    },
  ];

  return (
    <section
      id="features"
      className="py-24 bg-(--bg) border-b border-(--border) relative shadow-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mx-auto ">
          <h2 className="text-5xl sm:text-6xl font-light text-(--text-primary) tracking-tight">
            Designed to feel simple and fast
          </h2>
        </div>

        {/* Hexagonal Interlocking Workflow Diagram */}
        <div className="relative py-16 px-4 ">
          <div className="min-w-240 max-w-5xl mx-auto flex items-center justify-center relative min-h-105">
            {/* Hexagon Chain with visible gaps */}
            <div className="flex items-center justify-center gap-3 sm:gap-5 md:gap-6 relative z-10">
              {steps.map((step, idx) => {
                const isShiftedDown = idx % 2 === 1; // 0=up, 1=down, 2=up, 3=down, 4=up

                return (
                  <div
                    key={step.id}
                    className={`relative flex flex-col items-center group transition-transform hover:z-30 hover:scale-105 duration-300 ${
                      isShiftedDown ? "translate-y-12 sm:translate-y-14" : "-translate-y-4"
                    }`}
                  >
                    {/* Description & Arrow ABOVE (for bottom-shifted hexagons or top arrow steps) */}
                    {step.arrowPos === "top" && (
                      <div className="absolute -top-36 sm:-top-40 left-1/2 -translate-x-1/2 w-52 text-center flex flex-col items-center pointer-events-none">
                        <p className="text-lg font-script text-(--text-secondary) group-hover:text-accent transition-colors leading-snug px-1">
                          {step.desc}
                        </p>
                        {/* Curved Arrow pointing UP */}
                        <svg
                          className="w-5 h-9 text-(--text-secondary) group-hover:text-accent transition-colors mt-1.5 opacity-75 group-hover:opacity-100"
                          viewBox="0 0 20 36"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            d="M10 34 C 10 20, 10 12, 10 6 M4 12 L10 4 L16 12"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    )}

                    {/* Hexagon Shape Polygon - Wider Horizontal Ratio */}
                    <div
                      className="w-44 h-36 sm:w-56 sm:h-44 md:w-60 md:h-46 flex items-center justify-center text-white font-bold tracking-widest text-base sm:text-lg md:text-xl shadow-none cursor-pointer transition-all duration-300 group-hover:brightness-110"
                      style={{
                        backgroundColor: step.bgColor,
                        clipPath:
                          "polygon(20% 0%, 80% 0%, 100% 50%, 80% 100%, 20% 100%, 0% 50%)",
                      }}
                    >
                      <span className="drop-shadow-sm select-none font-sans uppercase">
                        {step.title}
                      </span>
                    </div>

                    {/* Description & Arrow BELOW (for top-shifted hexagons) */}
                    {step.arrowPos === "bottom" && (
                      <div className="absolute -bottom-36 sm:-bottom-40 left-1/2 -translate-x-1/2 w-52 text-center flex flex-col items-center pointer-events-none">
                        {/* Curved Arrow pointing DOWN */}
                        <svg
                          className="w-5 h-9 text-(--text-secondary) group-hover:text-accent transition-colors mt-2 mb-1.5 opacity-75 group-hover:opacity-100"
                          viewBox="0 0 20 36"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            d="M10 2 C 10 16, 10 24, 10 30 M4 24 L10 32 L16 24"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <p className="text-lg font-script text-(--text-secondary) group-hover:text-accent transition-colors leading-snug px-1">
                          {step.desc}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
