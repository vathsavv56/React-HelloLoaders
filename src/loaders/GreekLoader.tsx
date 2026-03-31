import { useEffect, useRef, useState } from "react";

const GreekLoader = () => {
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
          viewBox="0 0 1728 1117"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M449.192 546.87C454.651 532.23 467.058 521.312 482.195 521.312C499.813 521.312 506.761 533.719 509.242 563.992C510.814 582.767 512.385 601.543 513.957 620.319C517.182 658.284 525.371 673.669 543.733 673.669C562.096 673.669 575.991 659.029 580.21 641.907" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M563.832 520.071C532.071 570.195 496.835 620.815 457.381 671.932" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M697.579 520.071C679.217 577.143 656.885 616.101 625.371 616.101C607.257 616.101 596.587 601.461 597.579 575.158C598.82 542.155 615.693 518.334 637.033 518.334C655.148 518.334 664.081 530.245 668.299 558.532C668.961 563.247 669.622 567.962 670.284 572.676C674.751 601.957 680.477 615.108 700.731 615.108C728.464 615.108 763.22 560.129 773.758 519.823" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M773.758 519.823C764.825 554.562 760.854 572.925 760.854 587.565C760.854 602.949 768.547 615.108 787.518 615.108C809.767 615.108 835.617 595.288 845.718 564.984" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M845.718 564.984C844.726 591.783 858.621 613.867 882.195 613.867C912.716 613.867 926.363 590.294 927.356 564.24C928.349 535.952 912.219 519.575 890.88 519.575C865.073 519.575 848.696 539.674 843.733 575.902C835.545 634.711 856.636 669.699 890.88 669.699C899.564 669.699 907.257 667.465 913.212 663.743" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M807.257 442.9C798.572 455.803 789.639 467.714 779.714 479.128" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M1038.86 529.748C1032.66 523.545 1022.24 518.334 1006.36 518.334C986.011 518.334 972.363 528.508 972.611 543.148C972.859 559.525 988.244 567.465 1006.36 567.465C1016.04 567.465 1020.01 565.977 1019.76 562.751C1019.01 558.284 1007.6 556.299 994.199 558.532C974.348 561.758 963.43 572.428 963.182 587.317C962.934 602.205 976.582 614.86 1002.39 614.86C1027.7 614.86 1043.08 602.205 1050.03 588.061" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M1069.45 517.838C1087.81 526.026 1115.1 529.004 1140.41 525.282C1153.32 523.297 1159.02 520.815 1158.78 518.582C1158.53 516.597 1150.59 515.604 1137.19 518.83C1107.16 525.778 1088.3 554.066 1088.3 579.128C1088.3 600.964 1102.7 615.108 1122.8 615.108C1136.94 615.108 1148.6 609.897 1157.29 600.964" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M1269.45 529.748C1263.24 523.545 1252.82 518.334 1236.94 518.334C1216.59 518.334 1202.94 528.508 1203.19 543.148C1203.44 559.525 1218.83 567.465 1236.94 567.465C1246.62 567.465 1250.59 565.977 1250.34 562.751C1249.59 558.284 1238.18 556.299 1224.78 558.532C1204.93 561.758 1194.01 572.428 1193.76 587.317C1193.51 602.205 1207.16 614.86 1232.97 614.86C1258.28 614.86 1273.66 602.205 1280.61 588.061" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
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

export default GreekLoader;
