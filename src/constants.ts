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
    image: '/images/ananas (1).jpg'
  },
  {
    id: 2,
    category: 'pies',
    translations: {
      ar: { name: 'فطيرة شامية هوت دوق', description: 'فطيرة شامية بحشوة الهوت دوق' },
      en: { name: 'Hot Dog Shami Pie', description: 'Shami pie stuffed with hot dogs' }
    },
    price: 12000,
    image: '/images/ananas (1).jpg'
  },
  {
    id: 3,
    category: 'pies',
    translations: {
      ar: { name: 'فطيرة شامية فراخ', description: 'فطيرة شامية بحشوة الدجاج المتبل' },
      en: { name: 'Chicken Shami Pie', description: 'Shami pie with seasoned chicken' }
    },
    price: 12000,
    image: '/images/ananas (1).jpg'
  },
  {
    id: 4,
    category: 'pies',
    translations: {
      ar: { name: 'فطيرة شامية لحمة', description: 'فطيرة شامية بحشوة اللحم المفروم' },
      en: { name: 'Meat Shami Pie', description: 'Shami pie with minced meat' }
    },
    price: 12000,
    image: '/images/ananas (1).jpg'
  },
  {
    id: 5,
    category: 'pies',
    translations: {
      ar: { name: 'فطيرة شامية خضار', description: 'فطيرة شامية تشكيلة خضروات طازجة' },
      en: { name: 'Veggie Shami Pie', description: 'Shami pie with fresh mixed vegetables' }
    },
    price: 12000,
    image: '/images/ananas (1).jpg'
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
    image: '/images/WhatsApp Image 2026-04-28 at 17.23.01.jpeg'
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
    image: '/images/WhatsApp Image 2026-04-28 at 17.23.00.jpeg'
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
    image: 'https://th.bing.com/th/id/OIP.Gwdl4VkRKtyFSr6bxaexUQHaE5?w=239&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3'
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
    image: '/images/WhatsApp Image 2026-04-28 at 17.23.01 (1).jpeg'
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
    image: 'https://tse4.mm.bing.net/th/id/OIP.-QE9gkC0mHdP2AD3g4PrcwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3'
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
    image: 'https://tse3.mm.bing.net/th/id/OIP.IrxEvPdXAO3qT06Wl8ufYQHaE8?rs=1&pid=ImgDetMain&o=7&rm=3'
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
    image: 'images/ananas (4).webp'
  },
  {
    id: 12,
    category: 'juices',
    translations: {
      ar: { name: 'فراولة بالموز', description: '5,000 SDG' },
      en: { name: 'Strawberry & Banana', description: 'Strawberry and banana blend' }
    },
    price: 5000,
    image: 'images/ananas (5).webp'
  },
  {
    id: 13,
    category: 'juices',
    translations: {
      ar: { name: 'عصير مانجو', description: '5,000 SDG' },
      en: { name: 'Mango Juice', description: 'Fresh mango pulp' }
    },
    price: 5000,
    image: 'images/ananas (6).webp'
  },
  {
    id: 14,
    category: 'juices',
    translations: {
      ar: { name: 'موز باللبن', description: '3,500 SDG' },
      en: { name: 'Banana Milk', description: 'Classic banana with milk' }
    },
    price: 3500,
    image: 'images/ananas (3).webp'
  },
  {
    id: 15,
    category: 'juices',
    translations: {
      ar: { name: 'عصير أناناس', description: '5,000 SDG' },
      en: { name: 'Pineapple Juice', description: 'Freshly squeezed pineapple' }
    },
    price: 5000,
    image: 'images/ananas (1).webp'
  },
  {
    id: 16,
    category: 'juices',
    translations: {
      ar: { name: 'مشكل', description: '6,000 SDG' },
      en: { name: 'Mixed Fruit Juice', description: 'Special fresh cocktail' }
    },
    price: 6000,
    image: 'images/ananas (2).webp'
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
    itemsFound: 'منتجات'
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
    itemsFound: 'items'
  }
};
