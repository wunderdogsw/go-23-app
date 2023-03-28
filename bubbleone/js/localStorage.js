export const DEFAULT_INPUT_CONTROLS = {
  torsoOffsetPercentage: 3,
  torsoThickCount: 120,
  torsoThickRadius: 0.4,
  torsoMediumCount: 8,
  torsoMediumRadius: 0.2,
  torsoSmallCount: 15,
  torsoSmallRadius: 0.1,
  limbsOffsetPercentage: 1,
  limbsThickCount: 60,
  limbsThickRadius: 0.4,
  limbsMediumCount: 8,
  limbsMediumRadius: 0.2,
  limbsSmallCount: 15,
  limbsSmallRadius: 0.05,
  camera_z: 6,
  camera_zoom: 100,
};

export function setLocalStorageKey(key, value) {
  window.localStorage.setItem(key, value);
}

export function getLocalStorageKey(key) {
  return window.localStorage.getItem(key) || DEFAULT_INPUT_CONTROLS[key];
}

export function clearLocalStorage() {
  window.localStorage.clear();
}

export function resetParameters() {
  for (const parameterName of Object.keys(DEFAULT_INPUT_CONTROLS)) {
    setLocalStorageKey(parameterName, DEFAULT_INPUT_CONTROLS[parameterName]);
    document.getElementById(parameterName).value = DEFAULT_INPUT_CONTROLS[parameterName];
  }
}

export function initControlInputs() {
  for (const parameterName of Object.keys(DEFAULT_INPUT_CONTROLS)) {
    document.getElementById(parameterName).value =
      getLocalStorageKey(parameterName) || DEFAULT_INPUT_CONTROLS[parameterName];
  }
}

export function updateControlInputs() {
  for (const parameterName of Object.keys(DEFAULT_INPUT_CONTROLS)) {
    setLocalStorageKey(
      parameterName,
      document.getElementById(parameterName).value || DEFAULT_INPUT_CONTROLS[parameterName]
    );
  }
}
