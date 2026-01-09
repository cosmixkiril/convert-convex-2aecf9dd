import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-bold mb-8">{t('footer.about')}</h1>
          
          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
            <p className="text-lg text-muted-foreground">
              Convert Convex is a free online file conversion service designed to make your life easier. 
              We believe that converting files should be simple, fast, and accessible to everyone.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
            <p className="text-muted-foreground">
              Our mission is to provide a reliable, secure, and user-friendly platform for converting files 
              between different formats. Whether you need to convert images, videos, audio files, or documents, 
              we've got you covered.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Why Choose Us?</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li>✓ 100% Free - No hidden costs or premium tiers</li>
              <li>✓ No Registration - Start converting immediately</li>
              <li>✓ Secure - Files are encrypted and auto-deleted</li>
              <li>✓ Fast - Lightning-quick conversion times</li>
              <li>✓ 100+ Formats - Support for all popular file types</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Technology</h2>
            <p className="text-muted-foreground">
              We use industry-leading conversion technologies including FFmpeg, ImageMagick, and LibreOffice 
              to ensure the highest quality conversions possible. Our infrastructure is built on modern 
              cloud technologies to provide fast and reliable service worldwide.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
