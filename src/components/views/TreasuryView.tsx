import { useEffect, useState } from 'react';
import { Gem, Flower, Search, Heart } from 'lucide-react'; 
// 1. THIS IS THE NEW IMPORT PART:
import seraphinaReading from '../../assets/seraphina_reading.png';
import { supabase, Crystal, Herb } from '../../lib/supabase';
import {
  getFavorites,
  toggleFavorite,
  isFavorited,
} from '../../lib/storage';

type ViewMode = 'crystals' | 'herbs';

export default function TreasuryView() {
  const [mode, setMode] = useState<ViewMode>('crystals');
  const [crystals, setCrystals] = useState<Crystal[]>([]);
  const [herbs, setHerbs] = useState<Herb[]>([]);
  const [filteredCrystals, setFilteredCrystals] = useState<Crystal[]>([]);
  const [filteredHerbs, setFilteredHerbs] = useState<Herb[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [favorites, setFavorites] = useState(getFavorites());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [crystalsData, herbsData] = await Promise.all([
        supabase.from('crystals').select('*').order('name', { ascending: true }),
        supabase.from('herbs').select('*').order('name', { ascending: true }),
      ]);

      if (crystalsData.data) {
        setCrystals(crystalsData.data);
        setFilteredCrystals(crystalsData.data);
      }
      if (herbsData.data) {
        setHerbs(herbsData.data);
        setFilteredHerbs(herbsData.data);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase().trim();
    
    let c = crystals.filter(item => 
      item.name.toLowerCase().includes(term) || 
      item.healing_properties.toLowerCase().includes(term)
    );
    if (showOnlyFavorites) {
      c = c.filter(item => favorites.crystals.includes(item.id));
    }
    setFilteredCrystals(c);

    let h = herbs.filter(item => 
      item.name.toLowerCase().includes(term) || 
      item.healing_properties.toLowerCase().includes(term)
    );
    if (showOnlyFavorites) {
      h = h.filter(item => favorites.herbs.includes(item.id));
    }
    setFilteredHerbs(h);
    
  }, [searchTerm, crystals, herbs, showOnlyFavorites, favorites]);

  function handleToggleFavorite(type: 'crystals' | 'herbs', id: string) {
    toggleFavorite(type, id);
    setFavorites(getFavorites());
  }

  if (loading) return <div className="p-10 text-center text-yellow-400 font-serif">Consulting the Almanac...</div>;

  return (
    <div className="space-y-6 pb-24">
      {/* HEADER SECTION: Now using the imported image variable */}
      <div className="glass-card p-5 md:p-8 relative overflow-hidden">
        <div className="flex flex-row items-start justify-between gap-4">
          
          <div className="flex-1 min-w-0 z-10">
            <h1 className="text-3xl font-serif text-yellow-400 mb-2 border-b border-yellow-400/20 pb-2 inline-block">
              The Treasury
            </h1>
            <p className="text-gray-400 text-sm mb-4 italic">
              {mode === 'crystals' ? "Earth's Ancient Light" : "The Green Path"}
            </p>
            <p className="text-gray-300 leading-relaxed max-w-2xl text-sm italic">
              {mode === 'crystals' 
                ? "Explore the vibrational wisdom of the mineral kingdom. Each stone is a gift from the Earth, carrying unique energies for healing."
                : "Step into our herbal grimoire. Herbs are living bridges between the physical and spiritual, offering their essence for our well-being."}
            </p>
          </div>

          <div className="flex-shrink-0 pt-2">
            <img
              /* 2. UPDATED SRC TO USE THE VARIABLE: */
              src={seraphinaReading}
              alt="Seraphina Reading"
              /* Added mix-blend-multiply to remove that white background box */
              className="w-24 h-auto md:w-36 rounded-lg mix-blend-multiply brightness-110 contrast-110 opacity-95 transition-all"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                console.error("Image not found in assets folder");
              }}
            />
          </div>
        </div>

        {/* NAVIGATION BUTTONS */}
        <div className="flex gap-3 mt-6">
          <button 
            onClick={() => setMode('crystals')} 
            className={`flex-1 py-3 px-4 rounded-lg font-serif transition-all border ${mode === 'crystals' ? 'bg-purple-900/40 border-purple-400 text-white shadow-[0_0_10px_rgba(168,85,247,0.3)]' : 'bg-gray-800/50 border-gray-700/50 text-gray-500 hover:text-gray-300'}`}
          >
            <Gem size={18} className="inline-block mr-2" /> Crystals ({crystals.length})
          </button>
          <button 
            onClick={() => setMode('herbs')} 
            className={`flex-1 py-3 px-4 rounded-lg font-serif transition-all border ${mode === 'herbs' ? 'bg-emerald-900/40 border-emerald-400 text-white shadow-[0_0_10px_rgba(52,211,153,0.3)]' : 'bg-gray-800/50 border-gray-700/50 text-gray-500 hover:text-gray-300'}`}
          >
            <Flower size={18} className="inline-block mr-2" /> Herbs ({herbs.length})
          </button>
        </div>

        {/* SEARCH AND FAVORITES FILTER */}
        <div className="flex flex-col md:flex-row gap-4 mt-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder={`Search ${mode}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-gray-200 outline-none focus:border-yellow-400/30"
            />
          </div>
          <button
            onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
            className={`px-6 py-3 rounded-lg border flex items-center justify-center gap-2 transition-all ${showOnlyFavorites ? 'bg-red-500/20 border-red-500 text-red-200' : 'bg-gray-800/50 border-gray-700 text-gray-400'}`}
          >
            <Heart size={18} className={showOnlyFavorites ? 'fill-red-500' : ''} />
            <span className="text-sm">{showOnlyFavorites ? 'Favorites' : 'Show Favorites'}</span>
          </button>
        </div>
      </div>

      {/* ITEMS LIST */}
      <div className="space-y-4 px-1">
        {(mode === 'crystals' ? filteredCrystals : filteredHerbs).map((item) => (
          <div key={item.id} className="glass-card p-6 border-gray-700/30">
            <div className="flex flex-col md:flex-row gap-6">
              <div className={`w-16 h-16 rounded-full flex-shrink-0 mx-auto md:mx-0 flex items-center justify-center border shadow-lg ${
                mode === 'crystals' 
                  ? 'bg-purple-900/20 border-purple-500/30 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.1)]' 
                  : 'bg-emerald-900/20 border-emerald-500/30 text-emerald-300 shadow-[0_0_15px_rgba(52,211,153,0.1)]'
              }`}>
                {mode === 'crystals' ? <Gem size={32} /> : <Flower size={32} />}
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-serif text-yellow-400">{item.name}</h3>
                  <button 
                    onClick={() => handleToggleFavorite(mode, item.id)}
                    className="p-2 hover:bg-white/5 rounded-full transition-colors"
                  >
                    <Heart 
                      size={20} 
                      className={isFavorited(mode, item.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'} 
                    />
                  </button>
                </div>

                <p className="text-gray-300 italic mb-4 leading-relaxed text-sm">
                  {mode === 'crystals' ? (item as Crystal).lore : (item as Herb).purpose}
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-black/40 p-3 rounded-lg border border-gray-800/50 text-left">
                    <span className="text-[10px] uppercase tracking-widest text-yellow-400/50 font-bold block mb-1">Properties</span>
                    <p className="text-sm text-gray-300">{(item as any).healing_properties}</p>
                  </div>
                  <div className="bg-black/40 p-3 rounded-lg border border-gray-800/50 text-left">
                    <span className="text-[10px] uppercase tracking-widest text-yellow-400/50 font-bold block mb-1">Magical Uses</span>
                    <p className="text-sm text-gray-300">{(item as any).magical_uses}</p>
                  </div>
                </div>

                <div className="mt-4 bg-gray-900/40 p-4 rounded-lg border border-gray-800/50 text-left">
                  <span className="text-[10px] uppercase tracking-widest text-yellow-400/50 font-bold block mb-1">
                    {mode === 'crystals' ? 'Ritual Tip' : 'Folk Lore'}
                  </span>
                  <p className="text-sm text-gray-300 italic">
                    {mode === 'crystals' ? (item as Crystal).tip : (item as Herb).position}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}