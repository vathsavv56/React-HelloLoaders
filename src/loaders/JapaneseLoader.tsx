import { useEffect, useRef } from "react";

const JapaneseLoader = () => {
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
          viewBox="0 0 878 184"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.7078 17.9891C50.6199 18.4907 81.69 26.3198 94.0554 33.8165C102.62 39.009 105.328 44.3765 105.301 49.9874C105.255 59.4136 96.4655 65.9485 85.8076 69.2969"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M27.7098 106.455C14.1814 116.602 8.05966 127.505 7.47932 139.398C6.63758 156.646 20.898 167.882 48.5492 168.646C73.5765 169.337 98.144 164.793 112.61 156.813"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M216.06 9.71243C194.202 51.7823 166.967 119.716 152.78 172.444"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M152.801 172.411C168.424 131.756 187.079 109.094 206.997 109.047C219.467 109.017 227.404 116.796 230.203 133.523C230.795 137.06 231.387 140.597 231.979 144.133C235.053 162.497 243.07 170.14 256.337 170.14C273.7 170.14 292.526 154.982 302.197 129.822"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M364.487 10.7212C354.059 60.018 347.33 121.902 345.85 175.765"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M404.898 38.1317C429.996 35.2216 455.885 37.9743 466.479 43.1953C473.473 46.6425 475.725 51.2629 475.719 56.2085C475.708 64.7719 468.376 71.6896 459.474 75.9233"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M410.267 111.799C398.867 121.214 393.727 131.207 393.27 142.017C392.58 158.359 404.685 168.581 428.049 168.861C449.194 169.115 469.936 164.676 482.134 157.302"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M524.821 36.8304C537.269 45.9639 560.761 55.6027 597.176 54.1443C629.693 52.8419 644.707 40.5167 644.707 26.8931C644.707 17.0217 637.656 10.9281 624.255 10.9281C592.845 10.9281 563.027 44.382 538.787 115.743"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M538.787 115.743C561.126 101.732 586.543 93.0285 611 93.0285C641.684 93.0285 654.977 107.213 654.91 128.254C654.813 158.43 621.419 174.338 587.155 174.338C565.485 174.338 548.432 169.945 540.203 164.719"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M729.748 11.5382C719.32 60.3468 712.591 121.619 711.11 174.948"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M767.006 50.8452C789.079 53.0799 842.236 50.0955 870.391 46.5297"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M821.68 7.44488C824.604 33.4529 825.607 65.4501 824.646 101.25C823.351 149.536 805.842 171.667 780.608 172.144C764.001 172.458 755.253 162.783 755.418 151.052C755.6 137.977 766.936 127.877 787.663 127.831C811.616 127.778 832.783 140.551 862.568 168.54"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
        </svg>

      </div>
    </div>
  );
};

export default JapaneseLoader;
