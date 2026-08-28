import { VideoMetadata } from './types';

export const MAX_VIDEO_SIZE_BYTES = 100 * 1024 * 1024; // 100 MB
export const SUPPORTED_VIDEO_FORMATS = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-matroska'];
export const SUPPORTED_EXTENSIONS = ['.mp4', '.webm', '.mov', '.mkv'];

export interface VideoValidationError {
  code: 'FILE_TOO_LARGE' | 'UNSUPPORTED_FORMAT' | 'NO_VIDEO_TRACK' | 'INVALID_METADATA';
  message: string;
}

/**
 * Validates file type and size
 */
export function validateVideoFile(file: File): { isValid: boolean; error?: VideoValidationError } {
  if (file.size > MAX_VIDEO_SIZE_BYTES) {
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(1);
    return {
      isValid: false,
      error: {
        code: 'FILE_TOO_LARGE',
        message: `Video size (${sizeInMB} MB) exceeds the maximum limit of 100 MB.`,
      },
    };
  }

  const isMimeSupported = SUPPORTED_VIDEO_FORMATS.some((fmt) => file.type.toLowerCase().includes(fmt.replace('video/', '')));
  const isExtensionSupported = SUPPORTED_EXTENSIONS.some((ext) => file.name.toLowerCase().endsWith(ext));

  if (!isMimeSupported && !isExtensionSupported && file.type !== '') {
    return {
      isValid: false,
      error: {
        code: 'UNSUPPORTED_FORMAT',
        message: `Unsupported video format. Please upload MP4, WebM, MOV, or MKV.`,
      },
    };
  }

  return { isValid: true };
}

/**
 * Extracts duration and preview thumbnail from a File or Blob
 */
export async function extractVideoMetadata(file: File | Blob, filename: string): Promise<VideoMetadata> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.src = url;
    video.muted = true;
    video.playsInline = true;

    // Timeout safety fallback
    const timeout = setTimeout(() => {
      resolve({
        name: filename,
        size: file.size,
        duration: 342, // default fallback ~5m42s
        format: file.type || 'video/mp4',
        previewUrl: undefined,
      });
    }, 4000);

    video.onloadedmetadata = () => {
      clearTimeout(timeout);
      const duration = Math.round(video.duration) || 360;

      // Capture canvas thumbnail at 1s mark
      video.currentTime = Math.min(1.0, duration / 2);
    };

    video.onseeked = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = 320;
        canvas.height = 180;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const thumbnail = canvas.toDataURL('image/jpeg', 0.7);
          resolve({
            name: filename,
            size: file.size,
            duration: Math.round(video.duration) || 360,
            format: file.type || 'video/mp4',
            previewUrl: thumbnail,
          });
          return;
        }
      } catch (e) {
        console.warn('Canvas thumbnail extraction skipped:', e);
      }

      resolve({
        name: filename,
        size: file.size,
        duration: Math.round(video.duration) || 360,
        format: file.type || 'video/mp4',
        previewUrl: undefined,
      });
    };

    video.onerror = () => {
      clearTimeout(timeout);
      resolve({
        name: filename,
        size: file.size,
        duration: 360,
        format: file.type || 'video/mp4',
      });
    };
  });
}

/**
 * Feature-detects Screen / Display capture support in browser
 */
export function checkScreenCaptureSupport(): {
  isSupported: boolean;
  reason?: string;
} {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return { isSupported: false, reason: 'SSR environment' };
  }

  const hasMediaDevices = !!navigator.mediaDevices;
  const hasGetDisplayMedia = typeof navigator.mediaDevices?.getDisplayMedia === 'function';
  const hasMediaRecorder = typeof window.MediaRecorder !== 'undefined';

  if (!hasMediaDevices || !hasGetDisplayMedia) {
    return {
      isSupported: false,
      reason: 'Screen Capture (getDisplayMedia) is not supported on this mobile browser or device.',
    };
  }

  if (!hasMediaRecorder) {
    return {
      isSupported: false,
      reason: 'MediaRecorder API is not available on this browser.',
    };
  }

  return { isSupported: true };
}

/**
 * Pre-seeded sample videos for instantaneous hackathon testing
 */
export interface SampleClipOption {
  id: string;
  name: string;
  description: string;
  game: string;
  durationSeconds: number;
  durationFormatted: string;
  sizeBytes: number;
  sizeFormatted: string;
  isMismatchTest?: boolean;
}

export const SAMPLE_RECORDINGS: SampleClipOption[] = [
  {
    id: 'sample-ff-bermuda',
    name: 'freefire_bermuda_ranked_clutch.mp4',
    description: 'Ranked Free Fire match in Bermuda (Pochinok drop, 4 engagements, late circle).',
    game: 'Free Fire',
    durationSeconds: 462,
    durationFormatted: '7m 42s',
    sizeBytes: 44.8 * 1024 * 1024,
    sizeFormatted: '44.8 MB',
    isMismatchTest: false,
  },
  {
    id: 'sample-ff-purgatory',
    name: 'freefire_purgatory_squad_wipe.mp4',
    description: 'Aggressive rush encounter at Brasilia with exposed crossfire positioning.',
    game: 'Free Fire',
    durationSeconds: 380,
    durationFormatted: '6m 20s',
    sizeBytes: 38.2 * 1024 * 1024,
    sizeFormatted: '38.2 MB',
    isMismatchTest: false,
  },
  {
    id: 'sample-bgmi-mismatch',
    name: 'bgmi_erangel_hotdrop_session.mp4',
    description: 'Deterministic Mismatch Test: BGMI Erangel recording to test game verification rejection.',
    game: 'BGMI (Mismatch)',
    durationSeconds: 510,
    durationFormatted: '8m 30s',
    sizeBytes: 52.4 * 1024 * 1024,
    sizeFormatted: '52.4 MB',
    isMismatchTest: true,
  },
];
