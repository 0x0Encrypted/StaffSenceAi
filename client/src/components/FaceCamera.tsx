import React, { useRef, useCallback, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { cn } from "@/lib/utils";
import { ScanFace, Loader2 } from "lucide-react";

interface FaceCameraProps {
  onCapture?: (imageSrc: string) => void;
  mode?: "attendance" | "register";
  detectedName?: string;
  isScanning?: boolean;
  className?: string;
}

export const FaceCamera: React.FC<FaceCameraProps> = ({ 
  onCapture, 
  mode = "attendance", 
  detectedName, 
  isScanning = true,
  className 
}) => {
  const webcamRef = useRef<Webcam>(null);
  const [simulatedScan, setSimulatedScan] = useState(false);

  // Simulate face scanning animation
  useEffect(() => {
    if (isScanning) {
      const interval = setInterval(() => {
        setSimulatedScan(prev => !prev);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isScanning]);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc && onCapture) {
      onCapture(imageSrc);
    }
  }, [webcamRef, onCapture]);

  return (
    <div className={cn("relative rounded-lg overflow-hidden bg-black aspect-video shadow-lg border-2 border-border", className)}>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="w-full h-full object-cover"
        videoConstraints={{
          facingMode: "user"
        }}
      />
      
      {/* Face Detection Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className={cn(
          "w-64 h-64 border-2 rounded-full transition-colors duration-500 flex items-center justify-center relative",
          detectedName ? "border-green-500 bg-green-500/10" : "border-white/50"
        )}>
          {isScanning && !detectedName && (
            <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin" />
          )}
          
          <ScanFace className={cn(
            "w-12 h-12 transition-colors duration-300",
            detectedName ? "text-green-500" : "text-white/50"
          )} />
          
          {/* Corner brackets simulating viewfinder */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/70 -mt-1 -ml-1"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/70 -mt-1 -mr-1"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/70 -mb-1 -ml-1"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/70 -mb-1 -mr-1"></div>
        </div>
      </div>

      {/* Status Overlay */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        <div className="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full text-white flex items-center gap-2">
          {detectedName ? (
            <>
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="font-semibold">Detected: {detectedName}</span>
            </>
          ) : (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
              <span className="text-sm font-medium">Scanning for faces...</span>
            </>
          )}
        </div>
      </div>
      
      {/* Registration Mode Capture Button */}
      {mode === "register" && (
        <div className="absolute bottom-4 right-4">
          <button 
            onClick={capture}
            className="bg-white text-black hover:bg-gray-200 px-4 py-2 rounded-full font-medium text-sm transition-colors"
          >
            Capture Sample
          </button>
        </div>
      )}
    </div>
  );
};
