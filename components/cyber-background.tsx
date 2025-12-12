"use client";

export function CyberBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated emerald orb */}
      <div 
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, transparent 70%)',
          animation: 'orb-pulse 8s ease-in-out infinite, orb-float 20s ease-in-out infinite',
        }}
      />
      
      {/* Animated cyan orb */}
      <div 
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, transparent 70%)',
          animation: 'orb-pulse 10s ease-in-out infinite reverse, orb-float 25s ease-in-out infinite reverse',
        }}
      />
      
      {/* Additional smaller orb for depth */}
      <div 
        className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full blur-3xl opacity-10"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%)',
          animation: 'orb-pulse 12s ease-in-out infinite, orb-float 30s ease-in-out infinite',
        }}
      />
    </div>
  );
}

