import { ObjectDetection } from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import { renderPredictions } from "./render-predictions";

interface RunObjectDetectionProps {
  net: ObjectDetection;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  webref: React.RefObject<Webcam>;

}
export async function runObjectDetection({net, canvasRef, webref}: RunObjectDetectionProps) {
    if (
      canvasRef.current &&
      webref.current &&
      webref?.current?.video?.readyState === 4
    ) {
      canvasRef.current.width = webref.current.video.videoWidth;
      canvasRef.current.height = webref.current.video.videoHeight;
      // find detected objects
      const detectedObjects = await net.detect(
        webref.current.video,
        undefined,
        0.6
      );

      console.log("hey am here", detectedObjects);

      const context = canvasRef.current.getContext("2d");
      renderPredictions(detectedObjects, context!);
    }
  }