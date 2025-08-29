import React from 'react';

interface FloatingTreeProps {
  progress: number;
}

export const FloatingTree: React.FC<FloatingTreeProps> = ({ progress }) => {
  const getTreeStage = (progress: number) => {
    if (progress < 0.14) return 'roots';
    if (progress < 0.28) return 'trunk';
    if (progress < 0.42) return 'branches';
    if (progress < 0.56) return 'flowers';
    if (progress < 0.70) return 'fruits';
    if (progress < 0.84) return 'canopy';
    return 'complete';
  };

  const stage = getTreeStage(progress);
  const opacity = Math.min(progress * 2, 0.8);

  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 pointer-events-none hidden lg:block">
      <div 
        className="transition-all duration-1000 ease-out hover:scale-110"
        style={{ 
          opacity, 
          transform: `scale(${0.5 + progress * 0.5}) rotate(${progress * 5}deg)`,
          filter: `hue-rotate(${progress * 30}deg)`
        }}
      >
        <svg width="140" height="220" viewBox="0 0 120 200" className="drop-shadow-2xl">
          {/* Roots */}
          {stage !== 'roots' && (
            <g className="animate-pulse" style={{ animationDuration: '3s' }}>
              <path
                d="M60 180 Q45 190 30 195 M60 180 Q75 190 90 195 M60 180 Q60 190 60 200"
                stroke="#8B4513"
                strokeWidth="3"
                fill="none"
                className="opacity-90"
              />
            </g>
          )}
          
          {/* Trunk */}
          {(['trunk', 'branches', 'flowers', 'fruits', 'canopy', 'complete'].includes(stage)) && (
            <g>
              <rect
                x="55"
                y="100"
                width="10"
                height="80"
                fill="#8B4513"
                className="animate-pulse"
                style={{ animationDuration: '2s' }}
              />
              <rect
                x="56"
                y="100"
                width="8"
                height="80"
                fill="#A0522D"
                opacity="0.7"
              />
            </g>
          )}
          
          {/* Branches */}
          {(['branches', 'flowers', 'fruits', 'canopy', 'complete'].includes(stage)) && (
            <g className="animate-pulse" style={{ animationDuration: '4s' }}>
              <path
                d="M60 120 Q45 110 35 105 M60 120 Q75 110 85 105"
                stroke="#8B4513"
                strokeWidth="4"
                fill="none"
              />
              <path
                d="M60 140 Q40 130 25 125 M60 140 Q80 130 95 125"
                stroke="#8B4513"
                strokeWidth="4"
                fill="none"
              />
            </g>
          )}
          
          {/* Flowers */}
          {(['flowers', 'fruits', 'canopy', 'complete'].includes(stage)) && (
            <g className="animate-pulse" style={{ animationDuration: '2s' }}>
              <circle cx="35" cy="105" r="5" fill="#FFB6C1" className="animate-bounce" />
              <circle cx="85" cy="105" r="5" fill="#FF69B4" className="animate-bounce" />
              <circle cx="25" cy="125" r="4" fill="#FFB6C1" className="animate-bounce" />
              <circle cx="95" cy="125" r="4" fill="#FF69B4" className="animate-bounce" />
              <circle cx="60" cy="115" r="3" fill="#FFC0CB" className="animate-bounce" />
            </g>
          )}
          
          {/* Fruits */}
          {(['fruits', 'canopy', 'complete'].includes(stage)) && (
            <g className="animate-pulse" style={{ animationDuration: '3s' }}>
              <circle cx="40" cy="110" r="4" fill="#FF6B35" />
              <circle cx="80" cy="110" r="4" fill="#FF4500" />
              <circle cx="30" cy="130" r="3" fill="#FF6B35" />
              <circle cx="90" cy="130" r="3" fill="#FF4500" />
              <circle cx="65" cy="120" r="3" fill="#FF8C00" />
            </g>
          )}
          
          {/* Canopy */}
          {(['canopy', 'complete'].includes(stage)) && (
            <g className="animate-pulse" style={{ animationDuration: '5s' }}>
              <circle cx="60" cy="80" r="38" fill="#22C55E" className="opacity-90" />
              <circle cx="45" cy="90" r="28" fill="#16A34A" className="opacity-80" />
              <circle cx="75" cy="90" r="28" fill="#16A34A" className="opacity-80" />
              <circle cx="60" cy="70" r="20" fill="#15803D" className="opacity-70" />
            </g>
          )}

          {/* Magical Sparkles */}
          {stage === 'complete' && (
            <g className="animate-pulse" style={{ animationDuration: '1.5s' }}>
              <circle cx="30" cy="60" r="1" fill="#FFD700" className="animate-ping" />
              <circle cx="90" cy="70" r="1" fill="#FFD700" className="animate-ping" />
              <circle cx="50" cy="50" r="1" fill="#FFD700" className="animate-ping" />
              <circle cx="70" cy="55" r="1" fill="#FFD700" className="animate-ping" />
            </g>
          )}
        </svg>
        
        <div className="text-center mt-2">
          <div className="text-xs font-medium text-emerald-700 capitalize bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full">
            {stage === 'complete' ? 'Thriving Community' : stage}
          </div>
          <div className="w-20 bg-emerald-200 rounded-full h-2 mt-2 mx-auto shadow-inner">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};