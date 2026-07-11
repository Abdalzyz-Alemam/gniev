import React, { useState, useEffect } from 'react';
import { 
  Plus, Trash2, Edit3, Save, ArrowLeft, Settings, CreditCard, 
  Smartphone, Landmark, Home, PlusCircle, Eye, Check, Loader2, Menu, X, 
  Image, Layers, MessageSquare, AlertCircle, RefreshCw, Sparkles,
  Pizza, Sandwich, CupSoda, LayoutGrid, Utensils,
  Cake, Coffee, IceCream, Soup, Flame, Heart, ChefHat, Cookie, Croissant, Salad, Apple,
  Database, Copy
} from 'lucide-react';
import { isSupabaseConfigured, syncAllToSupabase, fetchAllFromSupabase } from '../lib/supabase';

const ICON_MAP: Record<string, any> = {
  LayoutGrid, Pizza, Sandwich, CupSoda, Utensils, Cake, Coffee, IceCream, Soup, Flame, Heart, Sparkles, ChefHat, Cookie, Croissant, Salad, Apple
};

interface AdminPanelProps {
  menuItems: any[];
  setMenuItems: (items: any[]) => void;
  uiStrings: any;
  setUiStrings: (strings: any) => void;
  welcomeStrings: any;
  setWelcomeStrings: (strings: any) => void;
  categoryIcons: Record<string, string>;
  setCategoryIcons: (icons: Record<string, string> | ((prev: Record<string, string>) => Record<string, string>)) => void;
  onClose: () => void;
}

export default function AdminPanel({
  menuItems,
  setMenuItems,
  uiStrings,
  setUiStrings,
  welcomeStrings,
  setWelcomeStrings,
  categoryIcons,
  setCategoryIcons,
  onClose
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'items' | 'categories' | 'screens' | 'banking' | 'supabase'>('items');
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  
  // States for Item Editor Modal
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [itemForm, setItemForm] = useState({
    category: 'pizza',
    arName: '',
    arDescription: '',
    enName: '',
    enDescription: '',
    price: 10000,
    image: '',
    hasVariants: false,
    variants: [
      { label: { ar: 'عائلي', en: 'Family' }, price: 38000 },
      { label: { ar: 'كبيرة', en: 'Large' }, price: 34000 },
      { label: { ar: 'وسط', en: 'Medium' }, price: 31000 }
    ]
  });

  // State for Custom Category Editor
  const [newCatKey, setNewCatKey] = useState('');
  const [newCatAr, setNewCatAr] = useState('');
  const [newCatEn, setNewCatEn] = useState('');
  const [newCatIcon, setNewCatIcon] = useState('LayoutGrid');

  // Local state for welcome/notification edit
  const [welcomeForm, setWelcomeForm] = useState({
    arTitle: welcomeStrings.ar.title,
    arMessage: welcomeStrings.ar.message,
    arButton: welcomeStrings.ar.button,
    enTitle: welcomeStrings.en.title,
    enMessage: welcomeStrings.en.message,
    enButton: welcomeStrings.en.button,
  });

  const [notifForm, setNotifForm] = useState({
    arTitle: uiStrings.ar.notification.title,
    arMessage: uiStrings.ar.notification.message,
    arButton: uiStrings.ar.notification.button,
    enTitle: uiStrings.en.notification.title,
    enMessage: uiStrings.en.notification.message,
    enButton: uiStrings.en.notification.button,
  });

  // Local state for Banking Accounts
  const [bankakForm, setBankakForm] = useState({
    number: uiStrings.ar.paymentAccounts.find((a: any) => a.id === 'bankak')?.number || '9056206',
    nameAr: uiStrings.ar.paymentAccounts.find((a: any) => a.id === 'bankak')?.name || 'محمد عماد الدين البشير',
    nameEn: uiStrings.en.paymentAccounts.find((a: any) => a.id === 'bankak')?.name || 'Mohamed Emad El-Din El-Bashir',
  });

  const [sahilForm, setSahilForm] = useState({
    number: uiStrings.ar.paymentAccounts.find((a: any) => a.id === 'sahil')?.number || '86460',
    nameAr: uiStrings.ar.paymentAccounts.find((a: any) => a.id === 'sahil')?.name || 'انور الشيخ حسن الطاهر',
    nameEn: uiStrings.en.paymentAccounts.find((a: any) => a.id === 'sahil')?.name || 'Anwar Al-Sheikh Hassan Al-Tahir',
    extraAr: uiStrings.ar.paymentAccounts.find((a: any) => a.id === 'sahil')?.extra || 'BBAN: 08110068440101',
    subExtraAr: uiStrings.ar.paymentAccounts.find((a: any) => a.id === 'sahil')?.subExtra || 'فرع القضارف',
    extraEn: uiStrings.en.paymentAccounts.find((a: any) => a.id === 'sahil')?.extra || 'BBAN: 08110068440101',
    subExtraEn: uiStrings.en.paymentAccounts.find((a: any) => a.id === 'sahil')?.subExtra || 'Banking Branch',
  });

  // States for Supabase
  const [supabaseLoading, setSupabaseLoading] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);
  const [autoSync, setAutoSync] = useState(() => {
    return localStorage.getItem('qunaif_auto_sync') === 'true';
  });

  // Handle Success Save Visual
  const triggerSaveNotification = (msg: string) => {
    setSaveStatus(msg);
    setTimeout(() => {
      setSaveStatus(null);
    }, 3000);
  };

  // دوال التعامل مع سوبابيس (Supabase Handlers)
  const handlePushToSupabase = async () => {
    if (!isSupabaseConfigured) return;
    setSupabaseLoading(true);
    try {
      await syncAllToSupabase({
        menuItems,
        uiStrings,
        categoryIcons,
        welcomeStrings
      });
      triggerSaveNotification('تم رفع ومزامنة جميع البيانات إلى سوبابيس بنجاح! 🎉');
    } catch (error: any) {
      console.error(error);
      alert('حدث خطأ أثناء رفع البيانات إلى سوبابيس: ' + (error.message || error));
    } finally {
      setSupabaseLoading(false);
    }
  };

  const handlePullFromSupabase = async () => {
    if (!isSupabaseConfigured) return;
    if (!confirm('تحذير: سيتم استبدال البيانات المحلية بالبيانات الموجودة في سوبابيس. هل تريد الاستمرار؟')) {
      return;
    }
    setSupabaseLoading(true);
    try {
      const data = await fetchAllFromSupabase();
      let updatedAny = false;
      if (data.menuItems) {
        setMenuItems(data.menuItems);
        localStorage.setItem('qunaif_menu_items', JSON.stringify(data.menuItems));
        updatedAny = true;
      }
      if (data.uiStrings) {
        setUiStrings(data.uiStrings);
        localStorage.setItem('qunaif_ui_strings', JSON.stringify(data.uiStrings));
        updatedAny = true;
      }
      if (data.categoryIcons) {
        setCategoryIcons(data.categoryIcons);
        localStorage.setItem('qunaif_category_icons', JSON.stringify(data.categoryIcons));
        updatedAny = true;
      }
      if (data.welcomeStrings) {
        setWelcomeStrings(data.welcomeStrings);
        localStorage.setItem('qunaif_welcome_strings', JSON.stringify(data.welcomeStrings));
        updatedAny = true;
      }

      if (updatedAny) {
        triggerSaveNotification('تم جلب البيانات وتحديث المنيو بنجاح! 📥');
      } else {
        alert('لم يتم العثور على بيانات سابقة في قاعدة بيانات سوبابيس. يرجى الضغط على "دفع وحفظ البيانات" لرفع بياناتك الحالية أولاً.');
      }
    } catch (error: any) {
      console.error(error);
      alert('حدث خطأ أثناء جلب البيانات من سوبابيس: ' + (error.message || error));
    } finally {
      setSupabaseLoading(false);
    }
  };

  // مزامنة تلقائية عند تغير البيانات إذا كان الخيار مفعلاً
  useEffect(() => {
    if (autoSync && isSupabaseConfigured && !supabaseLoading) {
      const timer = setTimeout(async () => {
        try {
          await syncAllToSupabase({
            menuItems,
            uiStrings,
            categoryIcons,
            welcomeStrings
          });
          console.log('Auto-synced to Supabase.');
        } catch (err) {
          console.error('Auto-sync failed:', err);
        }
      }, 1500); // تأخير بسيط لتجنب التكرار السريع أثناء الكتابة
      return () => clearTimeout(timer);
    }
  }, [menuItems, uiStrings, categoryIcons, welcomeStrings, autoSync]);

  // رفع صورة المنتج من الجهاز وتحويلها إلى Base64
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('حجم الصورة كبير جداً! يرجى اختيار صورة أقل من 2 ميجابايت لضمان سرعة الحفظ والأداء.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setItemForm(prev => ({
        ...prev,
        image: reader.result as string
      }));
    };
    reader.readAsDataURL(file);
  };

  // Open modal for new item
  const handleNewItem = () => {
    setEditingItem(null);
    setItemForm({
      category: Object.keys(uiStrings.ar.categories)[1] || 'pizza',
      arName: '',
      arDescription: '',
      enName: '',
      enDescription: '',
      price: 10000,
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=60&w=600',
      hasVariants: false,
      variants: [
        { label: { ar: 'عائلي', en: 'Family' }, price: 38000 },
        { label: { ar: 'كبيرة', en: 'Large' }, price: 34000 },
        { label: { ar: 'وسط', en: 'Medium' }, price: 31000 }
      ]
    });
    setIsItemModalOpen(true);
  };

  // Open modal for editing item
  const handleEditItem = (item: any) => {
    setEditingItem(item);
    setItemForm({
      category: item.category,
      arName: item.translations.ar.name,
      arDescription: item.translations.ar.description || '',
      enName: item.translations.en.name,
      enDescription: item.translations.en.description || '',
      price: item.price || 0,
      image: item.image,
      hasVariants: !!item.variants,
      variants: item.variants || [
        { label: { ar: 'عائلي', en: 'Family' }, price: 38000 },
        { label: { ar: 'كبيرة', en: 'Large' }, price: 34000 },
        { label: { ar: 'وسط', en: 'Medium' }, price: 31000 }
      ]
    });
    setIsItemModalOpen(true);
  };

  // Save Item Form
  const handleSaveItem = () => {
    if (!itemForm.arName.trim() || !itemForm.enName.trim()) {
      alert('الرجاء إدخال اسم الصنف باللغتين العربية والإنجليزية');
      return;
    }

    let updatedList = [...menuItems];
    const newItemData = {
      id: editingItem ? editingItem.id : (menuItems.length > 0 ? Math.max(...menuItems.map(i => i.id)) + 1 : 1),
      category: itemForm.category,
      translations: {
        ar: { name: itemForm.arName, description: itemForm.arDescription },
        en: { name: itemForm.enName, description: itemForm.enDescription }
      },
      price: Number(itemForm.price),
      image: itemForm.image || 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=60&w=600',
      ...(itemForm.hasVariants ? { variants: itemForm.variants } : {})
    };

    if (editingItem) {
      updatedList = updatedList.map(item => item.id === editingItem.id ? newItemData : item);
      triggerSaveNotification('تم تعديل الصنف بنجاح!');
    } else {
      updatedList.push(newItemData);
      triggerSaveNotification('تم إضافة الصنف الجديد بنجاح!');
    }

    setMenuItems(updatedList);
    localStorage.setItem('qunaif_menu_items', JSON.stringify(updatedList));
    setIsItemModalOpen(false);
  };

  // Delete Item
  const handleDeleteItem = (id: number) => {
    if (confirm('هل أنت متأكد من رغبتك في حذف هذا الصنف؟')) {
      const updatedList = menuItems.filter(item => item.id !== id);
      setMenuItems(updatedList);
      localStorage.setItem('qunaif_menu_items', JSON.stringify(updatedList));
      triggerSaveNotification('تم حذف الصنف بنجاح!');
    }
  };

  // Add Variant Row
  const addVariantRow = () => {
    setItemForm({
      ...itemForm,
      variants: [...itemForm.variants, { label: { ar: 'جديد', en: 'New' }, price: 10000 }]
    });
  };

  // Edit Variant Row Label/Price
  const updateVariantRow = (index: number, field: 'ar' | 'en' | 'price', value: string | number) => {
    const updatedVariants = itemForm.variants.map((v, i) => {
      if (i === index) {
        if (field === 'price') {
          return { ...v, price: Number(value) };
        } else {
          return {
            ...v,
            label: {
              ...v.label,
              [field]: value
            }
          };
        }
      }
      return v;
    });
    setItemForm({ ...itemForm, variants: updatedVariants });
  };

  // Delete Variant Row
  const removeVariantRow = (index: number) => {
    if (itemForm.variants.length <= 1) {
      alert('يجب أن يكون هناك خيار واحد على الأقل للمنتج ذو الأحجام المتعددة');
      return;
    }
    setItemForm({
      ...itemForm,
      variants: itemForm.variants.filter((_, i) => i !== index)
    });
  };

  // Add Category
  const handleAddCategory = () => {
    if (!newCatKey.trim() || !newCatAr.trim() || !newCatEn.trim()) {
      alert('الرجاء تعبئة جميع حقول القسم الجديد');
      return;
    }
    const cleanKey = newCatKey.trim().toLowerCase();
    if (uiStrings.ar.categories[cleanKey]) {
      alert('هذا القسم موجود بالفعل!');
      return;
    }

    const updatedUiStrings = JSON.parse(JSON.stringify(uiStrings));
    updatedUiStrings.ar.categories[cleanKey] = newCatAr.trim();
    updatedUiStrings.en.categories[cleanKey] = newCatEn.trim();

    // حفظ أيقونة القسم الجديد
    const updatedIcons = { ...categoryIcons, [cleanKey]: newCatIcon };
    setCategoryIcons(updatedIcons);
    localStorage.setItem('qunaif_category_icons', JSON.stringify(updatedIcons));

    setUiStrings(updatedUiStrings);
    localStorage.setItem('qunaif_ui_strings', JSON.stringify(updatedUiStrings));
    
    setNewCatKey('');
    setNewCatAr('');
    setNewCatEn('');
    setNewCatIcon('LayoutGrid');
    triggerSaveNotification('تم إضافة القسم الجديد بنجاح!');
  };

  // Delete Category
  const handleDeleteCategory = (key: string) => {
    if (key === 'all') {
      alert('لا يمكن حذف القسم الافتراضي (الكل)');
      return;
    }
    
    // Check if any items belong to this category
    const count = menuItems.filter(item => item.category === key).length;
    if (count > 0) {
      if (!confirm(`تحذير: هناك ${count} أصناف تنتمي لهذا القسم. سيتم إبقاء الأصناف ولكنها لن تظهر إلا تحت قائمة "الكل". هل تريد الاستمرار بحذف القسم؟`)) {
        return;
      }
    } else {
      if (!confirm('هل أنت متأكد من حذف هذا القسم؟')) {
        return;
      }
    }

    const updatedUiStrings = JSON.parse(JSON.stringify(uiStrings));
    delete updatedUiStrings.ar.categories[key];
    delete updatedUiStrings.en.categories[key];

    setUiStrings(updatedUiStrings);
    localStorage.setItem('qunaif_ui_strings', JSON.stringify(updatedUiStrings));
    triggerSaveNotification('تم حذف القسم بنجاح!');
  };

  // Save Welcome & Notification screen settings
  const handleSaveScreens = () => {
    // Save welcome string
    const updatedWelcome = {
      ar: {
        title: welcomeForm.arTitle,
        message: welcomeForm.arMessage,
        button: welcomeForm.arButton
      },
      en: {
        title: welcomeForm.enTitle,
        message: welcomeForm.enMessage,
        button: welcomeForm.enButton
      }
    };
    setWelcomeStrings(updatedWelcome);
    localStorage.setItem('qunaif_welcome_strings', JSON.stringify(updatedWelcome));

    // Save notification popup inside UI_STRINGS
    const updatedUiStrings = JSON.parse(JSON.stringify(uiStrings));
    updatedUiStrings.ar.notification = {
      title: notifForm.arTitle,
      message: notifForm.arMessage,
      button: notifForm.arButton
    };
    updatedUiStrings.en.notification = {
      title: notifForm.enTitle,
      message: notifForm.enMessage,
      button: notifForm.enButton
    };

    setUiStrings(updatedUiStrings);
    localStorage.setItem('qunaif_ui_strings', JSON.stringify(updatedUiStrings));
    triggerSaveNotification('تم تعديل شاشات الاستقبال والمنبثقات بنجاح!');
  };

  // Save Banking details
  const handleSaveBanking = () => {
    const updatedUiStrings = JSON.parse(JSON.stringify(uiStrings));
    
    // Update Bankak in Arabic UI
    const bankakAr = updatedUiStrings.ar.paymentAccounts.find((a: any) => a.id === 'bankak');
    if (bankakAr) {
      bankakAr.number = bankakForm.number.trim();
      bankakAr.name = bankakForm.nameAr.trim();
    }
    
    // Update Bankak in English UI
    const bankakEn = updatedUiStrings.en.paymentAccounts.find((a: any) => a.id === 'bankak');
    if (bankakEn) {
      bankakEn.number = bankakForm.number.trim();
      bankakEn.name = bankakForm.nameEn.trim();
    }

    // Update Sahil in Arabic UI
    const sahilAr = updatedUiStrings.ar.paymentAccounts.find((a: any) => a.id === 'sahil');
    if (sahilAr) {
      sahilAr.number = sahilForm.number.trim();
      sahilAr.name = sahilForm.nameAr.trim();
      sahilAr.extra = sahilForm.extraAr.trim();
      sahilAr.subExtra = sahilForm.subExtraAr.trim();
    }

    // Update Sahil in English UI
    const sahilEn = updatedUiStrings.en.paymentAccounts.find((a: any) => a.id === 'sahil');
    if (sahilEn) {
      sahilEn.number = sahilForm.number.trim();
      sahilEn.name = sahilForm.nameEn.trim();
      sahilEn.extra = sahilForm.extraEn.trim();
      sahilEn.subExtra = sahilForm.subExtraEn.trim();
    }

    setUiStrings(updatedUiStrings);
    localStorage.setItem('qunaif_ui_strings', JSON.stringify(updatedUiStrings));
    triggerSaveNotification('تم حفظ بيانات الحسابات البنكية بنجاح!');
  };

  // Reset all to default configurations
  const resetToFactoryDefaults = () => {
    if (confirm('هل أنت متأكد من رغبتك في إعادة ضبط المصنع ومسح جميع التعديلات؟ سيتم استعادة المنيو الأصلي.')) {
      localStorage.removeItem('qunaif_menu_items');
      localStorage.removeItem('qunaif_ui_strings');
      localStorage.removeItem('qunaif_welcome_strings');
      alert('تمت إعادة الضبط بنجاح! سيتم إعادة تحميل الصفحة لتطبيق التغييرات.');
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF0] text-liver-dark font-arabic" dir="rtl">
      {/* Top Banner */}
      <header className="bg-liver text-white py-6 px-4 md:px-8 shadow-xl sticky top-0 z-40 border-b-4 border-gold">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center bg-black/20 text-gold font-bold text-xl shadow-lg">
              قنيف
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black flex items-center gap-2">
                لوحة تحكم منيو قنيف الملكية
                <Sparkles size={18} className="text-gold animate-pulse" />
              </h1>
              <p className="text-white/60 text-xs font-light">إدارة وتحديث الأصناف، الأسعار، المنبثقات والحسابات البنكية</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button 
              onClick={resetToFactoryDefaults}
              className="py-2.5 px-4 bg-red-800 hover:bg-red-700 text-white font-bold rounded-xl text-xs md:text-sm transition-all flex items-center gap-2 border border-white/10 shadow"
            >
              <RefreshCw size={14} />
              إعادة ضبط المصنع
            </button>
            <button 
              onClick={onClose}
              className="py-2.5 px-5 bg-gold hover:bg-gold/90 text-liver font-black rounded-xl text-xs md:text-sm transition-all flex items-center gap-2 shadow-lg hover:scale-103"
            >
              <ArrowLeft size={16} />
              الذهاب إلى المنيو
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Layout */}
      <main className="max-w-7xl mx-auto p-4 md:p-8">
        
        {/* Floating Success Alert Toast */}
        {saveStatus && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#2e7d32] text-white py-3.5 px-6 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce border border-white/20">
            <Check size={20} className="bg-white/20 rounded-full p-0.5" />
            <span className="font-bold text-sm md:text-base">{saveStatus}</span>
          </div>
        )}

        {/* Tab Buttons bar */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
          <button
            onClick={() => setActiveTab('items')}
            className={`p-4 rounded-2xl font-bold flex flex-col md:flex-row items-center justify-center gap-3 transition-all border shadow ${
              activeTab === 'items' 
                ? 'bg-liver text-white border-liver ring-4 ring-liver/15 scale-102' 
                : 'bg-white text-liver hover:bg-liver/5 border-liver/20'
            }`}
          >
            <Pizza size={22} />
            <span>إدارة الأصناف والأسعار ({menuItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`p-4 rounded-2xl font-bold flex flex-col md:flex-row items-center justify-center gap-3 transition-all border shadow ${
              activeTab === 'categories' 
                ? 'bg-liver text-white border-liver ring-4 ring-liver/15 scale-102' 
                : 'bg-white text-liver hover:bg-liver/5 border-liver/20'
            }`}
          >
            <Layers size={22} />
            <span>إدارة الأقسام والتبويبات</span>
          </button>

          <button
            onClick={() => setActiveTab('screens')}
            className={`p-4 rounded-2xl font-bold flex flex-col md:flex-row items-center justify-center gap-3 transition-all border shadow ${
              activeTab === 'screens' 
                ? 'bg-liver text-white border-liver ring-4 ring-liver/15 scale-102' 
                : 'bg-white text-liver hover:bg-liver/5 border-liver/20'
            }`}
          >
            <MessageSquare size={22} />
            <span>الترحيب والرسالة المنبثقة</span>
          </button>

          <button
            onClick={() => setActiveTab('banking')}
            className={`p-4 rounded-2xl font-bold flex flex-col md:flex-row items-center justify-center gap-3 transition-all border shadow ${
              activeTab === 'banking' 
                ? 'bg-liver text-white border-liver ring-4 ring-liver/15 scale-102' 
                : 'bg-white text-liver hover:bg-liver/5 border-liver/20'
            }`}
          >
            <CreditCard size={22} />
            <span>تعديل حساب بنكك وساهل</span>
          </button>

          <button
            onClick={() => setActiveTab('supabase')}
            className={`p-4 rounded-2xl font-bold flex flex-col md:flex-row items-center justify-center gap-3 transition-all border shadow ${
              activeTab === 'supabase' 
                ? 'bg-liver text-white border-liver ring-4 ring-liver/15 scale-102' 
                : 'bg-white text-liver hover:bg-liver/5 border-liver/20'
            }`}
          >
            <Database size={22} className={isSupabaseConfigured ? "text-emerald-500 animate-pulse" : "text-neutral-400"} />
            <span className="flex items-center gap-1">
              ربط سوبابيس (Supabase)
              {isSupabaseConfigured && <span className="w-2 h-2 rounded-full bg-emerald-500"></span>}
            </span>
          </button>
        </div>

        {/* Active Content Body */}
        <div className="bg-white rounded-3xl p-5 md:p-8 shadow-xl border border-liver/10">
          
          {/* TAB 1: MENU ITEMS */}
          {activeTab === 'items' && (
            <div>
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 pb-6 border-b border-neutral-100">
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-liver">قائمة أصناف المنيو الحالية</h2>
                  <p className="text-neutral-500 text-xs mt-1">تعديل الأسعار والأحجام وتحديث التفاصيل والصور مباشرة</p>
                </div>
                <button
                  onClick={handleNewItem}
                  className="w-full md:w-auto py-3 px-6 bg-liver hover:bg-liver-light text-white font-black rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow hover:scale-102"
                >
                  <Plus size={18} />
                  إضافة صنف جديد للمنيو
                </button>
              </div>

              {/* Grid of editable items */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {menuItems.map((item) => {
                  const catName = uiStrings.ar.categories[item.category] || item.category;
                  return (
                    <div 
                      key={item.id} 
                      className="border border-neutral-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all flex flex-col bg-[#FDFCF0]/20"
                    >
                      {/* Image Preview & category tag */}
                      <div className="aspect-[16/10] bg-neutral-100 relative">
                        <img 
                          src={item.image} 
                          alt={item.translations.ar.name} 
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-3 right-3 bg-liver text-white font-bold text-xs py-1 px-3 rounded-full border border-white/20">
                          {catName}
                        </span>
                      </div>

                      {/* Info & Price */}
                      <div className="p-4 flex-1 flex flex-col justify-between gap-4">
                        <div>
                          <h3 className="font-black text-base md:text-lg text-liver line-clamp-1">{item.translations.ar.name}</h3>
                          <p className="text-neutral-500 text-xs font-light line-clamp-2 mt-1 min-h-[2rem]">
                            {item.translations.ar.description || 'لا يوجد وصف مضاف باللغة العربية.'}
                          </p>
                          <div className="mt-2 text-xs border-t border-neutral-100 pt-2 flex justify-between">
                            <span className="text-neutral-400">English name:</span>
                            <span className="font-medium text-neutral-700">{item.translations.en.name}</span>
                          </div>
                        </div>

                        {/* Price Area */}
                        <div className="bg-liver/5 p-3 rounded-xl border border-liver/10 flex items-center justify-between">
                          <span className="text-xs text-neutral-500 font-bold">السعر الحالي:</span>
                          <div>
                            {item.variants ? (
                              <div className="text-left">
                                <span className="text-xs bg-gold/20 text-[#6a4c00] font-bold px-2 py-0.5 rounded mr-1">أحجام متعددة</span>
                                <span className="font-black text-sm text-liver">{item.variants[item.variants.length - 1].price.toLocaleString()} ~ {item.variants[0].price.toLocaleString()} SDG</span>
                              </div>
                            ) : (
                              <span className="font-black text-lg text-liver">{item.price.toLocaleString()} SDG</span>
                            )}
                          </div>
                        </div>

                        {/* Controls */}
                        <div className="grid grid-cols-2 gap-2 border-t border-neutral-100 pt-3">
                          <button
                            onClick={() => handleEditItem(item)}
                            className="py-2 px-3 bg-[#e8f5e9] hover:bg-[#c8e6c9] text-[#2e7d32] font-black rounded-lg text-xs transition-all flex items-center justify-center gap-1.5"
                          >
                            <Edit3 size={14} />
                            تعديل التفاصيل
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="py-2 px-3 bg-[#ffebee] hover:bg-[#ffcdd2] text-[#c62828] font-black rounded-lg text-xs transition-all flex items-center justify-center gap-1.5"
                          >
                            <Trash2 size={14} />
                            حذف الصنف
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: CATEGORIES */}
          {activeTab === 'categories' && (
            <div>
              <div className="mb-8 pb-6 border-b border-neutral-100">
                <h2 className="text-xl md:text-2xl font-black text-liver">إدارة أقسام وتصنيفات المنيو</h2>
                <p className="text-neutral-500 text-xs mt-1">تعديل مسميات الأقسام (البيتزا، الفطائر، العصائر) وإضافة أقسام جديدة تظهر في الشريط الرئيسي</p>
              </div>

              {/* Form to add a new category */}
              <div className="bg-[#FDFCF0] border-2 border-dashed border-liver/20 rounded-2xl p-5 md:p-6 mb-8 max-w-2xl">
                <h3 className="font-black text-liver mb-4 flex items-center gap-2">
                  <PlusCircle size={18} className="text-gold" />
                  إنشاء قسم جديد
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-600 mb-1">رمز القسم (بالإنكليزية فريد)</label>
                    <input 
                      type="text" 
                      value={newCatKey}
                      onChange={(e) => setNewCatKey(e.target.value)}
                      placeholder="مثلاً: sweets"
                      className="w-full p-2.5 bg-white border border-neutral-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-liver"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-600 mb-1">الاسم باللغة العربية</label>
                    <input 
                      type="text" 
                      value={newCatAr}
                      onChange={(e) => setNewCatAr(e.target.value)}
                      placeholder="مثلاً: الحلويات"
                      className="w-full p-2.5 bg-white border border-neutral-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-liver font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-600 mb-1">الاسم باللغة الإنجليزية</label>
                    <input 
                      type="text" 
                      value={newCatEn}
                      onChange={(e) => setNewCatEn(e.target.value)}
                      placeholder="مثلاً: Sweets"
                      className="w-full p-2.5 bg-white border border-neutral-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-liver"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-600 mb-1">شكل الأيقونة</label>
                    <select
                      value={newCatIcon}
                      onChange={(e) => setNewCatIcon(e.target.value)}
                      className="w-full p-2.5 bg-white border border-neutral-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-liver font-bold cursor-pointer"
                    >
                      <option value="LayoutGrid">عام (LayoutGrid)</option>
                      <option value="Pizza">بيتزا (Pizza)</option>
                      <option value="Utensils">فطائر (Utensils)</option>
                      <option value="Sandwich">ساندوتش (Sandwich)</option>
                      <option value="CupSoda">عصير (CupSoda)</option>
                      <option value="Cake">كيك وحلويات (Cake)</option>
                      <option value="Coffee">قهوة وساخن (Coffee)</option>
                      <option value="IceCream">آيس كريم (IceCream)</option>
                      <option value="Soup">شوربة (Soup)</option>
                      <option value="Flame">حار (Flame)</option>
                      <option value="Heart">صحي/دايت (Heart)</option>
                      <option value="Sparkles">جديد/مميز (Sparkles)</option>
                      <option value="ChefHat">أطباق شيف (ChefHat)</option>
                      <option value="Cookie">كوكيز (Cookie)</option>
                      <option value="Croissant">كرواسون (Croissant)</option>
                      <option value="Salad">سلطة (Salad)</option>
                      <option value="Apple">فواكه (Apple)</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleAddCategory}
                  className="mt-4 py-2.5 px-6 bg-liver hover:bg-liver-light text-white font-black rounded-xl text-xs transition-all flex items-center justify-center gap-2"
                >
                  <Plus size={16} />
                  إضافة قسم جديد للمنيو
                </button>
              </div>

              {/* List of active categories */}
              <h3 className="font-black text-liver mb-4">الأقسام الحالية بالمنيو</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
                {Object.entries(uiStrings.ar.categories).map(([key, label]) => {
                  const enLabel = uiStrings.en.categories[key] || key;
                  return (
                    <div 
                      key={key}
                      className="flex items-center justify-between p-4 bg-white border border-neutral-200 rounded-xl shadow-sm"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-12 h-12 rounded-xl bg-liver/5 text-liver border border-liver/15 flex items-center justify-center shadow-inner shrink-0">
                          {(() => {
                            const iconName = categoryIcons[key] || 'LayoutGrid';
                            const IconComponent = ICON_MAP[iconName] || LayoutGrid;
                            return <IconComponent size={24} className="text-liver" />;
                          })()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-black text-sm text-liver truncate">
                            {label as string} <span className="text-neutral-400 font-mono font-medium text-xs">({key})</span>
                          </div>
                          <div className="text-xs text-neutral-500 font-light">الاسم بالإنكليزية: {enLabel as string}</div>
                          
                          {/* Inline Icon Selector */}
                          <div className="mt-1 flex items-center gap-1">
                            <span className="text-[10px] text-neutral-400">تغيير الأيقونة:</span>
                            <select
                              value={categoryIcons[key] || 'LayoutGrid'}
                              onChange={(e) => {
                                const newIcon = e.target.value;
                                const updated = { ...categoryIcons, [key]: newIcon };
                                setCategoryIcons(updated);
                                localStorage.setItem('qunaif_category_icons', JSON.stringify(updated));
                                triggerSaveNotification('تم تحديث أيقونة القسم بنجاح!');
                              }}
                              className="text-[10px] bg-neutral-100 border border-neutral-200 rounded px-1 py-0.5 outline-none font-bold text-liver cursor-pointer"
                            >
                              <option value="LayoutGrid">عام (LayoutGrid)</option>
                              <option value="Pizza">بيتزا (Pizza)</option>
                              <option value="Utensils">فطائر (Utensils)</option>
                              <option value="Sandwich">ساندوتش (Sandwich)</option>
                              <option value="CupSoda">عصير (CupSoda)</option>
                              <option value="Cake">كيك وحلويات (Cake)</option>
                              <option value="Coffee">قهوة وساخن (Coffee)</option>
                              <option value="IceCream">آيس كريم (IceCream)</option>
                              <option value="Soup">شوربة (Soup)</option>
                              <option value="Flame">حار (Flame)</option>
                              <option value="Heart">صحي/دايت (Heart)</option>
                              <option value="Sparkles">جديد/مميز (Sparkles)</option>
                              <option value="ChefHat">أطباق شيف (ChefHat)</option>
                              <option value="Cookie">كوكيز (Cookie)</option>
                              <option value="Croissant">كرواسون (Croissant)</option>
                              <option value="Salad">سلطة (Salad)</option>
                              <option value="Apple">فواكه (Apple)</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteCategory(key)}
                        disabled={key === 'all'}
                        className={`p-2 rounded-lg transition-all ${
                          key === 'all' 
                            ? 'opacity-20 cursor-not-allowed bg-neutral-100 text-neutral-400' 
                            : 'bg-red-50 hover:bg-red-100 text-red-600'
                        }`}
                        title={key === 'all' ? 'لا يمكن حذف القسم الرئيسي' : 'حذف القسم'}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: WELCOME & NOTIFICATION POPUP */}
          {activeTab === 'screens' && (
            <div>
              <div className="mb-8 pb-6 border-b border-neutral-100 flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-liver">تحديث نصوص شاشات الاستقبال والمنبثقات</h2>
                  <p className="text-neutral-500 text-xs mt-1">تعديل الشاشة الترحيبية الأولى، والرسالة المنبثقة التنبيهية الخاصة بالإضافة لقسم الساندوتشات</p>
                </div>
                <button
                  onClick={handleSaveScreens}
                  className="py-3 px-6 bg-liver hover:bg-liver-light text-white font-black rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow hover:scale-102"
                >
                  <Save size={16} />
                  حفظ التعديلات
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 1. Welcome screen card form */}
                <div className="border border-neutral-200 rounded-2xl p-5 md:p-6 bg-[#FDFCF0]/10">
                  <h3 className="font-black text-liver text-lg mb-4 pb-2 border-b border-neutral-100 flex items-center gap-2">
                    <Home size={18} className="text-gold" />
                    الشاشة الترحيبية السينمائية
                  </h3>

                  {/* Arabic welcome text */}
                  <div className="space-y-4 mb-6">
                    <h4 className="font-bold text-xs bg-liver/10 text-liver py-1 px-3 rounded inline-block">اللغة العربية</h4>
                    <div>
                      <label className="block text-xs font-bold text-neutral-600 mb-1">العنوان الترحيبي</label>
                      <input 
                        type="text" 
                        value={welcomeForm.arTitle}
                        onChange={(e) => setWelcomeForm({ ...welcomeForm, arTitle: e.target.value })}
                        className="w-full p-2.5 bg-white border border-neutral-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-liver"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-600 mb-1">الرسالة الترحيبية بالكامل</label>
                      <textarea 
                        rows={3}
                        value={welcomeForm.arMessage}
                        onChange={(e) => setWelcomeForm({ ...welcomeForm, arMessage: e.target.value })}
                        className="w-full p-2.5 bg-white border border-neutral-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-liver"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-600 mb-1">نص زر الدخول</label>
                      <input 
                        type="text" 
                        value={welcomeForm.arButton}
                        onChange={(e) => setWelcomeForm({ ...welcomeForm, arButton: e.target.value })}
                        className="w-full p-2.5 bg-white border border-neutral-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-liver"
                      />
                    </div>
                  </div>

                  {/* English welcome text */}
                  <div className="space-y-4 pt-4 border-t border-neutral-100">
                    <h4 className="font-bold text-xs bg-neutral-200 text-neutral-700 py-1 px-3 rounded inline-block">English Version</h4>
                    <div>
                      <label className="block text-xs font-bold text-neutral-600 mb-1">Welcome Title</label>
                      <input 
                        type="text" 
                        value={welcomeForm.enTitle}
                        onChange={(e) => setWelcomeForm({ ...welcomeForm, enTitle: e.target.value })}
                        className="w-full p-2.5 bg-white border border-neutral-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-liver"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-600 mb-1">Welcome Message</label>
                      <textarea 
                        rows={3}
                        value={welcomeForm.enMessage}
                        onChange={(e) => setWelcomeForm({ ...welcomeForm, enMessage: e.target.value })}
                        className="w-full p-2.5 bg-white border border-neutral-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-liver"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-600 mb-1">Button Text</label>
                      <input 
                        type="text" 
                        value={welcomeForm.enButton}
                        onChange={(e) => setWelcomeForm({ ...welcomeForm, enButton: e.target.value })}
                        className="w-full p-2.5 bg-white border border-neutral-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-liver"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Notification popup card form */}
                <div className="border border-neutral-200 rounded-2xl p-5 md:p-6 bg-[#FDFCF0]/10">
                  <h3 className="font-black text-liver text-lg mb-4 pb-2 border-b border-neutral-100 flex items-center gap-2">
                    <AlertCircle size={18} className="text-gold" />
                    الرسالة المنبثقة التنبيهية (البشرى السارة لزبائننا)
                  </h3>

                  {/* Arabic popup notification */}
                  <div className="space-y-4 mb-6">
                    <h4 className="font-bold text-xs bg-liver/10 text-liver py-1 px-3 rounded inline-block">اللغة العربية</h4>
                    <div>
                      <label className="block text-xs font-bold text-neutral-600 mb-1">عنوان النافذة التنبيهية</label>
                      <input 
                        type="text" 
                        value={notifForm.arTitle}
                        onChange={(e) => setNotifForm({ ...notifForm, arTitle: e.target.value })}
                        className="w-full p-2.5 bg-white border border-neutral-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-liver font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-600 mb-1">نص الرسالة المنبثقة بالتفصيل</label>
                      <textarea 
                        rows={3}
                        value={notifForm.arMessage}
                        onChange={(e) => setNotifForm({ ...notifForm, arMessage: e.target.value })}
                        className="w-full p-2.5 bg-white border border-neutral-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-liver"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-600 mb-1">نص زر التأكيد أو الإغلاق</label>
                      <input 
                        type="text" 
                        value={notifForm.arButton}
                        onChange={(e) => setNotifForm({ ...notifForm, arButton: e.target.value })}
                        className="w-full p-2.5 bg-white border border-neutral-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-liver"
                      />
                    </div>
                  </div>

                  {/* English popup notification */}
                  <div className="space-y-4 pt-4 border-t border-neutral-100">
                    <h4 className="font-bold text-xs bg-neutral-200 text-neutral-700 py-1 px-3 rounded inline-block">English Version</h4>
                    <div>
                      <label className="block text-xs font-bold text-neutral-600 mb-1">Popup Title</label>
                      <input 
                        type="text" 
                        value={notifForm.enTitle}
                        onChange={(e) => setNotifForm({ ...notifForm, enTitle: e.target.value })}
                        className="w-full p-2.5 bg-white border border-neutral-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-liver font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-600 mb-1">Popup Message</label>
                      <textarea 
                        rows={3}
                        value={notifForm.enMessage}
                        onChange={(e) => setNotifForm({ ...notifForm, enMessage: e.target.value })}
                        className="w-full p-2.5 bg-white border border-neutral-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-liver"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-600 mb-1">Button Text</label>
                      <input 
                        type="text" 
                        value={notifForm.enButton}
                        onChange={(e) => setNotifForm({ ...notifForm, enButton: e.target.value })}
                        className="w-full p-2.5 bg-white border border-neutral-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-liver"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: BANK DETAILS */}
          {activeTab === 'banking' && (
            <div>
              <div className="mb-8 pb-6 border-b border-neutral-100 flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-liver">تعديل أرقام حسابات بنكك وساهل</h2>
                  <p className="text-neutral-500 text-xs mt-1">تحديث أرقام التحويل وأسماء الملاك للموثوقية العالية في الاستلام</p>
                </div>
                <button
                  onClick={handleSaveBanking}
                  className="py-3 px-6 bg-liver hover:bg-liver-light text-white font-black rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow hover:scale-102"
                >
                  <Save size={16} />
                  حفظ الحسابات البنكية
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Bankak Account Form */}
                <div className="border border-neutral-200 rounded-2xl p-5 md:p-6 bg-white shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="font-black text-liver text-lg mb-4 pb-2 border-b border-neutral-100 flex items-center gap-2">
                      <Landmark size={20} className="text-[#3b5998]" />
                      حساب تطبيق بنكك (Bankak)
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-neutral-600 mb-1">رقم الحساب أو المحفظة</label>
                        <input 
                          type="text" 
                          value={bankakForm.number}
                          onChange={(e) => setBankakForm({ ...bankakForm, number: e.target.value })}
                          className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-base font-bold font-sans outline-none focus:ring-2 focus:ring-liver tracking-widest text-center"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-neutral-600 mb-1">اسم صاحب الحساب باللغة العربية (يظهر قبل الاسم تلقائياً بدون "باسم:")</label>
                        <input 
                          type="text" 
                          value={bankakForm.nameAr}
                          onChange={(e) => setBankakForm({ ...bankakForm, nameAr: e.target.value })}
                          className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-liver"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-neutral-600 mb-1">اسم صاحب الحساب باللغة الإنجليزية (English Account Name)</label>
                        <input 
                          type="text" 
                          value={bankakForm.nameEn}
                          onChange={(e) => setBankakForm({ ...bankakForm, nameEn: e.target.value })}
                          className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-liver"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-blue-50/50 rounded-xl border border-blue-100 text-xs text-blue-700 font-medium leading-relaxed">
                    ملاحظة: هذا الحساب يظهر في منيو العملاء مع زر نسخ فوري للرقم لتسهيل إرسال التحويلات وإشعار الدفع عبر الواتساب.
                  </div>
                </div>

                {/* Sahil Account Form */}
                <div className="border border-neutral-200 rounded-2xl p-5 md:p-6 bg-white shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="font-black text-liver text-lg mb-4 pb-2 border-b border-neutral-100 flex items-center gap-2">
                      <Smartphone size={20} className="text-gold" />
                      حساب تطبيق ساهل (Sahil)
                    </h3>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-neutral-600 mb-1">رقم الحساب</label>
                          <input 
                            type="text" 
                            value={sahilForm.number}
                            onChange={(e) => setSahilForm({ ...sahilForm, number: e.target.value })}
                            className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-base font-bold font-sans outline-none focus:ring-2 focus:ring-liver tracking-wider text-center"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-neutral-600 mb-1">الرقم الدولي BBAN (عربي/إنكليزي)</label>
                          <input 
                            type="text" 
                            value={sahilForm.extraAr}
                            onChange={(e) => setSahilForm({ ...sahilForm, extraAr: e.target.value, extraEn: e.target.value })}
                            className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-mono outline-none focus:ring-2 focus:ring-liver text-center"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-neutral-600 mb-1">اسم صاحب الحساب باللغة العربية</label>
                        <input 
                          type="text" 
                          value={sahilForm.nameAr}
                          onChange={(e) => setSahilForm({ ...sahilForm, nameAr: e.target.value })}
                          className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-liver"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-neutral-600 mb-1">اسم صاحب الحساب باللغة الإنجليزية</label>
                        <input 
                          type="text" 
                          value={sahilForm.nameEn}
                          onChange={(e) => setSahilForm({ ...sahilForm, nameEn: e.target.value })}
                          className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-liver"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-neutral-600 mb-1">الفرع البنكي باللغة العربية</label>
                          <input 
                            type="text" 
                            value={sahilForm.subExtraAr}
                            onChange={(e) => setSahilForm({ ...sahilForm, subExtraAr: e.target.value })}
                            className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-liver"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-neutral-600 mb-1">الفرع باللغة الإنجليزية</label>
                          <input 
                            type="text" 
                            value={sahilForm.subExtraEn}
                            onChange={(e) => setSahilForm({ ...sahilForm, subExtraEn: e.target.value })}
                            className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-liver"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-amber-50/50 rounded-xl border border-amber-100 text-xs text-amber-800 font-medium leading-relaxed">
                    ملاحظة: هذا الحساب يظهر أيضاً للعملاء في الفوتر مع جميع تفاصيل الفرع والتحقق الإضافية.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SUPABASE SYNCHRONIZATION */}
          {activeTab === 'supabase' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-neutral-100">
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-liver flex items-center gap-2">
                    <Database size={24} className="text-liver" />
                    مزامنة وإعداد قاعدة بيانات سوبابيس (Supabase)
                  </h2>
                  <p className="text-neutral-500 text-xs mt-1">قم بربط المنيو بالكامل بقاعدة بيانات سحابية لحفظ تعديلاتك وضمان عدم فقدانها عند مسح ذاكرة المتصفح</p>
                </div>
              </div>

              {/* Status Indicator Card */}
              <div className={`p-6 rounded-2xl border-2 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm ${
                isSupabaseConfigured 
                  ? 'bg-emerald-50/40 border-emerald-500/20 text-emerald-900' 
                  : 'bg-amber-50/40 border-amber-500/20 text-amber-900'
              }`}>
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md ${
                    isSupabaseConfigured ? 'bg-emerald-500 text-white animate-pulse' : 'bg-amber-500 text-white'
                  }`}>
                    <Database size={24} />
                  </div>
                  <div>
                    <h3 className="font-black text-base">
                      حالة الاتصال بـ Supabase: {' '}
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold font-sans ${
                        isSupabaseConfigured ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}>
                        {isSupabaseConfigured ? 'CONNECTED' : 'NOT CONFIGURED'}
                      </span>
                    </h3>
                    <p className="text-neutral-600 text-xs mt-1.5 max-w-xl leading-relaxed">
                      {isSupabaseConfigured 
                        ? 'تم التعرف على متغيرات البيئة بنجاح! يمكنك الآن دفع البيانات المحلية لرفعها، أو جلب البيانات المحفوظة مسبقاً لاسترجاعها.' 
                        : 'لم يتم العثور على مفاتيح Supabase. يرجى تهيئة المتغيرين VITE_SUPABASE_URL و VITE_SUPABASE_ANON_KEY في ملف .env ليتم الاتصال تلقائياً.'}
                    </p>
                  </div>
                </div>

                {isSupabaseConfigured && (
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2.5 bg-white border border-neutral-200 px-4 py-2.5 rounded-xl text-xs font-bold text-neutral-700 shadow-sm hover:bg-neutral-50 transition-all cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={autoSync}
                        onChange={(e) => {
                          const val = e.target.checked;
                          setAutoSync(val);
                          localStorage.setItem('qunaif_auto_sync', String(val));
                          triggerSaveNotification(val ? 'تم تفعيل المزامنة التلقائية مع سوبابيس! ⚡' : 'تم تعطيل المزامنة التلقائية.');
                        }}
                        className="rounded border-neutral-300 text-liver focus:ring-liver h-4 w-4"
                      />
                      <span>تفعيل المزامنة التلقائية عند أي تعديل بالمنيو ⚡</span>
                    </label>
                  </div>
                )}
              </div>

              {isSupabaseConfigured ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                  {/* Sync Operations Card */}
                  <div className="border border-neutral-200 rounded-2xl p-6 bg-white shadow-sm flex flex-col justify-between">
                    <div>
                      <h3 className="font-black text-liver text-lg mb-3 flex items-center gap-2">
                        <RefreshCw size={20} className="text-gold" />
                        عمليات المزامنة اليدوية
                      </h3>
                      <p className="text-xs text-neutral-500 mb-6 leading-relaxed">
                        اختر أحد الخيارات التالية لمزامنة لوحة التحكم وقاعدة بيانات سوبابيس السحابية يدوياً:
                      </p>

                      <div className="space-y-4">
                        {/* PUSH BUTTON */}
                        <button
                          onClick={handlePushToSupabase}
                          disabled={supabaseLoading}
                          className="w-full py-4 px-6 bg-liver hover:bg-liver-light disabled:bg-neutral-300 text-white font-black rounded-xl text-sm transition-all flex items-center justify-center gap-3 shadow-md group hover:scale-101"
                        >
                          {supabaseLoading ? (
                            <Loader2 size={18} className="animate-spin" />
                          ) : (
                            <Database size={18} className="text-gold group-hover:scale-110 transition-transform" />
                          )}
                          <span>دفع وحفظ البيانات المحلية إلى سوبابيس (Upload 📤)</span>
                        </button>

                        {/* PULL BUTTON */}
                        <button
                          onClick={handlePullFromSupabase}
                          disabled={supabaseLoading}
                          className="w-full py-4 px-6 bg-neutral-100 hover:bg-neutral-200 disabled:bg-neutral-300 text-liver font-black border border-neutral-200 rounded-xl text-sm transition-all flex items-center justify-center gap-3 shadow-sm group hover:scale-101"
                        >
                          {supabaseLoading ? (
                            <Loader2 size={18} className="animate-spin" />
                          ) : (
                            <RefreshCw size={18} className="text-liver/70 group-hover:rotate-180 transition-transform duration-500" />
                          )}
                          <span>جلب وتحديث البيانات من سوبابيس (Download 📥)</span>
                        </button>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-blue-50/60 rounded-xl border border-blue-100 text-xs text-blue-800 leading-relaxed">
                      💡 المزامنة التلقائية (إذا تم تفعيلها) تقوم برفع وتحديث الأصناف والأقسام فوراً دون الحاجة للضغط على "دفع وحفظ البيانات" يدوياً في كل مرة.
                    </div>
                  </div>

                  {/* Schema / SQL Instructions Card */}
                  <div className="border border-neutral-200 rounded-2xl p-6 bg-white shadow-sm flex flex-col justify-between">
                    <div>
                      <h3 className="font-black text-liver text-lg mb-2 flex items-center gap-2">
                        <Settings size={20} className="text-liver" />
                        إعداد جدول قواعد البيانات (SQL Editor)
                      </h3>
                      <p className="text-xs text-neutral-500 mb-4 leading-relaxed">
                        يجب تنفيذ هذا الكود البرمجي مرة واحدة في حساب Supabase الخاص بك في قسم <strong className="text-liver">SQL Editor</strong> لتهيئة الجدول وصلاحيات الوصول العام (RLS):
                      </p>

                      <div className="relative">
                        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-xl text-[10px] md:text-xs font-mono overflow-x-auto text-left max-h-[180px] border border-neutral-800 no-scrollbar" dir="ltr">
{`-- 1. Create settings table for layout & items
create table if not exists qunaif_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Enable row level security (RLS)
alter table qunaif_settings enable row level security;

-- 3. Create open public read/write access policies
create policy "Allow public read" on qunaif_settings for select using (true);
create policy "Allow public insert" on qunaif_settings for insert with check (true);
create policy "Allow public update" on qunaif_settings for update using (true);`}
                        </pre>

                        <button
                          type="button"
                          onClick={() => {
                            const code = `-- 1. Create settings table for layout & items
create table if not exists qunaif_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Enable row level security (RLS)
alter table qunaif_settings enable row level security;

-- 3. Create open public read/write access policies
create policy "Allow public read" on qunaif_settings for select using (true);
create policy "Allow public insert" on qunaif_settings for insert with check (true);
create policy "Allow public update" on qunaif_settings for update using (true);`;
                            navigator.clipboard.writeText(code);
                            setCopiedSql(true);
                            setTimeout(() => setCopiedSql(false), 2500);
                          }}
                          className="absolute top-2 right-2 bg-white/10 hover:bg-white/20 hover:scale-105 active:scale-95 transition-all text-white p-2 rounded-lg text-xs flex items-center gap-1 border border-white/10 font-bold"
                        >
                          {copiedSql ? (
                            <>
                              <Check size={12} className="text-emerald-400" />
                              <span className="text-emerald-400">تم النسخ!</span>
                            </>
                          ) : (
                            <>
                              <Copy size={12} />
                              <span>نسخ الكود</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-[11px] text-neutral-600 leading-normal">
                      🛡️ يمكنك أيضاً حظر الإدخال أو التعديل من خارج لوحة التحكم بتعديل سياسة (Policy) الإدراج والتحيث لتتحقق من معرف المستخدم.
                    </div>
                  </div>
                </div>
              ) : (
                <div className="border border-dashed border-amber-300 rounded-3xl p-8 bg-amber-50/20 text-center space-y-4">
                  <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto shadow">
                    <AlertCircle size={32} />
                  </div>
                  <div className="max-w-md mx-auto space-y-2">
                    <h3 className="font-black text-lg text-amber-900">مفاتيح ربط سوبابيس غير متوفرة بعد</h3>
                    <p className="text-neutral-600 text-xs leading-relaxed">
                      لتفعيل الحفظ السحابي الآمن وتفادي ضياع البيانات، يرجى التوجه لملف <code className="bg-amber-100 px-1 py-0.5 rounded font-mono text-red-700">.env</code> وإضافة المتغيرات المطلوبة.
                    </p>
                  </div>
                  <div className="pt-2">
                    <div className="inline-block bg-white border border-neutral-200 rounded-xl p-4 text-right text-xs max-w-sm shadow-sm space-y-1.5" dir="ltr">
                      <div className="text-neutral-400 font-bold">Example in .env file:</div>
                      <div className="font-mono text-[10px] text-neutral-700 select-all">VITE_SUPABASE_URL=https://your-project.supabase.co</div>
                      <div className="font-mono text-[10px] text-neutral-700 select-all">VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR...</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </main>

      {/* --- ADD / EDIT ITEM MODAL DIALOG --- */}
      {isItemModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl border-4 border-liver max-h-[90vh] flex flex-col text-right">
            
            {/* Modal Header */}
            <div className="bg-liver p-5 text-white flex justify-between items-center border-b-2 border-gold">
              <h3 className="font-black text-lg flex items-center gap-2">
                {editingItem ? 'تعديل تفاصيل الصنف بالمنيو' : 'إضافة صنف جديد للمنيو'}
              </h3>
              <button 
                onClick={() => setIsItemModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-all"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form Scrollable Area */}
            <div className="p-6 overflow-y-auto space-y-5 flex-1">
              
              {/* Category selector */}
              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-1.5">القسم / التصنيف التابع له</label>
                <select
                  value={itemForm.category}
                  onChange={(e) => setItemForm({ ...itemForm, category: e.target.value })}
                  className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-liver"
                >
                  {Object.entries(uiStrings.ar.categories).map(([key, label]) => {
                    if (key === 'all') return null;
                    return (
                      <option key={key} value={key}>{label as string}</option>
                    );
                  })}
                </select>
              </div>

              {/* Names: Arabic & English */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-neutral-700 mb-1.5">الاسم باللغة العربية *</label>
                  <input 
                    type="text" 
                    value={itemForm.arName}
                    onChange={(e) => setItemForm({ ...itemForm, arName: e.target.value })}
                    placeholder="مثال: فطيرة كبدة ملكية"
                    className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-liver font-bold"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-neutral-700 mb-1.5">الاسم باللغة الإنجليزية *</label>
                  <input 
                    type="text" 
                    value={itemForm.enName}
                    onChange={(e) => setItemForm({ ...itemForm, enName: e.target.value })}
                    placeholder="Example: Royal Liver Pie"
                    className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-liver font-medium"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Descriptions: Arabic & English */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-neutral-700 mb-1.5">الوصف باللغة العربية</label>
                  <textarea 
                    rows={2}
                    value={itemForm.arDescription}
                    onChange={(e) => setItemForm({ ...itemForm, arDescription: e.target.value })}
                    placeholder="تفاصيل المكونات أو الطعم للعملاء..."
                    className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-liver font-light"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-neutral-700 mb-1.5">الوصف باللغة الإنجليزية</label>
                  <textarea 
                    rows={2}
                    value={itemForm.enDescription}
                    onChange={(e) => setItemForm({ ...itemForm, enDescription: e.target.value })}
                    placeholder="Description in English..."
                    className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-liver font-light"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Image Upload & Preview */}
              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-1.5">صورة المنتج *</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
                  {/* Local File Upload */}
                  <div className="border-2 border-dashed border-liver/20 hover:border-liver/40 rounded-2xl p-4 flex flex-col items-center justify-center text-center bg-neutral-50 hover:bg-liver/5 transition-all cursor-pointer relative min-h-[100px]">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex flex-col items-center gap-1.5 text-neutral-600 pointer-events-none">
                      <Image size={24} className="text-liver/60" />
                      <span className="text-xs font-black text-liver">اضغط لرفع صورة من جهازك</span>
                      <span className="text-[10px] text-neutral-400 font-light">بحد أقصى 2 ميجابايت</span>
                    </div>
                  </div>
                  
                  {/* Direct Image URL Link */}
                  <div className="border border-neutral-200 rounded-2xl p-4 bg-neutral-50 flex flex-col justify-center">
                    <label className="block text-xs font-bold text-neutral-500 mb-1">أو أدخل رابط الصورة المباشر (URL):</label>
                    <input 
                      type="text" 
                      value={itemForm.image}
                      onChange={(e) => setItemForm({ ...itemForm, image: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                      className="w-full p-2.5 bg-white border border-neutral-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-liver font-mono"
                      dir="ltr"
                    />
                  </div>
                </div>

                {itemForm.image && (
                  <div className="mt-3 aspect-[16/6] bg-neutral-100 rounded-2xl overflow-hidden border border-neutral-200 relative group">
                    <img 
                      src={itemForm.image} 
                      alt="Product preview" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=60&w=600';
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setItemForm(prev => ({ ...prev, image: '' }))}
                      className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-full shadow-lg transition-colors"
                      title="إزالة الصورة"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
              </div>

              {/* Checkbox: Has multiple sizes or variants */}
              <div className="bg-[#FDFCF0] border border-liver/20 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="font-black text-sm text-liver">الصنف يحتوي على أحجام وأسعار متعددة</h4>
                  <p className="text-neutral-500 text-xs font-light">مثل البيتزا (عائلي، كبير، وسط). إذا تم الإلغاء، سيتم اعتماد السعر الفردي فقط.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={itemForm.hasVariants}
                    onChange={(e) => setItemForm({ ...itemForm, hasVariants: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-liver"></div>
                </label>
              </div>

              {/* Single Price input OR variants list */}
              {!itemForm.hasVariants ? (
                <div>
                  <label className="block text-sm font-bold text-neutral-700 mb-1.5">سعر الصنف (SDG) *</label>
                  <input 
                    type="number" 
                    value={itemForm.price}
                    onChange={(e) => setItemForm({ ...itemForm, price: Number(e.target.value) })}
                    placeholder="مثال: 16000"
                    className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-base font-bold outline-none focus:ring-2 focus:ring-liver font-sans"
                  />
                </div>
              ) : (
                <div className="space-y-3 bg-[#FDFCF0]/40 p-4 border border-neutral-200 rounded-xl">
                  <div className="flex justify-between items-center border-b border-neutral-200 pb-2">
                    <h4 className="font-black text-sm text-liver">قائمة الأحجام والخيارات المتوفرة</h4>
                    <button
                      onClick={addVariantRow}
                      className="py-1.5 px-3 bg-liver text-white rounded-lg text-xs font-bold flex items-center gap-1"
                    >
                      <Plus size={12} />
                      إضافة حجم إضافي
                    </button>
                  </div>

                  {itemForm.variants.map((v, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <div className="grid grid-cols-3 gap-2 flex-1">
                        <div>
                          <input 
                            type="text" 
                            value={v.label.ar}
                            onChange={(e) => updateVariantRow(idx, 'ar', e.target.value)}
                            placeholder="الاسم بالعربي (كبيرة)"
                            className="w-full p-2 bg-white border border-neutral-200 rounded-lg text-xs font-bold"
                          />
                        </div>
                        <div>
                          <input 
                            type="text" 
                            value={v.label.en}
                            onChange={(e) => updateVariantRow(idx, 'en', e.target.value)}
                            placeholder="Name (Large)"
                            className="w-full p-2 bg-white border border-neutral-200 rounded-lg text-xs"
                            dir="ltr"
                          />
                        </div>
                        <div>
                          <input 
                            type="number" 
                            value={v.price}
                            onChange={(e) => updateVariantRow(idx, 'price', e.target.value)}
                            placeholder="السعر (SDG)"
                            className="w-full p-2 bg-white border border-neutral-200 rounded-lg text-xs font-bold font-sans"
                          />
                        </div>
                      </div>

                      <button
                        onClick={() => removeVariantRow(idx)}
                        className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all"
                        title="حذف هذا الخيار"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

            </div>

            {/* Modal Footer Controls */}
            <div className="bg-neutral-50 p-5 border-t border-neutral-100 flex justify-end gap-3">
              <button
                onClick={() => setIsItemModalOpen(false)}
                className="py-3 px-6 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 font-bold rounded-xl text-sm transition-all"
              >
                إلغاء
              </button>
              <button
                onClick={handleSaveItem}
                className="py-3 px-8 bg-liver hover:bg-liver-light text-gold font-black rounded-xl text-sm transition-all flex items-center gap-2 shadow-lg"
              >
                <Save size={16} />
                حفظ المنتج بالمنيو
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
