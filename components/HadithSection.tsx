import React from 'react';
import { motion } from 'motion/react';

const HADITHS = [
  {
    text: "إنما الأعمال بالنيات، وإنما لكل امرئ ما نوى، فمن كانت هجرته إلى الله ورسوله فهجرته إلى الله ورسوله، ومن كانت هجرته لدنيا يصيبها أو امرأة ينكحها فهجرته إلى ما هاجر إليه.",
    narrator: "عمر بن الخطاب",
    source: "صحيح البخاري"
  },
  {
    text: "من صام رمضان إيماناً واحتساباً غفر له ما تقدم من ذنبه.",
    narrator: "أبو هريرة",
    source: "متفق عليه"
  },
  {
    text: "خياركم من تعلم القرآن وعلمه.",
    narrator: "عثمان بن عفان",
    source: "صحيح البخاري"
  },
  {
    text: "لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه.",
    narrator: "أنس بن مالك",
    source: "صحيح مسلم"
  },
  {
    text: "الكلمة الطيبة صدقة.",
    narrator: "أبو هريرة",
    source: "صحيح البخاري"
  },
  {
    text: "اتق الله حيثما كنت، وأتبع السيئة الحسنة تمحها، وخالق الناس بخلق حسن.",
    narrator: "أبو ذر الغفاري",
    source: "سنن الترمذي"
  },
  {
    text: "يسروا ولا تعسروا، وبشروا ولا تنفروا.",
    narrator: "أنس بن مالك",
    source: "صحيح البخاري"
  },
  {
    text: "من كان يؤمن بالله واليوم الآخر فليقل خيراً أو ليصمت.",
    narrator: "أبو هريرة",
    source: "متفق عليه"
  },
  {
    text: "المؤمن القوي خير وأحب إلى الله من المؤمن الضعيف، وفي كل خير.",
    narrator: "أبو هريرة",
    source: "صحيح مسلم"
  },
  {
    text: "أحب الأعمال إلى الله أدومها وإن قل.",
    narrator: "عائشة رضي الله عنها",
    source: "صحيح البخاري"
  },
  {
    text: "من سلك طريقاً يلتمس فيه علماً سهل الله له به طريقاً إلى الجنة.",
    narrator: "أبو هريرة",
    source: "صحيح مسلم"
  },
  {
    text: "الدين النصيحة.",
    narrator: "تميم الداري",
    source: "صحيح مسلم"
  },
  {
    text: "بني الإسلام على خمس: شهادة أن لا إله إلا الله وأن محمداً رسول الله، وإقام الصلاة، وإيتاء الزكاة، والحج، وصوم رمضان.",
    narrator: "ابن عمر",
    source: "متفق عليه"
  },
  {
    text: "مثل الذي يذكر ربه والذي لا يذكر ربه مثل الحي والميت.",
    narrator: "أبو موسى الأشعري",
    source: "صحيح البخاري"
  }
];

const HadithSection: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-6xl font-bold font-reem text-white mb-4">الأحاديث النبوية</h2>
        <p className="text-slate-400">أنوار من كلام سيد المرسلين صلى الله عليه وسلم</p>
      </motion.div>

      <div className="grid grid-cols-1 gap-8">
        {HADITHS.map((hadith, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="relative bg-slate-900/40 border border-white/5 p-8 md:p-12 rounded-[2.5rem] group hover:bg-slate-900/70 transition-all overflow-hidden shadow-xl"
          >
            <div className="absolute top-0 right-0 p-8 text-9xl text-white/5 font-serif select-none pointer-events-none">"</div>
            <div className="relative z-10 flex flex-col items-center text-center">
              <p className="text-2xl md:text-3xl font-amiri text-slate-100 leading-relaxed mb-8 max-w-5xl">
                {hadith.text}
              </p>
              <div className="flex flex-col items-center">
                <div className="h-px w-24 bg-white/20 mb-4"></div>
                <p className="text-white font-bold mb-1">رواه {hadith.narrator}</p>
                <p className="text-slate-400 text-xs font-sans">{hadith.source}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HadithSection;
