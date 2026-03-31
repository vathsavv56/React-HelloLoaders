import { useEffect, useRef, useState } from "react";

const HebrewLoader = () => {
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

      setProgress(Math.min(100, Math.round(nextProgress)));

      if (elapsed < totalDuration) {
        frameId = requestAnimationFrame(updateProgress);
      }
    };

    frameId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className="w-full h-screen bg-black flex justify-center items-center overflow-hidden m-0 p-0 relative">
      <style
        dangerouslySetInnerHTML={{
          __html:
            "@keyframes drawLine { 0% { opacity: 0; } 1% { opacity: 1; } 100% { stroke-dashoffset: 0; opacity: 1; } } path { stroke-linecap: round; stroke-linejoin: round; fill: none; }",
        }}
      />

      <div className="w-[92%] sm:w-[84%] max-w-275 flex flex-col justify-center items-center gap-2 sm:gap-3 px-2 sm:px-0 -translate-y-6 sm:-translate-y-8">
        <svg
          ref={svgRef}
          className="w-full max-w-[320px] sm:max-w-[500px] md:max-w-[600px] h-auto drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"
          viewBox="0 0 407 216"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M398.761 169.975C392.806 190.819 376.925 207.692 350.622 207.692C324.567 207.692 309.679 187.097 310.672 153.35C311.664 118.61 331.968 88.0893 357.322 88.0893C374.935 88.0893 383.869 101.758 380.647 120.595C374.94 153.35 338.215 169.727 287.595 173.201"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M248.886 133.251C220.102 134.243 197.769 156.576 199.506 183.375C200.25 199.504 211.169 208.189 224.072 208.189C243.178 208.189 257.074 192.556 255.337 162.283C253.601 134 236.881 98.3051 235.912 62.9467C235.04 31.1209 249.167 7.44419 276.181 7.44419C295.075 7.44419 306.649 18.57 313.402 31.2655"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M161.789 90.5707C160.548 127.792 155.337 172.208 146.9 205.707"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M28.5382 90.0744C70.9624 90.0744 106.702 133.251 105.461 177.419C104.965 196.774 94.7913 205.707 79.4067 205.707C54.3656 205.707 31.835 167.277 28.29 91.3151"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M28.29 91.3151C24.3197 132.01 18.1163 170.223 7.44629 205.707"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
        </svg>

        <div className="w-full max-w-140">
          <div className="w-full flex justify-end mb-2 sm:mb-3">
            <span className="text-white text-sm sm:text-base font-sans tabular-nums font-bold tracking-wider">
              {progress}%
            </span>
          </div>

          <div className="h-1 sm:h-1.5 w-full bg-white/20 overflow-hidden rounded-full">
            <div
              className="h-full bg-white transition-[width] duration-100 ease-out"
              style={{ width: progress + "%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HebrewLoader;
