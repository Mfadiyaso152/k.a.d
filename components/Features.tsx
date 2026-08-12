import React from 'react';

const Features: React.FC = () => {
  const features = [
    { title: 'تصفح القرآن', desc: 'سور القرآن الكريم بتصميم مريح للعين', icon: '📖' },
    { title: 'الأحاديث الشريفة', desc: 'أحاديث نبوية مطهرة من الصحيحين', icon: '✨' },
    { title: 'الأذكار والأدعية', desc: 'أدعية وأذكار يومية لحفظ المسلم', icon: '🤲' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div key={i} className="p-8 rounded-3xl bg-slate-900/40 border border-white/5 hover:border-white/20 transition-all hover:bg-slate-900/60 group">
            <div className="text-4xl mb-4">{f.icon}</div>
            <h3 className="text-xl font-bold font-amiri text-white mb-2">{f.title}</h3>
            <p className="text-slate-400 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
