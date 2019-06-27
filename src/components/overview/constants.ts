type Level = {
  min: number;
  max?: number;
  value: string;
}

export const LEVELS: Level[] = [
  {
    min: 0,
    max: 3,
    value: `Bad`,
  },
  {
    min: 3,
    max: 5,
    value: `Normal`,
  },
  {
    min: 5,
    max: 8,
    value: `Good`,
  },
  {
    min: 8,
    max: 10,
    value: `Very good`,
  },
  {
    min: 10,
    value: `Awesome`,
  },
];
