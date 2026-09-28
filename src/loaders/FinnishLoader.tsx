import { useEffect, useRef } from "react";

const FinnishLoader = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
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
          viewBox="0 0 373 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7.44531 166.558C34.9925 151.245 60.0941 131.553 88.5723 98.0349C107.957 75.1542 118.378 49.0282 118.875 31.008C119.123 17.609 112.589 7.4442 100.512 7.4442C87.113 7.4442 78.6763 17.609 73.4653 40.9417C67.7581 66.5846 63.5398 96.009 52.8698 190.361" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M53.9155 181.14C59.3782 133.12 80.165 98.0536 106.716 98.0536C122.597 98.0536 132.69 110.709 129.824 128.823C128.211 139.493 126.341 150.411 124.162 163.066C121.622 178.947 128.881 191.354 150.875 191.354C182.95 191.354 217.943 173.529 235.85 145.921C241.952 136.515 244.433 128.078 244.681 119.89C244.929 105.002 236.493 93.8353 221.604 93.8353C202.746 93.8353 188.354 115.175 188.354 142.471C188.354 171.751 204.235 192.346 235.623 192.346C273.676 192.346 303.719 161.49 311.702 118.523C313.07 111.162 314.914 103.577 316.183 96.0685" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M316.184 96.0685C313.331 112.942 310.705 126.838 309.061 139.245C308.129 147.433 307.685 154.381 307.736 161.329C307.869 179.195 316.566 191.354 331.034 191.354C349.286 191.354 359.97 179.112 364.867 165.534" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
        </svg>

      </div>
    </div>
  );
};

export default FinnishLoader;
