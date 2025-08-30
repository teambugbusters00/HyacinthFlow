import React from 'react';

interface BackgroundTreeProps {
  mousePosition: { x: number; y: number };
  scrollProgress: number;
}

export const BackgroundTree: React.FC<BackgroundTreeProps> = ({ mousePosition, scrollProgress }) => {
  const treeOpacity = Math.min(scrollProgress * 2, 0.25);
  const treeScale = 0.6 + scrollProgress * 0.8;
  
  // Enhanced parallax movement
  const parallaxX = (mousePosition.x - 50) * 0.05;
  const parallaxY = (mousePosition.y - 50) * 0.03;
  
  // Tree growth based on scroll
  const trunkHeight = Math.min(scrollProgress * 400, 350);
  const canopySize = Math.min(scrollProgress * 200, 180);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <div 
        className="absolute inset-0 transition-all duration-700 ease-out"
        style={{
          opacity: treeOpacity,
          transform: `translate(${parallaxX}%, ${parallaxY}%) scale(${treeScale})`,
        }}
      >
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 1000 800" 
          className="absolute inset-0"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <radialGradient id="bgLeafGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#16a34a" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#15803d" stopOpacity="0.4" />
            </radialGradient>
            <linearGradient id="bgTrunkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b4513" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#a0522d" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#654321" stopOpacity="0.6" />
            </linearGradient>
            <filter id="bgGlow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Massive Root System */}
          <g className="animate-pulse" style={{ animationDuration: '6s' }}>
            <path
              d="M500 700 Q350 750 200 770 M500 700 Q650 750 800 770 M500 700 Q450 720 300 740 M500 700 Q550 720 700 740"
              stroke="url(#bgTrunkGradient)"
              strokeWidth="12"
              fill="none"
              opacity="0.8"
            />
            <path
              d="M500 700 Q400 730 250 750 M500 700 Q600 730 750 750 M500 700 Q500 730 500 770"
              stroke="#654321"
              strokeWidth="8"
              fill="none"
              opacity="0.6"
            />
            <path
              d="M500 700 Q420 740 320 760 M500 700 Q580 740 680 760"
              stroke="#8b4513"
              strokeWidth="6"
              fill="none"
              opacity="0.5"
            />
          </g>

          {/* Main Massive Trunk */}
          <rect
            x="480"
            y={700 - trunkHeight}
            width="40"
            height={trunkHeight}
            fill="url(#bgTrunkGradient)"
            className="animate-pulse"
            style={{ animationDuration: '4s' }}
            filter="url(#bgGlow)"
          />
          
          {/* Trunk Texture */}
          <rect
            x="485"
            y={700 - trunkHeight}
            width="30"
            height={trunkHeight}
            fill="#a0522d"
            opacity="0.6"
          />

          {/* Major Branch System */}
          {scrollProgress > 0.3 && (
            <g className="animate-pulse" style={{ animationDuration: '7s' }}>
              <path
                d="M500 400 Q380 350 280 320 M500 400 Q620 350 720 320"
                stroke="url(#bgTrunkGradient)"
                strokeWidth="20"
                fill="none"
                opacity={Math.min(1, (scrollProgress - 0.3) * 3)}
              />
              <path
                d="M500 500 Q350 450 220 420 M500 500 Q650 450 780 420"
                stroke="url(#bgTrunkGradient)"
                strokeWidth="16"
                fill="none"
                opacity={Math.min(1, (scrollProgress - 0.3) * 3)}
              />
              <path
                d="M500 600 Q380 550 300 520 M500 600 Q620 550 700 520"
                stroke="url(#bgTrunkGradient)"
                strokeWidth="12"
                fill="none"
                opacity={Math.min(1, (scrollProgress - 0.3) * 3)}
              />
            </g>
          )}

          {/* Massive Leaf Canopy System */}
          {scrollProgress > 0.5 && (
            <g className="animate-pulse" style={{ animationDuration: '8s' }}>
              {/* Back layer - largest */}
              <circle 
                cx="500" 
                cy="300" 
                r={Math.min(canopySize * 1.2, 200)} 
                fill="url(#bgLeafGradient)" 
                opacity="0.3"
                filter="url(#bgGlow)"
              />
              <circle 
                cx="380" 
                cy="350" 
                r={Math.min(canopySize * 0.8, 140)} 
                fill="url(#bgLeafGradient)" 
                opacity="0.4" 
              />
              <circle 
                cx="620" 
                cy="350" 
                r={Math.min(canopySize * 0.8, 140)} 
                fill="url(#bgLeafGradient)" 
                opacity="0.4" 
              />
              
              {/* Middle layer */}
              <circle 
                cx="500" 
                cy="280" 
                r={Math.min(canopySize, 160)} 
                fill="url(#bgLeafGradient)" 
                opacity="0.5" 
              />
              <circle 
                cx="400" 
                cy="330" 
                r={Math.min(canopySize * 0.7, 120)} 
                fill="url(#bgLeafGradient)" 
                opacity="0.6" 
              />
              <circle 
                cx="600" 
                cy="330" 
                r={Math.min(canopySize * 0.7, 120)} 
                fill="url(#bgLeafGradient)" 
                opacity="0.6" 
              />
              
              {/* Front layer - most visible */}
              <circle 
                cx="500" 
                cy="260" 
                r={Math.min(canopySize * 0.8, 130)} 
                fill="url(#bgLeafGradient)" 
                opacity="0.7" 
              />
              <circle 
                cx="420" 
                cy="310" 
                r={Math.min(canopySize * 0.5, 80)} 
                fill="url(#bgLeafGradient)" 
                opacity="0.8" 
              />
              <circle 
                cx="580" 
                cy="310" 
                r={Math.min(canopySize * 0.5, 80)} 
                fill="url(#bgLeafGradient)" 
                opacity="0.8" 
              />
            </g>
          )}

          {/* Floating Leaves and Particles */}
          <g className="animate-float">
            <circle 
              cx={200 + Math.sin(scrollProgress * 10) * 50} 
              cy={250 + Math.cos(scrollProgress * 8) * 30} 
              r="6" 
              fill="#22c55e" 
              opacity="0.7" 
            />
            <circle 
              cx={800 + Math.sin(scrollProgress * 12) * 40} 
              cy={200 + Math.cos(scrollProgress * 9) * 25} 
              r="5" 
              fill="#16a34a" 
              opacity="0.6" 
            />
            <circle 
              cx={150 + Math.sin(scrollProgress * 15) * 60} 
              cy={400 + Math.cos(scrollProgress * 7) * 40} 
              r="4" 
              fill="#22c55e" 
              opacity="0.5" 
            />
            <circle 
              cx={850 + Math.sin(scrollProgress * 11) * 35} 
              cy={380 + Math.cos(scrollProgress * 13) * 30} 
              r="7" 
              fill="#16a34a" 
              opacity="0.8" 
            />
          </g>

          {/* Animated Birds */}
          <g className="animate-float" style={{ animationDuration: '12s' }}>
            <path 
              d={`M${250 + Math.sin(scrollProgress * 8) * 100} ${180 + Math.cos(scrollProgress * 6) * 20} Q${255 + Math.sin(scrollProgress * 8) * 100} ${175 + Math.cos(scrollProgress * 6) * 20} ${260 + Math.sin(scrollProgress * 8) * 100} ${180 + Math.cos(scrollProgress * 6) * 20} Q${255 + Math.sin(scrollProgress * 8) * 100} ${185 + Math.cos(scrollProgress * 6) * 20} ${250 + Math.sin(scrollProgress * 8) * 100} ${180 + Math.cos(scrollProgress * 6) * 20}`} 
              fill="#374151" 
              opacity="0.6" 
            />
            <path 
              d={`M${700 + Math.sin(scrollProgress * 10) * 80} ${150 + Math.cos(scrollProgress * 8) * 25} Q${705 + Math.sin(scrollProgress * 10) * 80} ${145 + Math.cos(scrollProgress * 8) * 25} ${710 + Math.sin(scrollProgress * 10) * 80} ${150 + Math.cos(scrollProgress * 8) * 25} Q${705 + Math.sin(scrollProgress * 10) * 80} ${155 + Math.cos(scrollProgress * 8) * 25} ${700 + Math.sin(scrollProgress * 10) * 80} ${150 + Math.cos(scrollProgress * 8) * 25}`} 
              fill="#374151" 
              opacity="0.5" 
            />
            <path 
              d={`M${450 + Math.sin(scrollProgress * 14) * 60} ${120 + Math.cos(scrollProgress * 11) * 15} Q${455 + Math.sin(scrollProgress * 14) * 60} ${115 + Math.cos(scrollProgress * 11) * 15} ${460 + Math.sin(scrollProgress * 14) * 60} ${120 + Math.cos(scrollProgress * 11) * 15} Q${455 + Math.sin(scrollProgress * 14) * 60} ${125 + Math.cos(scrollProgress * 11) * 15} ${450 + Math.sin(scrollProgress * 14) * 60} ${120 + Math.cos(scrollProgress * 11) * 15}`} 
              fill="#374151" 
              opacity="0.7" 
            />
          </g>

          {/* Wind Effect Lines */}
          {scrollProgress > 0.4 && (
            <g className="animate-pulse" style={{ animationDuration: '3s' }}>
              <path
                d={`M100 200 Q200 ${190 + Math.sin(scrollProgress * 20) * 10} 300 ${200 + Math.cos(scrollProgress * 15) * 8}`}
                stroke="#22c55e"
                strokeWidth="2"
                fill="none"
                opacity="0.3"
                className="animate-float"
              />
              <path
                d={`M700 250 Q600 ${240 + Math.sin(scrollProgress * 18) * 12} 500 ${250 + Math.cos(scrollProgress * 16) * 10}`}
                stroke="#16a34a"
                strokeWidth="2"
                fill="none"
                opacity="0.3"
                className="animate-float"
              />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};