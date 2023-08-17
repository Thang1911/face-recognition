"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import ReactLoading from "react-loading";
import { handleImageLove, loadModels } from "../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const page = () => {
  const maleInputRef = useRef<HTMLInputElement>(null);
  const femaleInputRef = useRef<HTMLInputElement>(null);
  const [maleImage, setMaleImage] = useState<string | null>(null);
  const [femaleImage, setFemaleImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean | null>(false);
  const [face1, setFace1] = useState<boolean | null>(false);
  const [face2, setFace2] = useState<boolean | null>(false);

  const handleChangeImage = (event: any, setImage: any) => {
    const imageFile = event.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    setImage(imageUrl);
  };

  const init = async () => {
    loadModels();
  };

  useEffect(() => {
    init();
  }, []);

  const handleLoading = () => {
    if (isLoading) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "right",
            alignItems: "center",
          }}
        >
          <ReactLoading type={"bars"} color={"#C0C0C0"} />
        </div>
      );
    }
    return null;
  };

  const handleCheck = async (image1: string, image2: string) => {
    setIsLoading(true);
    try {
      const hasFace1 = await handleImageLove(image1);
      const hasFace2 = await handleImageLove(image2);
      setFace1(hasFace1);
      setFace2(hasFace2);
      setIsLoading(false);

      if (hasFace1 && hasFace2) {
        toast("Both images have face!");
      } else if (hasFace1 === true && hasFace2 === false) {
        toast(
          "The female image does not have a face. Please select another image!."
        );
      } else if (hasFace1 === false && hasFace2 === true) {
        toast(
          "The male image does not have a face. Please select another image!."
        );
      } else {
        toast("Both images don't have face! Please select another image!");
      }
    } catch (err) {
      setIsLoading(false);
      toast("An error occurred. Please try again later.", {
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    handleLoading();
  }, [isLoading]);

  function handleAgain() {
    setFemaleImage(null);
    setMaleImage(null);
  }

  return (
    <div className="flex flex-nowrap min-h-screen h-screen w-full">
      <div className="h-screen w-1/6 bg-red-300">
        <div className="h-1/2 w-full pt-36 sidebar">
          <li className="text-white mb-10">About</li>
          <li>History</li>
        </div>
      </div>
      <div className=" w-5/6 h-screen">
        <header className="bg-red-300 w-full h-1/5 flex justify-center items-center cursor-pointer">
          <p className="text-[100px] font-normal m-0 leading-[171px]">
            Future Love
          </p>
          <Image
            src="/Screenshot_1.png"
            className="bg-no-repeat bg-center transition-transform duration-300 transform-origin-center transform hover:scale-150"
            alt="Future Love"
            width={60}
            height={40}
          />
        </header>
        <div className="flex h-4/5 w-full justify-evenly content-center items-center relative">
          <div className="w-1/2 h-full">
            <div className=" top-0 left-0 right-0 flex flex-col items-center pt-10 ps-52">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => maleInputRef.current?.click()}
              >
                Choose Male Image
              </button>
              <div className="w-[300px] h-[300px] relative">
                <div
                  className="bg-red-300 w-full h-full rounded-full flex justify-center items-center"
                  style={{ margin: "6px" }}
                >
                  <div className="rounded-full w-5/6 h-5/6 bg-white relative overflow-hidden">
                    <input
                      type="file"
                      ref={maleInputRef}
                      className="w-full h-full absolute inset-0 cursor-pointer hidden z-10"
                      onChange={(e) => handleChangeImage(e, setMaleImage)}
                    />
                    {maleImage && (
                      <div
                        className="w-full h-full absolute inset-0"
                        style={{
                          backgroundImage: `url(${maleImage})`,
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div>
              <Image
                src="/Screenshot_1.png"
                className="bg-no-repeat bg-center transition-transform duration-300 transform-origin-center transform hover:scale-150 pb-20"
                alt="Future Love"
                width={100}
                height={80}
              />
            </div>

            <div>
              <div>
                {isLoading ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "right",
                      alignItems: "center",
                    }}
                  >
                    <ReactLoading type={"bars"} color={"#C0C0C0"} />
                  </div>
                ) : (
                  <button
                    onClick={() => handleCheck(maleImage!, femaleImage!)}
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                  >
                    {face1 && face2 ? "Try Again" : "Start"}
                  </button>
                )}

                {!isLoading && (!face1 || !face2) && (
                  <button
                    onClick={handleAgain}
                    className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded mt-2"
                  >
                    Try Again
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="w-1/2 h-full">
            <div className="top-0 left-0 right-0 flex flex-col items-center pt-10 pe-52">
              <button
                className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
                onClick={() => femaleInputRef.current?.click()}
              >
                Choose Female Image
              </button>
              <div className="w-[300px] h-[300px] relative">
                <div
                  className="bg-red-300 w-full h-full rounded-full flex justify-center items-center"
                  style={{ margin: "6px" }}
                >
                  <div className="rounded-full w-5/6 h-5/6 bg-white relative overflow-hidden">
                    <input
                      type="file"
                      ref={femaleInputRef}
                      className="w-full h-full absolute inset-0 cursor-pointer hidden z-10"
                      onChange={(e) => handleChangeImage(e, setFemaleImage)}
                    />
                    {femaleImage && (
                      <div
                        className="w-full h-full absolute inset-0"
                        style={{
                          backgroundImage: `url(${femaleImage})`,
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default page;
