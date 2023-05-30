export enum Digits {
	Modulo = '%',
	ClearEntry = 'CE',
	Clear = 'C',
	Delete = 'DEL',
	Inverse = '1/x',
	Square = 'x^2',
	Sqrt = '√2',
	Divide = '/',
	Seven = '7',
	Eight = '8',
	Nine = '9',
	Multiply = '*',
	Four = '4',
	Five = '5',
	Six = '6',
	Subtract = '-',
	One = '1',
	Two = '2',
	Three = '3',
	Add = '+',
	PlusMinus = '+/-',
	Zero = '0',
	Decimal = '.',
	Equals = '='
}

export type DigitData = {
	value: Digits;
	type: 'number' | 'operator' | 'equal';
};

export const singleValueOperatorSet = new Set([
	Digits.PlusMinus,
	Digits.Delete,
	Digits.Inverse,
	Digits.Square,
	Digits.Sqrt,
	Digits.Clear,
	Digits.ClearEntry,
	Digits.Decimal
]);

const digitsGrid: Digits[][] = [
	[Digits.Modulo, Digits.ClearEntry, Digits.Clear, Digits.Delete],
	[Digits.Inverse, Digits.Square, Digits.Sqrt, Digits.Divide],
	[Digits.Seven, Digits.Eight, Digits.Nine, Digits.Multiply],
	[Digits.Four, Digits.Five, Digits.Six, Digits.Subtract],
	[Digits.One, Digits.Two, Digits.Three, Digits.Add],
	[Digits.PlusMinus, Digits.Zero, Digits.Decimal, Digits.Equals]
];

const numberSet = new Set([
	Digits.One,
	Digits.Two,
	Digits.Three,
	Digits.Four,
	Digits.Five,
	Digits.Six,
	Digits.Seven,
	Digits.Eight,
	Digits.Nine,
	Digits.Zero
]);

const operatorSet = new Set([
	Digits.Add,
	Digits.Subtract,
	Digits.Multiply,
	Digits.Divide,
	Digits.Modulo,
	Digits.PlusMinus,
	Digits.Delete,
	Digits.Inverse,
	Digits.Square,
	Digits.Sqrt,
	Digits.Clear,
	Digits.ClearEntry,
	Digits.Decimal
]);

export const digitDatasGrid: DigitData[][] = digitsGrid.map((row) =>
	row.map((digit) => ({
		value: digit,
		type: numberSet.has(digit) ? 'number' : operatorSet.has(digit) ? 'operator' : 'equal'
	}))
);

export type SingleOperationResult = {
	value?: string;
	prevValue?: string | null;
	activeOperator?: Digits | null;
	result?: number | null;
};
