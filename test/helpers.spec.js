import { calculate, calculateFullness } from '../app/helpers/calculator';

describe('helpers - calculate fullness', () => {
  it('should calculate blue', () => {
    const result = calculateFullness(4, 10);
    expect(result).toEqual('processing');
  });

  it('should calculate red', () => {
    const result = calculateFullness(4, 4);
    expect(result).toEqual('error');
  });

  it('should calculcate amber', () => {
    const result = calculateFullness(83, 100);
    expect(result).toEqual('warning');
  });
});


describe('helpers - calculate', () => {
  it('should calculate below first hour', () => {
    const result = calculate(10, 8, 50);
    expect(result).toEqual(10);
  });

  it('should calculate below exactly hour', () => {
    const result = calculate(10, 8, 60);
    expect(result).toEqual(10);
  });

  it('should calculate above an hour', () => {
    const result = calculate(10, 8, 65);
    expect(result).toEqual(14);
  });

  it('should calculate an hour and a half', () => {
    const result = calculate(10, 8, 90);
    expect(result).toEqual(14);
  });

  it('should calculate below two hours', () => {
    const result = calculate(10, 8, 95);
    expect(result).toEqual(18);
  });

  it('should calculate two hours', () => {
    const result = calculate(10, 8, 120);
    expect(result).toEqual(18);
  });

  it('should calculate above two hours', () => {
    const result = calculate(10, 8, 122);
    expect(result).toEqual(22);
  });

  it('should calculate above ten hours', () => {
    const result = calculate(10, 8, 600);
    expect(result).toEqual(82);
  });
});
