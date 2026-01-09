import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface AdBannerProps {
  variant?: 'horizontal' | 'vertical' | 'square';
  className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ variant = 'horizontal', className = '' }) => {
  const { t } = useLanguage();

  const dimensions = {
    horizontal: 'h-24 md:h-28',
    vertical: 'w-full min-h-[300px] md:w-[300px]',
    square: 'w-full aspect-square max-w-[300px]',
  };

  return (
    <div 
      className={`ad-placeholder ${dimensions[variant]} ${className}`}
    >
      <div className="text-center p-4">
        <span className="text-xs uppercase tracking-wider opacity-60">{t('ad.label')}</span>
        <div className="mt-2 text-xs opacity-40">728 × 90</div>
      </div>
    </div>
  );
};

export default AdBanner;
