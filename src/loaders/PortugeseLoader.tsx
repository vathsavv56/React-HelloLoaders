import { useEffect, useRef, useState } from "react";

const PortugueseLoader = () => {
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
      path.style.animation = "drawLine " + strokeDuration + "s cubic-bezier(0.65, 0, 0.35, 1) forwards " + delay + "s";
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
        const t = move2Duration === 0 ? 1 : (elapsed - pause1End) / move2Duration;
        nextProgress = pause1At + (pause2At - pause1At) * t;
      } else if (elapsed <= pause2End) {
        nextProgress = pause2At;
      } else if (elapsed <= move3End) {
        const t = move3Duration === 0 ? 1 : (elapsed - pause2End) / move3Duration;
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
      <style dangerouslySetInnerHTML={{ __html: "@keyframes drawLine { 0% { opacity: 0; } 1% { opacity: 1; } 100% { stroke-dashoffset: 0; opacity: 1; } } path { stroke-linecap: round; stroke-linejoin: round; fill: none; }" }} />

      <div className="w-[92%] sm:w-[84%] max-w-275 flex flex-col justify-center items-center gap-2 sm:gap-3 px-2 sm:px-0 -translate-y-6 sm:-translate-y-8">
        <svg
          ref={svgRef}
          className="w-full max-w-[320px] sm:max-w-[500px] md:max-w-[600px] h-auto drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"
          viewBox="0 0 382 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M54.7855 94.2119C29.964 96.2185 11.3953 117.256 7.88719 146.073C4.66138 172.376 19.3016 192.227 42.6266 192.227C70.9145 192.227 89.2768 167.909 90.5175 137.636C91.51 108.604 77.6142 93.9638 58.7557 93.9638C43.8673 93.9638 35.9269 105.13 36.4232 118.778C36.9079 137.438 50.9017 158.389 80.2622 161.067C120.988 164.78 176.687 134.67 199.176 75.4736C205.663 58.3991 208.135 42.2926 208.135 31.0372C208.135 17.6917 203.917 7.44427 192.006 7.44427C180.344 7.44427 172.651 16.5002 165.704 30.7989C157.563 47.3827 151.542 71.3022 149.078 98.341C142.875 166.187 156.771 191.234 186.499 191.234C216.626 191.234 236.547 165.121 245.162 134.917" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M323.421 112.716C318.556 101.521 308.216 93.9637 291.757 93.9637C264.462 93.9637 243.948 121.259 242.601 150.539C241.428 177.338 253.794 192.403 271.407 192.227C296.407 191.977 314.784 167.421 322.987 115.464C323.999 109.053 325.048 102.359 326.06 95.9488" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M326.06 95.949C325.035 102.451 324.01 108.954 322.986 115.456C318.504 143.896 316.437 155.116 316.659 162.45C317.177 179.572 323.334 191.234 338.719 191.234C358.074 191.234 368.929 178.083 374.14 163.691" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M330.716 19.0259C319.302 31.9291 307.639 43.8398 295.232 55.2542" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
        </svg>

        <div className="w-full max-w-140">
          <div className="w-full flex justify-end mb-2 sm:mb-3">
            <span className="text-white text-sm sm:text-base font-grosek tabular-nums">
              {progress}%
            </span>
          </div>

          <div className="h-1 sm:h-1.25 w-full bg-white/20 overflow-hidden rounded-full">
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

export default PortugueseLoader;
