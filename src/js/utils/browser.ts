import { isStringNumeric } from './maths';

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
  const elements = document.getElementsByName(name);
  if (!elements.length) {
    throw Error(`Didn't find input name ${name}`);
  }

  elements.forEach((element) => element.setAttribute('value', value));
}

export function convertFormToJson(form: any) {
  const formData = new FormData(form);
  const entries = formData.entries();
  const json: Record<string, unknown> = {};

  for (const [key, value] of entries) {
    const isNumeric = isStringNumeric(value);
    json[key] = isNumeric ? parseFloat(value.toString()) : value;
  }

  return json;
}
