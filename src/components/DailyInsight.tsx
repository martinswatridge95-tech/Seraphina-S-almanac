import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { supabase, Crystal, Herb } from '../lib/supabase';

type InsightItem = (Crystal | Herb) & { type: 'crystal' | 'herb' };

export default function DailyInsight() {
  const [insight, setInsight] = useState<InsightItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDailyInsight() {
      const [crystalsData, herbsData] = await Promise.all([
        supabase.from('crystals').select('*'),
        supabase.from('herbs').select('*'),
      ]);

      const items: InsightItem[] = [];

      if (crystalsData.data) {
        items.push(
          ...crystalsData.data.map((c) => ({ ...c, type: 'crystal' as const }))
        );
      }

      if (herbsData.data) {
        items.push(
          ...herbsData.data.map((h) => ({ ...h, type: 'herb' as const }))
        );
      }

      if (items.length > 0) {
        const today = new Date();
        const seed =
          today.getFullYear() * 10000 +
          (today.getMonth() + 1) * 100 +
          today.getDate();
        const randomIndex = seed % items.length;
        setInsight(items[randomIndex]);
      }

      setLoading(false);
    }

    loadDailyInsight();
  }, []);

  if (loading) {
    return (
      <div className="glass-card p-6 animate-pulse">
        <div className="h-8 bg-gray-700/30 rounded w-48 mb-4"></div>
        <div className="h-24 bg-gray-700/30 rounded"></div>
      </div>
    );
  }

  if (!insight) {
    return null;
  }

  const isCrystal = insight.type === 'crystal';
  const isMagical = isCrystal
    ? (insight as Crystal).magical_uses
    : (insight as Herb).magical_uses;
  const isHealing = isCrystal
    ? (insight as Crystal).healing_properties
    : (insight as Herb).healing_properties;

  return (
    <div className="glass-card p-6 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border-2 border-purple-500/30">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-600/30 to-purple-600/30 flex-shrink-0">
          <Sparkles size={24} className="text-purple-400" />
        </div>
        <div className="flex-1">
          <p className="text-purple-400 text-sm font-serif mb-1">Daily Insight</p>
          <h3 className="text-2xl font-serif text-yellow-400 mb-2">
            {isCrystal
              ? (insight as Crystal).name
              : (insight as Herb).name}
          </h3>

          <div className="space-y-2 text-sm">
            <div>
              <p className="text-purple-300 font-serif mb-1">
                {isCrystal ? 'Healing Properties' : 'Healing Properties'}:
              </p>
              <p className="text-gray-300">{isHealing}</p>
            </div>
            <div>
              <p className="text-indigo-300 font-serif mb-1">
                {isCrystal ? 'Magical Uses' : 'Magical Uses'}:
              </p>
              <p className="text-gray-300">{isMagical}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
