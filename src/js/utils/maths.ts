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

type ValueRecordType = Record<string, number>;
type ValuesType = Array<number | ValueRecordType>;
export function getSum(values: ValuesType, byObjectKey?: string): number {
  let sum = 0;

  for (let i = 0; i < values.length; i++) {
    const value = byObjectKey ? (values[i] as ValueRecordType)[byObjectKey] : (values[i] as number);
    sum += value;
  }

  return sum;
}

export function getAverage(values: ValuesType): number {
  const sum = getSum(values);
  return sum / values.length;
}

export function isStringNumeric(str: string): boolean {
  return !isNaN(parseFloat(str));
}
