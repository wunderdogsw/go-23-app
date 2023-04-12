import hotkeys from 'hotkeys-js';

import { getSelectedVideoInputDeviceId, getVideoInputDevices } from './media.js';
import { getParameters, setDefaultParameters, setParameters } from './parameters.js';
import { convertFormToJson, createSelectOption, getQueryStringValue, setInputValueByName } from './utils/browser.js';

export async function initControls({ onSubmit }) {
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
    console.warn(`Haven't found video control input name videoDeviceId`);
    return;
  }

  const videoInputDevices = await getVideoInputDevices();
  const selectedVideoDeviceId = await getSelectedVideoInputDeviceId();

  videoInputDevices.forEach(({ deviceId, label }) => {
    const option = createSelectOption(label, deviceId, selectedVideoDeviceId);
    videoInputControl.appendChild(option);
  });
}

function initEventHandlers(onSubmit) {
  const controls = document.getElementById('controls');
  controls.onsubmit = (event) => submitControlsForm(event, onSubmit);

  const resetButton = document.getElementById('reset');
  resetButton.onclick = () => resetInputValues(onSubmit);
}

function submitControlsForm(event, onSubmit) {
  event.preventDefault();

  const parameters = convertFormToJson(event.target);
  setParameters(parameters);
  onSubmit();
}

function resetInputValues(onSubmit) {
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
  controls.classList.toggle('hidden');
}
