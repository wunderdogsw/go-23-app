export const POSE_KEYPOINT_NAMES = [
  "nose", "left_eye_inner", "left_eye", "left_eye_outer", "right_eye_inner",
  "right_eye", "right_eye_outer", "left_ear", "right_ear", "mouth_left",
  "mouth_right", "left_shoulder", "right_shoulder", "left_elbow", "right_elbow",
  "left_wrist", "right_wrist", "left_pinky", "right_pinky", "left_index",
  "right_index", "left_thumb", "right_thumb", "left_hip",  "right_hip",
  "left_knee", "right_knee", "left_ankle",  "right_ankle", "left_heel",
  "right_heel", "left_foot_index", "right_foot_index"
]

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
