import { isNumeric } from './maths.js';

export function getQueryStringValue(key) {
  return new URLSearchParams(window.location.search).get(key);
}

export function createSelectOption(label, value, selectedValue) {
  const option = document.createElement('option');
  option.value = value;
  option.textContent = label;

  if (value === selectedValue) {
    option.selected = true;
  }

  return option;
}

export function setInputValueByName(name, value) {
  const [element] = document.getElementsByName(name);
  if (!element) {
    console.warn(`Didn't find input name ${name}`);
    return;
  }

  element.value = value;
}

export function convertFormToJson(form) {
  const formData = new FormData(form);
  const entries = formData.entries();
  const json = {};

  for (const [key, value] of entries) {
    const isNumber = isNumeric(value);
    json[key] = isNumber ? parseFloat(value) : value;
  }

  return json;
}
