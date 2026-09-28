import { useEffect, useRef } from "react";

const UkrainianLoader = () => {
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
          viewBox="0 0 899 264"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7.44531 133.653C10.9193 117.276 21.093 98.6651 39.4552 98.6651C57.8175 98.6651 63.0284 115.042 58.3138 136.879C55.088 152.511 52.6066 168.64 47.3957 193.206" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M52.4668 167.768C60.5909 124.567 80.1323 97.1763 103.971 97.1763C120.1 97.1763 128.537 109.087 127.048 125.96C125.807 138.616 121.589 153.256 120.596 165.663C119.356 182.536 124.815 194.447 142.247 194.447C170.931 194.447 194.171 161.937 201.699 121.425C203.031 114.255 204.705 106.683 205.894 99.1614" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M205.894 99.1616C197.657 151.271 191.162 203.628 185.654 255.737" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M195.23 173.718C201.564 124.703 223.576 97.1764 248.29 97.1764C267.821 97.1764 278.761 113.259 276.79 139.856C274.65 168.754 253.041 195.439 226.915 195.439C210.041 195.439 199.903 186.506 195.188 174.844" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M220.9 195.033C275.801 202.744 335.701 172.138 344.987 122.159C346.456 114.255 348.373 106.752 350.126 99.3407" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M350.125 99.3404C345.838 117.469 342.964 132.164 341.437 143.082C340.168 151.022 339.374 156.481 339.064 163.181C338.654 180.799 348.537 193.454 367.645 193.454C395.436 193.454 409.246 168.726 417.618 128.171C419.621 118.471 421.803 109.215 423.568 99.4696" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M423.569 99.4697C417.366 133.713 412.311 154.248 412.311 165.663C412.311 182.784 419.01 194.447 438.634 194.447C472.894 194.447 515.738 128.107 542.698 71.5997C549.894 56.5174 552.496 42.2587 553.248 31.3271C553.998 17.4145 548.291 7.44429 537.124 7.44429C525.958 7.44429 518.514 15.4691 510.325 32.4914C500.648 52.9182 494.941 77.2359 491.963 101.553C484.271 169.4 500.4 194.447 527.447 194.447C549.78 194.447 563.923 174.348 565.66 147.797C566.653 125.464 557.224 108.094 540.35 99.9058" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M555.13 111.605C581.441 144.254 618.863 119.143 633.688 99.1617" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M633.688 99.1614C630.836 116.035 628.21 129.931 626.566 142.338C625.634 150.526 625.19 157.474 625.241 164.422C625.374 182.288 632.409 194.447 650.34 194.447C677.035 194.447 703.827 162.057 711.375 121.434C712.709 114.255 714.395 106.692 715.532 99.1615" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M715.532 99.1614C710.774 130.675 706.726 161.692 701.968 193.206" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M705.956 165.94C712.104 122.835 730.792 97.1763 752.708 97.1763C770.574 97.1763 777.72 111.32 776.767 130.427C775.814 143.33 771.288 168.64 767.477 193.206" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
          <path d="M771.671 166.999C778.633 123.793 795.348 97.1763 819.646 97.1763C836.32 97.1763 844.658 111.072 842.752 127.946C841.561 139.856 837.512 154 836.797 165.663C835.606 182.784 844.075 194.447 857.998 194.447C875.513 194.447 886.273 182.05 891.185 168.483" stroke="white" strokeWidth="14.8883" strokeLinecap="round"/>
        </svg>

      </div>
    </div>
  );
};

export default UkrainianLoader;
