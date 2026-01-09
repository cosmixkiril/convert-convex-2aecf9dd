import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const Privacy: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-bold mb-8">{t('footer.privacy')}</h1>
          
          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-muted-foreground">
            <p className="text-lg">
              Last updated: January 2026
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">1. Information We Collect</h2>
            <p>
              We collect minimal information necessary to provide our file conversion service:
            </p>
            <ul className="space-y-2">
              <li>Files you upload for conversion (temporarily stored)</li>
              <li>Basic usage analytics (page views, conversion types)</li>
              <li>IP address for security purposes</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">2. How We Use Your Information</h2>
            <p>
              Your uploaded files are used solely for the purpose of conversion. We do not:
            </p>
            <ul className="space-y-2">
              <li>Store your files permanently</li>
              <li>Share your files with third parties</li>
              <li>Use your files for training AI models</li>
              <li>Sell your data to anyone</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">3. Data Retention</h2>
            <p>
              Files uploaded for conversion are automatically deleted within 1 hour after processing. 
              We do not retain copies of your files.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">4. Cookies</h2>
            <p>
              We use essential cookies to remember your language and theme preferences. 
              We do not use tracking cookies or third-party analytics cookies.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">5. Security</h2>
            <p>
              We implement industry-standard security measures to protect your data:
            </p>
            <ul className="space-y-2">
              <li>HTTPS encryption for all data transfers</li>
              <li>Secure file handling and storage</li>
              <li>Regular security audits</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">6. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at: 
              <a href="mailto:privacy@convertconvex.com" className="text-primary hover:underline ml-1">
                privacy@convertconvex.com
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
