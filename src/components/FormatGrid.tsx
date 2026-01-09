import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { FileImage, FileVideo, FileAudio, FileText, Archive } from 'lucide-react';

const FormatGrid: React.FC = () => {
  const { t } = useLanguage();

  const categories = [
    {
      icon: FileImage,
      name: 'Images',
      formats: ['PNG', 'JPG', 'GIF', 'WEBP', 'BMP', 'SVG', 'ICO', 'TIFF', 'HEIC', 'AVIF'],
      color: 'from-pink-500 to-rose-500',
    },
    {
      icon: FileVideo,
      name: 'Video',
      formats: ['MP4', 'AVI', 'MOV', 'MKV', 'WEBM', 'WMV', 'FLV', 'M4V', '3GP'],
      color: 'from-violet-500 to-purple-500',
    },
    {
      icon: FileAudio,
      name: 'Audio',
      formats: ['MP3', 'WAV', 'OGG', 'FLAC', 'AAC', 'WMA', 'M4A', 'AIFF', 'OPUS'],
      color: 'from-cyan-500 to-blue-500',
    },
    {
      icon: FileText,
      name: 'Documents',
      formats: ['PDF', 'DOCX', 'TXT', 'RTF', 'ODT', 'XLSX', 'PPTX', 'CSV', 'HTML'],
      color: 'from-amber-500 to-orange-500',
    },
    {
      icon: Archive,
      name: 'Archives',
      formats: ['ZIP', 'RAR', '7Z', 'TAR', 'GZ', 'BZ2', 'XZ'],
      color: 'from-emerald-500 to-green-500',
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('formats.title')}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{t('formats.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {categories.map((category, index) => (
            <div 
              key={index}
              className="glass-card p-6 text-center group"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <category.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-semibold mb-3">{category.name}</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {category.formats.map((format) => (
                  <span 
                    key={format}
                    className="px-2 py-1 text-xs font-medium bg-secondary rounded-md"
                  >
                    {format}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FormatGrid;
