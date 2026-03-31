import { useEffect, useRef, useState } from "react";

const CroatianLoader = () => {
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
          viewBox="0 0 1217 203"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M88.8109 117.276C83.9634 105.861 73.9367 97.1763 56.8151 97.1763C29.5198 97.1763 9.49022 124.472 7.59784 153.752C5.92474 180.551 18.0116 195.687 35.6266 195.439C60.4376 195.191 78.4612 170.664 88.3435 119.757C94.7226 86.8965 101.134 53.8581 107.513 20.9976"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M107.512 20.9975C102.45 47.1348 97.3873 73.2721 92.3248 99.4094C85.7504 133.352 81.3007 154.248 81.4336 165.663C81.6329 182.784 87.9094 194.447 104.38 194.447C127.554 194.447 150.944 170.209 157.891 140.885"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M203.294 97.4243C178.473 99.4309 159.904 120.469 156.396 149.285C153.17 175.588 167.81 195.439 191.135 195.439C219.423 195.439 237.786 171.122 239.026 140.849C240.019 111.816 226.123 97.1762 207.264 97.1762C192.376 97.1762 184.436 108.342 184.932 121.99C185.417 140.65 199.41 161.602 228.764 164.278C269.467 167.99 321.781 127.749 348.588 71.5629C355.766 56.5173 358.368 42.2586 359.12 31.327C359.87 17.4144 354.163 7.44417 342.996 7.44417C331.83 7.44417 324.386 15.469 316.197 32.4913C306.52 52.9181 300.813 77.2357 297.835 101.553C290.143 169.4 306.272 194.447 333.319 194.447C355.652 194.447 369.795 174.347 371.532 147.797C372.525 125.464 363.096 108.094 346.222 99.9057"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M361.002 111.605C387.949 145.044 425.713 132.871 442.489 113.541"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M507.661 115.929C502.797 104.734 492.456 97.1761 475.997 97.1761C448.702 97.1761 428.188 124.471 426.842 153.752C425.668 180.551 438.034 195.615 455.647 195.439C480.648 195.189 499.024 170.633 507.227 118.676C508.239 112.266 509.288 105.572 510.3 99.1612"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M510.301 99.1613C509.276 105.664 508.252 112.166 507.227 118.669C502.746 147.109 500.678 158.329 500.9 165.663C501.418 182.784 507.576 194.447 525.829 194.447C555.268 194.447 579.977 152.573 592.624 95.9355"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M590.664 104.362C621.433 105.851 635.056 112.065 635.056 126.705C635.056 136.878 630.093 152.511 628.605 163.926C625.875 183.777 633.197 194.695 648.952 194.695C668.109 194.695 681.366 181.968 686.538 169.037"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M864.99 117.275C860.142 105.861 850.115 97.1761 832.994 97.1761C805.699 97.1761 785.669 124.471 783.777 153.752C782.103 180.551 794.19 195.687 811.805 195.439C836.616 195.191 854.64 170.664 864.522 119.757C870.901 86.8963 877.312 53.8579 883.691 20.9974"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M883.691 20.9975C878.629 47.1348 873.566 73.2721 868.504 99.4094C861.929 133.352 857.479 154.248 857.612 165.663C857.812 182.784 864.088 194.447 880.6 194.447C903.917 194.447 926.531 167.337 934.862 138.13"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M1013.12 115.929C1008.26 104.734 997.915 97.1761 981.456 97.1761C954.161 97.1761 933.647 124.471 932.301 153.752C931.127 180.551 943.493 195.615 961.106 195.439C986.107 195.189 1004.48 170.633 1012.69 118.676C1013.7 112.266 1014.75 105.572 1015.76 99.1612"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M1015.76 99.1613C1014.74 105.664 1013.71 112.166 1012.69 118.669C1008.2 147.109 1006.14 158.329 1006.36 165.663C1006.88 182.784 1013.03 194.447 1030.26 194.447C1056.09 194.447 1081.47 161.731 1088.96 121.41C1090.29 114.255 1092.24 106.693 1093.37 99.1613"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M1093.37 99.1613C1088.65 130.675 1084.68 161.692 1079.72 193.206"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M1083.1 170.885C1089.93 124.254 1110.74 97.1762 1135.55 97.1762C1152.92 97.1762 1161.85 109.087 1160.37 125.96C1159.12 138.615 1154.91 153.256 1153.91 165.663C1152.67 182.784 1161.73 194.447 1176 194.447C1193.95 194.447 1204.54 182.248 1209.37 168.899"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
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

export default CroatianLoader;
