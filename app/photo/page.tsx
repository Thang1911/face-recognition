"use client";
import React, { useEffect, useRef, useState } from "react";
import { loadModels, handleImage } from "../api";
import Image from "next/image";
import { useRouter } from "next/navigation";

const page = () => {

  const canvasRef2 = useRef<HTMLCanvasElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);
  const [imageURL2, setImageURL2] = useState<string | null>(null);
  const [face2, setFace2] = useState<boolean>(false);

  const router = useRouter();

  const init = async () => {
    loadModels();
  };

  useEffect(() => {
    init();
  }, []);

  const handleFileChange2 = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      const hasFace = await handleImage(file, canvasRef2);
      setImageURL2(URL.createObjectURL(file));

      if (hasFace) {
        setFace2(true);
      } else {
        setFace2(false);
      }
    }
  };

  const handleClick2 = () => {
    inputRef2.current?.click();
  };

  const checkFace = () => {
    if (face2) {
      alert("Hình ảnh đã chọn có khuôn mặt!");
      router.push("/camera");
    } else {
      alert("Vui lòng chọn ảnh có khuôn mặt!");
    }
  };

  return (
    <div className="h-screen w-full bg-neutral-700">
      <div className="flex justify-center items-center font-bold text-2xl text-white pt-5">
        <h1>Face Recognition</h1>
      </div>
      <div className="flex flex-wrap justify-around w-full h-3/4">
        <div className="mb-4">
          <input
            type="file"
            onChange={handleFileChange2}
            className="hidden"
            ref={inputRef2}
          />
          <button
            onClick={handleClick2}
            className="p-bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded "
          >
            Choose file
          </button>

          <div
            style={{ position: "relative", width: "300px", height: "300px" }}
          >
            <Image
              src={imageURL2 || "/default.jpeg"}
              alt="Hình ảnh đã chọn"
              layout="fill"
              objectFit="contain"
              style={{ zIndex: 0 }}
            />
            <canvas ref={canvasRef2} className="canvasImage" />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={checkFace}
          className="p-bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded "
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default page;
