import * as faceapi from "face-api.js";

export const loadModels = async () => {
  await Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
    faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
    faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
    faceapi.nets.faceExpressionNet.loadFromUri("/models"),
  ]);
};

// const loadTrainingData = async () => {
//   const labels = ["Oscar"];
//   const faceDescriptors = [];
//   for (const label of labels) {
//     const descriptors: Float32Array[] = [];
//     for (let i = 1; i <= 4; i++) {
//       const image = await faceapi.fetchImage(`/photo/data/${label}/${i}.jpg`);
//       const detection = await faceapi
//         .detectSingleFace(image)
//         .withFaceLandmarks()
//         .withFaceDescriptor();
//       if (detection?.descriptor) {
//         descriptors.push(detection.descriptor);
//       }
//     }
//     if (descriptors.length > 0) {
//       faceDescriptors.push(
//         new faceapi.LabeledFaceDescriptors(label, descriptors)
//       );
//     }
//     return faceDescriptors;
//   }
// };

export const handleImage = async (
  file: any,
  canvasRef: React.RefObject<HTMLCanvasElement>
) => {
  const image = await faceapi.bufferToImage(file);

  if (!canvasRef.current) return;

  const canvas = canvasRef.current;
  const context = canvas.getContext("2d");

  if (!context) return;

  const imageSize = {
    width: image.width,
    height: image.height,
  };

  canvas.width = imageSize.width;
  canvas.height = imageSize.height;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, 0, 0, canvas.width, canvas.height);

  const detections = await faceapi
    .detectAllFaces(image)
    .withFaceLandmarks()
    .withFaceDescriptors();
  const resizeDetection = faceapi.resizeResults(detections, imageSize);

  const hasFace = resizeDetection.length > 0;

  for (const detection of resizeDetection) {
    const box = detection.detection.box;
    const drawBox = new faceapi.draw.DrawBox(box, { label: 'face' });
    drawBox.draw(canvas);
  }
  return hasFace;
};

export const handleVideo = (ref1: any, ref2: any) => {
  setInterval(async () => {
    const detections = await faceapi
      .detectAllFaces(ref1.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();


    ref2.current.innerHtml = faceapi.createCanvasFromMedia(
      ref1.current
    );
    faceapi.matchDimensions(ref2.current, {
      width: 940,
      height: 650,
    });

    const resized = faceapi.resizeResults(detections, {
      width: 940,
      height: 650,
    });

    faceapi.draw.drawDetections(ref2.current, resized);
    faceapi.draw.drawFaceLandmarks(ref2.current, resized);
    faceapi.draw.drawFaceExpressions(ref2.current, resized);
  }, 1000);
}