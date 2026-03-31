import { useEffect, useRef, useState } from "react";

const EnglishLoader = () => {
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
          viewBox="0 0 637 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.44556 166.558C34.9928 151.245 60.0943 131.553 88.5726 98.0349C107.957 75.1542 118.379 49.0282 118.875 31.008C119.123 17.609 112.59 7.4442 100.513 7.4442C87.1132 7.4442 78.6765 17.609 73.4656 40.9417C67.7584 66.5846 63.54 96.009 52.87 190.361"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M53.9158 181.14C59.3785 133.12 80.1653 98.0536 106.716 98.0536C122.597 98.0536 132.69 110.709 129.824 128.823C128.211 139.493 126.341 150.411 124.162 163.066C121.622 178.947 128.881 191.354 150.875 191.354C182.951 191.354 217.943 173.529 235.851 145.921C241.952 136.515 244.433 128.078 244.681 119.89C244.93 105.001 236.493 93.8352 221.604 93.8352C202.746 93.8352 188.354 115.175 188.354 142.47C188.354 171.751 204.235 192.346 237.961 192.346C283.819 192.346 334.613 137.297 357.952 75.8642C364.542 58.5186 367.014 42.4121 367.014 31.1568C367.014 17.8113 362.796 7.56384 350.885 7.56384C339.222 7.56384 331.53 16.6197 324.582 30.9185C316.442 47.5023 310.42 71.4218 307.957 98.4605C301.753 166.307 315.649 191.354 348.689 191.354C388.753 191.354 433.296 135.54 456.039 75.6742C462.557 58.5186 465.029 42.4121 465.029 31.1568C465.029 17.8113 460.81 7.56384 448.9 7.56384C437.237 7.56384 429.545 16.6197 422.597 30.9185C414.457 47.5023 408.435 71.4218 405.972 98.4605C399.768 166.307 413.664 191.354 443.169 191.354C472.628 191.354 488.631 165.675 498.225 138.408C507.709 111.453 519.371 94.8278 543.689 94.8278C563.788 94.8278 579.669 109.716 579.669 137.756C579.669 168.773 559.545 192.098 534.115 192.346C511.737 192.594 497.039 174.48 498.528 147.185C500.265 116.912 518.627 94.8278 542.696 94.8278C556.592 94.8278 568.263 101.005 577.436 107.731C602.303 125.872 621.463 114.661 628.8 96.7242"
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

export default EnglishLoader;
