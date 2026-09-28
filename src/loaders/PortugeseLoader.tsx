import { useEffect, useRef } from "react";

const PortugueseLoader = () => {
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
          viewBox="0 0 382 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M54.7855 94.2119C29.964 96.2185 11.3953 117.256 7.88719 146.073C4.66138 172.376 19.3016 192.227 42.6266 192.227C70.9145 192.227 89.2768 167.909 90.5175 137.636C91.51 108.604 77.6142 93.9638 58.7557 93.9638C43.8673 93.9638 35.9269 105.13 36.4232 118.778C36.9079 137.438 50.9017 158.389 80.2622 161.067C120.988 164.78 176.687 134.67 199.176 75.4736C205.663 58.3991 208.135 42.2926 208.135 31.0372C208.135 17.6917 203.917 7.44427 192.006 7.44427C180.344 7.44427 172.651 16.5002 165.704 30.7989C157.563 47.3827 151.542 71.3022 149.078 98.341C142.875 166.187 156.771 191.234 186.499 191.234C216.626 191.234 236.547 165.121 245.162 134.917" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M323.421 112.716C318.556 101.521 308.216 93.9637 291.757 93.9637C264.462 93.9637 243.948 121.259 242.601 150.539C241.428 177.338 253.794 192.403 271.407 192.227C296.407 191.977 314.784 167.421 322.987 115.464C323.999 109.053 325.048 102.359 326.06 95.9488" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M326.06 95.949C325.035 102.451 324.01 108.954 322.986 115.456C318.504 143.896 316.437 155.116 316.659 162.45C317.177 179.572 323.334 191.234 338.719 191.234C358.074 191.234 368.929 178.083 374.14 163.691" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M330.716 19.0259C319.302 31.9291 307.639 43.8398 295.232 55.2542" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
        </svg>

      </div>
    </div>
  );
};

export default PortugueseLoader;
