import { useEffect, useRef, useState } from "react";

const TraditionalChineseLoader = () => {
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
      const length = path.getTotalLength() || 1000;

      path.style.animation = "none";

      path.style.strokeDasharray = length.toString();
      path.style.strokeDashoffset = length.toString();
      path.style.opacity = "0";

      void path.getBoundingClientRect();

      const delay = index * (strokeDuration + strokeGap);

      path.style.animation =
        "drawLine " +
        strokeDuration +
        "s cubic-bezier(0.65, 0, 0.35, 1) forwards " +
        delay +
        "s";
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
          className="w-full max-w-[320px] sm:max-w-125 md:max-w-150 h-auto drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"
          viewBox="0 0 461 237"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.4693 69.6893C6.75657 98.5131 6.74258 131.862 8.90821 162.537"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M7.60449 109.039C8.13264 88.2602 18.2323 69.7309 34.9205 69.7309C48.2835 69.7309 55.547 80.8785 54.6844 101.336C53.8244 121.732 46.4175 144.804 35.4447 161.838"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M35.6953 161.839C44.1887 162.952 56.6711 162.117 64.8885 160.446"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M148.167 15.4394C128.564 41.7421 98.0425 74.4964 75.71 91.1217"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M141.382 25.1677C156.98 44.8244 187.284 71.0082 211.442 86.9034"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M111.442 94.3475C136.983 96.3313 159.873 96.6533 179.432 93.9299"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M179.433 93.93C116.867 104.305 86.8319 150.266 98.2911 203.234"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M98.291 203.217C101.632 172.33 117.673 147.972 144.445 145.112C166.255 142.781 180.673 153.524 180.673 172.746C180.673 192.063 163.738 209.271 135.016 218.913"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M135.016 218.913C155.363 218.169 175.959 217.424 194.321 215.687"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M244.84 68.8784C241.989 102.211 241.979 140.777 243.642 176.251"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M242.919 102.813C243.509 84.0207 251.59 68.9696 265.435 68.9696C276.232 68.9696 281.125 78.3373 280.306 97.0755C279.098 124.715 271.399 156.173 263.586 175.444"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M263.586 175.444C270.306 176.739 279.519 175.777 285.866 173.834"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M292.705 9.41528C293.026 21.3079 294.687 38.073 298.291 50.9572"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M298.291 50.9571C296.176 40.7165 298.673 29.6829 304.251 23.0921C310.286 15.9603 319.288 11.8081 336.748 9.45085C354.23 7.09074 384.616 6.65672 403.005 8.98777C418.209 10.8883 425.09 18.417 424.841 29.5833C424.345 45.4642 405.238 52.4121 363.799 53.4046C345.437 53.9009 329.41 52.5829 320.13 50.6661"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M334.271 9.52428C340.474 30.9973 345.09 44.4302 348.315 53.4027"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M389.358 9.51168C382.906 29.911 378.192 43.2468 374.718 52.9215"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M328.806 82.6598C320.498 90.5057 311.708 99.7983 303.737 108.645"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M303.737 108.645C328.201 117.685 341.762 135.076 342.481 153.197C343.094 168.617 334.371 176.132 324.908 176.132C315.653 176.132 308.422 168.957 309.515 156.482C310.522 145 316.417 135.41 328.103 122.571C345.152 103.84 358.768 91.8439 374.445 78.6864"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M283.367 199.615C283.167 205.839 286.377 219.903 289.916 226.285"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M311.138 199.857C311.008 204.86 314.001 216.16 317.227 221.286"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M337.05 199.398C336.986 203.608 340.128 213.114 343.422 217.423"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M366.145 86.5042C368.167 117.584 368.972 179.736 368.09 229.087"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M427.493 71.5826C416.717 83.0814 403.8 93.264 390.888 103.177"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M390.898 103.31C406.138 100.294 425.292 98.5015 441.589 99.1222"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M391.71 140.348C406.069 138.29 424.152 137.164 439.576 137.222"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M392.242 174.867C406.868 173.137 425.749 172.095 441.704 171.747"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M414.974 120.44C416.199 147.615 416.349 179.958 415.932 209.712"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M368.747 213.246C395.208 211.069 429.869 209.279 452.676 208.675"
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

export default TraditionalChineseLoader;
