import { useEffect, useRef, useState } from "react";

export interface CustomizableLoaderProps {
  /** Optional name to identify the loader or log, or used for accessibility */
  name?: string;
  /** Custom text to render and animate instead of SVG paths */
  text?: string;
  /** The font family to apply if text is provided */
  fontFamily?: string;
  /** Array of SVG path 'd' strings defining the shape to draw */
  paths?: string[];
  /** The SVG viewBox string */
  viewBox?: string;
  /** Custom utility classes for the SVG element */
  svgClassName?: string;
  /** Total animation duration in milliseconds (default: 6000) */
  duration?: number;
  /** Total duration it takes to draw all paths in seconds (default: 4.8) */
  drawDuration?: number;
  /** Color of the SVG stroke (default: "white") */
  strokeColor?: string;
  /** Width of the SVG stroke (default: 14.8883) */
  strokeWidth?: number | string;
  /** Gap delay between each stroke's drawing animation in seconds (default: 0.08) */
  strokeGap?: number;
  /** Custom utility classes for the outermost wrapper div */
  wrapperClassName?: string;
}

// Provide a default fallback shape (a simple circle or the English text shape) 
// so the component renders beautifully even without props.
const defaultPaths = [
  "M7.44556 166.558C34.9928 151.245 60.0943 131.553 88.5726 98.0349C107.957 75.1542 118.379 49.0282 118.875 31.008C119.123 17.609 112.59 7.4442 100.513 7.4442C87.1132 7.4442 78.6765 17.609 73.4656 40.9417C67.7584 66.5846 63.54 96.009 52.87 190.361",
  "M53.9158 181.14C59.3785 133.12 80.1653 98.0536 106.716 98.0536C122.597 98.0536 132.69 110.709 129.824 128.823C128.211 139.493 126.341 150.411 124.162 163.066C121.622 178.947 128.881 191.354 150.875 191.354C182.951 191.354 217.943 173.529 235.851 145.921C241.952 136.515 244.433 128.078 244.681 119.89C244.93 105.001 236.493 93.8352 221.604 93.8352C202.746 93.8352 188.354 115.175 188.354 142.47C188.354 171.751 204.235 192.346 237.961 192.346C283.819 192.346 334.613 137.297 357.952 75.8642C364.542 58.5186 367.014 42.4121 367.014 31.1568C367.014 17.8113 362.796 7.56384 350.885 7.56384C339.222 7.56384 331.53 16.6197 324.582 30.9185C316.442 47.5023 310.42 71.4218 307.957 98.4605C301.753 166.307 315.649 191.354 348.689 191.354C388.753 191.354 433.296 135.54 456.039 75.6742C462.557 58.5186 465.029 42.4121 465.029 31.1568C465.029 17.8113 460.81 7.56384 448.9 7.56384C437.237 7.56384 429.545 16.6197 422.597 30.9185C414.457 47.5023 408.435 71.4218 405.972 98.4605C399.768 166.307 413.664 191.354 443.169 191.354C472.628 191.354 488.631 165.675 498.225 138.408C507.709 111.453 519.371 94.8278 543.689 94.8278C563.788 94.8278 579.669 109.716 579.669 137.756C579.669 168.773 559.545 192.098 534.115 192.346C511.737 192.594 497.039 174.48 498.528 147.185C500.265 116.912 518.627 94.8278 542.696 94.8278C556.592 94.8278 568.263 101.005 577.436 107.731C602.303 125.872 621.463 114.661 628.8 96.7242"
];

export const CustomizableLoader = ({
  name = "Custom",
  text,
  fontFamily = '"Brush Script MT", cursive, sans-serif',
  paths = defaultPaths,
  viewBox = "0 0 637 200",
  svgClassName = "w-full max-w-[320px] sm:max-w-112.5 h-auto drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]",
  duration = 6000,
  drawDuration = 4.8,
  strokeColor = "white",
  strokeWidth = 14.8883,
  strokeGap = 0.08,
  wrapperClassName = "w-full h-screen bg-black flex justify-center items-center overflow-hidden m-0 p-0",
}: CustomizableLoaderProps) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!svgRef.current) return;

    const elements = svgRef.current.querySelectorAll("path, text");
    if (elements.length === 0) return;

    // Ensure we do not divide by zero if elements array is surprisingly empty
    const elCount = Math.max(1, elements.length);
    const strokeDuration = Math.max(
      0.18,
      (drawDuration - (elCount - 1) * strokeGap) / elCount,
    );

    elements.forEach((el, index) => {
      let length = 1500; // heuristic default
      if (el.tagName.toLowerCase() === 'path') {
        length = (el as SVGPathElement).getTotalLength();
      } else {
        const box = (el as SVGTextElement).getBBox();
        length = box.width * 2 + box.height * 2;
      }

      const htmlEl = el as HTMLElement;
      htmlEl.style.animation = "none";
      htmlEl.style.strokeDasharray = `${length}`;
      htmlEl.style.strokeDashoffset = `${length}`;
      htmlEl.style.opacity = "0";

      void htmlEl.getBoundingClientRect();

      const delay = index * (strokeDuration + strokeGap);

      htmlEl.style.animation = `drawLine ${strokeDuration}s cubic-bezier(0.65, 0, 0.35, 1) forwards ${delay}s`;
    });
  }, [paths, text, drawDuration, strokeGap]);

  useEffect(() => {
    const startedAt = performance.now();
    let frameId = 0;

    const pause1At = Math.floor(Math.random() * 26) + 20;
    const pause2At = Math.floor(Math.random() * 21) + 60;
    const pause1Duration = Math.floor(Math.random() * 401) + 300;
    const pause2Duration = Math.floor(Math.random() * 401) + 300;
    const movingDuration = duration - pause1Duration - pause2Duration;
    const move1Duration = movingDuration * (pause1At / 100);
    const move2Duration = movingDuration * ((pause2At - pause1At) / 100);
    const move3Duration = movingDuration * ((100 - pause2At) / 100);

    const move1End = move1Duration;
    const pause1End = move1End + pause1Duration;
    const move2End = pause1End + move2Duration;
    const pause2End = move2End + pause2Duration;
    const move3End = pause2End + move3Duration;

    const updateProgress = (now: number) => {
      const elapsed = now - startedAt;
      let nextProgress = 0;

      if (elapsed <= move1End) {
        const t = move1Duration === 0 ? 1 : elapsed / move1Duration;
        nextProgress = pause1At * t;
      } else if (elapsed <= pause1End) {
        nextProgress = pause1At;
      } else if (elapsed <= move2End) {
        const t =
          move2Duration === 0 ? 1 : (elapsed - pause1End) / move2Duration;
        nextProgress = pause1At + (pause2At - pause1At) * t;
      } else if (elapsed <= pause2End) {
        nextProgress = pause2At;
      } else if (elapsed <= move3End) {
        const t =
          move3Duration === 0 ? 1 : (elapsed - pause2End) / move3Duration;
        nextProgress = pause2At + (100 - pause2At) * t;
      } else {
        nextProgress = 100;
      }

      const roundedProgress = Math.min(100, Math.round(nextProgress));
      setProgress(roundedProgress);

      if (elapsed < duration) {
        frameId = requestAnimationFrame(updateProgress);
      }
    };

    frameId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(frameId);
  }, [duration]);

  return (
    <div className={wrapperClassName} aria-label={`${name} Loader`}>
      <style>
        {`
          @keyframes drawLine {
            0% { opacity: 0; }
            1% { opacity: 1; }
            100% { stroke-dashoffset: 0; opacity: 1; }
          }
          path {
            stroke-linecap: round;
            stroke-linejoin: round;
            fill: none;
          }
        `}
      </style>

      <div className="w-[92%] sm:w-[84%] max-w-275 flex flex-col justify-center items-center gap-2 sm:gap-3 px-2 sm:px-0 -translate-y-6 sm:-translate-y-8">
        <svg
          ref={svgRef}
          className={svgClassName}
          viewBox={viewBox}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {text ? (
            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              fontSize="72"
              fontFamily={fontFamily}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="transparent"
            >
              {text}
            </text>
          ) : (
            paths.map((d, index) => (
              <path
                key={index}
                d={d}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
              />
            ))
          )}
        </svg>

        <div className="w-full max-w-140">
          <div className="w-full flex justify-end mb-2 sm:mb-3">
            <span className="text-white text-lg sm:text-xl font-grosek tabular-nums">
              {progress}%
            </span>
          </div>

          <div className="h-1 sm:h-1.25 w-full bg-white/20 overflow-hidden rounded-full">
            <div
              className="h-full bg-white transition-[width] duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// DEMO USAGE ONLY: You can delete everything below this line in your project!
// =========================================================================

export default function CustomizableDemo() {
  const [inputText, setInputText] = useState("Hello Loaders");
  const [inputColor, setInputColor] = useState("#a855f7");

  const demoWrapperClasses = "w-full h-full min-h-[500px] bg-black flex justify-center items-center overflow-hidden m-0 p-0";

  return (
    <div className="w-full h-full flex flex-col bg-black overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      
      {/* 1. Interactive User Input Demo */}
      <div className="flex flex-col border-b border-white/10 relative shrink-0 min-h-[500px]">
        <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white/5 border border-white/10 px-5 py-3 rounded-2xl z-20 flex flex-col sm:flex-row items-center gap-4 backdrop-blur-xl shadow-2xl">
           <div className="flex flex-col gap-1 w-full sm:w-auto">
             <label className="text-[10px] text-white/40 font-jmono uppercase tracking-wider px-1">Type something!</label>
             <input 
               type="text" 
               value={inputText}
               onChange={(e) => setInputText(e.target.value)}
               className="bg-[#0f0c16] border border-white/10 rounded-lg px-4 py-2 text-white font-jmono text-sm focus:outline-none focus:border-purple-500 transition-colors w-full sm:w-64"
               placeholder="Wait for animation..."
             />
           </div>
           <div className="flex flex-col gap-1 w-full sm:w-auto">
             <label className="text-[10px] text-white/40 font-jmono uppercase tracking-wider px-1">Color</label>
             <div className="flex items-center gap-2">
               <input 
                 type="color"
                 value={inputColor}
                 onChange={(e) => setInputColor(e.target.value)}
                 className="w-10 h-10 rounded-lg border-0 bg-transparent cursor-pointer"
               />
               <span className="text-white/60 font-jmono text-xs">{inputColor}</span>
             </div>
           </div>
        </div>
        <div className="w-full h-full flex-1 relative [&>div]:!h-full [&>div]:!border-0">
          <CustomizableLoader 
            text={inputText || " "} 
            strokeColor={inputColor} 
            strokeWidth={3} 
            fontFamily="'Caveat', 'Brush Script MT', cursive"
            wrapperClassName={demoWrapperClasses}
          />
        </div>
      </div>

      {/* 2. Default SVG Path Demo */}
      <div className="flex flex-col border-b border-white/10 relative shrink-0 min-h-[500px]">
        <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full z-10 text-xs font-jmono text-white/50 whitespace-nowrap backdrop-blur-md">
          Default SVG Paths
        </div>
        <div className="w-full h-full flex-1 relative [&>div]:!h-full [&>div]:!border-0">
          <CustomizableLoader wrapperClassName={demoWrapperClasses} />
        </div>
      </div>

      {/* 3. Text Demo: vathsavv56 */}
      <div className="flex flex-col border-b border-white/10 relative shrink-0 min-h-[500px]">
        <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full z-10 text-xs font-jmono text-white/50 whitespace-nowrap backdrop-blur-md">
          Text Prop: "vathsavv56" (Sky Blue)
        </div>
        <div className="w-full h-full flex-1 relative [&>div]:!h-full [&>div]:!border-0">
          <CustomizableLoader 
            text="vathsavv56" 
            strokeColor="#38bdf8" 
            strokeWidth={3} 
            fontFamily="'Caveat', 'Brush Script MT', cursive"
            wrapperClassName={demoWrapperClasses}
          />
        </div>
      </div>

      {/* 4. Text Demo: Luffy */}
      <div className="flex flex-col relative shrink-0 min-h-[500px]">
        <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full z-10 text-xs font-jmono text-white/50 whitespace-nowrap backdrop-blur-md">
          Text Prop: "Luffy" (Red)
        </div>
        <div className="w-full h-full flex-1 relative [&>div]:!h-full [&>div]:!border-0">
          <CustomizableLoader 
            text="Luffy" 
            strokeColor="#ef4444" 
            strokeWidth={3} 
            fontFamily="'Caveat', 'Brush Script MT', cursive"
            wrapperClassName={demoWrapperClasses}
          />
        </div>
      </div>

    </div>
  );
}
