import { useEffect, useRef } from "react";

const PolishLoader = () => {
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
          viewBox="0 0 610 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M83.8686 103.358C78.9654 93.9292 68.6428 86.9813 52.9009 86.9813C23.0976 86.9813 8.44434 112.788 8.44434 138.098C8.44434 165.641 26.5089 185.989 57.8294 185.989C99.8144 185.989 123.189 150.653 146.648 90.7034" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M146.896 90.7034C164.762 98.892 202.23 100.133 232.007 90.9515" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M232.008 90.9517C217.616 152.738 195.532 186.981 165.755 186.981C149.13 186.981 142.182 180.034 142.678 171.101C143.422 160.679 157.07 151.994 180.643 157.701C210.916 165.393 219.353 184.5 253.093 184.5C283.79 184.5 310.862 165.818 328.006 139.388C333.993 130.158 336.475 121.721 336.723 113.532C336.971 98.644 328.534 87.4777 313.646 87.4777C294.787 87.4777 280.395 108.818 280.395 136.113C280.395 165.393 296.276 185.989 328.984 185.989C371.441 185.989 401.388 145.287 419.601 82.5149" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M417.216 90.543C446.744 107.665 461.288 126.435 461.288 149.512C461.288 168.619 445.655 184.5 421.834 184.5C403.472 184.5 390.32 173.334 385.109 163.16" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M413.1 183.626C465.372 194.315 511.146 167.61 518.766 127.055" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M591.789 103.358C587.317 93.9292 577.322 86.9813 562.067 86.9813C532.345 86.9813 517.615 113.532 517.615 139.587C517.615 165.145 535.189 185.989 560.752 185.989C583.089 185.989 597.319 171.33 602.31 157.949" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M462.281 12.7878C450.866 25.6911 439.204 37.6017 426.797 49.0161" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M594.291 12.7878C582.876 25.6911 571.214 37.6017 558.807 49.0161" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
        </svg>

      </div>
    </div>
  );
};

export default PolishLoader;
