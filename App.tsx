import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import PrayerTimes from './components/PrayerTimes.tsx';
import QuranViewer from './components/QuranViewer.tsx';
import HadithSection from './components/HadithSection.tsx';
import Supplications from './components/Supplications.tsx';
import Footer from './components/Footer.tsx';
import Starfield from './components/Starfield.tsx';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <Hero setActiveTab={setActiveTab} />
            <PrayerTimes />
          </motion.div>
        );
      case 'quran':
        return (
          <motion.div
            key="quran"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <QuranViewer />
          </motion.div>
        );
      case 'hadith':
        return (
          <motion.div
            key="hadith"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <HadithSection />
          </motion.div>
        );
      case 'supplications':
        return (
          <motion.div
            key="supplications"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <Supplications />
          </motion.div>
        );
      default:
        return (
          <motion.div
            key="default"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <Hero setActiveTab={setActiveTab} />
          </motion.div>
        );
    }
  };

  return (
    <div className={`min-h-screen relative transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Starfield />
      <div className="absolute inset-0 islamic-pattern pointer-events-none"></div>
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-grow pt-20 pb-12">
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
