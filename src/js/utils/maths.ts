// lazy source: ChatGPT
export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function getRandomItem<ItemType>(array: ItemType[] = []): ItemType | undefined {
  if (!array.length) {
    return undefined;
  }
  const index = getRandomInt(0, array.length - 1);
  return array[index];
}

export function getSum<ValueType>(
  values: ValueType[],
  getValue = (value: ValueType): number => value as number
): number {
  let sum = 0;

  for (let i = 0; i < values.length; i++) {
    const value = getValue(values[i]);
    sum += value;
  }

  return sum;
}

export function getAverage<ValueType>(values: ValueType[]): number {
  const sum = getSum<ValueType>(values);
  return sum / values.length;
}

export function isStringNumeric(str: string): boolean {
  return !isNaN(parseFloat(str));
}
