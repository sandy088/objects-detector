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

export default function Home() {
  const [loading, setLoading] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const webref = useRef<Webcam>(null);
  const showmyVideo = useShowVideo(webref);

  let detectInterval;
  async function runCoco() {
    setLoading(true);
    const net = await load()
      .then((model) => {
        console.log("model", model);
        return model;
      })
      .catch((err) => {
        console.log("err", err);
      });

    console.log("net", net);
    setLoading(false);

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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className=" text-3xl font-bold">Objects Detector</h1>
      <div className=" relative">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <Webcam ref={webref} className=" rounded-lg" muted />
            <canvas
              ref={canvasRef}
              className="absolute h-full w-full top-0 left-0 rounded-lg z-[99999]"
            />
          </>
        )}
      </div>
    </main>
  );
}
