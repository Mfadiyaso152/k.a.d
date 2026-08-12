import React from 'react';

const Starfield: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Dark Background */}
      <div className="absolute inset-0 bg-slate-950"></div>

      {/* Stars */}
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-white rounded-full opacity-20 animate-pulse"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 3}px`,
            height: `${Math.random() * 3}px`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
          }}
        ></div>
      ))}

      {/* Ambient Glows */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-slate-800/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 -right-20 w-64 h-64 bg-slate-800/20 rounded-full blur-3xl"></div>
    </div>
  );
};

export default Starfield;
