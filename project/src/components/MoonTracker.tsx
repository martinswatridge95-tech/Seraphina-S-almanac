import { useEffect, useState } from 'react';
import { Moon } from 'lucide-react';
import { supabase, MoonPhase } from '../lib/supabase';
import { getCurrentMoonPhase } from '../lib/moonPhase';
import MoonRitualGuide from './MoonRitualGuide';

interface MoonTrackerProps {
  // Receives the toggle function from Dashboard
  onModalToggle: (isOpen: boolean) => void;
}

export default function MoonTracker({ onModalToggle }: MoonTrackerProps) {
  const [currentPhase, setCurrentPhase] = useState<string>('');
  const [moonData, setMoonData] = useState<MoonPhase | null>(null);
  const [loading, setLoading] = useState(true);
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    async function loadMoonData() {
      const phase = getCurrentMoonPhase();
      setCurrentPhase(phase);

      const { data } = await supabase
        .from('moon_phases')
        .select('*')
        .eq('phase_name', phase)
        .maybeSingle();

      if (data) {
        setMoonData(data);
      }
      setLoading(false);
    }

    loadMoonData();
  }, []);

  // Handler to open guide and silence Seraphina
  const handleOpenGuide = () => {
    setShowGuide(true);
    onModalToggle(true); 
  };

  // Handler to close guide and reactivate Seraphina
  const handleCloseGuide = () => {
    setShowGuide(false);
    onModalToggle(false);
  };

  if (loading) {
    return (
      <div className="glass-card p-8 text-center animate-pulse">
        <div className="h-24 w-24 mx-auto bg-gray-700/30 rounded-full mb-4"></div>
        <div className="h-6 bg-gray-700/30 rounded w-48 mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <button
        onClick={handleOpenGuide}
        className="glass-card p-8 text-center relative overflow-hidden w-full hover:border-yellow-400/50 transition-all cursor-pointer group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
        
        <div className="relative z-10">
          <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center rounded-full bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 border border-yellow-400/30 group-hover:border-yellow-400/60 transition-colors">
            <Moon size={48} className="text-yellow-400" />
          </div>
          
          <h2 className="text-3xl font-serif text-yellow-400 mb-2">{currentPhase}</h2>
          
          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto mb-4">
            {moonData?.interpretation}
          </p>
          
          <p className="text-yellow-400/60 text-xs font-serif uppercase tracking-widest">
            Click to view ritual guide
          </p>
        </div>
      </button>

      {moonData && showGuide && (
        <MoonRitualGuide phase={moonData} onClose={handleCloseGuide} />
      )}
    </div>
  );
}