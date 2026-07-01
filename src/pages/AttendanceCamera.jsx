import React, { useState, useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';
import { Camera, RefreshCw, CheckCircle2, AlertCircle, Loader2, ShieldCheck, MapPin } from "lucide-react";
import API from "../api/api";

export default function AttendanceCamera() {
  const videoRef = useRef(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [capturedDescriptor, setCapturedDescriptor] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [storedDescriptor, setStoredDescriptor] = useState("");
  const email = localStorage.getItem("email");

  // 1. Initial Status Check
  useEffect(() => {
    const checkFaceStatus = async () => {
      try {
        const res = await API.get("/employee/face-status");

        if(res.data.isFaceRegistered && res.data.faceData){
          try {
            const descriptorArray = new Float32Array(JSON.parse(res.data.faceData))
            setStoredDescriptor(descriptorArray)
          } catch (parseErr) {
            console.error("Parsing error:", parseErr);
          }
        }
        setIsRegistered(res.data.isFaceRegistered);
      } catch (err) {
        console.error("Status fetch error:", err);
      } finally {
        setCheckingStatus(false);
      }
    };
    checkFaceStatus();
  }, []);

  // 2. Load AI Models from CDN
  useEffect(() => {
    const loadModels = async () => {
      try {
        const MODEL_URL = "https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights";
        console.log("Loading AI Models...");
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
        await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
        setModelsLoaded(true);
        startVideo();
      } catch (err) {
        console.error("Model Load Error:", err);
        setStatus({ type: 'error', message: 'Model loading fail.' });
      }
    };
    loadModels();
  }, []);

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ 
      video: { width: 1280, height: 720, facingMode: "user" } 
    })
    .then((stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => videoRef.current.play();
      }
    })
    .catch((err) => {
      setStatus({ type: 'error', message: 'Camera access denied.' });
    });
  };

  // 3. REGISTRATION: Scan Face
  const handleScan = async () => {
    if (!videoRef.current) return;
    setIsProcessing(true);
    setStatus({ type: '', message: '' });
    try {
      const detection = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks().withFaceDescriptor();

      if (detection) {
        setCapturedDescriptor(Array.from(detection.descriptor));
        setPreviewMode(true);
        setStatus({ type: 'success', message: 'Face Scanned Successfully!' });
        if (videoRef.current.srcObject) {
          videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        }
      } else {
        setStatus({ type: 'error', message: 'Face detect nahi hua. Thoda roshni mein aayein.' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Scanning fail ho gayi.' });
    }
    setIsProcessing(false);
  };

  // 4. REGISTRATION: Save to Backend
  const submitRegistration = async () => {
    if (!capturedDescriptor) return;
    setIsProcessing(true);
    try {
      const faceDataString = JSON.stringify(capturedDescriptor);
      await API.put("/employee/enroll-face", faceDataString, {
        headers: { 'Content-Type': 'text/plain' }
      });
      setStatus({ type: 'success', message: 'Face Enrolled Successfully!' });
      setIsRegistered(true);
      setPreviewMode(false);
      startVideo(); // Restart camera for attendance mode
    } catch (err) {
      setStatus({ type: 'error', message: "Enrollment failed." });
    } finally {
      setIsProcessing(false);
    }
  };

  // 5. ATTENDANCE: Match Face + Get Location + Mark
  const handleMarkAttendance = async () => {
    if (!videoRef.current) return;
    setIsProcessing(true);
    // setStatus({ type: '', message: 'Verifying Identity & Location...' });

    try {
      const liveDetection = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks().withFaceDescriptor();

      if (!liveDetection) {
        setStatus({ type: 'error', message: 'Face is not detect.' });
        setIsProcessing(false);
        return;
      }

      const distance = faceapi.euclideanDistance(liveDetection.descriptor, storedDescriptor);

      if (distance < 0.5) {
        // Face Matched -> Now get Location
        navigator.geolocation.getCurrentPosition(async (position) => {
          try {
            await API.post("/employee/mark-attendance", {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
            setStatus({ type: 'success', message: 'Attendance Marked! Welcome.' });
          } catch (err) {
            setStatus({ type: 'error', message: 'Backend error marking attendance.' });
          }
        }, () => {
          setStatus({ type: 'error', message: 'GPS access denied! Location is required.' });
        });
      } else {
        setStatus({ type: 'error', message: 'Identity mismatch! Face is not matched.' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Verification error.' });
    }
    setIsProcessing(false);
  };

  // 6. UI Render Helpers
  const renderButtons = () => {
    if (isRegistered) {
      return (
        <button 
          onClick={handleMarkAttendance} 
          disabled={isProcessing}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-4 rounded-2xl font-bold shadow-xl transition-all active:scale-95 disabled:opacity-50"
        >
          {isProcessing ? <Loader2 className="animate-spin" /> : <ShieldCheck size={24} />}
          Mark My Attendance
        </button>
      );
    }
    return !previewMode ? (
      <button onClick={handleScan} disabled={isProcessing} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-2xl font-bold shadow-xl transition-all active:scale-95 disabled:opacity-50">
        {isProcessing ? <Loader2 className="animate-spin" /> : <Camera size={24} />}
        Scan Face for Registration
      </button>
    ) : (
      <div className="flex gap-4">
        <button onClick={() => { setPreviewMode(false); setStatus({type:'', message:''}); startVideo(); }} className="bg-slate-200 text-slate-700 px-8 py-4 rounded-2xl font-bold hover:bg-slate-300">
           <RefreshCw size={20} className="inline mr-2" /> Re-Scan
        </button>
        <button onClick={submitRegistration} disabled={isProcessing} className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-2xl font-bold shadow-xl flex items-center gap-2">
          {isProcessing ? <Loader2 className="animate-spin" /> : <CheckCircle2 size={24} />}
          Complete Registration
        </button>
      </div>
    );
  };

  if (checkingStatus) return <div className="h-screen flex items-center justify-center font-bold">Initializing System...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold dark:text-white flex items-center justify-center gap-3">
          <ShieldCheck className={isRegistered ? "text-emerald-600" : "text-indigo-600"} size={32} /> 
          {isRegistered ? "Attendance Portal" : "AI Face Registration"}
        </h2>
        <p className="text-slate-500 font-medium italic">Your privacy is protected. We only store numeric descriptors.</p>
      </div>

      {!modelsLoaded ? (
        <div className="h-[400px] flex flex-col items-center justify-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
          <Loader2 className="animate-spin text-indigo-600 mb-4" size={48} />
          <p className="text-slate-500 font-bold">Neural Networks are initializing...</p>
        </div>
      ) : (
        <div className="relative group">
          <div className="relative rounded-[3rem] overflow-hidden border-8 border-white dark:border-slate-800 shadow-2xl aspect-video bg-black flex items-center justify-center">
            
            <video ref={videoRef} autoPlay playsInline muted className={`w-full h-full object-cover ${previewMode ? 'opacity-30 blur-sm' : 'opacity-100'}`} />

            {/* THE AI SCANNING UI YOU LIKED */}
            {!previewMode && !status.message && (
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <div className={`w-64 h-64 border-2 ${isRegistered ? 'border-emerald-500/50' : 'border-indigo-500/50'} rounded-full border-dashed animate-[spin_10s_linear_infinite]`} />
                <div className="absolute w-56 h-56 border-4 border-white/30 rounded-full flex items-center justify-center overflow-hidden">
                    <div className={`w-full h-1 ${isRegistered ? 'bg-emerald-500/50' : 'bg-indigo-500/50'} animate-[bounce_2s_infinite]`} />
                </div>
              </div>
            )}

            {/* Status Overlay */}
            {status.message && (
              <div className="absolute inset-0 flex flex-col items-center justify-center backdrop-blur-sm transition-all">
                {status.type === 'success' ? <CheckCircle2 size={80} className="text-emerald-500 mb-4" /> : <AlertCircle size={80} className="text-rose-500 mb-4" />}
                <div className="bg-white dark:bg-slate-900 px-6 py-3 rounded-2xl shadow-2xl">
                  <p className={`text-lg font-bold ${status.type === 'success' ? 'text-emerald-600' : 'text-rose-600'}`}>{status.message}</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-center mt-8">
            {renderButtons()}
          </div>
        </div>
      )}

      {/* Info Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <InstructionBox icon="✨" text="Avoid bright backlights" />
        <InstructionBox icon="🚫" text="Remove face coverings" />
        <InstructionBox icon="⚡" text="Instant AI Recognition" />
      </div>
    </div>
  );
}

function InstructionBox({ icon, text }) {
  return (
    <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-3">
      <span className="text-2xl">{icon}</span>
      <p className="text-xs text-slate-500 font-bold uppercase">{text}</p>
    </div>
  );
}