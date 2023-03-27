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
  if (supportLocalStorage()) {
    try {
      window.localStorage.setItem(key, value);
      return true;
    } catch (e) {
      throw new TypeError('Exceeded Storage Quota!');
    }
  }

  throw new TypeError('No support. Use a fallback such as browser cookies or store on the server.');
}

export function getLocalStorageKey(key) {
  try {
    const data = window.localStorage.getItem(key);
    if (data && typeof data === 'object') {
      return JSON.parse(data);
    }
    return data;
  } catch (e) {
    return null;
  }
}

export function clearLocalStorage() {
  try {
    window.localStorage.clear();
    return true;
  } catch (e) {
    return false;
  }
}

export function resetControlInputs() {
  for (const parameterName of Object.keys(DEFAULT_INPUT_CONTROLS)) {
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

function supportLocalStorage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}
