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
    image: 'https://res.cloudinary.com/da9bnd33u/image/upload/w_400,q_auto,f_auto/v1777660551/WhatsApp_Image_2026-04-29_at_13.03.51_cadhxz.jpg'
  },
  {
    id: 3,
    category: 'pies',
    translations: {
      ar: { name: 'فطيرة شامية فراخ', description: 'فطيرة شامية بحشوة الدجاج المتبل' },
      en: { name: 'Chicken Shami Pie', description: 'Shami pie with seasoned chicken' }
    },
    price: 12000,
    image: 'https://res.cloudinary.com/da9bnd33u/image/upload/w_400,q_auto,f_auto/v1777660551/WhatsApp_Image_2026-04-29_at_13.03.51_cadhxz.jpg'
  },
  {
    id: 4,
    category: 'pies',
    translations: {
      ar: { name: 'فطيرة شامية لحمة', description: 'فطيرة شامية بحشوة اللحم المفروم' },
      en: { name: 'Meat Shami Pie', description: 'Shami pie with minced meat' }
    },
    price: 12000,
    image: 'https://res.cloudinary.com/da9bnd33u/image/upload/w_400,q_auto,f_auto/v1777660551/WhatsApp_Image_2026-04-29_at_13.03.51_cadhxz.jpg'
  },
  {
    id: 5,
    category: 'pies',
    translations: {
      ar: { name: 'فطيرة شامية خضار', description: 'فطيرة شامية تشكيلة خضروات طازجة' },
      en: { name: 'Veggie Shami Pie', description: 'Shami pie with fresh mixed vegetables' }
    },
    price: 12000,
    image:  'https://res.cloudinary.com/da9bnd33u/image/upload/w_400,q_auto,f_auto/v1777660551/WhatsApp_Image_2026-04-29_at_13.03.51_cadhxz.jpg'
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
    image: 'https://res.cloudinary.com/da9bnd33u/image/upload/w_400,q_auto,f_auto/v1777660775/WhatsApp_Image_2026-04-28_at_17.23.01_hqwbic.jpg'
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
    image: 'https://res.cloudinary.com/da9bnd33u/image/upload/w_400,q_auto,f_auto/v1777660969/148721-_D8_B7_D8_B1_D9_8A_D9_82_D8_A9-_D8_B9_D9_85_D9_84-_D8_A7_D9_84_D8_A8_D9_8A_D8_AA_D8_B2_D8_A7-_D8_A8_D8_A7_D9_84_D9_81_D8_B1_D8_A7_D8_AE---_D8_B1_D8_A6_D9_8A_D8_B3_D9_8A_D8_A9_gs7drn.jpg'
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
    image: 'https://res.cloudinary.com/da9bnd33u/image/upload/w_400,q_auto,f_auto/v1777659993/99547-_D8_A8_D9_8A_D8_AA_D8_B2_D8_A7_ovioyj.jpg'
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
    image: 'https://res.cloudinary.com/da9bnd33u/image/upload/w_400,q_auto,f_auto/v1777660845/WhatsApp_Image_2026-04-28_at_17.23.01_1_c3mlci.jpg'
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
    image: 'https://res.cloudinary.com/da9bnd33u/image/upload/w_400,q_auto,f_auto/v1777661172/WhatsApp_Image_2026-04-29_at_13.03.51_1_nmu0zl.jpg'
  },
  {
    id: 11,
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
    image: 'https://tse3.mm.bing.net/th/id/OIP.IrxEvPdXAO3qT06Wl8ufYQHaE8?rs=1&pid=ImgDetMain&o=7&rm=3'
  },

  // --- العصائر ---
  {
    id: 12,
    category: 'juices',
    translations: {
      ar: { name: 'عصير فراولة', description: '5,000 SDG' },
      en: { name: 'Strawberry Juice', description: 'Fresh strawberry blend' }
    },
    price: 5000,
    image: 'https://res.cloudinary.com/da9bnd33u/image/upload/w_400,q_auto,f_auto/v1777661454/WhatsApp_Image_2026-04-30_at_12.18.11_l7imxh.jpg'
  },
  {
    id: 13,
    category: 'juices',
    translations: {
      ar: { name: 'فراولة بالموز', description: '5,000 SDG' },
      en: { name: 'Strawberry & Banana', description: 'Strawberry and banana blend' }
    },
    price: 5000,
    image: 'https://res.cloudinary.com/da9bnd33u/image/upload/w_400,q_auto,f_auto/v1777661455/WhatsApp_Image_2026-04-30_at_12.18.10_efymrj.jpg'
  },
  {
    id: 14,
    category: 'juices',
    translations: {
      ar: { name: 'عصير مانجو', description: '5,000 SDG' },
      en: { name: 'Mango Juice', description: 'Fresh mango pulp' }
    },
    price: 5000,
    image: 'https://res.cloudinary.com/da9bnd33u/image/upload/w_400,q_auto,f_auto/v1777661454/WhatsApp_Image_2026-04-30_at_12.18.11_1_lmwpkp.jpg'
  },
  {
    id: 15,
    category: 'juices',
    translations: {
      ar: { name: 'موز باللبن', description: '3,500 SDG' },
      en: { name: 'Banana Milk', description: 'Classic banana with milk' }
    },
    price: 3500,
    image: 'https://res.cloudinary.com/da9bnd33u/image/upload/w_400,q_auto,f_auto/v1777661452/WhatsApp_Image_2026-04-30_at_12.18.12_1_mxsq1m.jpg'
  },
  {
    id: 16,
    category: 'juices',
    translations: {
      ar: { name: 'عصير أناناس', description: '5,000 SDG' },
      en: { name: 'Pineapple Juice', description: 'Freshly squeezed pineapple' }
    },
    price: 5000,
    image: 'https://res.cloudinary.com/da9bnd33u/image/upload/w_400,q_auto,f_auto/v1777661454/WhatsApp_Image_2026-04-30_at_12.18.11_2_fhzw8z.jpg'
  },
  {
    id: 17,
    category: 'juices',
    translations: {
      ar: { name: 'مشكل', description: '6,000 SDG' },
      en: { name: 'Mixed Fruit Juice', description: 'Special fresh cocktail' }
    },
    price: 6000,
    image: 'https://res.cloudinary.com/da9bnd33u/image/upload/w_400,q_auto,f_auto/v1777661453/WhatsApp_Image_2026-04-30_at_12.18.12_z73zlt.jpg'
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
