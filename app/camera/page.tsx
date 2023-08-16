"use client";
import React, { useRef, useEffect } from "react";
import { handleVideo, loadModels } from "../api";

const page = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((currentStream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = currentStream;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    startVideo();
    videoRef && loadModels();
    handleVideo(videoRef, canvasRef);
  }, []);
  return (
    <div className="h-screen w-full bg-neutral-500">
      <div className="flex justify-center items-center font-bold text-2xl text-white pt-5">
        <h1>Face Detection</h1>
      </div>
      <div className="flex justify-center items-center w-full h-4/5 mt-4">
        <video autoPlay crossOrigin="anonymous" ref={videoRef}></video>
        <canvas ref={canvasRef} width="700" height="650" className="canvas" />
      </div>
    </div>
  );
};

export default page;
