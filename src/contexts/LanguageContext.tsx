import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Supported languages
export type Language = 'en' | 'ru' | 'ua';

// Translation keys
interface Translations {
  // Header
  'nav.home': string;
  'nav.about': string;
  'nav.contact': string;
  
  // Hero
  'hero.title': string;
  'hero.subtitle': string;
  'hero.highlight': string;
  
  // Upload
  'upload.title': string;
  'upload.subtitle': string;
  'upload.dragDrop': string;
  'upload.or': string;
  'upload.browse': string;
  'upload.maxSize': string;
  
  // Converter
  'converter.selectFormat': string;
  'converter.from': string;
  'converter.to': string;
  'converter.convert': string;
  'converter.converting': string;
  'converter.download': string;
  'converter.success': string;
  'converter.error': string;
  'converter.tryAgain': string;
  'converter.newFile': string;
  
  // Features
  'features.title': string;
  'features.fast.title': string;
  'features.fast.desc': string;
  'features.secure.title': string;
  'features.secure.desc': string;
  'features.free.title': string;
  'features.free.desc': string;
  'features.formats.title': string;
  'features.formats.desc': string;
  
  // Formats
  'formats.title': string;
  'formats.subtitle': string;
  
  // Footer
  'footer.about': string;
  'footer.privacy': string;
  'footer.terms': string;
  'footer.contact': string;
  'footer.rights': string;
  
  // Ad
  'ad.label': string;
  
  // Theme
  'theme.light': string;
  'theme.dark': string;
  'theme.system': string;
}

const translations: Record<Language, Translations> = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    
    'hero.title': 'Convert Any File',
    'hero.subtitle': 'Fast, free, and secure file conversion. Transform your files in seconds with support for 100+ formats.',
    'hero.highlight': 'to Any Format',
    
    'upload.title': 'Upload Your File',
    'upload.subtitle': 'Drag and drop your file here or click to browse',
    'upload.dragDrop': 'Drag & Drop',
    'upload.or': 'or',
    'upload.browse': 'Browse Files',
    'upload.maxSize': 'Max file size: 100MB',
    
    'converter.selectFormat': 'Select output format',
    'converter.from': 'From',
    'converter.to': 'To',
    'converter.convert': 'Convert Now',
    'converter.converting': 'Converting...',
    'converter.download': 'Download File',
    'converter.success': 'Conversion complete!',
    'converter.error': 'Conversion failed',
    'converter.tryAgain': 'Try Again',
    'converter.newFile': 'Convert Another File',
    
    'features.title': 'Why Choose Convert Convex?',
    'features.fast.title': 'Lightning Fast',
    'features.fast.desc': 'Convert files in seconds with our optimized processing engine',
    'features.secure.title': 'Secure & Private',
    'features.secure.desc': 'Files are encrypted and automatically deleted after conversion',
    'features.free.title': '100% Free',
    'features.free.desc': 'No hidden costs, no registration required, completely free',
    'features.formats.title': '100+ Formats',
    'features.formats.desc': 'Support for all popular file formats and more',
    
    'formats.title': 'Supported Formats',
    'formats.subtitle': 'Convert between any of these formats',
    
    'footer.about': 'About',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.contact': 'Contact',
    'footer.rights': 'All rights reserved.',
    
    'ad.label': 'Advertisement',
    
    'theme.light': 'Light',
    'theme.dark': 'Dark',
    'theme.system': 'System',
  },
  ru: {
    'nav.home': 'Главная',
    'nav.about': 'О нас',
    'nav.contact': 'Контакты',
    
    'hero.title': 'Конвертируйте любой файл',
    'hero.subtitle': 'Быстрая, бесплатная и безопасная конвертация файлов. Преобразуйте файлы за секунды с поддержкой 100+ форматов.',
    'hero.highlight': 'в любой формат',
    
    'upload.title': 'Загрузите ваш файл',
    'upload.subtitle': 'Перетащите файл сюда или нажмите для выбора',
    'upload.dragDrop': 'Перетащите',
    'upload.or': 'или',
    'upload.browse': 'Выберите файл',
    'upload.maxSize': 'Максимальный размер: 100МБ',
    
    'converter.selectFormat': 'Выберите формат',
    'converter.from': 'Из',
    'converter.to': 'В',
    'converter.convert': 'Конвертировать',
    'converter.converting': 'Конвертация...',
    'converter.download': 'Скачать файл',
    'converter.success': 'Конвертация завершена!',
    'converter.error': 'Ошибка конвертации',
    'converter.tryAgain': 'Попробовать снова',
    'converter.newFile': 'Конвертировать другой файл',
    
    'features.title': 'Почему Convert Convex?',
    'features.fast.title': 'Молниеносно',
    'features.fast.desc': 'Конвертируйте файлы за секунды благодаря оптимизированному движку',
    'features.secure.title': 'Безопасно',
    'features.secure.desc': 'Файлы зашифрованы и автоматически удаляются после конвертации',
    'features.free.title': '100% Бесплатно',
    'features.free.desc': 'Без скрытых платежей, без регистрации, полностью бесплатно',
    'features.formats.title': '100+ Форматов',
    'features.formats.desc': 'Поддержка всех популярных форматов файлов',
    
    'formats.title': 'Поддерживаемые форматы',
    'formats.subtitle': 'Конвертируйте между любыми форматами',
    
    'footer.about': 'О нас',
    'footer.privacy': 'Политика конфиденциальности',
    'footer.terms': 'Условия использования',
    'footer.contact': 'Контакты',
    'footer.rights': 'Все права защищены.',
    
    'ad.label': 'Реклама',
    
    'theme.light': 'Светлая',
    'theme.dark': 'Тёмная',
    'theme.system': 'Системная',
  },
  ua: {
    'nav.home': 'Головна',
    'nav.about': 'Про нас',
    'nav.contact': 'Контакти',
    
    'hero.title': 'Конвертуйте будь-який файл',
    'hero.subtitle': 'Швидка, безкоштовна та безпечна конвертація файлів. Перетворюйте файли за секунди з підтримкою 100+ форматів.',
    'hero.highlight': 'у будь-який формат',
    
    'upload.title': 'Завантажте ваш файл',
    'upload.subtitle': 'Перетягніть файл сюди або натисніть для вибору',
    'upload.dragDrop': 'Перетягніть',
    'upload.or': 'або',
    'upload.browse': 'Виберіть файл',
    'upload.maxSize': 'Максимальний розмір: 100МБ',
    
    'converter.selectFormat': 'Виберіть формат',
    'converter.from': 'З',
    'converter.to': 'В',
    'converter.convert': 'Конвертувати',
    'converter.converting': 'Конвертація...',
    'converter.download': 'Завантажити файл',
    'converter.success': 'Конвертацію завершено!',
    'converter.error': 'Помилка конвертації',
    'converter.tryAgain': 'Спробувати знову',
    'converter.newFile': 'Конвертувати інший файл',
    
    'features.title': 'Чому Convert Convex?',
    'features.fast.title': 'Блискавично',
    'features.fast.desc': 'Конвертуйте файли за секунди завдяки оптимізованому двигуну',
    'features.secure.title': 'Безпечно',
    'features.secure.desc': 'Файли зашифровані та автоматично видаляються після конвертації',
    'features.free.title': '100% Безкоштовно',
    'features.free.desc': 'Без прихованих платежів, без реєстрації, повністю безкоштовно',
    'features.formats.title': '100+ Форматів',
    'features.formats.desc': 'Підтримка всіх популярних форматів файлів',
    
    'formats.title': 'Підтримувані формати',
    'formats.subtitle': 'Конвертуйте між будь-якими форматами',
    
    'footer.about': 'Про нас',
    'footer.privacy': 'Політика конфіденційності',
    'footer.terms': 'Умови використання',
    'footer.contact': 'Контакти',
    'footer.rights': 'Всі права захищено.',
    
    'ad.label': 'Реклама',
    
    'theme.light': 'Світла',
    'theme.dark': 'Темна',
    'theme.system': 'Системна',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof Translations) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('convert-convex-lang') as Language;
    if (saved && translations[saved]) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('convert-convex-lang', lang);
  };

  const t = (key: keyof Translations): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
