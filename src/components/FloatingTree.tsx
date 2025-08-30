import React from 'react';

interface FloatingTreeProps {
  progress: number;
}

export const FloatingTree: React.FC<FloatingTreeProps> = ({ progress }) => {
  const getTreeStage = (progress: number) => {
    if (progress < 0.15) return 'roots';
    if (progress < 0.30) return 'trunk';
    if (progress < 0.45) return 'branches';
    if (progress < 0.60) return 'flowers';
    if (progress < 0.75) return 'fruits';
    if (progress < 0.90) return 'canopy';
    return 'complete';
  };

  const stage = getTreeStage(progress);
  const opacity = Math.max(0.7, Math.min(progress * 3, 1));
  const scale = 0.6 + progress * 0.4;

  return (
    <div className="fixed right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-50 pointer-events-none">
      <div 
        className="transition-all duration-1000 ease-out"
        style={{ 
          opacity, 
          transform: `scale(${scale}) rotate(${progress * 3}deg)`,
        }}
      >
        <svg width="160" height="240" viewBox="0 0 140 220" className="drop-shadow-2xl">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <radialGradient id="leafGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#16a34a" />
            </radialGradient>
          </defs>

          {/* Roots - Always visible but grows */}
          <g className="animate-pulse" style={{ animationDuration: '3s' }}>
            <path
              d="M70 200 Q55 210 40 215 M70 200 Q85 210 100 215 M70 200 Q70 210 70 220"
              stroke="#8B4513"
              strokeWidth={Math.max(2, progress * 4)}
              fill="none"
              opacity={Math.max(0.6, progress)}
            />
            <path
              d="M70 200 Q60 205 45 210 M70 200 Q80 205 95 210"
              stroke="#654321"
              strokeWidth={Math.max(1, progress * 3)}
              fill="none"
              opacity={Math.max(0.4, progress * 0.8)}
            />
          </g>
          
          {/* Trunk - Appears after roots */}
          {progress > 0.15 && (
            <g>
              <rect
                x="65"
                y={200 - (progress - 0.15) * 300}
                width="10"
                height={(progress - 0.15) * 100}
                fill="#8B4513"
                className="animate-pulse"
                style={{ animationDuration: '2s' }}
                filter="url(#glow)"
              />
              <rect
                x="66"
                y={200 - (progress - 0.15) * 300}
                width="8"
                height={(progress - 0.15) * 100}
                fill="#A0522D"
                opacity="0.8"
              />
            </g>
          )}
          
          {/* Branches - Appears after trunk */}
          {progress > 0.30 && (
            <g className="animate-pulse" style={{ animationDuration: '4s' }}>
              <path
                d="M70 140 Q55 130 45 125 M70 140 Q85 130 95 125"
                stroke="#8B4513"
                strokeWidth={Math.max(3, (progress - 0.30) * 8)}
                fill="none"
                opacity={Math.min(1, (progress - 0.30) * 3)}
              />
              <path
                d="M70 160 Q50 150 35 145 M70 160 Q90 150 105 145"
                stroke="#8B4513"
                strokeWidth={Math.max(2, (progress - 0.30) * 6)}
                fill="none"
                opacity={Math.min(1, (progress - 0.30) * 3)}
              />
              <path
                d="M70 180 Q58 170 48 165 M70 180 Q82 170 92 165"
                stroke="#8B4513"
                strokeWidth={Math.max(2, (progress - 0.30) * 5)}
                fill="none"
                opacity={Math.min(1, (progress - 0.30) * 3)}
              />
            </g>
          )}
          
          {/* Flowers - Appears after branches */}
          {progress > 0.45 && (
            <g className="animate-pulse" style={{ animationDuration: '2s' }}>
              <circle 
                cx="45" 
                cy="125" 
                r={Math.max(2, (progress - 0.45) * 8)} 
                fill="#FFB6C1" 
                className="animate-bounce" 
                opacity={Math.min(1, (progress - 0.45) * 4)}
              />
              <circle 
                cx="95" 
                cy="125" 
                r={Math.max(2, (progress - 0.45) * 8)} 
                fill="#FF69B4" 
                className="animate-bounce" 
                opacity={Math.min(1, (progress - 0.45) * 4)}
              />
              <circle 
                cx="35" 
                cy="145" 
                r={Math.max(1, (progress - 0.45) * 6)} 
                fill="#FFB6C1" 
                className="animate-bounce" 
                opacity={Math.min(1, (progress - 0.45) * 4)}
              />
              <circle 
                cx="105" 
                cy="145" 
                r={Math.max(1, (progress - 0.45) * 6)} 
                fill="#FF69B4" 
                className="animate-bounce" 
                opacity={Math.min(1, (progress - 0.45) * 4)}
              />
              <circle 
                cx="70" 
                cy="135" 
                r={Math.max(1, (progress - 0.45) * 5)} 
                fill="#FFC0CB" 
                className="animate-bounce" 
                opacity={Math.min(1, (progress - 0.45) * 4)}
              />
            </g>
          )}
          
          {/* Fruits - Appears after flowers */}
          {progress > 0.60 && (
            <g className="animate-pulse" style={{ animationDuration: '3s' }}>
              <circle 
                cx="50" 
                cy="130" 
                r={Math.max(2, (progress - 0.60) * 8)} 
                fill="#FF6B35" 
                opacity={Math.min(1, (progress - 0.60) * 4)}
              />
              <circle 
                cx="90" 
                cy="130" 
                r={Math.max(2, (progress - 0.60) * 8)} 
                fill="#FF4500" 
                opacity={Math.min(1, (progress - 0.60) * 4)}
              />
              <circle 
                cx="40" 
                cy="150" 
                r={Math.max(1, (progress - 0.60) * 6)} 
                fill="#FF6B35" 
                opacity={Math.min(1, (progress - 0.60) * 4)}
              />
              <circle 
                cx="100" 
                cy="150" 
                r={Math.max(1, (progress - 0.60) * 6)} 
                fill="#FF4500" 
                opacity={Math.min(1, (progress - 0.60) * 4)}
              />
              <circle 
                cx="75" 
                cy="140" 
                r={Math.max(1, (progress - 0.60) * 5)} 
                fill="#FF8C00" 
                opacity={Math.min(1, (progress - 0.60) * 4)}
              />
            </g>
          )}
          
          {/* Canopy - Appears after fruits */}
          {progress > 0.75 && (
            <g className="animate-pulse" style={{ animationDuration: '5s' }}>
              <circle 
                cx="70" 
                cy="100" 
                r={Math.max(20, (progress - 0.75) * 120)} 
                fill="url(#leafGrad)" 
                opacity={Math.min(0.9, (progress - 0.75) * 4)}
                filter="url(#glow)"
              />
              <circle 
                cx="55" 
                cy="110" 
                r={Math.max(15, (progress - 0.75) * 80)} 
                fill="#16A34A" 
                opacity={Math.min(0.8, (progress - 0.75) * 4)}
              />
              <circle 
                cx="85" 
                cy="110" 
                r={Math.max(15, (progress - 0.75) * 80)} 
                fill="#16A34A" 
                opacity={Math.min(0.8, (progress - 0.75) * 4)}
              />
              <circle 
                cx="70" 
                cy="90" 
                r={Math.max(10, (progress - 0.75) * 60)} 
                fill="#15803D" 
                opacity={Math.min(0.7, (progress - 0.75) * 4)}
              />
            </g>
          )}

          {/* Magical Sparkles - Complete stage */}
          {progress > 0.90 && (
            <g className="animate-pulse" style={{ animationDuration: '1.5s' }}>
              <circle cx="40" cy="80" r="2" fill="#FFD700" className="animate-ping" />
              <circle cx="100" cy="90" r="2" fill="#FFD700" className="animate-ping" />
              <circle cx="60" cy="70" r="2" fill="#FFD700" className="animate-ping" />
              <circle cx="80" cy="75" r="2" fill="#FFD700" className="animate-ping" />
              <circle cx="50" cy="95" r="1" fill="#FFF" className="animate-ping" />
              <circle cx="90" cy="85" r="1" fill="#FFF" className="animate-ping" />
            </g>
          )}
        </svg>
        
        <div className="text-center mt-4">
          <div className="text-xs font-bold text-emerald-800 capitalize bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg border border-emerald-200">
            {stage === 'complete' ? '🌳 Thriving Community' : `🌱 ${stage}`}
          </div>
          <div className="w-24 bg-emerald-200 rounded-full h-3 mt-3 mx-auto shadow-inner border border-emerald-300">
            <div 
              className="bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 h-3 rounded-full transition-all duration-1000 shadow-sm relative overflow-hidden"
              style={{ width: `${Math.min(progress * 100, 100)}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            </div>
          </div>
          <div className="text-xs text-emerald-700 mt-1 font-medium">
            {Math.round(progress * 100)}% Complete
          </div>
        </div>
      </div>
    </div>
  );
};