// @flow

const calculate = (rate: number, firstHourRate: number, minutes: number): number => 666;

const checkValue = (testValue: *, currentValue: number): number => {
  const value = Number(testValue);
  console.log(value);
  if (value === '') {
    return 0;
  }
  // eslint-disable-next-line no-restricted-globals
  if (typeof value === 'number' && !isNaN(value)) {
    return value;
  }
  return currentValue;
};

export {
  calculate, checkValue
};

