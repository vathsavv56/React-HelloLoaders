import { useEffect, useRef } from "react";

const ArabicLoader = () => {
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
          viewBox="0 0 1800 1117"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1133.91 621.824C1109.84 619.342 1097.44 601.225 1097.44 580.384C1097.44 557.995 1113.57 540.186 1135.15 540.186C1158.98 540.186 1171.88 557.307 1171.88 577.903C1171.88 605.695 1152.03 622.32 1116.9 624.562C1063.47 627.972 1020.69 594.122 1009.6 540.434"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M1009.6 540.434C1013.81 565.744 1015.8 583.61 1014.31 606.191C1012.33 642.419 987.264 663.759 956.247 663.759C950.54 663.759 945.329 663.015 939.87 661.526"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M804.386 649.863C788.257 588.573 805.626 550.36 839.621 550.36C857.565 550.36 870.828 559.673 886.52 578.399C903.487 598.648 916.671 606.439 930.592 606.439C948.223 606.439 947.066 592.543 927.215 591.799C896.197 590.806 851.532 627.283 795.202 627.283C756.829 627.283 736.531 603.091 732.674 562.022"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M732.674 562.022C736.892 606.439 719.522 627.283 688.089 627.283C662.196 627.283 648.099 604.143 642.109 566.458C636.396 530.508 632.177 491.054 629.944 452.841"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M743.344 471.451C728.951 475.173 709.1 481.129 693.964 486.836"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
          <path
            d="M750.291 500.236C735.651 503.958 715.552 509.913 700.664 515.62"
            stroke="white"
            strokeWidth="14.8883"
            strokeLinecap="round"
          />
        </svg>      </div>
    </div>
  );
};

export default ArabicLoader;
