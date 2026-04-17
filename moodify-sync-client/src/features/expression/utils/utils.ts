import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

type InitProps = {
  landmarkerRef: React.MutableRefObject<FaceLandmarker | null>;
  videoRef: React.MutableRefObject<HTMLVideoElement | null>;
  streamRef: React.MutableRefObject<MediaStream | null>;
};

export const init = async ({
  landmarkerRef,
  videoRef,
  streamRef,
}: InitProps) => {
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm",
  );

  landmarkerRef.current = await FaceLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task",
    },
    outputFaceBlendshapes: true,
    runningMode: "VIDEO",
    numFaces: 1,
  });

  streamRef.current = await navigator.mediaDevices.getUserMedia({
    video: true,
  });

  if (!videoRef.current) return;

  videoRef.current.srcObject = streamRef.current;
  await videoRef.current.play();
};

type DetectProps = {
  landmarkerRef: React.MutableRefObject<FaceLandmarker | null>;
  videoRef: React.MutableRefObject<HTMLVideoElement | null>;
  setExpression: React.Dispatch<React.SetStateAction<string>>;
};

export const detect = ({
  landmarkerRef,
  videoRef,
  setExpression,
}: DetectProps) => {
  if (!landmarkerRef.current || !videoRef.current) return;

  const results = landmarkerRef.current.detectForVideo(
    videoRef.current,
    performance.now(),
  );

  if (results.faceBlendshapes?.length > 0) {
    const blendshapes = results.faceBlendshapes[0].categories;

    const getScore = (name: string): number =>
      blendshapes.find((b) => b.categoryName === name)?.score || 0;

    const smileLeft = getScore("mouthSmileLeft");
    const smileRight = getScore("mouthSmileRight");
    const jawOpen = getScore("jawOpen");
    const browUp = getScore("browInnerUp");
    const frownLeft = getScore("mouthFrownLeft");
    const frownRight = getScore("mouthFrownRight");
    const eyeSquintLeft = getScore("eyeSquintLeft");
    const eyeSquintRight = getScore("eyeSquintRight");
    const browDownLeft = getScore("browDownLeft");
    const browDownRight = getScore("browDownRight");
    const mouthPressLeft = getScore("mouthPressLeft");
    const mouthPressRight = getScore("mouthPressRight");

    console.log(getScore("mouthFrownLeft"));

    let currentExpression = "Neutral";
    if (
      smileLeft > 0.6 &&
      smileRight > 0.6 &&
      eyeSquintLeft > 0.3 &&
      eyeSquintRight > 0.3
    ) {
      currentExpression = "love";
    } else if (smileLeft > 0.5 && smileRight > 0.5) {
      // 😀 HAPPY
      currentExpression = "happy";
    } else if (jawOpen > 0.2 && browUp > 0.2) {
      currentExpression = "surprised";
    } else if (
      (browDownLeft > 0.2 || browDownRight > 0.2) &&
      (mouthPressLeft > 0.1 || mouthPressRight > 0.1)
    ) {
      currentExpression = "angry";
    } else if (frownLeft > 0.0001 && frownRight > 0.0001) {
      currentExpression = "sad";
    }

    setExpression(currentExpression);

    return currentExpression;
  }
};
