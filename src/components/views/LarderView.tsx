import { useEffect, useState } from 'react';
import { Search, Beaker, Heart } from 'lucide-react';
// 1. IMPORT the Larder image
import seraphinaLarder from '../../assets/1762199357391(1).png';
import { supabase, Remedy } from '../../lib/supabase';
import { getFavorites, toggleFavorite, isFavorited } from '../../lib/storage';

export default function LarderView() {
  const [remedies, setRemedies] = useState<Remedy[]>([]);
  const [filteredRemedies, setFilteredRemedies] = useState<Remedy[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [favorites, setFavorites] = useState(getFavorites());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRemedies() {
      const { data } = await supabase
        .from('remedies')
        .select('*')
        .order('ailment', { ascending: true });

      if (data) {
        setRemedies(data);
        setFilteredRemedies(data);
      }
      setLoading(false);
    }
    loadRemedies();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase().trim();
    let filtered = remedies.filter(
      (remedy) =>
        remedy.ailment.toLowerCase().includes(term) ||
        remedy.remedy.toLowerCase().includes(term) ||
        remedy.ingredients.some((ing) => ing.toLowerCase().includes(term)) ||
        remedy.preparation.toLowerCase().includes(term)
    );

    if (showOnlyFavorites) {
      const favRemedies = favorites.remedies || [];
      filtered = filtered.filter(remedy => favRemedies.includes(remedy.id));
    }

    setFilteredRemedies(filtered);
  }, [searchTerm, remedies, showOnlyFavorites, favorites]);

  const handleToggleFavorite = (id: string) => {
    toggleFavorite('remedies' as any, id);
    setFavorites(getFavorites());
  };

  if (loading) return <div className="p-10 text-center text-yellow-400 font-serif">Opening the Larder...</div>;

  return (
    <div className="space-y-6 pb-24">
      <div className="glass-card p-6 relative">
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <h1 className="text-3xl font-serif text-yellow-400 mb-2">The Larder</h1>
            <p className="text-gray-400 text-sm mb-4 italic">
              The Green Path: Roots, Petals, and Potions
            </p>
            <p className="text-gray-300 leading-relaxed max-w-2xl mb-4">
              Nature's pantry holds ancient remedies passed down through generations. 
              Discover time-tested preparations blending wellness and intention.
            </p>
          </div>
          
          {/* 2. USE the imported variable here */}
          <img
            src={seraphinaLarder}
            alt="Seraphina"
            className="w-32 h-32 object-contain ml-4 flex-shrink-0"
            style={{ filter: 'drop-shadow(0 0 15px rgba(250, 204, 21, 0.2))' }}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>

        <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4 mb-6">
          <p className="text-red-300 text-xs leading-relaxed">
            <span className="font-serif font-bold uppercase tracking-wider">Medical Disclaimer:</span> Based on traditional herbal lore. Not a substitute for medical advice.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search ailments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-gray-200 outline-none focus:border-yellow-400/30"
            />
          </div>
          
          <button
            onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
            className={`px-6 py-3 rounded-xl border flex items-center justify-center gap-2 transition-all ${
              showOnlyFavorites 
                ? 'bg-red-500/20 border-red-500 text-red-200' 
                : 'bg-gray-800/50 border-gray-700 text-gray-400 hover:border-gray-600'
            }`}
          >
            <Heart size={18} className={showOnlyFavorites ? 'fill-red-500' : ''} />
            {showOnlyFavorites ? 'Favorites Only' : 'Show Favorites'}
          </button>
        </div>
      </div>

      <div className="space-y-4 px-1">
        {filteredRemedies.length > 0 ? (
          filteredRemedies.map((remedy) => (
            <div key={remedy.id} className="glass-card p-6 border-l-4 border-l-emerald-500/30">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-emerald-900/20 border border-emerald-500/20 flex-shrink-0">
                  <Beaker size={24} className="text-emerald-400" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-serif text-yellow-400">{remedy.ailment}</h3>
                      <p className="text-emerald-400 font-serif text-sm italic">{remedy.remedy}</p>
                    </div>
                    
                    <button 
                      onClick={() => handleToggleFavorite(remedy.id)}
                      className="p-2 hover:bg-white/5 rounded-full transition-colors group"
                    >
                      <Heart 
                        size={22} 
                        className={isFavorited('remedies' as any, remedy.id) 
                          ? 'fill-red-500 text-red-500' 
                          : 'text-gray-600 group-hover:text-gray-400'} 
                      />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-yellow-400/50 font-bold block mb-2">Ingredients</span>
                      <div className="flex flex-wrap gap-2">
                        {remedy.ingredients.map((ing, i) => (
                          <span key={i} className="px-2 py-1 bg-black/20 border border-gray-800 rounded text-xs text-gray-300">
                            {ing}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-black/20 p-4 rounded-lg border border-gray-800">
                      <span className="text-[10px] uppercase tracking-widest text-yellow-400/50 font-bold block mb-1">Preparation</span>
                      <p className="text-sm text-gray-300 leading-relaxed italic">{remedy.preparation}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="glass-card p-10 text-center text-gray-500 italic">
            No remedies found in your larder...
          </div>
        )}
      </div>
    </div>
  );
}