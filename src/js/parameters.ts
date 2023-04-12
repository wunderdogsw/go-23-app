const DEFAULT_VALUES = {
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
  cameraZ: 6,
  cameraZoom: 100,
  amountShapes: 3,
  minPosesScore: 20,
  videoDeviceId: '',
};

const PARAMETERS_KEY = 'parameters';

const EMPTY_JSON = '{}';

export function initParameters() {
  const parameters = window.localStorage.getItem(PARAMETERS_KEY);
  const hasParameters = !!parameters;
  if (hasParameters) {
    return;
  }

  setDefaultParameters();
}

export function setDefaultParameters() {
  const defaultValues = JSON.stringify(DEFAULT_VALUES);
  window.localStorage.setItem(PARAMETERS_KEY, defaultValues);
}

export function getParameters() {
  const json = window.localStorage.getItem(PARAMETERS_KEY) ?? EMPTY_JSON;
  return JSON.parse(json);
}

export function setParameters(parameters: any) {
  const json = JSON.stringify(parameters);
  window.localStorage.setItem(PARAMETERS_KEY, json);
}
