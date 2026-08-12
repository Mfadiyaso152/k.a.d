import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Surah {
  number: number;
  name: string;
  englishName: string;
  numberOfAyahs: number;
  revelationType: string;
}

interface Ayah {
  numberInSurah: number;
  text: string;
}

const QuranViewer: React.FC = () => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null);
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState(true);
  const [readingLoading, setReadingLoading] = useState(false);

  useEffect(() => {
    fetch('https://api.alquran.cloud/v1/surah')
      .then(res => res.json())
      .then(data => {
        setSurahs(data.data);
        setLoading(false);
      });
  }, []);

  const loadSurah = async (num: number) => {
    setReadingLoading(true);
    setSelectedSurah(num);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      const res = await fetch(`https://api.alquran.cloud/v1/surah/${num}`);
      const data = await res.json();
      setAyahs(data.data.ayahs);
    } catch (err) {
      console.error(err);
    } finally {
      setReadingLoading(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-white font-amiri text-xl">جاري تحميل المصحف الشريف...</div>;

  return (
    <div id="quran-view" className="max-w-7xl mx-auto px-6 py-12">
      <AnimatePresence mode="wait">
        {!selectedSurah ? (
          <motion.div 
            key="surah-list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-10"
          >
            <div className="text-center">
              <h2 className="text-4xl md:text-6xl font-bold font-reem text-white mb-4">المصحف الشريف</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">تصفح واقرأ سور القرآن الكريم كاملة بتصميم مريح للعين</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {surahs.map((surah) => (
                <motion.div 
                  key={surah.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.4 }}
                  onClick={() => loadSurah(surah.number)}
                  className="group p-6 rounded-3xl bg-slate-900/40 border border-white/5 hover:border-white/30 cursor-pointer transition-all hover:bg-slate-900/80 hover:scale-[1.02] relative overflow-hidden"
                >
                  <div className="absolute -left-2 -bottom-2 text-6xl opacity-5 group-hover:opacity-10 transition-opacity font-bold select-none">
                    {surah.number}
                  </div>
                  <div className="flex justify-between items-center relative z-10">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white font-bold border border-white/20">
                      {surah.number}
                    </div>
                    <h3 className="text-xl font-bold font-amiri text-slate-100">{surah.name}</h3>
                  </div>
                  <div className="mt-4 flex justify-between text-[10px] text-slate-400 font-medium">
                    <span>{surah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'}</span>
                    <span>{surah.numberOfAyahs} آية</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="surah-reader"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <button 
              onClick={() => setSelectedSurah(null)}
              className="flex items-center gap-2 text-white hover:text-slate-300 font-bold transition-colors"
            >
              <span>→</span> العودة لفهرس السور
            </button>
            
            <div className="bg-slate-900/60 rounded-[3rem] p-8 md:p-16 border border-white/10 shadow-2xl relative">
               {readingLoading ? (
                 <div className="flex items-center justify-center py-20 text-white font-amiri text-xl">جاري التحميل...</div>
               ) : (
                 <>
                   <div className="text-center mb-12">
                     <h2 className="text-5xl font-bold font-amiri text-white mb-4">
                      {surahs.find(s => s.number === selectedSurah)?.name}
                     </h2>
                     {selectedSurah !== 9 && (
                       <p className="text-3xl font-amiri text-slate-200 mt-10">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
                     )}
                   </div>
                   <div className="text-right space-y-4 leading-[2.5] md:leading-[3]">
                     {ayahs.map(ayah => (
                       <span key={ayah.numberInSurah} className="text-2xl md:text-3xl font-amiri text-slate-100">
                         {ayah.text}{' '}
                         <span className="inline-flex w-10 h-10 items-center justify-center rounded-full border border-white/30 text-xs text-white mx-2 font-bold translate-y-1 bg-white/5">
                          {ayah.numberInSurah}
                         </span>
                       </span>
                     ))}
                   </div>
                 </>
               )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuranViewer;
