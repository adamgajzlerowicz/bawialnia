/* eslint-disable no-restricted-globals */
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

export {
  calculate, checkValue
};

