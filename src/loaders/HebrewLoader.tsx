import { useEffect, useRef } from "react";

const HebrewLoader = () => {
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
      path.style.animation =
        "hl-draw " +
        strokeDuration +
        "s cubic-bezier(0.65, 0, 0.35, 1) forwards " +
        delay +
        "s";
    });
  }, []);

  return (
    <div className="w-full h-screen bg-black flex justify-center items-center overflow-hidden m-0 p-0 hl-loader">
      <style
        dangerouslySetInnerHTML={{
          __html:
            "@keyframes hl-draw { 0% { opacity: 0; } 1% { opacity: 1; } 100% { stroke-dashoffset: 0; opacity: 1; } } .hl-loader path { stroke-linecap: round; stroke-linejoin: round; fill: none; }",
        }}
      />

      <div className="w-[92%] sm:w-[84%] max-w-275 flex flex-col justify-center items-center gap-2 sm:gap-3 px-2 sm:px-0 -translate-y-6 sm:-translate-y-8">
        <svg
          ref={svgRef}
          className="w-full min-w-70 h-auto drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"
          viewBox="0 0 407 216"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M398.761 169.975C392.806 190.819 376.925 207.692 350.622 207.692C324.567 207.692 309.679 187.097 310.672 153.35C311.664 118.61 331.968 88.0893 357.322 88.0893C374.935 88.0893 383.869 101.758 380.647 120.595C374.94 153.35 338.215 169.727 287.595 173.201"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M248.886 133.251C220.102 134.243 197.769 156.576 199.506 183.375C200.25 199.504 211.169 208.189 224.072 208.189C243.178 208.189 257.074 192.556 255.337 162.283C253.601 134 236.881 98.3051 235.912 62.9467C235.04 31.1209 249.167 7.44419 276.181 7.44419C295.075 7.44419 306.649 18.57 313.402 31.2655"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M161.789 90.5707C160.548 127.792 155.337 172.208 146.9 205.707"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M28.5382 90.0744C70.9624 90.0744 106.702 133.251 105.461 177.419C104.965 196.774 94.7913 205.707 79.4067 205.707C54.3656 205.707 31.835 167.277 28.29 91.3151"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M28.29 91.3151C24.3197 132.01 18.1163 170.223 7.44629 205.707"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
        </svg>

      </div>
    </div>
  );
};

export default HebrewLoader;
