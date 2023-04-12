// lazy source: ChatGPT
export function getRandomInt(min: any, max: any) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomFloat(min: any, max: any) {
  return Math.random() * (max - min) + min;
}

export function getRandomItem(array = []) {
  if (!array.length) {
    return undefined;
  }
  const index = getRandomInt(0, array.length - 1);
  return array[index];
}

export function getSum(values: any, byObjectKey = null) {
  let sum = 0;

  for (let i = 0; i < values.length; i++) {
    const value = byObjectKey === null ? values[i] : values[i][byObjectKey];
    sum += value;
  }

  return sum;
}

export function getAverage(values: any, byObjectKey = null) {
  const sum = getSum(values, byObjectKey);
  return sum / values.length;
}

// reference: https://stackoverflow.com/questions/175739/how-can-i-check-if-a-string-is-a-valid-number
export function isNumeric(str: any) {
  if (typeof str != 'string') return false;
  // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
  return !isNaN(str) && !isNaN(parseFloat(str));
}
