import { useEffect, useRef, useState } from "react";

const RomanianLoader = () => {
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
          viewBox="0 0 663 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7.44531 186.768C45.7049 180.95 64.2926 163.076 85.8572 88.7527" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M83.4716 96.7808C113 113.902 127.544 132.673 127.544 155.75C127.544 174.857 111.911 190.738 88.0898 190.738C69.7275 190.738 56.5762 179.572 51.3652 169.398" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M79.3555 189.864C131.457 200.518 176.922 173.391 187.896 134.917" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M266.154 112.716C261.29 101.521 250.95 93.9635 234.49 93.9635C207.195 93.9635 186.682 121.259 185.335 150.539C184.161 177.338 196.527 192.403 214.14 192.226C239.141 191.976 257.518 167.421 265.721 115.463C266.733 109.053 267.781 102.359 268.794 95.9486" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M268.794 95.9488C267.769 102.451 266.745 108.954 265.72 115.456C261.239 143.896 259.171 155.116 259.393 162.45C259.911 179.572 266.069 191.234 285.556 191.234C319.335 191.234 365.912 134.436 388.322 75.4481C394.799 58.3989 397.271 42.2925 397.271 31.0371C397.271 17.6916 393.053 7.44415 381.142 7.44415C369.48 7.44415 361.787 16.5 354.839 30.7988C346.699 47.3826 340.678 71.3021 338.214 98.3408C332.011 166.187 345.906 191.234 376.43 191.234C408.943 191.234 432.33 159.545 439.999 118.272C441.342 111.042 443.259 103.539 445.012 96.1279" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M445.013 96.1277C440.725 114.257 437.851 128.951 436.324 139.869C435.056 147.81 434.261 153.269 433.952 159.969C433.542 177.587 443.425 190.241 462.533 190.241C490.324 190.241 504.133 165.513 512.506 124.958C514.509 115.259 516.691 106.002 518.456 96.257" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M518.456 96.2571C512.252 130.5 507.197 151.036 507.197 162.45C507.197 179.572 513.897 191.234 531.343 191.234C557.946 191.234 589.194 163.819 597.098 120.831" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M611.962 56.3679C600.797 99.4147 594.048 131.297 593.09 151.78C591.874 174.767 601.412 191.299 619.398 191.299C639.198 191.299 651.686 176.272 654.971 160.27" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M573.271 95.7004C595.852 95.7004 618.433 95.7004 641.013 95.7004" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
        </svg>

        <div className="w-full max-w-[560px]">
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

export default RomanianLoader;
