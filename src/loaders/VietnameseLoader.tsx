import { useEffect, useRef } from "react";

const VietnameseLoader = () => {
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
      
      // Using string conversion and concatenation to prevent template literal compilation issues
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
          viewBox="0 0 1008 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7.44531 116.416C9.43042 105.001 16.6265 95.5719 28.289 95.5719C40.1997 95.5719 46.6513 105.249 53.1029 123.86C56.4941 133.124 59.8853 142.387 63.2766 151.651C73.4422 179.421 80.952 191.354 100.609 191.354C128.475 191.354 153.796 158.988 161.348 118.342C162.683 111.162 164.527 103.577 165.796 96.0682" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M101.986 96.0685C75.435 127.086 44.9139 158.6 11.167 190.361" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M165.796 96.0682C162.944 112.942 160.318 126.837 158.673 139.244C157.742 147.433 157.297 154.381 157.349 161.329C157.482 179.195 164.517 191.354 182.448 191.354C209.142 191.354 235.934 158.964 243.482 118.341C244.816 111.162 246.765 103.6 247.892 96.0682" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M247.892 96.0681C243.177 127.582 239.207 158.599 234.244 190.113" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M237.627 167.792C244.458 121.161 265.262 94.083 290.076 94.083C307.446 94.083 316.379 105.994 314.89 122.867C313.649 135.522 309.431 150.162 308.438 162.569C307.198 179.691 316.252 191.354 330.523 191.354C348.475 191.354 359.063 179.155 363.896 165.805" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M535.664 109.716C531.019 100.287 520.696 93.3387 505.212 93.3387C476.269 93.3387 461.798 117.656 461.798 143.215C461.798 171.343 482.018 192.346 511.06 192.346C559.515 192.346 592.655 136.548 621.334 97.7211C640.517 71.7505 649.628 49.0763 650.125 31.0077C650.374 17.6087 643.922 7.44395 631.763 7.44395C618.364 7.44395 609.927 17.6087 604.716 40.9415C599.009 66.5844 594.79 96.0087 584.12 190.361" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M585.166 181.14C590.43 134.866 611.415 98.0533 637.966 98.0533C653.847 98.0533 663.94 110.708 661.074 128.823C659.461 139.492 656.546 151.899 654.881 164.058C652.855 179.443 658.643 191.354 676.566 191.354C701.931 191.354 717.128 163.918 725.365 135.037" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M803.624 112.836C798.759 101.641 788.419 94.0831 771.96 94.0831C744.665 94.0831 724.151 121.378 722.805 150.659C721.631 177.458 733.997 192.522 751.61 192.346C776.61 192.096 794.987 167.54 803.19 115.583C804.202 109.173 805.251 102.479 806.263 96.0682" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M806.264 96.0682C805.239 102.571 804.214 109.073 803.19 115.576C798.708 144.015 796.641 155.236 796.863 162.569C797.381 179.691 803.539 191.354 819.817 191.354C842.317 191.354 860.719 164.562 870.02 138.13C879.406 111.453 891.069 94.8275 915.386 94.8275C935.485 94.8275 951.366 109.716 951.366 137.756C951.366 168.773 931.242 192.098 905.813 192.346C883.434 192.594 868.736 174.48 870.225 147.185C871.962 116.912 890.324 94.8275 914.394 94.8275C928.289 94.8275 939.961 101.004 949.133 107.731C974 125.871 993.16 114.661 1000.5 96.724" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M762.78 19.1452C768.487 34.5299 780.15 48.1775 791.813 55.3735" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
        </svg>

      </div>
    </div>
  );
};

export default VietnameseLoader;
