import React from 'react';

export const Component = () => {
    return (
        <div className="w-full h-full relative bg-[#111111]">
            <style>{`
        .glyph-field {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }
        .glyph-container {
          position: absolute;
          opacity: 0.6;
        }
        .glyph-1 { top: 20%; left: 10%; animation: twinkle 4s infinite; }
        .glyph-2 { top: 60%; right: 15%; animation: twinkle 6s infinite; }
        .glyph-3 { bottom: 20%; left: 20%; animation: twinkle 5s infinite; }
        .glyph-part {
          width: 4px;
          height: 4px;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          margin: 2px;
          display: inline-block;
        }
        .orrery-field {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .orbit {
          position: absolute;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          animation: orbit-rotate linear infinite;
        }
        .orbit-1 { width: 300px; height: 300px; animation-duration: 20s; }
        .orbit-2 { width: 500px; height: 500px; animation-duration: 30s; }
        .orbit-3 { width: 700px; height: 700px; animation-duration: 40s; }
        .orbit-4 { width: 900px; height: 900px; animation-duration: 50s; }
        .planet {
          position: absolute;
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          top: -4px;
          left: 50%;
          transform: translateX(-50%);
        }
        @keyframes orbit-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }
      `}</style>

            <div className="glyph-field">
                <div className="glyph-container glyph-1">
                    <div className="glyph-part part-1"></div>
                    <div className="glyph-part part-2"></div>
                    <div className="glyph-part part-3"></div>
                </div>
                <div className="glyph-container glyph-2">
                    <div className="glyph-part part-1"></div>
                    <div className="glyph-part part-2"></div>
                </div>
                <div className="glyph-container glyph-3">
                    <div className="glyph-part part-1"></div>
                    <div className="glyph-part part-2"></div>
                    <div className="glyph-part part-3"></div>
                </div>
            </div>

            <div className="orrery-field">
                <div className="orbit orbit-1"><div className="planet"></div></div>
                <div className="orbit orbit-2"><div className="planet"></div></div>
                <div className="orbit orbit-3"><div className="planet"></div></div>
                <div className="orbit orbit-4"><div className="planet"></div></div>
            </div>
        </div>
    );
};