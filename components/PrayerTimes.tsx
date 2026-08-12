import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface Timings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

interface HijriDate {
  day: string;
  month: { ar: string };
  year: string;
}

const PrayerTimes: React.FC = () => {
  const [timings, setTimings] = useState<Timings | null>(null);
  const [location, setLocation] = useState<string>("جاري تحديد الموقع...");
  const [hijri, setHijri] = useState<HijriDate | null>(null);
  const [loading, setLoading] = useState(true);

  // Helper function to convert 24h to 12h Arabic format
  const formatTime12h = (time24: string) => {
    if (!time24) return "";
    const [hours, minutes] = time24.split(':');
    let h = parseInt(hours, 10);
    const ampm = h >= 12 ? 'م' : 'ص';
    h = h % 12 || 12;
    const arabicH = h.toLocaleString('ar-SA');
    const m = parseInt(minutes, 10);
    const arabicM = m.toLocaleString('ar-SA', { minimumIntegerDigits: 2, useGrouping: false });
    return `${arabicH}:${arabicM} ${ampm}`;
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(`https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=4`);
          const data = await res.json();
          setTimings(data.data.timings);
          setHijri(data.data.date.hijri);
          setLocation(`${data.data.meta.timezone}`);
          setLoading(false);
        } catch (err) {
          console.error(err);
        }
      }, () => {
        fetch(`https://api.aladhan.com/v1/timingsByCity?city=Riyadh&country=Saudi+Arabia&method=4`)
          .then(res => res.json())
          .then(data => {
            setTimings(data.data.timings);
            setHijri(data.data.date.hijri);
            setLocation("الرياض، السعودية (تلقائي)");
            setLoading(false);
          });
      });
    }
  }, []);

  const prayerLabels: Record<string, string> = {
    Fajr: "الفجر",
    Sunrise: "الشروق",
    Dhuhr: "الظهر",
    Asr: "العصر",
    Maghrib: "المغرب",
    Isha: "العشاء"
  };

  if (loading) return null;

  return (
    <motion.section 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      id="prayer-times" 
      className="py-16 px-6 max-w-7xl mx-auto"
    >
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl font-bold font-reem text-white mb-2">مواقيت الصلاة</h2>
          <p className="text-slate-300 text-sm flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            {location}
          </p>
        </div>
        <div className="text-right">
          <p className="text-slate-400 text-xs uppercase tracking-widest">التاريخ الهجري اليوم</p>
          <p className="text-slate-100 font-bold">
            {hijri ? `${hijri.day} ${hijri.month.ar} ${hijri.year} هـ` : 'جاري التحميل...'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {timings && Object.entries(prayerLabels).map(([key, label], index) => (
          <motion.div 
            key={key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-slate-900/40 border border-white/5 p-6 rounded-[2rem] text-center hover:border-white/20 transition-all hover:bg-slate-900/60 group shadow-lg"
          >
            <p className="text-slate-400 text-sm mb-3 group-hover:text-white transition-colors">{label}</p>
            <p className="text-xl md:text-2xl font-bold text-white font-reem whitespace-nowrap">
              {formatTime12h(timings[key as keyof Timings])}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default PrayerTimes;
