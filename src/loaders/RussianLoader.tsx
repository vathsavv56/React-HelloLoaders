import { useEffect, useRef, useState } from "react";

const RussianLoader = () => {
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
          viewBox="0 0 924 264"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.44571 133.653C10.9197 117.276 21.0934 98.6651 39.4556 98.6651C57.8179 98.6651 63.0288 115.042 58.3142 136.879C55.0884 152.511 52.607 168.64 47.3961 193.206"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M52.4675 167.768C60.5917 124.567 80.133 97.1763 103.972 97.1763C120.101 97.1763 128.537 109.087 127.049 125.96C125.808 138.616 121.59 153.256 120.597 165.663C119.356 182.536 124.815 194.447 142.25 194.447C170.943 194.447 194.268 161.949 201.797 121.426C203.13 114.255 204.803 106.683 205.993 99.1614"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M205.993 99.1616C197.755 151.271 191.26 203.628 185.752 255.737"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M195.329 173.718C201.662 124.703 223.674 97.1764 248.389 97.1764C267.92 97.4246 278.859 113.259 276.889 139.856C274.748 168.754 253.139 195.439 227.013 195.439C210.14 195.191 200.002 186.506 195.287 174.844"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M220.999 194.962C275.872 203.158 335.791 172.18 345.085 122.162C346.554 114.255 348.471 106.752 350.224 99.3407"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M350.224 99.3409C345.936 117.47 343.062 132.164 341.535 143.082C340.267 151.023 339.472 156.482 339.163 163.182C338.753 180.8 348.635 193.455 367.744 193.455C395.535 193.455 409.344 168.726 417.717 128.171C419.72 118.472 421.902 109.215 423.667 99.4701"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M423.667 99.4697C417.464 133.713 412.409 154.248 412.409 165.663C412.409 182.784 419.108 194.447 438.611 194.447C472.445 194.447 516.064 130.239 542.542 75.6213C550.616 58.966 553.562 43.7867 554.09 32.3197C554.759 17.8231 548.904 7.44429 537.222 7.44429C526.056 7.44429 518.612 15.4691 510.423 32.4914C500.746 52.9182 495.039 77.2359 492.061 101.553C484.369 169.4 500.498 194.447 527.545 194.447C549.877 194.447 564.021 174.348 565.758 147.797C566.751 125.464 557.322 108.094 540.448 99.9058"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M555.228 111.605C578.671 140.695 599.228 163.786 629.863 160.251C656.081 157.226 671.962 140.849 672.706 124.472C673.451 108.591 664.766 96.9282 647.396 96.9282C626.801 96.9282 611.664 118.516 611.664 144.075C611.664 176.389 629.282 195.528 659.148 195.528C699.086 195.528 728.222 164.841 736.25 121.634C737.621 114.255 739.307 106.692 740.444 99.1615"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M740.444 99.1614C735.686 130.675 731.638 161.692 726.88 193.206"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M730.868 165.94C737.016 122.835 755.704 97.1763 777.619 97.1763C795.485 97.1763 802.632 111.32 801.679 130.427C800.726 143.33 796.2 168.64 792.389 193.206"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M796.583 166.999C803.545 123.793 820.26 97.1763 844.558 97.1763C861.232 97.1763 869.57 111.072 867.664 127.946C866.473 139.856 862.424 154 861.709 165.663C860.518 182.784 868.987 194.447 882.91 194.447C900.425 194.447 911.185 182.05 916.097 168.483"
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

export default RussianLoader;
