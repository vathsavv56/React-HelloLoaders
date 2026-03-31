import { useEffect, useRef, useState } from "react";

const CatalanLoader = () => {
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
          viewBox="0 0 561 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.44531 169.394C34.9398 153.208 58.7265 132.901 85.267 96.9692C103.894 71.7507 113.005 49.0765 113.503 31.008C113.751 17.6089 107.299 7.44417 95.1405 7.44417C81.741 7.44417 73.3043 17.6089 68.0933 40.9417C62.3862 66.5846 58.1678 96.0089 47.4978 190.361"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M48.5435 181.14C53.8075 134.866 74.793 98.0536 101.344 98.0536C117.225 98.0536 127.318 110.709 124.452 128.823C122.839 139.493 119.924 151.9 118.259 164.059C116.233 179.443 122.02 191.354 139.914 191.354C165.171 191.354 181.071 166.831 187.951 137.792"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M233.354 94.3315C208.532 96.3381 189.964 117.376 186.456 146.193C183.23 172.495 197.87 192.346 221.195 192.346C249.483 192.346 267.845 168.029 269.086 137.756C270.078 108.724 256.183 94.0834 237.324 94.0834C222.436 94.0834 214.495 105.25 214.992 118.897C215.476 137.558 229.47 158.509 258.831 161.186C299.556 164.9 355.255 134.79 377.745 75.5932C384.232 58.5187 386.704 42.4122 386.704 31.1568C386.704 17.8113 382.485 7.56387 370.575 7.56387C358.912 7.56387 351.22 16.6197 344.272 30.9185C336.131 47.5023 330.11 71.4218 327.647 98.4606C321.443 166.307 335.339 191.354 365.067 191.354C395.194 191.354 415.116 165.241 423.731 135.037"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M501.989 112.836C497.125 101.641 486.785 94.0833 470.325 94.0833C443.03 94.0833 422.516 121.379 421.17 150.659C419.996 177.458 432.362 192.523 449.975 192.346C474.976 192.096 493.352 167.54 501.556 115.583C502.568 109.173 503.616 102.479 504.629 96.0684"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M504.628 96.0685C503.604 102.571 502.579 109.073 501.555 115.576C497.073 144.016 495.005 155.236 495.228 162.57C495.746 179.691 501.903 191.354 517.288 191.354C536.643 191.354 547.498 178.202 552.709 163.81"
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

export default CatalanLoader;
