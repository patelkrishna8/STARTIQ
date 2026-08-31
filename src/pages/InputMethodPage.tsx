import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Upload,
  Video,
  FileVideo,
  Trash2,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  Play,
  Sparkles,
  StopCircle,
  HelpCircle,
} from 'lucide-react';
import {
  validateVideoFile,
  extractVideoMetadata,
  checkScreenCaptureSupport,
  SAMPLE_RECORDINGS,
  SampleClipOption,
} from '../lib/stratiq/videoProcessing';
import { VideoMetadata } from '../lib/stratiq/types';
import { DemoBadge } from '../components/ui/DemoBadge';

export const InputMethodPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedGame = location.state?.selectedGame || 'free-fire';

  const [activeTab, setActiveTab] = useState<'upload' | 'capture'>('upload');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState<VideoMetadata | null>(null);
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Capture Session State
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const captureSupport = checkScreenCaptureSupport();

  // Handle local file upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMessage(null);
    const validation = validateVideoFile(file);
    if (!validation.isValid && validation.error) {
      setErrorMessage(validation.error.message);
      return;
    }

    setIsProcessingFile(true);
    try {
      setSelectedFile(file);
      const meta = await extractVideoMetadata(file, file.name);
      setMetadata(meta);
    } catch (err: any) {
      setErrorMessage('Could not extract video metadata. Please try another file.');
    } finally {
      setIsProcessingFile(false);
    }
  };

  // Load sample clip directly
  const handleLoadSample = (sample: SampleClipOption) => {
    setErrorMessage(null);
    setSelectedFile(null);
    setMetadata({
      name: sample.name,
      size: sample.sizeBytes,
      duration: sample.durationSeconds,
      format: 'video/mp4',
      isSample: true,
    });
  };

  const handleClearVideo = () => {
    setSelectedFile(null);
    setMetadata(null);
    setErrorMessage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Capture Session logic
  const handleStartCapture = async () => {
    setErrorMessage(null);
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          displaySurface: 'monitor',
        },
        audio: true,
      });

      recordedChunksRef.current = [];
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = async () => {
        clearInterval(timerRef.current);
        setIsRecording(false);
        stream.getTracks().forEach((track) => track.stop());

        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
        const capturedMeta = await extractVideoMetadata(blob, `captured_session_${Date.now()}.webm`);
        setMetadata(capturedMeta);
      };

      recorder.start(1000);
      setIsRecording(true);
      setRecordingSeconds(0);

      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err: any) {
      setIsRecording(false);
      clearInterval(timerRef.current);
      setErrorMessage(
        err.name === 'NotAllowedError'
          ? 'Screen capture permission was denied by the user.'
          : 'Could not initialize capture session on this device.'
      );
    }
  };

  const handleStopCapture = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
  };

  const handleContinueToVerification = () => {
    if (!metadata) return;
    navigate('/analyze/verify', {
      state: {
        selectedGame,
        videoMetadata: metadata,
      },
    });
  };

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remainingSecs = sec % 60;
    return `${mins}m ${remainingSecs < 10 ? '0' : ''}${remainingSecs}s`;
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">Step 02 // Input Method</span>
          <DemoBadge />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Choose Input Method</h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Upload an existing Free Fire gameplay recording or record a session for post-match analysis.
        </p>
      </div>

      {/* Input Mode Tabs */}
      <div className="grid grid-cols-2 p-1 bg-slate-900/80 border border-slate-800 rounded-xl">
        <button
          onClick={() => {
            setActiveTab('upload');
            setErrorMessage(null);
          }}
          type="button"
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'upload'
              ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Upload className="w-4 h-4" />
          <span>Upload Gameplay</span>
        </button>
        <button
          onClick={() => {
            setActiveTab('capture');
            setErrorMessage(null);
          }}
          type="button"
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'capture'
              ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Video className="w-4 h-4" />
          <span>Capture Session</span>
        </button>
      </div>

      {/* Error Banner */}
      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-rose-950/70 border border-rose-500/40 text-rose-200 text-xs flex items-start gap-2.5 animate-fadeIn">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold">{errorMessage}</p>
            <p className="text-[11px] text-rose-300/80">
              Please check your file format (MP4/WebM) or select one of the pre-configured sample videos below.
            </p>
          </div>
        </div>
      )}

      {/* Tab A: Upload Gameplay */}
      {activeTab === 'upload' && (
        <div className="space-y-4">
          {!metadata ? (
            <div className="space-y-4">
              {/* File Dropzone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-700/80 hover:border-cyan-500/60 bg-[#11141e]/80 hover:bg-slate-900/60 rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3 group"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/mp4,video/webm,video/quicktime,video/x-matroska"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                  <Upload className="w-7 h-7" />
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-bold text-white">Tap to upload gameplay recording</p>
                  <p className="text-xs text-slate-400">Mobile camera roll & video files friendly (MP4, WebM, MOV)</p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] font-mono text-slate-400 pt-1">
                  <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800">Rec: 5–10 mins</span>
                  <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800">Max size: 100 MB</span>
                </div>
              </div>

              {/* Sample clips for quick evaluation */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Quick Sample Recordings
                  </span>
                  <span className="text-[10px] font-mono text-cyan-400">Instant Evaluation</span>
                </div>

                <div className="space-y-2">
                  {SAMPLE_RECORDINGS.map((sample) => (
                    <div
                      key={sample.id}
                      onClick={() => handleLoadSample(sample)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        sample.isMismatchTest
                          ? 'bg-amber-950/20 border-amber-500/30 hover:border-amber-400/60'
                          : 'bg-[#11141e]/90 border-slate-800 hover:border-cyan-500/40'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold ${
                            sample.isMismatchTest
                              ? 'bg-amber-500/20 text-amber-400'
                              : 'bg-cyan-500/20 text-cyan-400'
                          }`}
                        >
                          <Play className="w-4 h-4 fill-current" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-white">{sample.name}</span>
                            {sample.isMismatchTest && (
                              <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                                Mismatch Test
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400">{sample.description}</p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-[11px] font-mono text-slate-300 block">{sample.durationFormatted}</span>
                        <span className="text-[10px] font-mono text-slate-500">{sample.sizeFormatted}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Video Metadata Ready Card */
            <div className="bg-[#11141e] border border-cyan-500/40 rounded-2xl p-4 sm:p-5 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
                    <FileVideo className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white max-w-[220px] sm:max-w-xs truncate">
                        {metadata.name}
                      </h3>
                      {metadata.isSample && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300">
                          Sample Clip
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">
                      {(metadata.size / (1024 * 1024)).toFixed(1)} MB • {formatSeconds(metadata.duration)}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleClearVideo}
                  type="button"
                  className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 rounded-lg transition-colors"
                  title="Remove video"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {metadata.previewUrl && (
                <div className="rounded-xl overflow-hidden border border-slate-800 bg-black aspect-video max-h-48 flex items-center justify-center relative">
                  <img src={metadata.previewUrl} alt="Thumbnail preview" className="w-full h-full object-cover" />
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 font-mono text-[10px] text-white">
                    {formatSeconds(metadata.duration)}
                  </div>
                </div>
              )}

              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800/80 text-xs text-slate-300 space-y-1 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-400">File format:</span>
                  <span className="text-cyan-300 uppercase">{metadata.format || 'MP4'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Target game:</span>
                  <span className="text-emerald-300 font-bold">Free Fire (Garena)</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleClearVideo}
                  type="button"
                  className="py-2.5 px-4 rounded-xl border border-slate-700 bg-slate-800/60 text-xs font-semibold text-slate-300 hover:bg-slate-700/60 flex items-center gap-1.5 transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Replace</span>
                </button>
                <button
                  onClick={handleContinueToVerification}
                  type="button"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-98 transition-all"
                >
                  <span>Proceed to Game Verification</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab B: Capture Session */}
      {activeTab === 'capture' && (
        <div className="space-y-4">
          <div className="bg-[#11141e] border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                <Video className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-base">Capture Session</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Capture gameplay while playing and send the recorded session through the same post-match analysis pipeline.
                </p>
              </div>
            </div>

            {/* Browser Support Check */}
            {!captureSupport.isSupported ? (
              <div className="bg-amber-950/30 border border-amber-500/30 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Capture Session is not supported on this device or browser.</span>
                </div>
                <p className="text-[11px] text-amber-200/70 leading-relaxed">
                  Mobile web browsers restrict background screen recording across standalone mobile apps. For mobile devices, please record using your built-in screen recorder and upload the video file.
                </p>
                <button
                  onClick={() => setActiveTab('upload')}
                  className="w-full py-2 px-3 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-semibold transition-all"
                >
                  Use Upload Gameplay Instead
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {isRecording ? (
                  <div className="p-5 rounded-xl bg-rose-950/40 border border-rose-500/40 text-center space-y-3 animate-pulse">
                    <div className="inline-flex items-center gap-2 text-rose-400 font-mono text-sm font-bold">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                      <span>RECORDING IN PROGRESS: {formatSeconds(recordingSeconds)}</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Play your Free Fire session. When finished, tap stop to process.
                    </p>
                    <button
                      onClick={handleStopCapture}
                      className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs inline-flex items-center gap-2 shadow-lg shadow-rose-600/30"
                    >
                      <StopCircle className="w-4 h-4" />
                      <span>Stop & Send to Analysis</span>
                    </button>
                  </div>
                ) : metadata ? (
                  <div className="space-y-3">
                    <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Session Recorded ({formatSeconds(metadata.duration)})</span>
                      </div>
                      <button onClick={() => setMetadata(null)} className="text-slate-400 hover:text-white text-xs">
                        Record Again
                      </button>
                    </div>
                    <button
                      onClick={handleContinueToVerification}
                      className="w-full py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
                    >
                      <span>Proceed to Game Verification</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3 pt-2">
                    <div className="text-xs text-slate-400 bg-slate-900/60 p-3 rounded-xl border border-slate-800 space-y-1">
                      <p className="text-slate-300 font-semibold">Post-Session Analysis Notice</p>
                      <p className="text-[11px] leading-relaxed">
                        StartIQ processes gameplay after the session concludes. Real-time in-game overlay coaching is not supported.
                      </p>
                    </div>
                    <button
                      onClick={handleStartCapture}
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
                    >
                      <Video className="w-4 h-4" />
                      <span>Start Capture Session</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Privacy Notice Card */}
      <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-slate-300">Privacy Notice:</strong> Please use gameplay recordings that you have the right to use for analysis. Video data is processed for post-match tactical evaluation and can be deleted at any time in Profile settings.
        </p>
      </div>
    </div>
  );
};
