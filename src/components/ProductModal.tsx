import { motion } from 'motion/react';
import { X } from 'lucide-react';

interface ProductModalProps {
  item: any;
  lang: 'ar' | 'en';
  currency: string;
  onClose: () => void;
}

export default function ProductModal({ item, lang, currency, onClose }: ProductModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-lg bg-[#FDFCF0] rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-liver"
      >
        <button 
          onClick={onClose}
          aria-label={lang === 'ar' ? 'إغلاق' : 'Close'}
          className="absolute top-3 right-3 md:top-4 md:right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white z-10 hover:bg-liver transition-colors"
        >
          <X size={20} />
        </button>

        <div className="aspect-[16/10] md:aspect-video w-full overflow-hidden">
          <img 
            src={item.image.includes('unsplash.com') ? `${item.image.split('?')[0]}?q=75&w=800&h=450&auto=format&fit=crop` : item.image} 
            alt={item.translations[lang].name}
            className="w-full h-full object-cover"
            decoding="async"
            width="800"
            height="450"
          />
        </div>

        <div className="p-4 md:p-6 text-center">
          <h2 className="text-xl md:text-3xl font-black text-liver mb-2 md:mb-3 font-arabic">
            {item.translations[lang].name}
          </h2>
          
          <p className="text-neutral-800 text-base md:text-lg mb-4 md:mb-6 leading-relaxed font-arabic px-2 md:px-4">
            {item.translations[lang].description}
          </p>

          <div className="bg-liver/5 rounded-2xl p-4 md:p-6 border border-liver/10">
            {item.variants ? (
              <div className="grid grid-cols-1 gap-2 md:gap-3">
                {item.variants.map((v: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between bg-white px-4 py-2 md:px-5 md:py-3 rounded-xl shadow-sm border border-liver/5">
                    <span className="text-liver/80 font-bold uppercase text-[10px] md:text-sm">{v.label[lang]}</span>
                    <span className="text-liver font-black text-lg md:text-xl">{v.price.toLocaleString()} <span className="text-xs">{currency}</span></span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <span className="text-liver/60 text-[10px] md:text-xs font-bold uppercase mb-1">{lang === 'ar' ? 'السعر' : 'Price'}</span>
                <div className="text-2xl md:text-3xl font-black text-liver">
                  {item.price.toLocaleString()} <span className="text-sm">{currency}</span>
                </div>
              </div>
            )}
          </div>

          <button 
            onClick={onClose}
            className="mt-6 md:mt-8 w-full py-3 md:py-4 bg-liver text-white rounded-xl md:rounded-2xl font-black text-base md:text-lg hover:bg-liver-light transition-all shadow-lg active:scale-95"
          >
             {lang === 'ar' ? 'إغلاق' : 'Close'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
