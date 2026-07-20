import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 
  (import.meta as any).env.VITE_SUPABASE_URL || 
  (import.meta as any).env.SUPABASE_URL ||
  (typeof process !== 'undefined' ? process.env?.VITE_SUPABASE_URL || process.env?.SUPABASE_URL : '') || '';

const supabaseAnonKey = 
  (import.meta as any).env.VITE_SUPABASE_ANON_KEY || 
  (import.meta as any).env.SUPABASE_ANON_KEY ||
  (typeof process !== 'undefined' ? process.env?.VITE_SUPABASE_ANON_KEY || process.env?.SUPABASE_ANON_KEY : '') || '';

// التحقق من وجود المتغيرات وتصدير العميل
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey && supabaseUrl !== 'undefined' && supabaseAnonKey !== 'undefined');

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// مفاتيح التخزين لتسهيل المزامنة
export const SYNC_KEYS = {
  MENU_ITEMS: 'qunaif_menu_items',
  UI_STRINGS: 'qunaif_ui_strings',
  CATEGORY_ICONS: 'qunaif_category_icons',
  WELCOME_STRINGS: 'qunaif_welcome_strings',
};

// إنشاء الجدول الافتراضي إذا لم يكن موجوداً من خلال استدعاءات Supabase أو إرشاد المستخدم لكيفية إعداده
// سنستخدم جدولاً بسيطاً وممتازاً باسم `qunaif_settings` لتخزين البيانات بصيغة JSONb لضمان مرونة الهيكل وعمرية البيانات
export async function pushDataToSupabase(key: string, data: any) {
  if (!supabase) {
    throw new Error('Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.');
  }

  const { error } = await supabase
    .from('qunaif_settings')
    .upsert({ key, value: data, updated_at: new Date().toISOString() }, { onConflict: 'key' });

  if (error) {
    // إذا لم يكن الجدول موجوداً، نوضح للمستخدم ونحاول معالجة الخطأ
    console.error(`Error pushing key ${key} to Supabase:`, error);
    throw error;
  }
}

export async function pullDataFromSupabase(key: string): Promise<any | null> {
  if (!supabase) {
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('qunaif_settings')
      .select('value')
      .eq('key', key)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // السجل غير موجود بعد، وهذا طبيعي في البداية
        return null;
      }
      // إذا كان الجدول غير موجود (خطأ relation "qunaif_settings" does not exist) أو أي خطأ آخر، نقوم بتسجيله وتحذير المستخدم بشكل لطيف دون إحباط التطبيق
      console.warn(`Supabase warning: Could not pull key "${key}". This is normal if the table hasn't been created yet. Error details:`, error.message);
      return null;
    }

    return data?.value || null;
  } catch (err: any) {
    console.warn(`Supabase warning for key "${key}":`, err.message || err);
    return null;
  }
}

// دالة لمزامنة كل البيانات دفعة واحدة
export async function syncAllToSupabase(payload: {
  menuItems: any[];
  uiStrings: any;
  categoryIcons: Record<string, string>;
  welcomeStrings: any;
}) {
  await Promise.all([
    pushDataToSupabase(SYNC_KEYS.MENU_ITEMS, payload.menuItems),
    pushDataToSupabase(SYNC_KEYS.UI_STRINGS, payload.uiStrings),
    pushDataToSupabase(SYNC_KEYS.CATEGORY_ICONS, payload.categoryIcons),
    pushDataToSupabase(SYNC_KEYS.WELCOME_STRINGS, payload.welcomeStrings),
  ]);
}

// دالة لجلب كل البيانات دفعة واحدة
export async function fetchAllFromSupabase() {
  const [menuItems, uiStrings, categoryIcons, welcomeStrings] = await Promise.all([
    pullDataFromSupabase(SYNC_KEYS.MENU_ITEMS),
    pullDataFromSupabase(SYNC_KEYS.UI_STRINGS),
    pullDataFromSupabase(SYNC_KEYS.CATEGORY_ICONS),
    pullDataFromSupabase(SYNC_KEYS.WELCOME_STRINGS),
  ]);

  return {
    menuItems,
    uiStrings,
    categoryIcons,
    welcomeStrings,
  };
}
