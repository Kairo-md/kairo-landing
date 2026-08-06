import React, { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
interface PreloaderProps {
  theme?: "dark" | "light";
  onFinish?: () => void;
  durationMs?: number;
}

export const Preloader: React.FC<PreloaderProps> = ({
  theme = "dark",
  onFinish,
  durationMs = 2500,
}) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(
      () => {
        setFadeOut(true);
      },
      Math.max(0, durationMs - 300),
    );

    const finishTimer = setTimeout(() => {
      onFinish?.();
    }, durationMs);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [durationMs, onFinish]);

  return (
    <div
      className={`fixed inset-0 z-9999 flex flex-col items-center justify-center transition-opacity duration-300 ${
        fadeOut ? "opacity-0" : "opacity-100"
      } ${
        theme === "dark"
          ? "bg-[#0b0f17] text-white"
          : "bg-neutral-50 text-neutral-900"
      }`}
    >
      <div className="w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
        <DotLottieReact
          src="https://lottie.host/54a46587-4290-4fc7-86ab-a2f2985f158d/abfcelJGXp.lottie"
          loop
          autoplay
          speed={0.5}
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};
