import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const CATEGORIES = [
  { id: 'morning', label: 'أذكار الصباح' },
  { id: 'evening', label: 'أذكار المساء' },
  { id: 'general', label: 'أدعية عامة' },
  { id: 'prophetic', label: 'أدعية نبوية' },
  { id: 'sleep', label: 'أذكار النوم' },
  { id: 'relief', label: 'أدعية تفريج الهم' }
];

const DUAS: Record<string, string[]> = {
  morning: [
    "أصبحنا وأصبح الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له.",
    "اللهم بك أصبحنا، وبك أمسينا، وبك نحيا، وبك نموت، وإليك النشور.",
    "رضيت بالله رباً، وبالإسلام ديناً، وبمحمد صلى الله عليه وسلم نبياً.",
    "اللهم إني أسألك علماً نافعاً، ورزقاً طيباً، وعملاً متقبلاً.",
    "يا حي يا قيوم برحمتك أستغيث، أصلح لي شأني كله ولا تكلني إلى نفسي طرفة عين.",
    "أصبحنا على فطرة الإسلام، وعلى كلمة الإخلاص، وعلى دين نبينا محمد صلى الله عليه وسلم.",
    "اللهم عافني في بدني، اللهم عافني في سمعي، اللهم عافني في بصري.",
    "لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير (10 مرات)."
  ],
  evening: [
    "أمسينا وأمسى الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له.",
    "اللهم بك أمسينا، وبك أصبحنا، وبك نحيا، وبك نموت، وإليك المصير.",
    "سبحان الله وبحمده: عدد خلقه، ورضا نفسه، وزنة عرشه، ومداد كلماته.",
    "اللهم إني أعوذ بك من الكفر والفقر، وأعوذ بك من عذاب القبر.",
    "يا حي يا قيوم برحمتك أستغيث أصلح لي شأني كله ولا تكلني إلى نفسي طرفة عين.",
    "أمسينا على فطرة الإسلام وعلى كلمة الإخلاص وعلى دين نبينا محمد.",
    "اللهم عالم الغيب والشهادة فاطر السماوات والأرض رب كل شيء ومليكه.",
    "أعوذ بكلمات الله التامات من شر ما خلق (3 مرات)."
  ],
  general: [
    "اللهم اغفر لي ولوالدي وللمؤمنين والمؤمنات الأحياء منهم والأموات.",
    "ربنا آتنا في الدنيا حسنة وفي الآخرة حسنة وقنا عذاب النار.",
    "اللهم إني أسألك الجنة وما قرب إليها من قول أو عمل.",
    "اللهم إني أسألك الهدى والتقى والعفاف والغنى.",
    "لا إله إلا أنت سبحانك إني كنت من الظالمين.",
    "اللهم أعني على ذكرك وشكرك وحسن عبادتك.",
    "رب اجعلني مقيم الصلاة ومن ذريتي ربنا وتقبل دعاء.",
    "اللهم إني أعوذ بك من زوال نعمتك وتحول عافيتك وفجاءة نقمتك وجميع سخطك.",
    "اللهم اهدني لأحسن الأخلاق لا يهدي لأحسنها إلا أنت.",
    "اللهم إني أسألك حبك وحب من يحبك وحب عمل يقربني إلى حبك."
  ],
  prophetic: [
    "اللهم إني أسألك العافية في الدنيا والآخرة.",
    "يا مقلب القلوب ثبت قلبي على دينك.",
    "اللهم إني أعوذ بك من الهم والحزن، والعجز والكسل، والبخل والجبن.",
    "اللهم اهدني وسددني.",
    "اللهم آت نفسي تقواها وزكها أنت خير من زكاها أنت وليها ومولاها.",
    "اللهم إني أعوذ بك من علم لا ينفع ومن قلب لا يخشع ومن نفس لا تشبع.",
    "اللهم لك الحمد كله ولك الملك كله وبيدك الخير كله.",
    "اللهم إنك عفو تحب العفو فاعف عني."
  ],
  sleep: [
    "باسمك ربي وضعت جنبي وبك أرفعه، إن أمسكت نفسي فارحمها، وإن أرسلتها فاحفظها.",
    "اللهم قني عذابك يوم تبعث عبادك.",
    "باسمك اللهم أموت وأحيا.",
    "اللهم أنت خلقت نفسي وأنت توفاها، لك مماتها ومحياها.",
    "الحمد لله الذي أطعمنا وسقانا وكفانا وآوانا.",
    "سبحان الله (33)، الحمد لله (33)، الله أكبر (34)."
  ],
  relief: [
    "لا إله إلا الله العظيم الحليم، لا إله إلا الله رب العرش العظيم.",
    "اللهم إني أعوذ بك من الهم والحزن والعجز والكسل.",
    "اللهم رحمتك أرجو فلا تكلني إلى نفسي طرفة عين.",
    "اللهم إني عبدك ابن عبدك ابن أمتك ناصيتي بيدك ماض في حكمك عدل في قضاؤك.",
    "اللهم لا سهل إلا ما جعلته سهلاً وأنت تجعل الحزن إذا شئت سهلاً.",
    "حسبنا الله ونعم الوكيل."
  ]
};

const Supplications: React.FC = () => {
  const [activeCat, setActiveCat] = useState('general');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-6xl font-bold font-reem text-white mb-4">الأذكار والأدعية</h2>
        <p className="text-slate-400">موسوعة الأدعية الصحيحة والأذكار التي لا غنى عنها للمسلم</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex flex-wrap justify-center gap-3 mb-12"
      >
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCat(cat.id)}
            className={`px-6 py-3 rounded-2xl transition-all border ${
              activeCat === cat.id 
                ? 'bg-white text-slate-950 font-bold border-white shadow-xl shadow-white/10 scale-105' 
                : 'bg-slate-900/50 text-slate-400 border-white/5 hover:border-white/20'
            }`}
          >
            <span className="font-bold">{cat.label}</span>
          </button>
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={activeCat}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {DUAS[activeCat].map((dua, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="bg-slate-900/40 p-8 rounded-[2rem] border border-white/5 hover:border-white/20 transition-all group flex flex-col justify-between text-center shadow-lg"
            >
              <p className="text-xl md:text-2xl font-amiri text-slate-100 leading-relaxed min-h-[100px] flex items-center justify-center">
                "{dua}"
              </p>
              <div className="mt-6 flex justify-center">
                 <button 
                    onClick={() => handleCopy(dua, i)}
                    className={`px-5 py-2 rounded-full border text-xs font-medium transition-all ${
                      copiedIndex === i
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : 'border-white/10 text-slate-400 hover:text-white hover:border-white/30'
                    }`}
                 >
                   {copiedIndex === i ? 'تم النسخ!' : 'نسخ النص'}
                 </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Supplications;
