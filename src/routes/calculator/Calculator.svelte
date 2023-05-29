<script lang="ts">
	import NumberInput from '$lib/components/NumberInput.svelte';
	import { Keys } from '$lib/helpers';
	import Digit from './Digit.svelte';
	import { calculateMultipleValuesResult, handleSingleValueOperator } from './calculator-util';
	import {
		digitDatasGrid,
		type DigitData,
		Digits,
		singleValueOperatorSet,
		type SingleOperationResult
	} from './types';

	let activeOperator: Digits | null = null;

	let prevValue: string | null = null;

	let value = '0';
	let fontSize = '14px';
	$: {
		let size = 14;
		const len = value.length;
		if (len < 30) size = 18;
		if (len < 24) size = 24;
		if (len < 18) size = 32;
		if (len < 12) size = 48;

		fontSize = size + 'px';
	}

	$: if (value.length === 0) {
		value = '0';
	}

	// TODO remove result state?
	let result: number | null = null;
	$: if (result != null) {
		clear();
	}

	const digitsGrid = digitDatasGrid;
	$: flatDigitsGrid = digitsGrid.flat();

	function clear() {
		calculateSingleValueOperation('0');
	}

	function calculateSingleValueOperation(newValue: string) {
		value = newValue;
		prevValue = null;
		activeOperator = null;
	}

	function registerDigit(digitData: DigitData) {
		switch (digitData.type) {
			case 'operator':
				registerOperator(digitData.value);
				break;
			case 'number':
				registerKey(digitData.value);
				break;
			case 'equal':
				calculateResult();
				break;
			default:
				break;
		}
	}

	function registerOperator(operator: Digits) {
		if (singleValueOperatorSet.has(operator)) {
			const result = handleSingleValueOperator(value, operator);
			setSingleValueOperatorResult(result);
			return;
		}

		if (result != null) {
			prevValue = result.toString();
			result = null;
			activeOperator = operator;
			return;
		}

		activeOperator = operator;
		const initialValue = value;
		prevValue = initialValue;
		value = '0';
	}

	function setSingleValueOperatorResult(operationResult: SingleOperationResult) {
		const {
			value: newValue,
			prevValue: newPrevValue,
			activeOperator: newActiveOperator,
			result: newResult
		} = operationResult;

		if (newValue !== undefined) value = newValue;
		if (newPrevValue !== undefined) prevValue = newPrevValue;
		if (newActiveOperator !== undefined) activeOperator = newActiveOperator;
		if (newResult !== undefined) result = newResult;
	}

	function registerKeyPress(event: KeyboardEvent) {
		if (event.ctrlKey || event.altKey || event.metaKey) return;

		const digit = event.key;

		event.preventDefault();
		const len = value.length;
		const isZero = value === '0';

		if (digit === Keys.Backspace && !isZero) {
			value = value.substring(0, len - 1);
			return;
		}
		if (digit === Keys.Enter) {
			calculateResult();
			return;
		}
		const digitData = flatDigitsGrid.find((d) => d.value === digit);

		if (digitData != null) registerDigit(digitData);
	}

	function registerKey(digit: string) {
		const asNum = Number(digit);

		if (result != null) {
			value = '0';
			prevValue = null;
			result = null;
		}

		if (activeOperator != null && prevValue === null) {
			prevValue = value;
			value = '0';
		}

		const isZero = value === '0';

		if (isNaN(asNum)) return;

		if (isZero) {
			value = digit;

			return;
		}

		value += digit;
	}

	function calculateResult() {
		const newResult = calculateMultipleValuesResult(prevValue, value, activeOperator);

		if (newResult == null) return;

		result = newResult;
	}
</script>

<section class="container">
	<p style="margin-bottom: 0px;">value - {value}</p>
	<p style="margin-bottom: 0px;">prevValue - {prevValue}</p>
	<p style="margin-bottom: 0px;">activeOperator - {activeOperator}</p>
	<p style="margin-bottom: 0px;">result - {result}</p>
	<header class="result">
		{#if prevValue != null || activeOperator != null}
			<span class="operation">{prevValue ?? value} {activeOperator ?? ''}</span>
		{/if}
		<NumberInput
			value={result?.toString() ?? value}
			on:keydown={registerKeyPress}
			styles={`font-size: ${fontSize};`}
		/>
	</header>
	<div class="digits-grid">
		{#each digitsGrid as digitsRow}
			{#each digitsRow as digitData}
				<Digit data={digitData} on:click={() => registerDigit(digitData)} />
			{/each}
		{/each}
	</div>
</section>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		max-width: 380px;
		padding: 4px;
	}

	.result {
		width: 100%;
		color: var(--text-light);
	}

	.digits-grid {
		display: grid;
		width: 100%;
		grid-template-columns: repeat(4, 1fr);
		gap: 4px;
		padding: 4px;
	}
</style>
