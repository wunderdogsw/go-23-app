import { isStringNumeric } from './maths';

export function getQueryStringValue(key: string): string | null {
  return new URLSearchParams(window.location.search).get(key);
}

export function createSelectOption(label: string, value: string, selectedValue: string): HTMLOptionElement {
  const option = document.createElement('option');
  option.value = value;
  option.textContent = label;

  if (value === selectedValue) {
    option.selected = true;
  }

  return option;
}

export function setInputValueByName(name: string, value: unknown) {
  const elements = document.getElementsByName(name);
  if (!elements.length) {
    throw Error(`Didn't find input name ${name}`);
  }

  elements.forEach((element) => {
    (element as HTMLInputElement).value = value as string;
  });
}

type ConvertFormToJsonReturnType = Record<string, string | number>;
export function convertFormToJson(form: HTMLFormElement): ConvertFormToJsonReturnType {
  const formData = new FormData(form);
  const entries = formData.entries();
  const json: ConvertFormToJsonReturnType = {};

  for (const [key, value] of entries) {
    const valueString = value.toString();
    const isNumeric = isStringNumeric(valueString);
    json[key] = isNumeric ? parseFloat(valueString) : valueString;
  }

  return json;
}
