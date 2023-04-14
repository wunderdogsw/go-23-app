import hotkeys from 'hotkeys-js';

import { getSelectedVideoInputDeviceId, getVideoInputDevices } from './media';
import { getParameters, setDefaultParameters, setParameters } from './parameters';
import { convertFormToJson, createSelectOption, getQueryStringValue, setInputValueByName } from './utils/browser';

type OnSubmitType = () => void;
type InitControlsParamsType = {
  onSubmit: OnSubmitType;
};
export async function initControls({ onSubmit }: InitControlsParamsType) {
  initInputValues();
  await initVideoInput();
  initEventHandlers(onSubmit);
  initToggle();
}

function initInputValues() {
  const parameters = getParameters();
  Object.entries(parameters).forEach(([name, value]) => setInputValueByName(name, value));
}

async function initVideoInput() {
  const [videoInputControl] = document.getElementsByName('videoDeviceId');
  if (!videoInputControl) {
    throw Error(`Haven't found video control input name videoDeviceId`);
  }

  const videoInputDevices = await getVideoInputDevices();
  const selectedVideoDeviceId = await getSelectedVideoInputDeviceId();

  videoInputDevices.forEach(({ deviceId, label }) => {
    const option = createSelectOption(label, deviceId, selectedVideoDeviceId);
    videoInputControl.appendChild(option);
  });
}

function initEventHandlers(onSubmit: OnSubmitType) {
  const controls = document.getElementById('controls');
  const resetButton = document.getElementById('reset');

  if (!controls || !resetButton) {
    throw Error('Form controls and reset button not found :(');
  }

  controls.onsubmit = (event) => submitControlsForm(event, onSubmit);
  resetButton.onclick = () => resetInputValues(onSubmit);
}

function submitControlsForm(event: SubmitEvent, onSubmit: OnSubmitType) {
  event.preventDefault();

  const parameters = convertFormToJson(event.target as HTMLFormElement);
  setParameters(parameters);
  onSubmit();
}

function resetInputValues(onSubmit: OnSubmitType) {
  setDefaultParameters();
  initInputValues();
  onSubmit();
}

function initToggle() {
  const controlsQueryString = getQueryStringValue('controls');
  if (!!controlsQueryString) {
    toggleControls();
  }

  hotkeys('ctrl+k, command+k', () => toggleControls());
}

function toggleControls() {
  const controls = document.getElementById('controls');
  if (!controls) {
    throw Error('Form controls not found');
  }

  controls.classList.toggle('hidden');
}
