import { Home, Calendar, Beaker, Gem, BookOpen, ShoppingBag } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'larder', label: 'Larder', icon: Beaker },
    { id: 'treasury', label: 'Treasury', icon: Gem },
    { id: 'journal', label: 'Journal', icon: BookOpen },
    { id: 'shop', label: 'Shop', icon: ShoppingBag },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900/80 backdrop-blur-xl border-t border-gray-700/50 z-50">
      <div className="max-w-7xl mx-auto px-2">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
                  isActive ? 'text-yellow-400' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <Icon size={22} />
                <span className="text-[10px] mt-1 font-serif uppercase tracking-tighter">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}