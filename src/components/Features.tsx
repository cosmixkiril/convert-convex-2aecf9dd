import React from 'react';
import { Zap, Shield, Gift, Layers } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Features: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Zap,
      title: t('features.fast.title'),
      description: t('features.fast.desc'),
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Shield,
      title: t('features.secure.title'),
      description: t('features.secure.desc'),
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Gift,
      title: t('features.free.title'),
      description: t('features.free.desc'),
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Layers,
      title: t('features.formats.title'),
      description: t('features.formats.desc'),
      color: 'from-blue-500 to-cyan-500',
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {t('features.title')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="glass-card p-6 group hover:scale-105 transition-transform duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
