import React from 'react';

interface BackgroundTreeProps {
  mousePosition: { x: number; y: number };
  scrollProgress: number;
}

export const BackgroundTree: React.FC<BackgroundTreeProps> = ({ mousePosition, scrollProgress }) => {
  const treeOpacity = Math.min(scrollProgress * 1.5, 0.15);
  const treeScale = 0.8 + scrollProgress * 0.4;
  
  // Calculate parallax movement based on mouse position
  const parallaxX = (mousePosition.x - 50) * 0.02;
  const parallaxY = (mousePosition.y - 50) * 0.02;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div 
        className="absolute inset-0 transition-all duration-1000 ease-out"
        style={{
          opacity: treeOpacity,
          transform: `translate(${parallaxX}%, ${parallaxY}%) scale(${treeScale})`,
        }}
      >
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 800 600" 
          className="absolute inset-0"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Massive Background Tree */}
          <defs>
            <radialGradient id="leafGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#16a34a" stopOpacity="0.4" />
            </radialGradient>
            <linearGradient id="trunkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b4513" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#a0522d" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Root System */}
          <g className="animate-pulse" style={{ animationDuration: '4s' }}>
            <path
              d="M400 550 Q300 580 200 590 M400 550 Q500 580 600 590 M400 550 Q350 570 250 575 M400 550 Q450 570 550 575"
              stroke="#8b4513"
              strokeWidth="8"
              fill="none"
              opacity="0.6"
            />
            <path
              d="M400 550 Q380 570 320 580 M400 550 Q420 570 480 580 M400 550 Q400 570 400 590"
              stroke="#654321"
              strokeWidth="6"
              fill="none"
              opacity="0.5"
            />
          </g>

          {/* Main Trunk */}
          <rect
            x="390"
            y="300"
            width="20"
            height="250"
            fill="url(#trunkGradient)"
            className="animate-pulse"
            style={{ animationDuration: '3s' }}
          />

          {/* Major Branches */}
          <g className="animate-pulse" style={{ animationDuration: '5s' }}>
            <path
              d="M400 350 Q320 300 250 280 M400 350 Q480 300 550 280"
              stroke="url(#trunkGradient)"
              strokeWidth="12"
              fill="none"
            />
            <path
              d="M400 400 Q300 350 200 330 M400 400 Q500 350 600 330"
              stroke="url(#trunkGradient)"
              strokeWidth="10"
              fill="none"
            />
            <path
              d="M400 450 Q330 400 260 380 M400 450 Q470 400 540 380"
              stroke="url(#trunkGradient)"
              strokeWidth="8"
              fill="none"
            />
          </g>

          {/* Leaf Canopy - Multiple Layers */}
          <g className="animate-pulse" style={{ animationDuration: '6s' }}>
            {/* Back layer */}
            <circle cx="400" cy="250" r="120" fill="url(#leafGradient)" opacity="0.3" />
            <circle cx="320" cy="280" r="80" fill="url(#leafGradient)" opacity="0.4" />
            <circle cx="480" cy="280" r="80" fill="url(#leafGradient)" opacity="0.4" />
            
            {/* Middle layer */}
            <circle cx="400" cy="220" r="100" fill="url(#leafGradient)" opacity="0.5" />
            <circle cx="340" cy="260" r="70" fill="url(#leafGradient)" opacity="0.6" />
            <circle cx="460" cy="260" r="70" fill="url(#leafGradient)" opacity="0.6" />
            
            {/* Front layer */}
            <circle cx="400" cy="200" r="80" fill="url(#leafGradient)" opacity="0.7" />
            <circle cx="360" cy="240" r="50" fill="url(#leafGradient)" opacity="0.8" />
            <circle cx="440" cy="240" r="50" fill="url(#leafGradient)" opacity="0.8" />
          </g>

          {/* Floating Leaves */}
          <g className="animate-float">
            <circle cx="150" cy="200" r="8" fill="#22c55e" opacity="0.6" />
            <circle cx="650" cy="180" r="6" fill="#16a34a" opacity="0.5" />
            <circle cx="100" cy="350" r="5" fill="#22c55e" opacity="0.4" />
            <circle cx="700" cy="320" r="7" fill="#16a34a" opacity="0.6" />
          </g>

          {/* Birds */}
          <g className="animate-float" style={{ animationDuration: '8s' }}>
            <path d="M200 150 Q205 145 210 150 Q205 155 200 150" fill="#374151" opacity="0.4" />
            <path d="M580 120 Q585 115 590 120 Q585 125 580 120" fill="#374151" opacity="0.3" />
            <path d="M350 100 Q355 95 360 100 Q355 105 350 100" fill="#374151" opacity="0.5" />
          </g>
        </svg>
      </div>
    </div>
  );
};