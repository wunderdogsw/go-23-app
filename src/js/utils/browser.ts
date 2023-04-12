import { isNumeric } from './maths';

export function getQueryStringValue(key: any) {
  return new URLSearchParams(window.location.search).get(key);
}

export function createSelectOption(label: any, value: any, selectedValue: any) {
  const option = document.createElement('option');
  option.value = value;
  option.textContent = label;

  if (value === selectedValue) {
    option.selected = true;
  }

  return option;
}

export function setInputValueByName(name: any, value: any) {
  // @ts-expect-error TS(2488): Type 'NodeListOf<HTMLElement>' must have a '[Symbo... Remove this comment to see the full error message
  const [element] = document.getElementsByName(name);
  if (!element) {
    console.warn(`Didn't find input name ${name}`);
    return;
  }

  element.value = value;
}

export function convertFormToJson(form: any) {
  const formData = new FormData(form);
  // @ts-expect-error TS(2339): Property 'entries' does not exist on type 'FormDat... Remove this comment to see the full error message
  const entries = formData.entries();
  const json = {};

  for (const [key, value] of entries) {
    const isNumber = isNumeric(value);
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    json[key] = isNumber ? parseFloat(value) : value;
  }

  return json;
}
