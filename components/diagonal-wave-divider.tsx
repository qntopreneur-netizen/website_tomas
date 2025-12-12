export function DiagonalWaveDivider({ 
  direction = "right",
  fromColor = "bg-[#0B0F19]",
  toColor = "bg-white",
  className = "" 
}: { 
  direction?: "left" | "right";
  fromColor?: string;
  toColor?: string;
  className?: string;
}) {
  // Voor schuine golfbeweging gebruiken we een SVG met een diagonaal patroon
  const isRight = direction === "right";
  const rotation = isRight ? "-4deg" : "4deg";
  const fillColor = toColor === "bg-white" ? "white" : "#0B0F19";
  
  return (
    <div className={`relative w-full h-32 md:h-40 overflow-hidden ${fromColor} ${className}`}>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transform: `rotate(${rotation}) scale(1.4)`,
          transformOrigin: "center",
        }}
      >
        <path
          d="M0,160 L0,100 Q180,60 360,80 T720,70 T1080,90 T1440,70 L1440,160 Z"
          fill={fillColor}
          className="transition-all"
        />
      </svg>
    </div>
  );
}

