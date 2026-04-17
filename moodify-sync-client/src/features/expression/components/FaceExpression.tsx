import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utils";
import type { FaceLandmarker } from "@mediapipe/tasks-vision";

const FaceExpression = ({
  onClick,
}: {
  onClick?: (expression: string) => void;
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const landmarkerRef = useRef<FaceLandmarker | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [expression, setExpression] = useState("Detecting...");

  useEffect(() => {
    init({ landmarkerRef, videoRef, streamRef });

    return () => {
      landmarkerRef.current?.close();

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleClick = () => {
    const exp = detect({ landmarkerRef, videoRef, setExpression });

    if (!exp) return;

    console.log(exp);
    onClick?.(exp);
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <video
          ref={videoRef}
          style={{ width: "400px", borderRadius: "12px" }}
          playsInline
        />
        <h2>{expression}</h2>
        <button onClick={handleClick}>Detect expression</button>
      </div>
    </>
  );
};

export default FaceExpression;
