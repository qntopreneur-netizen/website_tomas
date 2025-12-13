"use client";

export function CyberBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated emerald orb - Reduced blur on mobile */}
      <div 
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl md:blur-3xl blur-2xl opacity-15 gpu-accelerate"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, transparent 70%)',
          animation: 'orb-pulse 8s ease-in-out infinite, orb-float 20s ease-in-out infinite',
          willChange: 'transform, opacity',
        }}
      />
      
      {/* Animated cyan orb - Reduced blur on mobile, hidden on small screens */}
      <div 
        className="hidden md:block absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-15 gpu-accelerate"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, transparent 70%)',
          animation: 'orb-pulse 10s ease-in-out infinite reverse, orb-float 25s ease-in-out infinite reverse',
          willChange: 'transform, opacity',
        }}
      />
      
      {/* Additional smaller orb for depth - Hidden on mobile */}
      <div 
        className="hidden lg:block absolute top-1/2 left-1/2 w-64 h-64 rounded-full blur-3xl opacity-10 gpu-accelerate"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%)',
          animation: 'orb-pulse 12s ease-in-out infinite, orb-float 30s ease-in-out infinite',
          willChange: 'transform, opacity',
        }}
      />
    </div>
  );
}

