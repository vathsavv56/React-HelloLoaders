import { useEffect, useRef, useState } from "react";

const ChineseHongKongLoader = () => {
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
          viewBox="0 0 466 221"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10.6749 63.9878C6.96214 92.8117 6.94814 126.16 9.11378 156.836" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M7.81006 103.337C8.3382 82.5588 18.4378 64.0295 35.1261 64.0295C48.4891 64.0295 55.7526 75.1771 54.89 95.6345C54.03 116.03 46.6231 139.103 35.6502 156.137" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M35.9009 156.137C44.3943 157.251 56.8766 156.416 65.0941 154.745" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M148.373 9.73803C128.77 36.0408 98.2485 68.7951 75.916 85.4204" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M141.587 19.4663C157.185 39.123 187.49 65.3068 211.4 81.202" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M111.648 88.6462C137.188 90.6299 160.078 90.952 179.638 88.2285" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M179.638 88.2285C117.073 98.6034 87.0375 144.564 98.4967 197.532" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M98.4966 197.515C101.837 166.629 117.879 142.27 144.65 139.41C166.461 137.08 180.879 147.823 180.879 167.045C180.879 186.362 163.944 203.57 135.221 213.212" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M135.221 213.212C155.569 212.468 176.164 211.723 194.526 209.986" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M301.971 18.1748C283.067 50.5155 264.164 82.8563 245.261 115.197" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M281.697 55.8919C284.985 99.8125 283.615 171.773 280.602 201.301" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M340.774 46.9456C366.875 42.7775 397.309 41.415 429.312 43.0164" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M388.363 7.44422C388.632 17.0658 386.748 48.9 382.306 86.7212" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M322.769 95.1616C366.494 87.6248 430.513 84.8335 458.458 86.5499" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M458.458 86.55C410.957 106.584 354.845 133.729 312.852 165.272" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M424.573 151.545C399.944 159.076 376.201 164.084 352.952 167.077" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M355.902 124.559C352.863 138.56 351.836 153.531 352.292 167.117C353.182 193.606 366.121 207.47 393.481 208.455C423.305 209.529 441.98 197.68 448.921 182.906" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
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

export default ChineseHongKongLoader;