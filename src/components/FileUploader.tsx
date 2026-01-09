import React, { useCallback, useState } from 'react';
import { Upload, File, X, Check, AlertCircle, Download, Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

// Format categories
const formatCategories = {
  image: ['PNG', 'JPG', 'JPEG', 'GIF', 'WEBP', 'BMP', 'ICO', 'SVG', 'TIFF'],
  video: ['MP4', 'AVI', 'MOV', 'MKV', 'WEBM', 'GIF', 'WMV', 'FLV'],
  audio: ['MP3', 'WAV', 'OGG', 'FLAC', 'AAC', 'WMA', 'M4A'],
  document: ['PDF', 'DOCX', 'DOC', 'TXT', 'RTF', 'ODT', 'XLSX', 'XLS', 'PPTX', 'PPT'],
  archive: ['ZIP', 'RAR', '7Z', 'TAR', 'GZ'],
};

const getFileCategory = (extension: string): keyof typeof formatCategories | null => {
  const ext = extension.toUpperCase();
  for (const [category, formats] of Object.entries(formatCategories)) {
    if (formats.includes(ext)) {
      return category as keyof typeof formatCategories;
    }
  }
  return null;
};

// Generate random filename like "Convex-AbCdEf"
const generateRandomFilename = (extension: string): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let randomPart = '';
  for (let i = 0; i < 6; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `Convex-${randomPart}.${extension.toLowerCase()}`;
};

// Get MIME type for format
const getMimeType = (format: string): string => {
  const mimeTypes: Record<string, string> = {
    // Images
    PNG: 'image/png',
    JPG: 'image/jpeg',
    JPEG: 'image/jpeg',
    GIF: 'image/gif',
    WEBP: 'image/webp',
    BMP: 'image/bmp',
    ICO: 'image/x-icon',
    SVG: 'image/svg+xml',
    TIFF: 'image/tiff',
    // Video
    MP4: 'video/mp4',
    AVI: 'video/x-msvideo',
    MOV: 'video/quicktime',
    MKV: 'video/x-matroska',
    WEBM: 'video/webm',
    WMV: 'video/x-ms-wmv',
    FLV: 'video/x-flv',
    // Audio
    MP3: 'audio/mpeg',
    WAV: 'audio/wav',
    OGG: 'audio/ogg',
    FLAC: 'audio/flac',
    AAC: 'audio/aac',
    WMA: 'audio/x-ms-wma',
    M4A: 'audio/mp4',
    // Documents
    PDF: 'application/pdf',
    DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    DOC: 'application/msword',
    TXT: 'text/plain',
    RTF: 'application/rtf',
    ODT: 'application/vnd.oasis.opendocument.text',
    XLSX: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    XLS: 'application/vnd.ms-excel',
    PPTX: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    PPT: 'application/vnd.ms-powerpoint',
    // Archives
    ZIP: 'application/zip',
    RAR: 'application/vnd.rar',
    '7Z': 'application/x-7z-compressed',
    TAR: 'application/x-tar',
    GZ: 'application/gzip',
  };
  return mimeTypes[format.toUpperCase()] || 'application/octet-stream';
};

const FileUploader: React.FC = () => {
  const { t } = useLanguage();
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'converting' | 'success' | 'error'>('idle');
  const [progress, setProgress] = useState(0);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [convertedFilename, setConvertedFilename] = useState<string>('');

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFile(droppedFile);
    }
  }, []);

  const handleFile = (selectedFile: File) => {
    if (selectedFile.size > 100 * 1024 * 1024) {
      toast.error('File size exceeds 100MB limit');
      return;
    }
    setFile(selectedFile);
    setOutputFormat('');
    setStatus('idle');
    setProgress(0);
    setConvertedUrl(null);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFile(selectedFile);
    }
  };

  const getFileExtension = (filename: string): string => {
    return filename.split('.').pop()?.toUpperCase() || '';
  };

  const getAvailableFormats = (): string[] => {
    if (!file) return [];
    const ext = getFileExtension(file.name);
    const category = getFileCategory(ext);
    if (!category) return [];
    return formatCategories[category].filter(f => f !== ext);
  };

  const convertFile = async () => {
    if (!file || !outputFormat) return;
    
    setStatus('converting');
    setProgress(0);

    try {
      // Create form data for upload
      const formData = new FormData();
      formData.append('file', file);
      formData.append('targetFormat', outputFormat);

      // Simulate progress while waiting for response
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 300);

      // Call the edge function
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/convert-file`,
        {
          method: 'POST',
          body: formData,
        }
      );

      clearInterval(progressInterval);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Conversion failed');
      }

      // Get filename from header
      const filename = response.headers.get('X-Filename') || generateRandomFilename(outputFormat);
      
      // Get the blob and create download URL
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      setProgress(100);
      setStatus('success');
      setConvertedUrl(url);
      setConvertedFilename(filename);
      toast.success(t('converter.success'));
    } catch (error) {
      console.error('Conversion error:', error);
      setStatus('error');
      toast.error(error instanceof Error ? error.message : t('converter.error'));
    }
  };

  const handleConvert = async () => {
    if (!file || !outputFormat) {
      toast.error('Please select a file and output format');
      return;
    }
    
    try {
      await convertFile();
    } catch {
      setStatus('error');
      toast.error(t('converter.error'));
    }
  };

  const handleReset = () => {
    // Clean up blob URL to prevent memory leak
    if (convertedUrl) {
      URL.revokeObjectURL(convertedUrl);
    }
    setFile(null);
    setOutputFormat('');
    setStatus('idle');
    setProgress(0);
    setConvertedUrl(null);
    setConvertedFilename('');
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {!file ? (
        /* Upload Zone */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`upload-zone ${isDragging ? 'active' : ''}`}
        >
          <input
            type="file"
            onChange={handleFileSelect}
            className="hidden"
            id="file-input"
          />
          <label htmlFor="file-input" className="cursor-pointer flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center animate-float">
              <Upload className="w-10 h-10 text-primary" />
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-foreground">{t('upload.dragDrop')}</p>
              <p className="text-sm text-muted-foreground mt-1">{t('upload.or')}</p>
            </div>
            <Button variant="outline" className="mt-2">
              {t('upload.browse')}
            </Button>
            <p className="text-xs text-muted-foreground mt-4">{t('upload.maxSize')}</p>
          </label>
        </div>
      ) : (
        /* File Selected State */
        <div className="glass-card p-6 animate-scale-in">
          {/* File Info */}
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <File className="w-7 h-7 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{file.name}</p>
              <p className="text-sm text-muted-foreground">
                {formatFileSize(file.size)} • {getFileExtension(file.name)}
              </p>
            </div>
            {status === 'idle' && (
              <Button variant="ghost" size="icon" onClick={handleReset}>
                <X className="w-5 h-5" />
              </Button>
            )}
          </div>

          {/* Format Selection */}
          {status === 'idle' && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="text-sm font-medium mb-2 block">{t('converter.to')}</label>
                  <Select value={outputFormat} onValueChange={setOutputFormat}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('converter.selectFormat')} />
                    </SelectTrigger>
                    <SelectContent>
                      {getAvailableFormats().map(format => (
                        <SelectItem key={format} value={format}>
                          {format}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                onClick={handleConvert} 
                className="w-full btn-gradient"
                disabled={!outputFormat}
              >
                {t('converter.convert')}
              </Button>
            </div>
          )}

          {/* Converting State */}
          {status === 'converting' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Loader2 className="w-5 h-5 text-primary animate-spin" />
                <span className="font-medium">{t('converter.converting')}</span>
                <span className="text-muted-foreground ml-auto">{progress}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}

          {/* Success State */}
          {status === 'success' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-green-500">
                <Check className="w-5 h-5" />
                <span className="font-medium">{t('converter.success')}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {convertedFilename}
              </p>
              <div className="flex gap-3">
                <Button 
                  className="flex-1 btn-gradient"
                  onClick={() => {
                    if (convertedUrl) {
                      const link = document.createElement('a');
                      link.href = convertedUrl;
                      link.download = convertedFilename;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }
                  }}
                >
                  <Download className="w-4 h-4 mr-2" />
                  {t('converter.download')}
                </Button>
                <Button variant="outline" onClick={handleReset}>
                  {t('converter.newFile')}
                </Button>
              </div>
            </div>
          )}

          {/* Error State */}
          {status === 'error' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-destructive">
                <AlertCircle className="w-5 h-5" />
                <span className="font-medium">{t('converter.error')}</span>
              </div>
              <div className="flex gap-3">
                <Button onClick={handleConvert} className="flex-1">
                  {t('converter.tryAgain')}
                </Button>
                <Button variant="outline" onClick={handleReset}>
                  {t('converter.newFile')}
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUploader;
