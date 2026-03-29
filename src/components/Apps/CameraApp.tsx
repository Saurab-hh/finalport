import React, { useRef, useState, useEffect } from 'react';
import { Camera, RefreshCw, Download, Trash2, VideoOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CameraApp = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isFlashing, setIsFlashing] = useState(false);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setError(null);
    } catch (err: any) {
      setError("Camera access denied or no camera found.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/png');
        setPhotos(prev => [dataUrl, ...prev]);
        
        // Flash effect
        setIsFlashing(true);
        setTimeout(() => setIsFlashing(false), 150);
      }
    }
  };

  const deletePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col h-full bg-[#111] text-white font-sans overflow-hidden">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 bg-black/40 backdrop-blur-md border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2 font-medium">
          <Camera size={18} className="text-blue-400" /> Web Camera
        </div>
        <button 
          onClick={stream ? stopCamera : startCamera} 
          className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition"
        >
          {stream ? <><VideoOff size={16} /> Stop</> : <><RefreshCw size={16} /> Start</>}
        </button>
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* Main Viewfinder */}
        <div className="flex-1 p-6 flex flex-col items-center justify-center relative bg-black">
          {error ? (
            <div className="text-center text-gray-400 flex flex-col items-center">
              <VideoOff size={48} className="mb-4 text-red-400/50" />
              <p>{error}</p>
              <button onClick={startCamera} className="mt-4 px-4 py-2 bg-blue-600 rounded-lg text-white">Retry Permissions</button>
            </div>
          ) : (
            <div className="relative w-full max-w-2xl aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted 
                className={`w-full h-full object-cover transform -scale-x-100 ${!stream ? 'hidden' : ''}`}
              />
              {!stream && !error && (
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  Initializing camera...
                </div>
              )}
              
              {/* Flash screen */}
              <AnimatePresence>
                {isFlashing && (
                  <motion.div 
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="absolute inset-0 bg-white" 
                  />
                )}
              </AnimatePresence>

              {/* Viewfinder Target */}
              <div className="absolute inset-0 pointer-events-none border-[2px] border-white/10 m-8 rounded-xl flex items-center justify-center">
                 <div className="w-12 h-12 border-t-2 border-l-2 border-white/50 absolute top-0 left-0" />
                 <div className="w-12 h-12 border-t-2 border-r-2 border-white/50 absolute top-0 right-0" />
                 <div className="w-12 h-12 border-b-2 border-l-2 border-white/50 absolute bottom-0 left-0" />
                 <div className="w-12 h-12 border-b-2 border-r-2 border-white/50 absolute bottom-0 right-0" />
              </div>
            </div>
          )}

          {/* Shutter Button and Action Area */}
          <div className="mt-8 flex flex-col items-center justify-center gap-4 h-32">
            <button 
              onClick={takePhoto}
              disabled={!stream}
              className="w-16 h-16 rounded-full border-[4px] border-gray-400 flex items-center justify-center group disabled:opacity-50 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)] shrink-0"
            >
              <div className="w-12 h-12 bg-white rounded-full transition-transform group-hover:scale-90 group-active:scale-75" />
            </button>
            {photos.length > 0 && (
              <a 
                href={photos[0]} 
                download={`capture-${Date.now()}.png`} 
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-full text-sm font-medium transition shadow-lg"
              >
                <Download size={16} /> Download Latest Photo
              </a>
            )}
          </div>
        </div>

        {/* Gallery Sidebar */}
        <div className="w-full md:w-64 lg:w-80 bg-[#151515] border-l border-white/5 flex flex-col">
          <div className="p-4 border-b border-white/5 font-medium flex justify-between items-center text-sm">
            <span>Camera Roll</span>
            <span className="text-gray-500 text-xs">{photos.length} item(s)</span>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
            {photos.length === 0 ? (
              <div className="h-full flex items-center justify-center text-gray-500 text-sm italic">
                No photos captured yet.
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-2 gap-3">
                <AnimatePresence>
                  {photos.map((photo, i) => (
                    <motion.div 
                      key={photo}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="group relative aspect-square bg-gray-900 rounded-xl overflow-hidden shadow-md border border-white/10"
                    >
                      <img src={photo} className="w-full h-full object-cover transform -scale-x-100" alt="Captured" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                        <a href={photo} download={`capture-${Date.now()}.png`} className="p-1.5 bg-blue-600 rounded-md hover:bg-blue-500 transition text-white">
                          <Download size={14} />
                        </a>
                        <button onClick={() => deletePhoto(i)} className="p-1.5 bg-red-600 rounded-md hover:bg-red-500 transition text-white">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};
