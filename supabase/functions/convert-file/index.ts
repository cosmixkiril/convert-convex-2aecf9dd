import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// MIME type mappings (complete list)
const mimeTypes: Record<string, string> = {
  // Images
  'png': 'image/png',
  'jpg': 'image/jpeg',
  'jpeg': 'image/jpeg',
  'gif': 'image/gif',
  'webp': 'image/webp',
  'bmp': 'image/bmp',
  'ico': 'image/x-icon',
  'svg': 'image/svg+xml',
  'tiff': 'image/tiff',
  'heic': 'image/heic',
  'avif': 'image/avif',
  // Video
  'mp4': 'video/mp4',
  'avi': 'video/x-msvideo',
  'mov': 'video/quicktime',
  'mkv': 'video/x-matroska',
  'webm': 'video/webm',
  'wmv': 'video/x-ms-wmv',
  'flv': 'video/x-flv',
  'm4v': 'video/x-m4v',
  '3gp': 'video/3gpp',
  // Audio
  'mp3': 'audio/mpeg',
  'wav': 'audio/wav',
  'ogg': 'audio/ogg',
  'flac': 'audio/flac',
  'aac': 'audio/aac',
  'wma': 'audio/x-ms-wma',
  'm4a': 'audio/mp4',
  'aiff': 'audio/aiff',
  'opus': 'audio/opus',
  // Documents
  'pdf': 'application/pdf',
  'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'doc': 'application/msword',
  'txt': 'text/plain',
  'rtf': 'application/rtf',
  'odt': 'application/vnd.oasis.opendocument.text',
  'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'xls': 'application/vnd.ms-excel',
  'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'ppt': 'application/vnd.ms-powerpoint',
  'csv': 'text/csv',
  'html': 'text/html',
  // Archives
  'zip': 'application/zip',
  'rar': 'application/vnd.rar',
  '7z': 'application/x-7z-compressed',
  'tar': 'application/x-tar',
  'gz': 'application/gzip',
  'bz2': 'application/x-bzip2',
  'xz': 'application/x-xz',
};

// Image formats that can be converted using canvas
const convertibleImageFormats = ['png', 'jpg', 'jpeg', 'webp', 'gif', 'bmp'];

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const targetFormat = (formData.get('targetFormat') as string)?.toLowerCase();

    if (!file || !targetFormat) {
      return new Response(
        JSON.stringify({ error: 'File and target format are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Converting file: ${file.name} to ${targetFormat}`);
    console.log(`File size: ${file.size} bytes, type: ${file.type}`);

    const sourceExtension = file.name.split('.').pop()?.toLowerCase() || '';
    
    // Check if we can actually convert this format
    const isSourceImage = convertibleImageFormats.includes(sourceExtension);
    const isTargetImage = convertibleImageFormats.includes(targetFormat);

    let convertedBuffer: ArrayBuffer;
    let outputMimeType = mimeTypes[targetFormat] || 'application/octet-stream';

    if (isSourceImage && isTargetImage) {
      // For image conversion, we use a simple approach:
      // Read the image, and for simulation purposes, just re-encode with correct MIME type
      // In production, you would use Sharp or ImageMagick via WASM
      
      const arrayBuffer = await file.arrayBuffer();
      
      // For now, we're simulating conversion by returning the file with correct MIME type
      // Real conversion would require Sharp/ImageMagick WASM implementation
      convertedBuffer = arrayBuffer;
      
      console.log(`Image conversion simulated: ${sourceExtension} -> ${targetFormat}`);
    } else {
      // For non-image formats or cross-category conversions, 
      // we return the original file with new extension
      // Real conversion would require FFmpeg for video/audio, LibreOffice for documents
      convertedBuffer = await file.arrayBuffer();
      
      console.log(`Format change: ${sourceExtension} -> ${targetFormat} (metadata only)`);
    }

    // Generate random filename
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let randomPart = '';
    for (let i = 0; i < 6; i++) {
      randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const outputFilename = `Convex-${randomPart}.${targetFormat}`;

    console.log(`Output file: ${outputFilename}, size: ${convertedBuffer.byteLength} bytes`);

    // Return the converted file
    return new Response(convertedBuffer, {
      headers: {
        ...corsHeaders,
        'Content-Type': outputMimeType,
        'Content-Disposition': `attachment; filename="${outputFilename}"`,
        'X-Filename': outputFilename,
      },
    });

  } catch (error) {
    console.error('Error converting file:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Conversion failed' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
