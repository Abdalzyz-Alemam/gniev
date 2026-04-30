/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// استيراد المكتبات والمكونات اللازمة لبناء التطبيق
import { useState, useMemo, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Languages, Facebook, Pizza, Sandwich, CupSoda, LayoutGrid, Ghost } from 'lucide-react';
import { MENU_DATA, UI_STRINGS } from './constants';

import ProductModal from './components/ProductModal';

type Language = 'ar' | 'en';

// خريطة أيقونات الفئات لتشبه التصميم المطلوب
const CATEGORY_ICONS: Record<string, any> = {
  all: LayoutGrid,
  pizza: Pizza,
  pies: Sandwich,
  juices: CupSoda
};

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);

  const t = UI_STRINGS[lang];
  const isRtl = lang === 'ar';

  const welcome = {
    ar: {
      title: "مرحباً بك في سلسلة مطاعم قنيف",
      message: "حيث تلتقي الأصالة بالمذاق الذي يسعد قلبك.. نحن هنا لنقدم لك تجربة لا تُنسى في عالم البيتزا والفطائر بكل حب.",
      button: "استكشف المنيو"
    },
    en: {
      title: "Welcome to Qneiv Chain",
      message: "Where authenticity meets the taste that delights your heart.. We are here to offer you an unforgettable experience made with love.",
      button: "Explore Menu"
    }
  }[lang];

  const filteredItems = useMemo(() => {
    return MENU_DATA.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch = 
        item.translations.en.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.translations.ar.name.includes(searchQuery);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const categories = Object.entries(t.categories);

  return (
    <div 
      className={`min-h-screen bg-[#FDFCF0] font-arabic ${isRtl ? 'rtl' : 'ltr'}`}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* 0. شاشة الترحيب السينمائية (Cinematic Welcome Experience) - تصميم كبدي ملكي متطور */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(15px)" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#2a0808] overflow-hidden select-none touch-none overscroll-none"
          >
            {/* الخلفية الاحترافية المتعددة الطبقات - تم تقليل البلور لتحسين الأداء */}
            <div className="absolute inset-0 z-0">
               {/* 1. تدرج لوني عميق بنقوش دقيقة */}
               <div className="absolute inset-0 bg-[#2a0808]" />
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#4A0E0E_0%,#1a0505_100%)] opacity-80" />
               <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/black-linen-2.png')]" />
               
               {/* 2. الإضاءة المحيطة (Ambient Glow) - تحسين الأداء بتقليل قيمة البلور */}
               <motion.div 
                 animate={{ 
                   opacity: [0.1, 0.15, 0.1],
                   scale: [1, 1.05, 1]
                 }}
                 transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-liver-light/10 blur-[80px] rounded-full"
               />

               {/* 3. برواز تزييني ملكي (Ornamental Frame) */}
               <div className="absolute inset-8 md:inset-12 border border-liver-light/10 pointer-events-none" />
               <div className="absolute inset-10 md:inset-16 border border-liver-light/5 pointer-events-none" />
               
               {/* زوايا البرواز الذهبية */}
               <div className="absolute top-8 left-8 w-8 h-8 border-t border-l border-liver-light/40" />
               <div className="absolute top-8 right-8 w-8 h-8 border-t border-r border-liver-light/40" />
               <div className="absolute bottom-8 left-8 w-8 h-8 border-b border-l border-liver-light/40" />
               <div className="absolute bottom-8 right-8 w-8 h-8 border-b border-r border-liver-light/40" />
            </div>

            <div className="relative z-10 max-w-xl w-full text-center flex flex-col items-center px-10">
              
              {/* شعار الماركة الفاخر (Refined Logo Case) */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                className="mb-10"
              >
                <div className="relative group">
                   <div className="absolute -inset-4 bg-liver-light/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                   <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border border-liver-light/20 flex items-center justify-center p-2 backdrop-blur-md bg-white/5 shadow-2xl">
                      <div className="w-full h-full rounded-full border border-liver-light/30 flex flex-col items-center justify-center bg-black/20">
                         <span className="text-3xl md:text-4xl font-black text-liver-light font-arabic drop-shadow-lg">قنيف</span>
                         <div className="h-[1px] w-8 bg-liver-light/30 my-1.5" />
                         <span className="text-[7px] md:text-[8px] text-white/40 tracking-[0.4em] uppercase font-arabic">بيت الأصالة</span>
                      </div>
                   </div>
                </div>
              </motion.div>

              {/* المحتوى النصي الأنيق والمصغر */}
              <div className="space-y-4 mb-12">
                <motion.h2 
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-xl md:text-3xl font-black text-white font-arabic tracking-wide brightness-110 drop-shadow-md"
                >
                  {welcome.title}
                </motion.h2>

                <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: 40 }}
                   transition={{ duration: 0.8, delay: 0.6 }}
                   className="h-[1px] bg-gradient-to-r from-transparent via-liver-light/50 to-transparent mx-auto"
                />

                <motion.p 
                   initial={{ y: 15, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   transition={{ duration: 0.8, delay: 0.8 }}
                   className="text-white/40 text-xs md:text-sm leading-relaxed font-arabic font-light max-w-xs md:max-w-md mx-auto italic"
                >
                  {welcome.message}
                </motion.p>
              </div>

              {/* زر الدخول العصري (Compact CTA) */}
              <motion.button
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                onClick={() => setShowWelcome(false)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="group relative inline-flex items-center gap-4 py-3 px-8 md:py-3.5 md:px-10 bg-liver-light text-liver rounded-full font-bold text-xs md:text-sm overflow-hidden shadow-[0_15px_40px_-10px_rgba(209,171,83,0.3)] hover:shadow-liver-light/20 transition-all border border-white/20"
              >
                <span className="relative z-10 font-arabic font-black">{welcome.button}</span>
                
                <div className="relative z-10 w-6 h-6 md:w-7 md:h-7 rounded-full bg-liver flex items-center justify-center transition-all group-hover:bg-black">
                   <motion.span 
                    animate={{ x: isRtl ? [2, -2, 2] : [-2, 2, -2] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-white text-[9px]"
                   >
                     {isRtl ? '←' : '→'}
                   </motion.span>
                </div>
              </motion.button>
            </div>

            {/* جزيئات ضوئية متحركة (Floating Dust) */}
            <div className="absolute inset-0 pointer-events-none">
               {[...Array(12)].map((_, i) => (
                 <motion.div
                   key={i}
                    animate={{ 
                      y: [-20, -120],
                      opacity: [0, 0.4, 0],
                      scale: [0, 1, 0]
                    }}
                    transition={{ 
                      duration: 4 + Math.random() * 4, 
                      repeat: Infinity, 
                      delay: Math.random() * 5 
                    }}
                    className="absolute w-1 h-1 bg-liver-light rounded-full blur-[1px]"
                    style={{ 
                      left: `${Math.random() * 100}%`, 
                      bottom: `${Math.random() * 50}%` 
                    }}
                 />
               ))}
            </div>
            
            {/* رمز سفلي ناعم للهوية ورابط المطور */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="absolute bottom-10 flex flex-col items-center gap-2"
            >
              <a 
                href="https://menutop.vercel.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-arabic text-[11px] md:text-[13px] tracking-wide text-liver-light/70 hover:text-liver-light transition-colors duration-300 flex items-center gap-2 border-t border-white/10 pt-2"
              >
                <span className="font-light">تم التطوير بواسطة</span>
                <span className="font-black text-liver-light">Ezoo-Tech</span>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* 1. قسم الواجهة العلوية (Hero Section) - تصميم كرم الشام */}
      <header className="relative h-[55vh] overflow-hidden flex flex-col items-center justify-center pt-10">
        {/* رابط الفيسبوك العلوي */}
        <div className="absolute top-6 left-6 z-20">
          <a 
            href="https://www.facebook.com/profile.php?id=61567132381825"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-liver hover:scale-110 transition-all border border-white/20 shadow-lg"
          >
            <Facebook size={20} />
          </a>
        </div>

        {/* أزرار التحكم الجانبية */}
        <div className="absolute top-6 right-6 flex gap-3 z-20">
          <button 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            aria-label={lang === 'ar' ? 'بحث' : 'Search'}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-liver transition-colors border border-white/20"
          >
            <Search size={18} className="text-white" />
          </button>
          <button 
            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
            aria-label={lang === 'ar' ? 'تغيير اللغة' : 'Change Language'}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-liver transition-colors border border-white/20"
          >
            <Languages size={18} className="text-white" />
          </button>
        </div>

        {/* الخلفية مع التعتيم */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1600&h=800&auto=format&fit=crop")' }}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-[#FDFCF0]" />
          {/* تأثير النقوش الخلفية (اختياري، محاكاة للنمط في الصورة) */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        </div>

        {/* محتوى الهيدر المركزي */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 flex flex-col items-center text-center px-4"
        >
          {/* اللوجو الدائري */}
          <div className="w-28 h-28 md:w-40 md:h-40 rounded-full border-4 border-liver-light bg-liver p-2 shadow-2xl mb-4 md:mb-6 flex items-center justify-center overflow-hidden">
            <div className="w-full h-full rounded-full border-2 border-liver-light/50 flex flex-col items-center justify-center p-2 text-liver-light">
               <span className="text-2xl md:text-3xl font-black">قنيف</span>
               <div className="w-full h-[1px] bg-liver-light my-1" />
               <span className="text-[7px] md:text-[8px] uppercase tracking-tighter text-white/80">Pizza & Fatayer</span>
            </div>
          </div>
          
          {/* اسم المطعم */}
          <h1 className="text-3xl md:text-5xl font-black text-white mb-2 drop-shadow-md">
            {t.title}
          </h1>
          
          {/* فاصل كبدي */}
          <div className="h-1 w-16 md:w-20 bg-liver-light rounded-full mb-3 md:mb-4" />
          
          {/* الشعار */}
          <p className="text-white text-base md:text-lg font-medium opacity-90 drop-shadow-sm max-w-[280px] md:max-w-none">
            {t.subtitle}
          </p>
        </motion.div>
      </header>

      {/* 2. شريط البحث المنسدل */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-white border-b border-neutral-200 sticky top-0 z-50 overflow-hidden"
          >
            <div className="max-w-4xl mx-auto p-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" size={20} />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.search}
                  className="w-full pl-12 pr-4 py-3 md:py-4 rounded-xl bg-neutral-100 border-none focus:ring-2 focus:ring-liver text-base md:text-lg outline-none"
                  autoFocus
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-5xl mx-auto px-4 py-6 md:py-8">
        
        {/* 3. شريط اختيار الفئات - تصميم المربعات الذهبية */}
        <h2 className="sr-only">{lang === 'ar' ? 'فئات المنيو' : 'Menu Categories'}</h2>
        <div className="flex overflow-x-auto gap-3 md:gap-4 pb-6 md:pb-8 no-scrollbar snap-x justify-start md:justify-center -mt-8 md:-mt-16 relative z-30 px-2">
          {categories.map(([key, label]) => {
            const Icon = CATEGORY_ICONS[key] || LayoutGrid;
            return (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className="flex flex-col items-center gap-2 group snap-start"
              >
                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg ${
                  selectedCategory === key 
                    ? 'bg-liver text-white scale-110 rotate-3 ring-4 ring-liver/30' 
                    : 'bg-white text-liver hover:bg-liver/10 border border-liver/20'
                }`}>
                  <Icon size={selectedCategory === key ? 32 : 28} strokeWidth={2.5} />
                </div>
                <span className={`text-xs md:text-sm font-bold transition-colors ${
                  selectedCategory === key ? 'text-liver' : 'text-neutral-500'
                }`}>
                  {label}
                </span>
                {selectedCategory === key && (
                  <motion.div layoutId="underline" className="h-1 w-8 bg-liver rounded-full mt-1" />
                )}
              </button>
            );
          })}
        </div>

        {/* 4. شبكة عرض المنتجات - تخطيط عمودي (2 في الصف على الهاتف) وتصميم متجاوب */}
        <h2 className="sr-only">{lang === 'ar' ? 'الأصناف' : 'Items'}</h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedItem(item)}
                className="flex flex-col h-auto rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-xl border-2 md:border-4 border-white group cursor-pointer bg-liver relative"
              >
                {/* صورة المنتج */}
                <div className="aspect-[4/3] w-full overflow-hidden relative">
                  <img 
                    src={item.image.includes('unsplash.com') ? `${item.image.split('?')[0]}?q=60&w=400&h=300&auto=format&fit=crop` : item.image} 
                    alt={item.translations[lang].name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading={index < 4 ? 'eager' : 'lazy'}
                    decoding="async"
                    width="400"
                    height="300"
                    fetchPriority={index < 2 ? 'high' : 'auto'}
                  />
                </div>
                
                {/* معلومات المنتج */}
                <div className="p-3 md:p-6 flex flex-col items-center text-white text-center bg-gradient-to-b from-liver to-liver-dark">
                  <h3 className="text-sm md:text-xl font-bold font-arabic mb-1">
                    {item.translations[lang].name}
                  </h3>
                  
                  <div className="w-full">
                    {(item as any).variants ? (
                      <div className="text-[10px] md:text-sm font-medium opacity-80 font-arabic flex flex-wrap justify-center gap-x-2">
                        {(item as any).variants.map((v: any, i: number) => (
                          <span key={i} className="whitespace-nowrap">
                            {v.label[lang]} <span className="font-bold">{v.price.toLocaleString()}</span>
                            {i < (item as any).variants.length - 1 && <span className="mx-1 text-white/50">|</span>}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-white font-black text-lg md:text-2xl">
                          {item.price.toLocaleString()}
                        </span>
                        <span className="text-[10px] md:text-xs font-bold opacity-80">
                          {t.currency}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* رسالة تظهر عندما لا توجد نتائج مطابقة لعملية البحث */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20 flex flex-col items-center">
            <Ghost size={64} className="text-neutral-300 mb-4" />
            <p className="text-neutral-400 text-lg">
              {lang === 'ar' ? 'لا توجد منتجات تطابق بحثك' : 'No products match your search'}
            </p>
          </div>
        )}
      </main>

      {/* 5. نافذة التفاصيل المنبثقة (Product Modal) */}
      <AnimatePresence>
        {selectedItem && (
          <ProductModal 
            item={selectedItem}
            lang={lang}
            currency={t.currency}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </AnimatePresence>

      {/* 6. الفوتر (Footer) - تصميم عصري ملكي مدمج */}
      <footer className="bg-[#1a0505] text-white py-10 mt-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full">
           <div className="h-[1px] bg-gradient-to-r from-transparent via-liver-light/40 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col items-center">
          <div className="mb-6 text-center">
             <div className="mb-2 inline-block">
                <span className="text-lg md:text-xl font-black text-liver-light font-arabic tracking-[0.1em]">
                  {t.title}
                </span>
             </div>
             <p className="text-white/70 text-[11px] md:text-xs font-light font-arabic max-w-xs mx-auto italic">
                {t.subtitle}
             </p>
          </div>

          <div className="flex items-center gap-3 mb-6 opacity-10">
             <div className="h-px w-10 bg-white" />
             <div className="w-1 h-1 rounded-full bg-liver-light" />
             <div className="h-px w-10 bg-white" />
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-12">
            <p className="text-white/70 text-[9px] md:text-[10px] tracking-widest uppercase font-sans">
              © {new Date().getFullYear()} • {t.title}
            </p>
            
            <a 
              href="https://menutop.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-2 transition-all duration-300"
            >
              <span className="text-[9px] text-white/70 font-arabic">تم التطوير بواسطة</span>
              <span className="text-liver-light font-black text-[10px] md:text-xs tracking-widest group-hover:text-amber-300 transition-all uppercase font-sans">
                Ezoo-Tech
              </span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
