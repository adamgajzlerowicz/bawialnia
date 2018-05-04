/* eslint-disable no-restricted-globals,no-mixed-operators */
// @flow

const calculate = (firstHourRate: number, rate: number, minutes: number): number => {
  if (minutes <= 60) {
    return firstHourRate;
  }
  const halfRate = rate / 2;
  const ratedMinutes = minutes - 60;
  const howManyHalfHourPeriods = Math.ceil(ratedMinutes / 30);
  const halvesCost = howManyHalfHourPeriods * halfRate;
  return halvesCost + firstHourRate;
};

const checkValue = (testValue: *, currentValue: number): number => {
  const value = Number(testValue);

  if (value === '') {
    return 0;
  }

  if (typeof value === 'number' && !isNaN(value)) {
    return value;
  }

  return currentValue;
};

const calculateFullness = (current, max) => {
  if (current >= max) {
    return 'error';
  }
  const eightyPercent = max * 80 / 100;
  if (current > eightyPercent) {
    return 'warning';
  }
  return 'processing';
};

export {
  calculate, checkValue, calculateFullness
};

