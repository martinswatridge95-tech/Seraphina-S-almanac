import { useState } from 'react';
import BottomNav from './components/BottomNav';
import Dashboard from './components/views/Dashboard';
import CalendarView from './components/views/CalendarView';
import LarderView from './components/views/LarderView';
import TreasuryView from './components/views/TreasuryView';
import JournalView from './components/views/JournalView';
// 1. ADD THIS IMPORT (Make sure the filename matches your file exactly)
import ShopView from './components/views/ShopView'; 

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="stars"></div>
      <div className="stars2"></div>

      <div className="relative z-10">
        <header className="text-center py-8 px-4">
          <h1 className="text-4xl md:text-5xl font-serif text-yellow-400 mb-2 drop-shadow-lg">
            Seraphina's Almanac
          </h1>
          <p className="text-gray-300 font-serif italic">
            A grimoire of moon wisdom and natural healing
          </p>
        </header>

        <main className="max-w-4xl mx-auto px-4 pb-24">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'calendar' && <CalendarView />}
          {activeTab === 'larder' && <LarderView />}
          {activeTab === 'treasury' && <TreasuryView />}
          {activeTab === 'journal' && <JournalView />}
          
          {/* 2. ADD THIS LINE TO RENDER THE SHOP */}
          {activeTab === 'shop' && <ShopView />}
        </main>
      </div>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;