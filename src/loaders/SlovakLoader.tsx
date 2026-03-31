import { useEffect, useRef, useState } from "react";

const SlovakLoader = () => {
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
          viewBox="0 0 511 276"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M88.3404 112.836C83.4758 101.641 73.1357 94.0831 56.6763 94.0831C29.381 94.0831 8.86754 121.378 7.52084 150.659C6.34717 177.458 18.7131 192.522 36.3265 192.346C61.3268 192.096 79.7036 167.54 87.9066 115.583C88.9187 109.173 89.9675 102.479 90.9796 96.0682"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M90.9797 96.0686C89.9551 102.571 88.9305 109.074 87.9059 115.576C83.4245 144.016 81.3568 155.236 81.5789 162.57C82.0973 179.691 88.2547 191.354 106.556 191.354C136.167 191.354 166.38 133.288 193.147 97.0492C211.834 71.7508 220.945 49.0766 221.442 31.0081C221.69 17.6091 215.239 7.44432 203.08 7.44432C189.68 7.44432 181.244 17.6091 176.033 40.9418C170.326 66.5848 166.107 96.0091 155.437 190.361"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M156.483 181.14C161.747 134.866 182.732 98.0533 209.283 98.0533C225.164 98.0533 235.257 110.708 232.391 128.823C230.778 139.493 227.863 151.899 226.198 164.058C224.172 179.443 229.96 191.354 247.704 191.354C272.41 191.354 283.694 164.434 292.96 138.098C302.335 111.453 313.998 94.8275 338.316 94.8275C358.415 94.8275 374.296 109.716 374.296 137.756C374.296 168.773 354.172 192.098 328.742 192.346C306.364 192.594 291.665 174.48 293.154 147.185C294.891 116.912 313.253 94.8275 337.323 94.8275C351.219 94.8275 360.896 99.5421 372.062 107.731C406.631 132.949 435.311 120.755 445.512 95.8201"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M445.512 95.8203C440.88 135.109 436.248 174.398 431.616 213.686C427.021 252.658 415.487 268.277 398.117 268.277C386.455 268.277 378.018 260.85 378.018 248.922C378.018 232.985 390.112 221.543 417.968 212.942C468.774 197.254 490.167 179.263 503.328 145.2"
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

export default SlovakLoader;
