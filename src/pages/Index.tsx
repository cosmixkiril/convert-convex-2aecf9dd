import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FileUploader from '@/components/FileUploader';
import Features from '@/components/Features';
import FormatGrid from '@/components/FormatGrid';
import AdBanner from '@/components/AdBanner';

const Index: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Top Ad Banner */}
      <div className="container mx-auto px-4 py-4">
        <AdBanner variant="horizontal" />
      </div>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] opacity-30" style={{ background: 'var(--gradient-glow)' }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Hero Text */}
          <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {t('hero.title')}{' '}
              <span className="gradient-text">{t('hero.highlight')}</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('hero.subtitle')}
            </p>
          </div>

          {/* File Uploader */}
          <div className="animate-fade-in-delay-2">
            <FileUploader />
          </div>
        </div>
      </section>

      {/* Ad Banner - Between sections */}
      <div className="container mx-auto px-4 py-8">
        <AdBanner variant="horizontal" />
      </div>

      {/* Features Section */}
      <Features />

      {/* Formats Section */}
      <FormatGrid />

      {/* Side Ad + Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1 glass-card p-8">
              <h2 className="text-2xl font-bold mb-4">How It Works</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="font-bold text-primary">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Upload Your File</h3>
                    <p className="text-muted-foreground text-sm">Drag and drop or click to select your file. We support 100+ formats.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="font-bold text-primary">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Choose Output Format</h3>
                    <p className="text-muted-foreground text-sm">Select the format you want to convert your file to.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="font-bold text-primary">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Download Converted File</h3>
                    <p className="text-muted-foreground text-sm">Get your converted file instantly. No registration required.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Side Ad */}
            <div className="lg:w-[300px] shrink-0">
              <AdBanner variant="vertical" className="sticky top-24" />
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Ad Banner */}
      <div className="container mx-auto px-4 py-8">
        <AdBanner variant="horizontal" />
      </div>

      <Footer />
    </div>
  );
};

export default Index;
