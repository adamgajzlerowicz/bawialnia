/* eslint-disable no-restricted-globals */
// @flow

const calculate = (rate: number, firstHourRate: number, minutes: number): number => 666;

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

