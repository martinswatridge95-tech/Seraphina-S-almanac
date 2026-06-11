import { ExternalLink, ShoppingBag, Info, Palette } from 'lucide-react';

export default function ShopView() {
  // Your updated artist profile link
  const displateUrl = "https://displate.com/artist/Swatty?art=5f70c2f64ef18";

  return (
    <div className="space-y-6 pb-20">
      {/* HEADER - Consistent with your Larder/Calendar views */}
      <div className="glass-card p-6 relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div className="z-10">
            <h1 className="text-3xl font-serif text-yellow-400 mb-2">The Emporium</h1>
            <p className="text-gray-400 text-sm italic max-w-md">
              Physical treasures to bring Seraphina's magic into your home.
            </p>
          </div>
          {/* Using the standard shop icon for the header decoration */}
          <ShoppingBag size={48} className="text-yellow-500/10 absolute -right-2 -top-2 rotate-12" />
        </div>
      </div>

      {/* EXTERNAL LINK STATEMENT */}
      <div className="mx-2 p-4 bg-blue-900/30 border border-blue-500/40 rounded-xl flex items-start gap-3 shadow-lg">
        <Info size={20} className="text-blue-400 mt-0.5 flex-shrink-0" />
        <div className="space-y-1">
          <p className="text-sm text-blue-100 font-serif font-medium">External Sanctuary Notice</p>
          <p className="text-xs text-blue-200/70 italic leading-relaxed">
            Selecting a treasure will transport you from the Almanac to our external sanctuary on Displate. Links will open in a new web page.
          </p>
        </div>
      </div>

      {/* DISPLATE ARTIST CARD */}
      <div className="grid gap-6">
        <div className="glass-card overflow-hidden group border-yellow-500/20 bg-gradient-to-br from-gray-900 to-slate-900">
          {/* Visual Banner */}
          <div className="relative h-40 bg-indigo-950/50 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
            <Palette size={60} className="text-yellow-500/20 group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute bottom-4 right-6">
               <span className="bg-yellow-500/20 border border-yellow-500/40 text-yellow-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest backdrop-blur-md">
                Official Artist Collection
              </span>
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-2xl font-serif text-yellow-400 mb-2">Swatty on Displate</h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Museum-quality metal posters featuring the Seraphina collection and more. 
              Magnificently printed and magnetically mounted for your ritual space.
            </p>
            
            <a
              href={displateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-4 bg-yellow-500/10 border border-yellow-500/50 rounded-xl text-yellow-400 font-serif hover:bg-yellow-500 hover:text-slate-900 transition-all shadow-[0_0_15px_rgba(234,179,8,0.1)] hover:shadow-[0_0_25px_rgba(234,179,8,0.3)] active:scale-95"
            >
              <span className="text-lg">Enter Gallery</span>
              <ExternalLink size={20} />
            </a>
          </div>
        </div>

        {/* FOOTER NOTE */}
        <p className="text-center text-gray-500 text-[10px] uppercase tracking-[0.2em] font-serif py-4">
          — More Sacred Collections Coming Soon —
        </p>
      </div>
    </div>
  );
}