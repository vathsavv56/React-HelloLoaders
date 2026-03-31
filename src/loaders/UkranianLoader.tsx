import { useEffect, useRef, useState } from "react";

const UkrainianLoader = () => {
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
      <style dangerouslySetInnerHTML={{ __html: "@keyframes drawLine { 0% { opacity: 0; } 1% { opacity: 1; } 100% { stroke-dashoffset: 0; opacity: 1; } } path { stroke-linecap: round; stroke-linejoin: round; fill: none; }" }} />

      <div className="w-[92%] sm:w-[84%] max-w-275 flex flex-col justify-center items-center gap-2 sm:gap-3 px-2 sm:px-0 -translate-y-6 sm:-translate-y-8">
        <svg
          ref={svgRef}
          className="w-full max-w-[320px] sm:max-w-[500px] md:max-w-[600px] h-auto drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"
          viewBox="0 0 899 264"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7.44531 133.653C10.9193 117.276 21.093 98.6651 39.4552 98.6651C57.8175 98.6651 63.0284 115.042 58.3138 136.879C55.088 152.511 52.6066 168.64 47.3957 193.206" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M52.4668 167.768C60.5909 124.567 80.1323 97.1763 103.971 97.1763C120.1 97.1763 128.537 109.087 127.048 125.96C125.807 138.616 121.589 153.256 120.596 165.663C119.356 182.536 124.815 194.447 142.247 194.447C170.931 194.447 194.171 161.937 201.699 121.425C203.031 114.255 204.705 106.683 205.894 99.1614" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M205.894 99.1616C197.657 151.271 191.162 203.628 185.654 255.737" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M195.23 173.718C201.564 124.703 223.576 97.1764 248.29 97.1764C267.821 97.1764 278.761 113.259 276.79 139.856C274.65 168.754 253.041 195.439 226.915 195.439C210.041 195.439 199.903 186.506 195.188 174.844" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M220.9 195.033C275.801 202.744 335.701 172.138 344.987 122.159C346.456 114.255 348.373 106.752 350.126 99.3407" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M350.125 99.3404C345.838 117.469 342.964 132.164 341.437 143.082C340.168 151.022 339.374 156.481 339.064 163.181C338.654 180.799 348.537 193.454 367.645 193.454C395.436 193.454 409.246 168.726 417.618 128.171C419.621 118.471 421.803 109.215 423.568 99.4696" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M423.569 99.4697C417.366 133.713 412.311 154.248 412.311 165.663C412.311 182.784 419.01 194.447 438.634 194.447C472.894 194.447 515.738 128.107 542.698 71.5997C549.894 56.5174 552.496 42.2587 553.248 31.3271C553.998 17.4145 548.291 7.44429 537.124 7.44429C525.958 7.44429 518.514 15.4691 510.325 32.4914C500.648 52.9182 494.941 77.2359 491.963 101.553C484.271 169.4 500.4 194.447 527.447 194.447C549.78 194.447 563.923 174.348 565.66 147.797C566.653 125.464 557.224 108.094 540.35 99.9058" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M555.13 111.605C581.441 144.254 618.863 119.143 633.688 99.1617" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M633.688 99.1614C630.836 116.035 628.21 129.931 626.566 142.338C625.634 150.526 625.19 157.474 625.241 164.422C625.374 182.288 632.409 194.447 650.34 194.447C677.035 194.447 703.827 162.057 711.375 121.434C712.709 114.255 714.395 106.692 715.532 99.1615" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M715.532 99.1614C710.774 130.675 706.726 161.692 701.968 193.206" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M705.956 165.94C712.104 122.835 730.792 97.1763 752.708 97.1763C770.574 97.1763 777.72 111.32 776.767 130.427C775.814 143.33 771.288 168.64 767.477 193.206" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M771.671 166.999C778.633 123.793 795.348 97.1763 819.646 97.1763C836.32 97.1763 844.658 111.072 842.752 127.946C841.561 139.856 837.512 154 836.797 165.663C835.606 182.784 844.075 194.447 857.998 194.447C875.513 194.447 886.273 182.05 891.185 168.483" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
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

export default UkrainianLoader;
