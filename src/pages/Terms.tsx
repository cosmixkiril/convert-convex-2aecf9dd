import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const Terms: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-bold mb-8">{t('footer.terms')}</h1>
          
          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-muted-foreground">
            <p className="text-lg">
              Last updated: January 2026
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">1. Acceptance of Terms</h2>
            <p>
              By accessing and using Convert Convex, you accept and agree to be bound by these 
              Terms of Service. If you do not agree to these terms, please do not use our service.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">2. Description of Service</h2>
            <p>
              Convert Convex provides a free online file conversion service. We allow users to 
              convert files between various formats including but not limited to images, videos, 
              audio files, and documents.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">3. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul className="space-y-2">
              <li>Upload illegal, harmful, or copyrighted content</li>
              <li>Attempt to overload or disrupt our servers</li>
              <li>Use automated tools to abuse the service</li>
              <li>Circumvent any access restrictions</li>
              <li>Upload malware or viruses</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">4. File Size Limits</h2>
            <p>
              Files uploaded for conversion must not exceed 100MB in size. We reserve the right 
              to modify these limits at any time.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">5. Intellectual Property</h2>
            <p>
              You retain all rights to the files you upload. We do not claim any ownership over 
              your content. You are responsible for ensuring you have the right to convert and 
              use the files you upload.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">6. Disclaimer of Warranties</h2>
            <p>
              The service is provided "as is" without any warranties, express or implied. We do 
              not guarantee the accuracy, quality, or reliability of conversions.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">7. Limitation of Liability</h2>
            <p>
              We shall not be liable for any direct, indirect, incidental, special, or 
              consequential damages arising from the use or inability to use our service.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">8. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Continued use of the service 
              after changes constitutes acceptance of the new terms.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">9. Contact</h2>
            <p>
              For questions about these Terms, contact us at: 
              <a href="mailto:legal@convertconvex.com" className="text-primary hover:underline ml-1">
                legal@convertconvex.com
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
