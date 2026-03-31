import { useEffect, useRef, useState } from "react";

const ThaiLoader = () => {
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
          viewBox="0 0 699 272"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.68503 237.717C10.422 224.566 21.092 211.911 37.9654 211.911C53.35 211.911 62.5312 223.077 62.5312 237.221C62.5312 251.861 50.8687 262.035 35.7322 262.035C18.6106 262.035 7.44434 248.884 7.44434 228.784C7.44434 196.278 30.5213 173.946 66.2533 173.946C109.926 173.946 134.74 210.67 127.544 263.772"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M127.544 263.772C160.546 156.824 134.084 94.4511 64.8532 94.4511C38.1808 94.4511 23.6621 104.329 23.6621 117.28C23.6621 129.684 37.7817 138.214 68.2385 138.214C112.589 138.214 143.377 117.272 155.832 80.1491"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M279.156 244.665C279.156 224.814 266.997 212.407 252.109 212.407C236.476 212.407 225.062 223.325 225.062 237.469C225.062 251.861 236.228 262.035 251.613 262.035C276.675 262.035 294.293 232.01 294.293 185.856C294.293 128.288 267.99 95.5334 226.303 95.5334C214.144 95.5334 202.233 99.2555 192.308 104.963"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M267.246 57.0719C291.563 57.0719 300.496 43.9205 300.496 31.2654C300.496 18.1141 289.826 7.44408 274.938 7.44408C260.794 7.44408 249.876 17.6178 249.876 32.0098C249.876 54.5905 276.675 69.9751 311.166 69.9751C346.65 69.9751 366.501 53.1016 378.412 30.7691"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M343.176 237.717C344.913 224.566 355.583 211.911 372.457 211.911C387.841 211.911 397.022 223.077 397.022 237.221C397.022 251.861 385.36 262.035 370.223 262.035C353.102 262.035 341.936 248.884 341.936 228.784C341.936 196.278 365.012 173.946 400.744 173.946C444.417 173.946 469.231 210.67 462.035 263.772"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M462.035 263.772C495.037 156.824 468.575 94.4511 399.344 94.4511C372.672 94.4511 358.153 104.329 358.153 117.28C358.153 129.684 372.273 138.214 402.73 138.214C447.08 138.214 477.869 117.272 490.323 80.1491"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M626.055 172.705C626.055 187.841 615.633 198.511 600 198.511C584.368 198.511 573.45 188.089 573.45 173.945C573.45 159.801 584.368 149.131 599.256 149.131C615.881 149.131 627.296 161.538 627.296 180.893C627.296 229.032 577.668 263.027 538.214 263.523"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M537.965 263.524C532.258 246.154 529.032 226.303 529.032 203.97C529.032 138.71 559.553 95.5336 605.955 95.7817C645.409 95.7817 671.96 128.536 671.96 178.412C671.96 205.707 662.531 237.469 646.65 264.268"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M679.404 66.2529C671.712 37.9651 652.605 14.8882 623.077 14.8882C594.541 14.8882 573.819 33.3311 566.005 59.8013"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M566.005 59.8014C609.925 49.8758 649.628 55.8312 680.645 73.9453"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M680.646 73.9453C685.112 53.1016 689.082 27.2952 691.067 8.68477"
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

export default ThaiLoader;
