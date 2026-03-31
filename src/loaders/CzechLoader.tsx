import { useEffect, useRef, useState } from "react";

const CzechLoader = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!svgRef.current) return;

    // Enforce left-to-right animation order
    const paths = Array.from(svgRef.current.querySelectorAll("path"));

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
          viewBox="0 0 511 276"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M88.3409 112.836C83.4763 101.641 73.1362 94.0833 56.6768 94.0833C29.3815 94.0833 8.86803 121.379 7.52133 150.659C6.34766 177.458 18.7136 192.523 36.327 192.346C61.3273 192.096 79.7041 167.54 87.9071 115.583C88.9192 109.173 89.968 102.479 90.9801 96.0684"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M90.9805 96.0685C89.9558 102.571 88.9312 109.073 87.9066 115.576C83.4252 144.016 81.3575 155.236 81.5796 162.57C82.098 179.691 88.2554 191.354 106.557 191.354C136.167 191.354 166.381 133.288 193.148 97.0491C211.834 71.7507 220.945 49.0765 221.443 31.0079C221.691 17.6089 215.239 7.44417 203.081 7.44417C189.681 7.44417 181.244 17.6089 176.033 40.9417C170.326 66.5846 166.108 96.0089 155.438 190.361"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M156.483 181.14C161.747 134.866 182.733 98.0535 209.284 98.0535C225.165 98.0535 235.258 110.709 232.392 128.823C230.778 139.493 227.864 151.9 226.199 164.058C224.172 179.443 229.96 191.354 247.704 191.354C272.41 191.354 283.694 164.434 292.961 138.098C302.336 111.453 313.998 94.8277 338.316 94.8277C358.415 94.8277 374.296 109.716 374.296 137.756C374.296 168.773 354.172 192.098 328.742 192.346C306.364 192.594 291.666 174.48 293.155 147.185C294.892 116.912 313.254 94.8277 337.323 94.8277C351.219 94.8277 360.897 99.5424 372.063 107.731C406.631 132.949 435.311 120.755 445.512 95.8203"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M445.512 95.8204C440.88 135.109 436.248 174.398 431.617 213.686C427.022 252.659 415.488 268.277 398.118 268.277C386.455 268.277 378.019 260.85 378.019 248.922C378.019 232.985 390.113 221.543 417.969 212.942C468.775 197.254 490.168 179.263 503.329 145.2"
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

export default CzechLoader;
