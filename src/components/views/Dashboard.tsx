import { useState } from 'react';
import MoonTracker from '../MoonTracker';
import AskSeraphina from '../AskSeraphina';
import SabbatCountdown from '../SabbatCountdown';
import DailyInsight from '../DailyInsight';

// Asset path for Seraphina
import seraphinaImage from '../../assets/1762204358694(1) copy copy.png';

export default function Dashboard() {
  const [oracleMessage, setOracleMessage] = useState<string | null>(null);
  const [isRitualOpen, setIsRitualOpen] = useState(false);

  const wisdomBank = [
    "My magic is unique, powerful, and deeply personal.",
    "I am in perfect tune with the rhythm of the Earth.",
    "The universe hears my intentions; I trust in the timing of my life.",
    "I release what no longer serves me to make room for growth.",
    "My energy is a sacred garden; I choose what blooms here.",
    "I am grounded, I am centered, and I am at peace."
  ];

  const handleSeraphinaClick = () => {
    if (isRitualOpen) return;
    if (oracleMessage) {
      setOracleMessage(null);
    } else {
      const randomMsg = wisdomBank[Math.floor(Math.random() * wisdomBank.length)];
      setOracleMessage(randomMsg);
    }
  };

  return (
    <div className="space-y-6 pb-20"> {/* Added padding for mobile bottom nav */}
      <div className="relative pt-4 px-4 md:px-0">
        <h1 className="text-2xl md:text-3xl font-serif text-yellow-400 mb-4">Dashboard</h1>
        
        {/* MAGIC SMOKEY SPEECH BUBBLE - Position adjusted for mobile */}
        {oracleMessage && !isRitualOpen && (
          <div className="absolute top-[40px] right-4 md:top-[-20px] md:right-40 z-50 pointer-events-none">
            <div className="relative animate-in fade-in zoom-in-95 duration-700 ease-out">
              <div className="absolute inset-0 bg-blue-600/20 blur-2xl animate-pulse rounded-full"></div>
              <div className="relative bg-slate-950/90 backdrop-blur-xl px-5 py-4 md:px-7 md:py-5 rounded-[2rem] md:rounded-[3rem] rounded-tr-none border border-yellow-500/30 shadow-xl min-w-[180px] max-w-[220px] md:max-w-[280px]">
                <p className="relative text-yellow-100/90 text-xs md:text-sm italic font-serif leading-relaxed text-center">
                  "{oracleMessage}"
                </p>
                <div className="absolute -right-1 top-2 w-6 h-6 bg-slate-950/90 blur-[1px] rotate-[15deg] clip-path-triangle border-t border-yellow-500/20 md:hidden"></div>
              </div>
            </div>
          </div>
        )}

        {/* SERAPHINA - Responsive Positioning and Scaling */}
        <div className={`absolute 
          /* Mobile: Tucked in, smaller, and lower to avoid title overlap */
          top-[-10px] right-0 
          /* Desktop: Original size and negative margin */
          md:-top-12 md:-right-4 
          z-40 group transition-all duration-500 ${
          isRitualOpen ? 'pointer-events-none opacity-10 scale-75' : 'pointer-events-auto opacity-100'
        }`}>
          <div className="relative">
            <img
              src={seraphinaImage}
              alt="Seraphina"
              onClick={handleSeraphinaClick}
              /* Responsive Width: w-28 on mobile, w-48 on desktop */
              className="w-28 h-28 md:w-48 md:h-48 object-contain cursor-pointer transition-all duration-700 hover:scale-105 active:scale-95"
              style={{ filter: 'drop-shadow(0 0 15px rgba(59, 130, 246, 0.4))' }}
            />
            <div className="absolute inset-4 bg-blue-400/10 blur-[30px] md:blur-[40px] rounded-full -z-10 animate-pulse"></div>
          </div>
        </div>
      </div>

      <div className="relative z-10 px-4 md:px-0">
        <MoonTracker onModalToggle={setIsRitualOpen} />
        <SabbatCountdown />
        <DailyInsight />
        <AskSeraphina />
      </div>
    </div>
  );
}