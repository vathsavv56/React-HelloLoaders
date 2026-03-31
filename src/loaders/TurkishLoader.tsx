import { useEffect, useRef, useState } from "react";

const TurkishLoader = () => {
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
          viewBox="0 0 1050 203"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7.44531 133.653C9.82745 116.283 20.5471 98.6651 38.1748 98.6651C55.8026 98.6651 60.8051 115.042 56.2791 136.879C53.1823 152.511 50.8002 168.64 45.7977 193.206" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M50.666 167.768C58.4481 124.661 76.5269 97.1763 98.4426 97.1763C116.309 97.1763 123.455 111.32 122.502 130.427C121.549 143.33 117.023 168.64 113.212 193.206" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M117.406 166.999C124.369 123.792 141.083 97.1764 165.143 97.1764C181.579 97.1764 189.917 111.072 188.011 127.946C186.82 139.856 183.962 154 183.009 165.663C182.056 182.536 187.932 194.447 208.376 194.447C236.302 194.447 276.093 176.604 293.991 149.012C300.091 139.608 302.572 131.171 302.82 122.983C303.068 108.095 294.631 96.9283 279.743 96.9283C260.885 96.9283 246.493 118.268 246.493 145.564C246.493 174.844 262.373 195.439 294.82 195.439C336.405 195.439 365.719 155.401 378.999 95.9357" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M377.038 104.362C407.807 105.851 421.43 112.065 421.43 126.705C421.43 136.878 416.467 152.511 414.979 163.926C412.249 183.777 417.956 194.695 438.185 194.695C469.12 194.695 500.135 136.689 527.084 100.205C545.817 74.8435 554.928 52.1693 555.425 34.1008C555.673 20.7018 549.222 10.537 537.063 10.537C523.663 10.537 515.227 20.7018 510.016 44.0345C504.309 69.6774 500.09 99.1018 489.42 193.454" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M490.466 184.233C495.73 137.959 516.715 101.147 543.266 101.147C559.147 101.147 569.24 113.802 566.374 131.916C564.761 142.586 561.846 154.993 560.181 167.151C558.155 182.536 563.942 194.447 581.866 194.447C607.231 194.447 622.428 167.011 630.665 138.13" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M708.924 115.929C704.059 104.734 693.719 97.1764 677.26 97.1764C649.964 97.1764 629.451 124.472 628.104 153.752C626.931 180.551 639.297 195.616 656.91 195.439C681.91 195.189 700.287 170.633 708.49 118.676C709.502 112.266 710.551 105.572 711.563 99.1615" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M711.563 99.1614C710.539 105.664 709.514 112.166 708.49 118.669C704.008 147.109 701.941 158.329 702.163 165.663C702.681 182.784 708.838 194.447 728.448 194.447C762.658 194.447 805.035 128.049 831.97 71.5937C839.163 56.5174 841.765 42.2587 842.517 31.3271C843.267 17.4145 837.559 7.44429 826.393 7.44429C815.227 7.44429 807.783 15.4691 799.594 32.4914C789.917 52.9182 784.21 77.2359 781.232 101.553C773.54 169.4 789.669 194.447 816.716 194.447C839.048 194.447 853.192 174.348 854.929 147.797C855.922 125.464 846.492 108.094 829.619 99.9058" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M844.398 111.605C871.346 145.044 909.109 132.872 925.886 113.541" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M991.059 115.929C986.194 104.734 975.854 97.1764 959.395 97.1764C932.099 97.1764 911.586 124.472 910.239 153.752C909.065 180.551 921.431 195.616 939.045 195.439C964.045 195.189 982.422 170.633 990.625 118.676C991.637 112.266 992.686 105.572 993.698 99.1615" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M993.697 99.1614C992.673 105.664 991.648 112.166 990.623 118.669C986.142 147.109 984.074 158.329 984.296 165.663C984.815 182.784 990.972 194.447 1006.36 194.447C1025.71 194.447 1036.57 181.295 1041.78 166.903" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
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

export default TurkishLoader;
