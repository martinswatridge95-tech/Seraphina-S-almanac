import { X, Flame, Palette, Lightbulb, Users } from 'lucide-react';
import { Sabbat } from '../lib/supabase';

interface SabbatDetailProps {
  sabbat: Sabbat;
  onClose: () => void;
}

export default function SabbatDetail({ sabbat, onClose }: SabbatDetailProps) {
  const isMajor = sabbat.classification === 'Major';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-gray-700/50 bg-gradient-to-br from-gray-800/60 to-gray-900/60">
          <div>
            <h2 className="text-3xl font-serif text-yellow-400 mb-1">
              {sabbat.name}
            </h2>
            <span
              className={`inline-block px-3 py-1 rounded text-xs font-serif ${
                isMajor
                  ? 'bg-amber-900/40 border border-amber-600/50 text-amber-300'
                  : 'bg-blue-900/40 border border-blue-600/50 text-blue-300'
              }`}
            >
              {isMajor ? 'Major Sabbat' : 'Minor Sabbat'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700/50 rounded-lg transition-all"
          >
            <X size={24} className="text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <p className="text-gray-300 leading-relaxed mb-3">
              {sabbat.description}
            </p>
          </div>

          {sabbat.light_fire && (
            <div className="glass-card p-4 bg-amber-900/20 border border-amber-600/30">
              <div className="flex items-start gap-3">
                <Flame size={20} className="text-amber-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-serif text-amber-400 mb-1">
                    Light & Fire
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {sabbat.light_fire}
                  </p>
                </div>
              </div>
            </div>
          )}

          {sabbat.decorations && (
            <div className="glass-card p-4 bg-pink-900/20 border border-pink-600/30">
              <div className="flex items-start gap-3">
                <Palette size={20} className="text-pink-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-serif text-pink-400 mb-1">
                    Decorations & Symbols
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {sabbat.decorations}
                  </p>
                </div>
              </div>
            </div>
          )}

          {sabbat.reflection && (
            <div className="glass-card p-4 bg-indigo-900/20 border border-indigo-600/30">
              <div className="flex items-start gap-3">
                <Lightbulb
                  size={20}
                  className="text-indigo-400 mt-1 flex-shrink-0"
                />
                <div>
                  <h3 className="text-lg font-serif text-indigo-400 mb-1">
                    Reflection & Practices
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {sabbat.reflection}
                  </p>
                </div>
              </div>
            </div>
          )}

          {sabbat.ancestors && (
            <div className="glass-card p-4 bg-emerald-900/20 border border-emerald-600/30">
              <div className="flex items-start gap-3">
                <Users
                  size={20}
                  className="text-emerald-400 mt-1 flex-shrink-0"
                />
                <div>
                  <h3 className="text-lg font-serif text-emerald-400 mb-1">
                    Honoring Ancestors & Deities
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {sabbat.ancestors}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
