import { useEffect, useState } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { supabase, Sabbat } from '../lib/supabase';

export default function SabbatCountdown() {
  const [nextSabbat, setNextSabbat] = useState<Sabbat | null>(null);
  const [daysUntil, setDaysUntil] = useState<number>(0);

  useEffect(() => {
    async function loadNextSabbat() {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayStr = today.toISOString().split('T')[0];

      const { data } = await supabase
        .from('sabbats')
        .select('*')
        .gte('date', todayStr)
        .order('date', { ascending: true })
        .limit(1)
        .maybeSingle();

      if (data) {
        setNextSabbat(data);
        const sabbatDate = new Date(data.date + 'T00:00:00');
        const diffTime = sabbatDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setDaysUntil(diffDays);
      }
    }

    loadNextSabbat();
  }, []);

  if (!nextSabbat) {
    return null;
  }

  return (
    <div className="glass-card p-6 flex items-center gap-4">
      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-green-600/20 to-emerald-800/20 border border-green-500/30">
        <CalendarIcon size={32} className="text-green-400" />
      </div>
      <div className="flex-1">
        <p className="text-gray-400 text-sm font-serif">Next Sabbat</p>
        <h3 className="text-xl font-serif text-yellow-400">{nextSabbat.name}</h3>
        <p className="text-gray-300">
          {daysUntil === 0 ? 'Today!' : daysUntil === 1 ? 'Tomorrow' : `in ${daysUntil} days`}
        </p>
      </div>
    </div>
  );
}
