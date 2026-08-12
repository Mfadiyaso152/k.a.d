import React, { useRef, useState } from 'react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'home', label: 'الرئيسية' },
    { id: 'quran', label: 'المصحف' },
    { id: 'hadith', label: 'الأحاديث' },
    { id: 'supplications', label: 'الأدعية' },
  ];

  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const touchTimer = useRef<NodeJS.Timeout | null>(null);

  // Touch move handler to select tab under touch location during long-press / slide
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      const target = document.elementFromPoint(touch.clientX, touch.clientY);
      if (target) {
        const button = target.closest('[data-tab-id]');
        if (button) {
          const tabId = button.getAttribute('data-tab-id');
          if (tabId) {
            setActiveTab(tabId);
            setHoveredTab(tabId);
          }
        }
      }
    }
  };

  const handleTouchStart = (tabId: string) => {
    touchTimer.current = setTimeout(() => {
      setHoveredTab(tabId);
      setActiveTab(tabId);
    }, 150);
  };

  const handleTouchEnd = () => {
    if (touchTimer.current) clearTimeout(touchTimer.current);
    setHoveredTab(null);
  };

  return (
    <>
      {/* Top Header */}
      <header className="px-4 py-3 fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between relative min-h-[48px]">
          {/* Site Title */}
          <div 
            onClick={() => setActiveTab('home')}
            className="cursor-pointer font-bold text-xl md:text-2xl text-white font-reem z-20 hover:opacity-80 transition-opacity select-none"
          >
            صدقة
          </div>

          {/* Desktop Navigation Centered */}
          <div className="hidden lg:flex items-center justify-center absolute left-1/2 -translate-x-1/2 max-w-xl w-full">
            <nav className="flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-full border border-white/10 shadow-xl">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap active:scale-95 ${
                    activeTab === item.id 
                      ? 'bg-white text-slate-950 font-bold shadow-lg shadow-white/10 scale-100' 
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="w-12 hidden lg:block"></div>
        </div>
      </header>

      {/* Mobile Bottom Navigation - Fully Static, All 4 Tabs Fixed and Visible without scroll */}
      <div className="lg:hidden fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-sm">
          <nav 
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="grid grid-cols-4 gap-1 bg-slate-900/95 p-1.5 rounded-full border border-white/15 backdrop-blur-2xl shadow-2xl w-full select-none"
          >
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const isHovered = hoveredTab === item.id;

              return (
                <button
                  key={item.id}
                  data-tab-id={item.id}
                  onClick={() => setActiveTab(item.id)}
                  onTouchStart={() => handleTouchStart(item.id)}
                  className={`w-full text-center py-2.5 px-1 rounded-full text-xs font-bold transition-all duration-200 whitespace-nowrap ${
                    isActive 
                      ? 'bg-white text-slate-950 shadow-md shadow-white/10 font-extrabold scale-100' 
                      : 'text-slate-300 hover:text-white active:bg-white/10'
                  } ${isHovered ? 'scale-105 bg-white/90 text-slate-950 shadow-xl' : ''}`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
