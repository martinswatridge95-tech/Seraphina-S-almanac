import { useEffect, useState } from 'react';
import { Calendar as CalendarIcon, Crown } from 'lucide-react';
// 1. IMPORT the image
import seraphinaImg from '../../assets/1762266619239(1).png';
import { supabase, Sabbat } from '../../lib/supabase';
import SabbatDetail from '../SabbatDetail';

export default function CalendarView() {
  const [sabbats, setSabbats] = useState<Sabbat[]>([]);
  const [upcomingSabbat, setUpcomingSabbat] = useState<Sabbat | null>(null);
  const [selectedSabbat, setSelectedSabbat] = useState<Sabbat | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSabbats() {
      const today = new Date();
      const { data } = await supabase
        .from('sabbats')
        .select('*')
        .order('date', { ascending: true });

      if (data) {
        setSabbats(data);
        const upcoming = data.find((s) => new Date(s.date) >= today);
        if (upcoming) setUpcomingSabbat(upcoming);
      }
      setLoading(false);
    }
    loadSabbats();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="glass-card p-6 h-32"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-24">
      {/* HEADER */}
      <div className="glass-card p-5 md:p-6 relative overflow-hidden">
        <div className="flex flex-row items-start justify-between gap-3 md:gap-6">
          <div className="flex-1 min-w-0 z-10">
            <h1 className="text-2xl md:text-3xl font-serif text-yellow-400 mb-2">
              Wheel of the Year
            </h1>
            <p className="text-gray-400 text-xs md:text-sm mb-3 italic leading-tight">
              The eight sacred Sabbats marking the turning of the seasons
            </p>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed pr-1">
              The Wheel turns through four Major Sabbats (the Fire Festivals) and four Minor Sabbats 
              (the Solar Festivals), creating the cosmic rhythm of the pagan year.
            </p>
          </div>

          <div className="flex-shrink-0 pt-1">
            <img
              /* 2. USE THE IMPORTED VARIABLE */
              src={seraphinaImg}
              alt="Seraphina"
              className="w-24 h-24 md:w-36 md:h-36 object-contain"
              style={{ filter: 'drop-shadow(0 0 12px rgba(59, 130, 246, 0.4))' }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </div>
      </div>

      {upcomingSabbat && (
        <div className="glass-card p-5 md:p-6 bg-gradient-to-br from-yellow-900/30 to-amber-900/20 border-2 border-yellow-500/50">
          <div className="flex items-start gap-4">
            <Crown size={28} className="text-yellow-400 mt-1 flex-shrink-0" />
            <div>
              <p className="text-yellow-400 text-[10px] md:text-sm font-serif uppercase tracking-widest mb-1">
                Upcoming Event
              </p>
              <h3 className="text-xl md:text-2xl font-serif text-yellow-300 mb-2">
                {upcomingSabbat.name}
              </h3>
              <p className="text-gray-300 text-sm md:text-base">
                {upcomingSabbat.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* LIST */}
      <div className="space-y-4 px-1">
        {sabbats.map((sabbat) => {
          const date = new Date(sabbat.date);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const isPast = date < today;
          const diffDays = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
          const isMajor = sabbat.classification === 'Major';

          return (
            <button
              key={sabbat.id}
              onClick={() => setSelectedSabbat(sabbat)}
              className={`glass-card p-4 md:p-6 w-full text-left hover:border-yellow-400/50 transition-all ${
                isPast ? 'opacity-50' : ''
              } ${
                isMajor ? 'border-2 border-amber-600/50' : 'border border-gray-700/50'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className={`w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full flex-shrink-0 ${
                    isMajor
                      ? 'bg-gradient-to-br from-amber-600/30 to-orange-800/30 border border-amber-500/50'
                      : 'bg-gradient-to-br from-blue-600/20 to-cyan-800/20 border border-blue-500/30'
                  }`}>
                    <CalendarIcon size={24} className={isMajor ? 'text-amber-400' : 'text-blue-400'} />
                  </div>
                  
                  <div className="sm:hidden flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-serif text-yellow-400">{sabbat.name}</h3>
                      <span className="text-gray-400 text-xs">
                        {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 w-full">
                  <div className="hidden sm:flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl md:text-2xl font-serif text-yellow-400">{sabbat.name}</h3>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-serif ${
                        isMajor ? 'bg-amber-900/40 border border-amber-600/50 text-amber-300' : 'bg-blue-900/40 border border-blue-600/50 text-blue-300'
                      }`}>
                        {isMajor ? 'Major' : 'Minor'}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-sm">
                        {date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                      </p>
                      {!isPast && diffDays >= 0 && (
                        <p className="text-green-400 text-[10px] font-serif uppercase tracking-tighter">
                          {diffDays === 0 ? 'Today!' : `${diffDays} days away`}
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed line-clamp-2 sm:line-clamp-none">
                    {sabbat.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {selectedSabbat && (
        <SabbatDetail sabbat={selectedSabbat} onClose={() => setSelectedSabbat(null)} />
      )}
    </div>
  );
}