import { X, Moon, Sparkles } from 'lucide-react';
import { MoonPhase } from '../lib/supabase';

interface MoonRitualGuideProps {
  phase: MoonPhase;
  onClose: () => void;
}

export default function MoonRitualGuide({ phase, onClose }: MoonRitualGuideProps) {
  // 1. SMART SPLIT: Splits by a period followed by a space.
  // 2. FILTER: Removes any empty strings or items that are just lone numbers.
  const ritualSteps = phase.ritual_flow
    ? phase.ritual_flow
        .split(/\.\s+/) 
        .map((step) => step.trim())
        .filter((step) => step.length > 0 && !/^\d+$/.test(step))
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        
        {/* HEADER */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-gray-700/50 bg-gradient-to-br from-gray-800/60 to-gray-900/60 z-20">
          <div className="flex items-center gap-3">
            <Moon size={28} className="text-yellow-400" />
            <h2 className="text-3xl font-serif text-yellow-400">
              {phase.phase_name} Ritual Guide
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700/50 rounded-lg transition-all"
          >
            <X size={24} className="text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* INTERPRETATION */}
          <p className="text-gray-300 leading-relaxed italic border-l-4 border-yellow-400/30 pl-4">
            {phase.interpretation}
          </p>

          {/* RITUAL ELEMENTS */}
          {phase.ritual_elements && (
            <div className="glass-card p-4 bg-purple-900/20 border border-purple-600/30">
              <h3 className="text-lg font-serif text-purple-400 mb-3 flex items-center gap-2">
                <Sparkles size={20} />
                Common Ritual Elements
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {phase.ritual_elements}
              </p>
            </div>
          )}

          {/* RITUAL FLOW LIST */}
          {ritualSteps.length > 0 && (
            <div className="glass-card p-4 bg-indigo-900/20 border border-indigo-600/30">
              <h3 className="text-lg font-serif text-indigo-400 mb-4">
                A Simple Ritual Flow
              </h3>
              <div className="space-y-3">
                {ritualSteps.map((step, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-lg bg-gray-800/40 border border-gray-700/50 hover:border-indigo-500/30 transition-colors"
                  >
                    {/* The Clean Sequence Number */}
                    <span className="font-serif text-indigo-400 font-bold text-xl flex-shrink-0 pt-0.5">
                      {index + 1}.
                    </span>
                    <p className="text-gray-300 leading-relaxed">
                      {/* This regex strips out any "1. " or "2. " that was in the original text */}
                      {step.replace(/^\d+[\.\s]*/, '')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FOOTER NOTE */}
          <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
            <p className="text-gray-400 text-sm italic text-center">
              Trust your intuition and honor what resonates with your soul.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}