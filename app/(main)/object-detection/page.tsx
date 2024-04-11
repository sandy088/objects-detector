"use client";

import("@tensorflow/tfjs-backend-cpu");
import("@tensorflow/tfjs-backend-webgl");
import "@tensorflow-models/coco-ssd";
import { load } from "@tensorflow-models/coco-ssd";

import { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import { useShowVideo } from "@/hooks/use-show-video";
import { runObjectDetection } from "@/utils/run-object-detection";
import { Loader } from "@/components/loader";
import { CustomButton } from "@/components/custom-button";
import { CameraOff } from "lucide-react";
import { toast } from "sonner";
export default function Home() {
  const [loading, setLoading] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const webref = useRef<Webcam>(null);

  const showmyVideo = useShowVideo(webref);

  let detectInterval: NodeJS.Timeout | null = null;
  async function runCoco() {
    setLoading(true);
    const net = await load()
      .then((model) => {
        toast.success("Model loaded successfully");
        console.log("model", model);
        return model;
      })
      .catch((err) => {
        toast.error("Error loading model");
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });

    if (!net) return;

    detectInterval = setInterval(() => {
      if (typeof net === "undefined") return;
      runObjectDetection({ net, webref, canvasRef }); // will build this next
    }, 10);
  }

  useEffect(() => {
    runCoco();
    showmyVideo();
  }, []);

  return (
    <div className=" dark:bg-[#222222] flex flex-col justify-center items-center bg-slate-50 min-h-screen max-w-screen overflow-x-hidden">
      <h1 className=" font-bold md:text-6xl text-2xl max-w-[1031px] text-center mb-5 mt-10">
        Object Detection 🔎
      </h1>
      {loading ? (
        <div className="my-7 w-[750px] rounded-lg h-[450px] dark:bg-[#282B2D] bg-secondary flex justify-center items-center">
          <div>
            <Loader />
            Loading model...
          </div>
        </div>
      ) : (
        <div className=" relative my-7">
          {isCameraOn ? (
            <div className=" min-h-[450px]">
              <Webcam ref={webref} className=" rounded-lg" muted />
              <canvas
                ref={canvasRef}
                className="absolute h-full w-full top-0 left-0 rounded-lg z-[99999]"
              />
            </div>
          ) : (
            <div className="mt-7 mb-1 w-[750px] rounded-lg h-[450px] dark:bg-[#282B2D] bg-secondary flex flex-col gap-y-4 justify-center items-center">
              <CameraOff className=" h-20 w-20 mr-4" />
              <div>Please Turn on the Camera</div>
            </div>
          )}
        </div>
      )}
      <div className=" flex my-2 gap-4">
        <CustomButton
          color="#DE6860"
          text={isCameraOn ? "Turn Off Camera" : "Turn On Camera"}
          onAction={() => setIsCameraOn((state) => !state)}
          isActive={isCameraOn}
        />
      </div>
    </div>
  );
}
