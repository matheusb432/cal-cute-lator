import { Digits, type SingleOperationResult } from './types';

export function calculateMultipleValuesResult(
	prevValue: string | null,
	value: string,
	activeOperator: Digits | null
): number | undefined {
	if (activeOperator == null) return;

	switch (activeOperator) {
		case Digits.Add:
			return Number(prevValue) + Number(value);
		case Digits.Subtract:
			return Number(prevValue) - Number(value);
		case Digits.Multiply:
			return Number(prevValue) * Number(value);
		case Digits.Divide:
			if (value === '0') return;

			return Number(prevValue) / Number(value);
		case Digits.Modulo:
			return Number(prevValue) % Number(value);
	}
}

export function handleSingleValueOperator(value: string, operator: Digits): SingleOperationResult {
	const numberValue = Number(value);
	switch (operator) {
		case Digits.PlusMinus:
			return calculateSingleValueOperation((-numberValue).toString());
		case Digits.Delete:
			return calculateSingleValueOperation(value.substring(0, value.length - 1));
		case Digits.Inverse:
			if (numberValue === 0) return {};
			return calculateSingleValueOperation((1 / numberValue).toString());
		case Digits.Square:
			return calculateSingleValueOperation((numberValue ** 2).toString());
		case Digits.Sqrt:
			return calculateSingleValueOperation(Math.sqrt(numberValue).toString());
		case Digits.Clear:
			return { ...clear(), result: null };
		case Digits.ClearEntry:
			return {
				value: '0',
				result: null
			};

		case Digits.Decimal:
			if (value.includes('.')) return {};
			return {
				value: value + '.'
			};
	}
	return {};
}

function clear() {
	return calculateSingleValueOperation('0');
}

function calculateSingleValueOperation(newValue: string): {
	value: string;
	prevValue: null;
	activeOperator: null;
} {
	return { value: newValue, prevValue: null, activeOperator: null };
}
