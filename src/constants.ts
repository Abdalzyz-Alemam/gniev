// تصدير بيانات المنيو - تحتوي على الأصناف، الفئات، الصور، والأسعار
export const MENU_DATA = [
  // --- الفطائر الشامية (12,000 SDG) ---
  {
    id: 1,
    category: 'pies',
    translations: {
      ar: { name: 'فطيرة شامية قنيف', description: 'فطيرة مميزة بحشوة قنيف الخاصة' },
      en: { name: 'Qunaif Shami Pie', description: 'Special Qunaif signature pie' }
    },
    price: 12000,
    image: 'https://res.cloudinary.com/da9bnd33u/image/upload/w_400,q_auto,f_auto/v1777660551/WhatsApp_Image_2026-04-29_at_13.03.51_cadhxz.jpg'
  },
  {
    id: 2,
    category: 'pies',
    translations: {
      ar: { name: 'فطيرة شامية هوت دوق', description: 'فطيرة شامية بحشوة الهوت دوق' },
      en: { name: 'Hot Dog Shami Pie', description: 'Shami pie stuffed with hot dogs' }
    },
    price: 12000,
    image: 'https://images.unsplash.com/photo-1628102422204-79fa7630737a?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 3,
    category: 'pies',
    translations: {
      ar: { name: 'فطيرة شامية فراخ', description: 'فطيرة شامية بحشوة الدجاج المتبل' },
      en: { name: 'Chicken Shami Pie', description: 'Shami pie with seasoned chicken' }
    },
    price: 12000,
    image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 4,
    category: 'pies',
    translations: {
      ar: { name: 'فطيرة شامية لحمة', description: 'فطيرة شامية بحشوة اللحم المفروم' },
      en: { name: 'Meat Shami Pie', description: 'Shami pie with minced meat' }
    },
    price: 12000,
    image: 'https://images.unsplash.com/photo-1599599810694-b5b3a44a974b?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 5,
    category: 'pies',
    translations: {
      ar: { name: 'فطيرة شامية خضار', description: 'فطيرة شامية تشكيلة خضروات طازجة' },
      en: { name: 'Veggie Shami Pie', description: 'Shami pie with fresh mixed vegetables' }
    },
    price: 12000,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop'
  },

  // --- البيتزا ---
  {
    id: 6,
    category: 'pizza',
    translations: {
      ar: { name: 'بيتزا هوت دوق', description: 'البيتزا الهشة المغطاة بقطع الهوت دوق اللذيذة' },
      en: { name: 'Hot Dog Pizza', description: 'Fluffy pizza topped with delicious hot dog pieces' }
    },
    variants: [
      { label: { ar: 'عائلي', en: 'Family' }, price: 34000 },
      { label: { ar: 'كبيرة', en: 'Large' }, price: 30000 },
      { label: { ar: 'وسط', en: 'Medium' }, price: 27000 }
    ],
    price: 27000,
    image: '/images/hot_dog_pizza.jpg'
  },
  {
    id: 7,
    category: 'pizza',
    translations: {
      ar: { name: 'بيتزا فراخ', description: 'قطع الدجاج المتبلة مع صوص المايونيز والجبنة' },
      en: { name: 'Chicken Pizza', description: 'Marinated chicken pieces with mayo and cheese' }
    },
    variants: [
      { label: { ar: 'عائلي', en: 'Family' }, price: 34000 },
      { label: { ar: 'كبيرة', en: 'Large' }, price: 30000 },
      { label: { ar: 'وسط', en: 'Medium' }, price: 27000 }
    ],
    price: 27000,
    image: 'https://img.youm7.com/ArticleImgs/2021/2/7/148721-%D8%B7%20%D8%B1%D9%8A%D9%82%D8%A9-%D8%B9%D9%85%D9%84-%D8%A7%D9%84%D8%A8%D9%8A%D8%AA%D8%B2%D8%A7-%D8%A8%D8%A7%D9%84%D9%81%D8%B1%D8%A7%D8%AE---%D8%B1%D8%A6%D9%8A%D8%B3%D9%8A%D8%A9.jpg'
  },
  {
    id: 8,
    category: 'pizza',
    translations: {
      ar: { name: 'بيتزا لحمة', description: 'لحم مفروم طازج مع تشكيلة من الخضار' },
      en: { name: 'Meat Pizza', description: 'Fresh minced meat with a variety of veggies' }
    },
    variants: [
      { label: { ar: 'عائلي', en: 'Family' }, price: 34000 },
      { label: { ar: 'كبيرة', en: 'Large' }, price: 30000 },
      { label: { ar: 'وسط', en: 'Medium' }, price: 27000 }
    ],
    price: 27000,
    image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 9,
    category: 'pizza',
    translations: {
      ar: { name: 'بيتزا خضار', description: 'عجينة رقيقة مغطاة بأشهى الخضروات الطازجة' },
      en: { name: 'Veggie Pizza', description: 'Thin dough topped with delicious fresh vegetables' }
    },
    variants: [
      { label: { ar: 'عائلي', en: 'Family' }, price: 27000 },
      { label: { ar: 'كبيرة', en: 'Large' }, price: 24000 },
      { label: { ar: 'وسط', en: 'Medium' }, price: 22000 }
    ],
    price: 22000,
    image: 'https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 10,
    category: 'pizza',
    translations: {
      ar: { name: 'بيتزا قنيف', description: 'بيتزا مميزة بحشوة قنيف الخاصة غنية بالطعم' },
      en: { name: 'Gneif Pizza', description: 'Signature pizza with special Gneif toppings' }
    },
    variants: [
      { label: { ar: 'عائلي', en: 'Family' }, price: 34000 },
      { label: { ar: 'كبيرة', en: 'Large' }, price: 30000 },
      { label: { ar: 'وسط', en: 'Medium' }, price: 27000 }
    ],
    price: 27000,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 17,
    category: 'pizza',
    translations: {
      ar: { name: 'بيتزا مارقريتا', description: 'البيتزا الإيطالية الكلاسيكية بصلصة الطماطم والجبنة' },
      en: { name: 'Margherita Pizza', description: 'Classic Italian pizza with tomato sauce and mozzarella' }
    },
    variants: [
      { label: { ar: 'عائلي', en: 'Family' }, price: 34000 },
      { label: { ar: 'كبيرة', en: 'Large' }, price: 30000 },
      { label: { ar: 'وسط', en: 'Medium' }, price: 27000 }
    ],
    price: 27000,
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?q=80&w=800&auto=format&fit=crop'
  },

  // --- العصائر ---
  {
    id: 11,
    category: 'juices',
    translations: {
      ar: { name: 'عصير فراولة', description: '5,000 SDG' },
      en: { name: 'Strawberry Juice', description: 'Fresh strawberry blend' }
    },
    price: 5000,
    image: 'https://images.unsplash.com/photo-1589733901241-5e5da4bbdc34?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 12,
    category: 'juices',
    translations: {
      ar: { name: 'فراولة بالموز', description: '5,000 SDG' },
      en: { name: 'Strawberry & Banana', description: 'Strawberry and banana blend' }
    },
    price: 5000,
    image: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 13,
    category: 'juices',
    translations: {
      ar: { name: 'عصير مانجو', description: '5,000 SDG' },
      en: { name: 'Mango Juice', description: 'Fresh mango pulp' }
    },
    price: 5000,
    image: 'https://images.unsplash.com/photo-1591240409141-26880097f480?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 14,
    category: 'juices',
    translations: {
      ar: { name: 'موز باللبن', description: '3,500 SDG' },
      en: { name: 'Banana Milk', description: 'Classic banana with milk' }
    },
    price: 3500,
    image: 'https://images.unsplash.com/photo-1626078299034-7389656c0755?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 15,
    category: 'juices',
    translations: {
      ar: { name: 'عصير أناناس', description: '5,000 SDG' },
      en: { name: 'Pineapple Juice', description: 'Freshly squeezed pineapple' }
    },
    price: 5000,
    image: 'https://images.unsplash.com/photo-1523472721958-84ec0483848b?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 16,
    category: 'juices',
    translations: {
      ar: { name: 'مشكل', description: '6,000 SDG' },
      en: { name: 'Mixed Fruit Juice', description: 'Special fresh cocktail' }
    },
    price: 6000,
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?q=80&w=800&auto=format&fit=crop'
  }
];

// نصوص واجهة المستخدم باللغتين العربية والإنجليزية
export const UI_STRINGS = {
  ar: {
    title: 'قنيف للبيتزا والفطائر',
    subtitle: 'الطعم المميز الذي لا يقاوم',
    search: 'البحث عن منتج...',
    lang: 'EN',
    currency: 'SDG',
    categories: {
      all: 'الكل',
      pizza: 'البيتزا',
      pies: 'الفطائر الشامية',
      juices: 'العصائر'
    },
    itemsFound: 'منتجات',
    paymentTitle: 'وسائل الدفع المتاحة',
    paymentSubtitle: 'يمكنك الدفع بسهولة عبر التطبيقات البنكية',
    paymentNote: 'يرجى إرسال صورة الإشعار عبر الواتساب لتأكيد الطلب',
    paymentAccounts: [
      {
        id: 'bankak',
        app: 'تطبيق بنكك - Bankak',
        number: '3504338',
        name: 'باسم: حسن بلة على بلة',
        type: 'bankak',
        copyLabel: 'نسخ الرقم'
      },
      {
        id: 'sahil',
        app: 'تطبيق ساهل - Sahil',
        number: '86460',
        name: 'انور الشيخ حسن الطاهر',
        extra: 'BBAN: 08110068440101',
        subExtra: 'فرع المصارف',
        type: 'sahil',
        copyLabel: 'نسخ بمبلغ'
      }
    ],
    notification: {
      title: 'عفواً زبائننا الكرام',
      message: 'لتسهيل طلباتكم، نود إحاطتكم بأنه يمكنكم الآن الدفع عبر تطبيقاتنا البنكية مباشرة (بنكك وساهل). تجدون أرقام التحويل أسفل صفحة المنيو. نسعد دائماً بخدمتكم!',
      button: 'حسناً، فهمت'
    }
  },
  en: {
    title: 'Qunaif Pizza & Pies',
    subtitle: 'The Irresistible Distinctive Taste',
    search: 'Search for products...',
    lang: 'AR',
    currency: 'SDG',
    categories: {
      all: 'All',
      pizza: 'Pizza',
      pies: 'Shami Pies',
      juices: 'Juices'
    },
    itemsFound: 'items',
    paymentTitle: 'Available Payment Methods',
    paymentSubtitle: 'Pay easily through banking applications',
    paymentNote: 'Please send a notification screenshot via WhatsApp to confirm',
    paymentAccounts: [
      {
        id: 'bankak',
        app: 'Bankak - تطبيق بنكك',
        number: '3504338',
        name: 'Name: Hassan Bella Ali Bella',
        type: 'bankak',
        copyLabel: 'Copy Number'
      },
      {
        id: 'sahil',
        app: 'Sahil - تطبيق ساهل',
        number: '86460',
        name: 'Anwar Al-Sheikh Hassan Al-Tahir',
        extra: 'BBAN: 08110068440101',
        subExtra: 'Banking Branch',
        type: 'sahil',
        copyLabel: 'Copy Amount'
      }
    ],
    notification: {
      title: 'Dear Customers',
      message: 'To facilitate your orders, we would like to inform you that you can now pay directly via our banking applications (Bankak & Sahil). You can find the transfer numbers at the bottom of the menu page. We are always happy to serve you!',
      button: 'Okay, I understand'
    }
  }
};
