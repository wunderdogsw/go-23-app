export async function getDetector() {
  try {
    const model = poseDetection.SupportedModels.BlazePose;
    const detectorConfig = {
      runtime: 'mediapipe',
      solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/pose'
    };
    return await poseDetection.createDetector(model, detectorConfig);
  }
  catch(error) {
    console.error(error)
  }
}

export async function getSegementer() {
  try {
    const model = bodySegmentation.SupportedModels.MediaPipeSelfieSegmentation;
    const segmenterConfig = {
      runtime: 'mediapipe', // or 'tfjs'
      solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation',
      modelType: 'general'
    }
    return await bodySegmentation.createSegmenter(model, segmenterConfig);
  }
  catch (error) {
    console.error(error)
  }
}

const BITS_PER_PIXEL = 4;

function getImageDataPixel(data, width, x, y) {
  const index = y * width * BITS_PER_PIXEL + x * BITS_PER_PIXEL;
  return data.slice(index, index + BITS_PER_PIXEL)
}

async function getPersonData(person) {
  const { mask, maskValueToLabel } = person;
  const imageData = await mask.toImageData();
  const { width, height, data } = imageData

  const personData = []

  for (let y = 0; y < height; y++) {
    const row = []

    for (let x = 0; x < width; x++) {
      const pixel = getImageDataPixel(data, width, x, y)

      // The semantics of the RGBA values of the mask is as follows: the image
      // mask is the same size as the input image, where green and blue channels
      // are always set to 0. Different red values denote different body parts
      // (see maskValueToLabel key below). Different alpha values denote the
      // probability of pixel being a body part pixel (0 being lowest probability
      // and 255 being highest).
      // https://github.com/tensorflow/tfjs-models/tree/master/body-segmentation#how-to-run-it
      const red = pixel[0]
      const probability = pixel[3]
      const label = maskValueToLabel(red)
      row.push({ label, probability})
    }

    personData.push(row)
  }

  return personData;
}

 export async function getPeopleData(people) {
  const peopleData = []

  // use for look for amazing performance
  for (let i = 0; i < people.length; i++) {
    const person = people[i];
    const personData = await getPersonData(person);
    peopleData.push(personData);
  }

  return peopleData;
}
