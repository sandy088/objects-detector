import Webcam from "react-webcam";

export const useShowVideo = (webref: React.MutableRefObject<Webcam | null>) => {
    const showmyVideo = () => {
        if (webref.current !== null && webref.current.video?.readyState === 4) {
          const myVideoWidth = webref.current?.video.videoWidth;
          const myVideoHeight = webref.current?.video.videoHeight;
    
          webref.current.video.width = myVideoWidth;
          webref.current.video.height = myVideoHeight;
        }
      };

    return showmyVideo;
}