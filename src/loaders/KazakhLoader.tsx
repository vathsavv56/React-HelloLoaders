import { useEffect, useRef } from "react";

const KazakhLoader = () => {
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
      const length = path.getTotalLength();

      path.style.animation = "none";
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
      path.style.opacity = "0";

      void path.getBoundingClientRect();

      const delay = index * (strokeDuration + strokeGap);

      path.style.animation = `hl-draw ${strokeDuration}s cubic-bezier(0.65, 0, 0.35, 1) forwards ${delay}s`;
    });
  }, []);
  return (
    <div className="w-full h-screen bg-black flex justify-center items-center overflow-hidden m-0 p-0 hl-loader">
      <style>
        {`
          @keyframes hl-draw {
            0% { opacity: 0; }
            1% { opacity: 1; }
            100% { stroke-dashoffset: 0; opacity: 1; }
          }
          .hl-loader path {
            stroke-linecap: round;
            stroke-linejoin: round;
            fill: none;
          }
        `}
      </style>

      <div className="w-[92%] sm:w-[84%] max-w-275 flex flex-col justify-center items-center gap-2 sm:gap-3 px-2 sm:px-0 -translate-y-6 sm:-translate-y-8">
        <svg
          ref={svgRef}
          className="w-full min-w-70 h-auto drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"
          viewBox="0 0 731 115"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M80.0486 25.5396C74.8482 15.5388 64.7375 7.94256 48.9074 7.94256C24.0348 7.94256 7.44434 33.3177 7.44434 59.0592C7.44434 85.9739 23.8612 106.95 52.4062 106.95C85.9718 106.95 98.8415 86.7696 115.87 55.5112C133.539 23.079 148.427 10.6721 170.759 10.6721C195.573 10.6721 209.965 35.2379 206.988 65.5108C204.258 93.0542 187.881 107.446 168.774 107.446C153.886 107.446 145.449 97.2726 145.697 84.8656C145.948 67.3547 161.33 55.5852 190.114 54.0964C210.958 53.1039 228.824 54.0964 244.953 57.3222"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M244.953 57.3222C236.516 87.5951 247.186 106.206 264.307 106.206C285.234 106.206 299.392 87.5754 327.087 10.6721"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M327.087 10.672C325.849 29.7386 325.846 50.8705 327.087 70.4735C328.576 93.3023 337.785 106.206 357.422 106.206C384.806 106.206 425.99 88.3869 444.041 60.5577C450.164 51.1187 452.645 42.682 452.893 34.4934C453.141 19.605 444.705 8.43878 429.816 8.43878C410.958 8.43878 396.566 29.7787 396.566 57.074C396.566 86.3544 412.447 106.95 442.169 106.95C474.656 106.95 491.776 92.2518 503.017 68.9847"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M503.017 68.9847C501.502 88.2498 510.587 106.206 528.327 106.206C547.247 106.206 563.315 88.5877 589.121 7.44626"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M589.122 7.44624C582.918 76.1807 589.122 104.965 611.702 104.965C632.05 104.965 647.683 80.6472 665.797 7.69438"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M665.796 7.69425C662.819 76.925 666.789 105.957 688.873 105.957C707.236 105.957 718.65 88.0913 722.868 66.255"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
        </svg>      </div>
    </div>
  );
};

export default KazakhLoader;
