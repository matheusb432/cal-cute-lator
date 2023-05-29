import { describe, it, expect } from 'vitest';
import { calculateMultipleValuesResult, handleSingleValueOperator } from '../calculator-util';
import { Digits } from '../types';

describe('calculator-util', () => {
	describe('calculateMultipleValuesResult', () => {
		it('should return the result of addition', () => {
			expect(calculateMultipleValuesResult('50', '10', Digits.Add)).toBe(60);
			expect(calculateMultipleValuesResult('50', '100', Digits.Add)).toBe(150);
		});

		it('should return the result of subtraction', () => {
			expect(calculateMultipleValuesResult('50', '10', Digits.Subtract)).toBe(40);
			expect(calculateMultipleValuesResult('50', '100', Digits.Subtract)).toBe(-50);
		});

		it('should return the result of multiplication', () => {
			expect(calculateMultipleValuesResult('50', '10', Digits.Multiply)).toBe(500);
			expect(calculateMultipleValuesResult('50', '100', Digits.Multiply)).toBe(5000);
		});

		it('should return the result of division', () => {
			expect(calculateMultipleValuesResult('50', '10', Digits.Divide)).toBe(5);
			expect(calculateMultipleValuesResult('50', '100', Digits.Divide)).toBe(0.5);
		});

		it('should handle division by zero', () => {
			expect(calculateMultipleValuesResult('50', '0', Digits.Divide)).toBe(undefined);
		});

		it('should return the result of modulo', () => {
			expect(calculateMultipleValuesResult('52', '10', Digits.Modulo)).toBe(2);
			expect(calculateMultipleValuesResult('71', '50', Digits.Modulo)).toBe(21);
		});

		it('should return undefined if activeOperator is invalid', () => {
			expect(calculateMultipleValuesResult('50', '10', null)).toBe(undefined);
			expect(calculateMultipleValuesResult('50', '10', undefined as unknown as null)).toBe(
				undefined
			);
			expect(calculateMultipleValuesResult('50', '10', 'lorem ipsum' as unknown as null)).toBe(
				undefined
			);
		});
	});

	describe('handleSingleValueOperator', () => {
		it('should calculate PlusMinus', () => {
			const result = handleSingleValueOperator('5', Digits.PlusMinus);
			expect(result).toEqual({ value: '-5', prevValue: null, activeOperator: null });
		});

		it('should calculate Delete', () => {
			const result = handleSingleValueOperator('123', Digits.Delete);
			expect(result).toEqual({ value: '12', prevValue: null, activeOperator: null });
		});

		it('should calculate Inverse', () => {
			const result = handleSingleValueOperator('4', Digits.Inverse);
			expect(result).toEqual({ value: '0.25', prevValue: null, activeOperator: null });
		});

		it('should calculate Inverse (when value is zero)', () => {
			const result = handleSingleValueOperator('0', Digits.Inverse);
			expect(result).toEqual({ value: undefined, prevValue: undefined, activeOperator: undefined });
		});

		it('should calculate Square', () => {
			const result = handleSingleValueOperator('3', Digits.Square);
			expect(result).toEqual({ value: '9', prevValue: null, activeOperator: null });
		});

		it('should calculate Sqrt', () => {
			const result = handleSingleValueOperator('9', Digits.Sqrt);
			expect(result).toEqual({ value: '3', prevValue: null, activeOperator: null });
		});

		it('should calculate Clear', () => {
			const result = handleSingleValueOperator('whatever', Digits.Clear);
			expect(result).toEqual({ value: '0', prevValue: null, activeOperator: null });
		});

		it('should calculate ClearEntry', () => {
			const result = handleSingleValueOperator('whatever', Digits.ClearEntry);
			expect(result).toEqual({ value: '0' });
		});

		it('should calculate Decimal (when not present)', () => {
			const result = handleSingleValueOperator('345', Digits.Decimal);
			expect(result).toEqual({ value: '345.' });
		});

		it('should calculate Decimal (when present)', () => {
			const result = handleSingleValueOperator('3.45', Digits.Decimal);
			expect(result).toEqual({});
		});
	});
});
