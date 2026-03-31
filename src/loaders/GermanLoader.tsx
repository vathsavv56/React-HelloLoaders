import { useEffect, useRef, useState } from "react";

const GermanLoader = () => {
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
          viewBox="0 0 668 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7.44531 169.394C34.9398 153.208 58.7265 132.901 85.267 96.9693C103.894 71.7507 113.005 49.0765 113.503 31.008C113.751 17.609 107.299 7.4442 95.1405 7.4442C81.741 7.4442 73.3043 17.609 68.0933 40.9417C62.3862 66.5846 58.1678 96.009 47.4978 190.361" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M48.5439 181.14C53.808 134.866 74.7934 98.0536 101.344 98.0536C117.225 98.0536 127.318 110.709 124.452 128.823C122.839 139.493 119.924 151.9 118.259 164.059C116.233 179.443 122.021 191.354 139.944 191.354C165.309 191.354 180.506 163.918 188.743 135.037" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M267.002 112.836C262.137 101.641 251.797 94.0833 235.338 94.0833C208.043 94.0833 187.529 121.379 186.182 150.659C185.009 177.458 197.375 192.523 214.988 192.346C239.988 192.096 258.365 167.54 266.568 115.583C267.58 109.173 268.629 102.479 269.641 96.0685" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M269.641 96.0685C268.616 102.571 267.591 109.073 266.567 115.576C262.085 144.016 260.018 155.236 260.24 162.57C260.758 179.691 266.916 191.354 286.403 191.354C320.182 191.354 366.759 134.555 389.169 75.5678C395.646 58.5186 398.118 42.4121 398.118 31.1568C398.118 17.8113 393.9 7.56384 381.989 7.56384C370.326 7.56384 362.634 16.6197 355.686 30.9185C347.546 47.5023 341.524 71.4218 339.061 98.4605C332.857 166.307 346.753 191.354 379.793 191.354C419.857 191.354 464.4 135.54 487.143 75.6742C493.661 58.5186 496.133 42.4121 496.133 31.1568C496.133 17.8113 491.914 7.56384 480.004 7.56384C468.341 7.56384 460.649 16.6197 453.701 30.9185C445.561 47.5023 439.539 71.4218 437.076 98.4605C430.872 166.307 444.768 191.354 474.273 191.354C503.732 191.354 519.735 165.675 529.329 138.408C538.813 111.453 550.475 94.8278 574.793 94.8278C594.892 94.8278 610.773 109.716 610.773 137.756C610.773 168.773 590.649 192.098 565.219 192.346C542.841 192.594 528.143 174.48 529.632 147.185C531.369 116.912 549.731 94.8278 573.8 94.8278C587.696 94.8278 599.367 101.005 608.54 107.731C633.407 125.872 652.567 114.661 659.905 96.7242" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
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

export default GermanLoader;
