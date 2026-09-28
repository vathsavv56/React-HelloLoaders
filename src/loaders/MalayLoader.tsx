import { useEffect, useRef } from "react";

const MalayLoader = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
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
      path.style.animation = "hl-draw " + strokeDuration + "s cubic-bezier(0.65, 0, 0.35, 1) forwards " + delay + "s";
    });
  }, []);

  return (
    <div className="w-full h-screen bg-black flex justify-center items-center overflow-hidden m-0 p-0 hl-loader">
      <style dangerouslySetInnerHTML={{ __html: "@keyframes hl-draw { 0% { opacity: 0; } 1% { opacity: 1; } 100% { stroke-dashoffset: 0; opacity: 1; } } .hl-loader path { stroke-linecap: round; stroke-linejoin: round; fill: none; }" }} />

      <div className="w-[92%] sm:w-[84%] max-w-275 flex flex-col justify-center items-center gap-2 sm:gap-3 px-2 sm:px-0 -translate-y-6 sm:-translate-y-8">
        <svg
          ref={svgRef}
          className="w-full min-w-70 h-auto drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"
          viewBox="0 0 539 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7.44531 166.558C34.9925 151.245 60.0941 131.553 88.5723 98.0349C107.957 75.1542 118.378 49.0282 118.875 31.008C119.123 17.609 112.589 7.4442 100.512 7.4442C87.113 7.4442 78.6763 17.609 73.4653 40.9417C67.7581 66.5846 63.5398 96.009 52.8698 190.361" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M53.916 181.14C59.3787 133.12 80.1655 98.0536 106.716 98.0536C122.597 98.0536 132.69 110.709 129.824 128.823C128.211 139.493 126.341 150.411 124.162 163.066C121.622 178.947 128.881 191.354 150.876 191.354C182.951 191.354 217.943 173.529 235.851 145.921C241.952 136.515 244.433 128.078 244.682 119.89C244.93 105.001 236.493 93.8352 221.605 93.8352C202.746 93.8352 188.354 115.175 188.354 142.47C188.354 171.751 204.235 192.346 237.962 192.346C283.819 192.346 334.613 137.297 357.952 75.8642C364.542 58.5186 367.014 42.4121 367.014 31.1568C367.014 17.8113 362.796 7.56384 350.885 7.56384C339.223 7.56384 331.53 16.6197 324.582 30.9185C316.442 47.5023 310.421 71.4218 307.957 98.4605C301.754 166.307 315.649 191.354 345.155 191.354C374.613 191.354 390.616 165.675 400.21 138.408C409.694 111.453 421.357 94.8278 445.674 94.8278C465.773 94.8278 481.654 109.716 481.654 137.756C481.654 168.773 461.53 192.098 436.101 192.346C413.722 192.594 399.024 174.48 400.513 147.185C402.25 116.912 420.612 94.8278 444.682 94.8278C458.577 94.8278 470.249 101.005 479.421 107.731C504.288 125.872 523.448 114.661 530.786 96.7242" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
        </svg>

      </div>
    </div>
  );
};

export default MalayLoader;
