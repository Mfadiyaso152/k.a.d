import React from 'react';
import { motion } from 'motion/react';

interface HeroProps {
  setActiveTab?: (tab: string) => void;
}

const Hero: React.FC<HeroProps> = () => {
  return (
    <section id="hero" className="relative min-h-[75vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="max-w-5xl space-y-10 relative z-10"
      >
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="text-3xl sm:text-4xl md:text-6xl font-bold font-amiri leading-relaxed text-slate-100 space-y-3"
        >
          <div className="block">"يَا أَيَّتُهَا النَّفْسُ الْمُطْمَئِنَّةُ <span className="text-white font-normal">۞</span></div>
          <div className="block text-white">ارْجِعِي إِلَى رَبِّكِ رَاضِيَةً مَرْضِيَّةً"</div>
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="h-px w-32 bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto"
        ></motion.div>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-lg md:text-2xl text-slate-200 font-amiri leading-relaxed max-w-3xl mx-auto"
        >
          اللهم اغفر لهم وارحمهم، وعافهم واعفُ عنهم، وأكرم نزلهم، ووسع مدخلهم، واغسلهم بالماء والثلج والبرد، ونقهم من الخطايا كما ينقى الثوب الأبيض من الدنس.
        </motion.p>
      </motion.div>
    </section>
  );
};

export default Hero;
