import { useState, useEffect } from 'react';
import { Shield, Heart, Sparkles } from 'lucide-react';
import { supabase, Crystal } from '../lib/supabase';

export default function AskSeraphina() {
  const [selectedIntention, setSelectedIntention] = useState<string | null>(null);
  const [crystal, setCrystal] = useState<Crystal | null>(null);
  const [loading, setLoading] = useState(false);

  const intentions = [
    { id: 'Protection', label: 'I need Protection', icon: Shield, color: 'from-gray-700 to-gray-900' },
    { id: 'Love', label: 'I seek Love', icon: Heart, color: 'from-pink-700 to-rose-900' },
    { id: 'Luck', label: 'I want Luck', icon: Sparkles, color: 'from-yellow-600 to-amber-800' },
  ];

  useEffect(() => {
    if (selectedIntention) {
      loadCrystal(selectedIntention);
    }
  }, [selectedIntention]);

  async function loadCrystal(intention: string) {
    setLoading(true);
    const { data } = await supabase
      .from('crystals')
      .select('*')
      .eq('intention', intention)
      .maybeSingle();

    if (data) {
      setCrystal(data);
    }
    setLoading(false);
  }

  return (
    <div className="glass-card p-8">
      <h2 className="text-2xl font-serif text-yellow-400 mb-6 text-center">Ask Seraphina</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {intentions.map((intention) => {
          const Icon = intention.icon;
          const isSelected = selectedIntention === intention.id;
          return (
            <button
              key={intention.id}
              onClick={() => setSelectedIntention(intention.id)}
              className={`p-6 rounded-xl border-2 transition-all ${
                isSelected
                  ? 'border-yellow-400 bg-gradient-to-br ' + intention.color + '/50 scale-105'
                  : 'border-gray-700/50 bg-gray-800/30 hover:border-gray-600'
              }`}
            >
              <Icon size={32} className={isSelected ? 'text-yellow-400 mx-auto mb-3' : 'text-gray-400 mx-auto mb-3'} />
              <p className="text-gray-200 font-serif">{intention.label}</p>
            </button>
          );
        })}
      </div>

      {loading && (
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-700/30 rounded w-3/4"></div>
          <div className="h-24 bg-gray-700/30 rounded"></div>
          <div className="h-16 bg-gray-700/30 rounded"></div>
        </div>
      )}

      {!loading && crystal && (
        <div className="space-y-4 animate-fadeIn">
          <div className="text-center">
            <h3 className="text-2xl font-serif text-yellow-400 mb-2">{crystal.name}</h3>
            <p className="text-gray-300 leading-relaxed">{crystal.lore}</p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
            <h4 className="text-lg font-serif text-yellow-400 mb-2">How to Use</h4>
            <p className="text-gray-300 leading-relaxed">{crystal.tip}</p>
          </div>
        </div>
      )}
    </div>
  );
}
