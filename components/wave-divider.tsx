export function WaveDivider() {
  return (
    <div className="relative w-full h-24 md:h-32 overflow-hidden bg-[#0B0F19]">
      <svg
        className="absolute bottom-0 w-full h-full"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,120 L0,80 Q180,40 360,60 T720,50 T1080,70 T1440,50 L1440,120 Z"
          fill="white"
          className="transition-all"
        />
      </svg>
    </div>
  );
}

