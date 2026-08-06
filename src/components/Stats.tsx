import React, { useState, useEffect, useRef } from "react";
import {
  SiTauri,
  SiRust,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiVite,
  SiSqlite,
  SiD3,
  SiMarkdown,
} from "react-icons/si";

interface CounterProps {
  target: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

const AnimatedCounter: React.FC<CounterProps> = ({
  target,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1600,
}) => {
  const [count, setCount] = useState<number>(0);
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime: number | null = null;

          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease out cubic curve for smooth deceleration at the end
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = easeOutProgress * target;

            setCount(currentValue);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(target);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [target, duration, hasAnimated]);

  return (
    <span ref={elementRef}>
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
};

export const Stats: React.FC = () => {
  // Official Brand Logos of the main Tech Stack
  const techLogos = [
    { icon: SiTauri, name: "Tauri" },
    { icon: SiRust, name: "Rust" },
    { icon: SiReact, name: "React" },
    { icon: SiTypescript, name: "TypeScript" },
    { icon: SiTailwindcss, name: "Tailwind CSS" },
    { icon: SiVite, name: "Vite" },
    { icon: SiD3, name: "D3.js" },
    { icon: SiSqlite, name: "SQLite" },
    { icon: SiMarkdown, name: "Markdown / Tiptap" },
  ];

  const statList = [
    {
      target: 50,
      decimals: 0,
      prefix: "",
      suffix: "+",
      label: "Active Desktop Downloads",
      subtext: "Windows, macOS & Linux",
    },
    {
      target: 99.6,
      decimals: 1,
      prefix: "",
      suffix: " %",
      label: "Local-First & Private",
      subtext: "Zero Cloud Trackers or Telemetry",
    },
    {
      target: 20,
      decimals: 0,
      prefix: "<",
      suffix: " MB",
      label: "Lightweight Memory Footprint",
      subtext: "Powered by Tauri & Rust",
    },
    {
      target: 0.1,
      decimals: 1,
      prefix: "",
      suffix: "s",
      label: "Instant Launch Time",
      subtext: "Native Performance",
    },
  ];

  // Quadruple icon set for seamless infinite marquee scrolling
  const marqueeLogos = [...techLogos, ...techLogos, ...techLogos, ...techLogos];

  return (
    <section className="py-16 border-b border-(--border) bg-(--sidebar-bg) overflow-hidden shadow-none">
      {/* Official Tech Stack Brand Logos Infinite Marquee */}
      <div className="relative w-full overflow-hidden mb-12 py-2">
        {/* Left & Right Fading Edge Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-linear-to-r from-(--sidebar-bg) to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-linear-to-l from-(--sidebar-bg) to-transparent z-10 pointer-events-none" />

        {/* Sliding Marquee Track with BIG light grey official brand logos */}
        <div className="animate-marquee flex items-center gap-14 sm:gap-20">
          {marqueeLogos.map((item, idx) => {
            const LogoComp = item.icon;
            return (
              <div
                key={idx}
                title={item.name}
                className="shrink-0 text-(--text-muted) opacity-35 hover:opacity-100 hover:text-accent transition-all duration-300 cursor-pointer"
              >
                <LogoComp className="w-10 h-10 sm:w-12 sm:h-12" />
              </div>
            );
          })}
        </div>
      </div>

      {/* 4 Stat Cards with Animated Count-Up when scrolled into view */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
          {statList.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center p-6 rounded-xl transition-all group"
            >
              <div className="text-5xl text-(--text-primary) hover:text-accent transition-colors tracking-tight mb-2 cursor-cell font-sans font-light">
                <AnimatedCounter
                  target={stat.target}
                  decimals={stat.decimals}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  duration={1600}
                />
              </div>
              <div className="flex flex-col items-center mt-5 text-center">
                <div className="text-md text-(--text-primary) mb-1 font-medium">
                  {stat.label}
                </div>
                <div className="text-xs text-(--text-secondary)">
                  {stat.subtext}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
