import { useEffect, useRef, useState } from "react";

const IndoneshianLoader = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!svgRef.current) return;

    const paths = svgRef.current.querySelectorAll("path");
    const totalDrawDuration = 4.8;
    const strokeGap = 0.08;
    const strokeDuration = Math.max(
      0.18,
      (totalDrawDuration - (paths.length - 1) * strokeGap) / paths.length,
    );

    paths.forEach((path, index) => {
      const length = path.getTotalLength();

      path.style.animation = "none";
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
      path.style.opacity = "0";

      void path.getBoundingClientRect();

      const delay = index * (strokeDuration + strokeGap);

      path.style.animation = `drawLine ${strokeDuration}s cubic-bezier(0.65, 0, 0.35, 1) forwards ${delay}s`;
    });
  }, []);

  useEffect(() => {
    const totalDuration = 6000;
    const startedAt = performance.now();
    let frameId = 0;

    const pause1At = Math.floor(Math.random() * 26) + 20;
    const pause2At = Math.floor(Math.random() * 21) + 60;
    const pause1Duration = Math.floor(Math.random() * 401) + 300;
    const pause2Duration = Math.floor(Math.random() * 401) + 300;
    const movingDuration = totalDuration - pause1Duration - pause2Duration;
    const move1Duration = movingDuration * (pause1At / 100);
    const move2Duration = movingDuration * ((pause2At - pause1At) / 100);
    const move3Duration = movingDuration * ((100 - pause2At) / 100);

    const move1End = move1Duration;
    const pause1End = move1End + pause1Duration;
    const move2End = pause1End + move2Duration;
    const pause2End = move2End + pause2Duration;
    const move3End = pause2End + move3Duration;

    const updateProgress = (now: number) => {
      const elapsed = now - startedAt;
      let nextProgress = 0;

      if (elapsed <= move1End) {
        const t = move1Duration === 0 ? 1 : elapsed / move1Duration;
        nextProgress = pause1At * t;
      } else if (elapsed <= pause1End) {
        nextProgress = pause1At;
      } else if (elapsed <= move2End) {
        const t =
          move2Duration === 0 ? 1 : (elapsed - pause1End) / move2Duration;
        nextProgress = pause1At + (pause2At - pause1At) * t;
      } else if (elapsed <= pause2End) {
        nextProgress = pause2At;
      } else if (elapsed <= move3End) {
        const t =
          move3Duration === 0 ? 1 : (elapsed - pause2End) / move3Duration;
        nextProgress = pause2At + (100 - pause2At) * t;
      } else {
        nextProgress = 100;
      }

      const roundedProgress = Math.min(100, Math.round(nextProgress));

      setProgress(roundedProgress);

      if (elapsed < totalDuration) {
        frameId = requestAnimationFrame(updateProgress);
      }
    };

    frameId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className="w-full h-screen bg-black flex justify-center items-center overflow-hidden m-0 p-0">
      <style>
        {`
          @keyframes drawLine {
            0% { opacity: 0; }
            1% { opacity: 1; }
            100% { stroke-dashoffset: 0; opacity: 1; }
          }
          path {
            stroke-linecap: round;
            stroke-linejoin: round;
            fill: none;
          }
        `}
      </style>

      <div className="w-[92%] sm:w-[84%] max-w-275 flex flex-col justify-center items-center gap-2 sm:gap-3 px-2 sm:px-0 -translate-y-6 sm:-translate-y-8">
        <svg
          ref={svgRef}
          className="w-full max-w-[320px] sm:max-w-112.5 h-auto drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"
          viewBox="0 0 570 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.44531 169.394C34.9398 153.208 58.7265 132.901 85.267 96.9693C103.894 71.7507 113.005 49.0765 113.503 31.008C113.751 17.609 107.299 7.4442 95.1405 7.4442C81.741 7.4442 73.3043 17.609 68.0933 40.9417C62.3862 66.5846 58.1678 96.009 47.4978 190.361"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M48.543 181.14C53.807 134.866 74.7925 98.0536 101.343 98.0536C117.224 98.0536 127.317 110.709 124.451 128.823C122.838 139.493 119.923 151.9 118.258 164.059C116.232 179.443 122.02 191.354 139.943 191.354C165.308 191.354 180.505 163.918 188.742 135.037"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M267.002 112.836C262.137 101.641 251.797 94.0833 235.338 94.0833C208.043 94.0833 187.529 121.379 186.182 150.659C185.009 177.458 197.375 192.523 214.988 192.346C239.988 192.096 258.365 167.54 266.568 115.583C267.58 109.173 268.629 102.479 269.641 96.0685"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M269.642 96.0685C268.617 102.571 267.592 109.073 266.568 115.576C262.086 144.016 260.019 155.236 260.241 162.57C260.759 179.691 266.917 191.354 286.404 191.354C320.183 191.354 366.76 134.555 389.17 75.5678C395.647 58.5186 398.119 42.4121 398.119 31.1568C398.119 17.8113 393.901 7.56384 381.99 7.56384C370.327 7.56384 362.635 16.6197 355.687 30.9185C347.547 47.5023 341.525 71.4218 339.062 98.4605C332.858 166.307 346.754 191.354 376.259 191.354C405.718 191.354 421.721 165.675 431.315 138.408C440.799 111.453 452.461 94.8278 476.779 94.8278C496.878 94.8278 512.759 109.716 512.759 137.756C512.759 168.773 492.635 192.098 467.205 192.346C444.827 192.594 430.129 174.48 431.618 147.185C433.355 116.912 451.717 94.8278 475.786 94.8278C489.682 94.8278 501.354 101.005 510.526 107.731C535.393 125.872 554.553 114.661 561.891 96.7242"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
        </svg>

        <div className="w-full max-w-140">
          <div className="w-full flex justify-end mb-2 sm:mb-3">
            <span className="text-white text-lg sm:text-xl font-grosek tabular-nums">
              {progress}%
            </span>
          </div>

          <div className="h-1 sm:h-1.25 w-full bg-white/20 overflow-hidden rounded-full">
            <div
              className="h-full bg-white transition-[width] duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndoneshianLoader;
