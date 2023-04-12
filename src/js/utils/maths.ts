// lazy source: ChatGPT
export function getRandomInt(min: any, max: any) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomFloat(min: any, max: any) {
  return Math.random() * (max - min) + min;
}

export function getRandomItem<ItemType>(array: ItemType[] = []) {
  if (!array.length) {
    return undefined;
  }
  const index = getRandomInt(0, array.length - 1);
  return array[index];
}

export function getSum(values: any, byObjectKey: any) {
  let sum = 0;

  for (let i = 0; i < values.length; i++) {
    const value = byObjectKey ? values[i][byObjectKey] : values[i];
    sum += value;
  }

  return sum;
}

export function getAverage(values: any, byObjectKey = null) {
  const sum = getSum(values, byObjectKey);
  return sum / values.length;
}

// reference: https://stackoverflow.com/questions/175739/how-can-i-check-if-a-string-is-a-valid-number
export function isStringNumeric(str: any) {
  if (typeof str != 'string') return false;
  return !isNaN(parseFloat(str));
}
