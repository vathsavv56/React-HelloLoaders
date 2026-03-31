import { useEffect, useRef, useState } from "react";

const FrenchLoader = () => {
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
          viewBox="0 0 947 279"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.44629 174.928C48.1215 160.761 75.7964 132.172 104.497 72.016C111.892 56.5173 114.494 42.2586 115.246 31.327C115.996 17.4144 110.288 7.44417 99.1221 7.44417C87.9559 7.44417 80.5117 15.469 72.3231 32.4913C62.6457 52.9181 56.9385 77.2357 53.9608 101.553C46.2685 169.4 62.3976 194.447 89.4447 194.447C111.777 194.447 125.921 174.347 127.658 147.797C128.651 125.464 119.221 108.094 102.348 99.9057"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M117.128 111.605C142.066 142.551 182.677 120.366 201.527 106.334C209.784 100.187 217.068 97.9205 225.921 97.9205C245.524 97.9205 260.909 112.809 260.909 140.849C260.909 171.866 241.306 195.191 216.492 195.439C194.656 195.687 180.264 177.573 181.752 150.278C183.489 120.005 201.355 97.9205 224.929 97.9205C238.328 97.9205 247.757 102.635 258.676 110.824C289.338 133.756 320.184 122.663 327.658 99.1612"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M327.658 99.1613C322.943 130.675 318.973 161.692 314.01 193.206"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M317.393 170.885C324.223 124.254 345.028 97.1762 369.842 97.1762C387.211 97.1762 396.144 109.087 394.656 125.96C393.415 138.615 389.196 153.256 388.204 165.663C386.963 182.784 394.904 194.447 412.149 194.447C438.048 194.447 463.886 161.805 471.391 121.416C472.722 114.255 474.659 106.457 475.549 98.9132"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M475.549 98.9132C470.917 138.202 466.285 177.491 461.653 216.779C457.059 255.751 445.524 271.37 428.154 271.37C416.492 271.37 408.055 263.943 408.055 252.015C408.055 236.077 420.15 224.636 447.06 216.327C493.472 201.996 527.367 174.612 538.504 142.962C548.502 114.546 560.164 97.9206 584.482 97.9206C604.581 97.9206 620.462 112.809 620.462 140.849C620.462 171.866 600.338 195.191 574.908 195.439C552.53 195.687 537.832 177.573 539.321 150.278C541.058 120.005 559.42 97.9206 583.489 97.9206C597.385 97.9206 607.063 102.635 618.229 110.824C652.243 135.637 680.499 123.875 690.535 99.3404"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M690.535 99.3404C686.248 117.469 683.374 132.164 681.847 143.082C680.578 151.022 679.784 156.481 679.474 163.181C679.064 180.799 688.947 193.454 708.055 193.454C735.847 193.454 749.656 168.726 758.029 128.171C760.031 118.471 762.213 109.215 763.979 99.4696"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M763.979 99.4696C757.775 133.713 752.72 154.248 752.72 165.663C752.72 182.784 759.42 194.447 777.689 194.447C807.184 194.447 832.365 152.642 845.028 95.9355"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M843.067 104.362C873.837 105.851 887.459 112.065 887.459 126.705C887.459 136.878 882.497 152.511 881.008 163.926C878.278 183.777 885.601 194.695 901.355 194.695C920.512 194.695 933.769 181.968 938.941 169.037"
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

export default FrenchLoader;
