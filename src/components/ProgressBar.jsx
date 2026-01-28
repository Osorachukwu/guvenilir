import { useState, useEffect } from 'react';

export const ProgressBar = () => {
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setProgress(prev => (prev >= 100 ? 0 : prev + 1));
//     }, 50);

//     return () => clearInterval(interval);
//   }, []);

  return (
    <div className="w-full mt-3 h-1.5 bg-gray-200 rounded-full overflow-hidden relative">
      <div 
        className="h-full w-[90%] rounded-full transition-all duration-300"
        style={{
        //   width: `30px`,
          backgroundImage: `linear-gradient(
            45deg,
            #3b82f6 25%,
            #1d4ed8 25%,
            #1d4ed8 50%,
            #3b82f6 50%,
            #3b82f6 75%,
            #1d4ed8 75%,
            #1d4ed8 100%
          )`,
          backgroundSize: '20px 20px',
          position: 'relative',
        }}
      >
        {/* Animated shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
      </div>
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </div>
  );
};