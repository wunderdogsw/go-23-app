import hotkeys from 'hotkeys-js';

import { getSelectedVideoInputDeviceId, getVideoInputDevices } from './media';
import { getParameters, setDefaultParameters, setParameters } from './parameters';
import { convertFormToJson, createSelectOption, getQueryStringValue, setInputValueByName } from './utils/browser';

export async function initControls({ onSubmit }: any) {
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
  // @ts-expect-error TS(2488): Type 'NodeListOf<HTMLElement>' must have a '[Symbo... Remove this comment to see the full error message
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

function initEventHandlers(onSubmit: any) {
  const controls = document.getElementById('controls');
  // @ts-expect-error TS(2531): Object is possibly 'null'.
  controls.onsubmit = (event) => submitControlsForm(event, onSubmit);

  const resetButton = document.getElementById('reset');
  // @ts-expect-error TS(2531): Object is possibly 'null'.
  resetButton.onclick = () => resetInputValues(onSubmit);
}

function submitControlsForm(event: any, onSubmit: any) {
  event.preventDefault();

  const parameters = convertFormToJson(event.target);
  setParameters(parameters);
  onSubmit();
}

function resetInputValues(onSubmit: any) {
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
  // @ts-expect-error TS(2531): Object is possibly 'null'.
  controls.classList.toggle('hidden');
}
