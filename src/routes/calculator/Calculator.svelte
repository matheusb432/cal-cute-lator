<script lang="ts">
	import NumberInput from '$lib/components/NumberInput.svelte';
	import { Keys } from '$lib/helpers';
	import Digit from './Digit.svelte';
	import { digitDatasGrid, type DigitData, Digits } from './types';

	let activeOperator: Digits | null = null;

	$: {
		const initialOperator = activeOperator;

		activeOperator = null;
		switch (initialOperator) {
			case Digits.PlusMinus:
				value = (-Number(value)).toString();
				prevValue = null;
				break;
			case Digits.Delete:
				value = value.substring(0, value.length - 1);
				prevValue = null;
				break;
			case Digits.Inverse:
				value = (1 / Number(value)).toString();
				prevValue = null;
				break;
			case Digits.Square:
				value = (Number(value) ** 2).toString();
				prevValue = null;
				break;
			case Digits.Sqrt:
				value = Math.sqrt(Number(value)).toString();
				prevValue = null;
				break;
			case Digits.Clear:
				value = '0';
				break;
			case Digits.ClearEntry:
				value = '0';
				prevValue = null;
				activeOperator = null;
				break;
			case Digits.Decimal:
				if (value.includes('.')) break;
				value += '.';
				break;
			default:
				activeOperator = initialOperator;
				break;
		}
	}

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

	let result: number | null = null;
	$: if (result != null) {
		clear();
	}

	const digitsGrid = digitDatasGrid;

	function clear() {
		value = '0';
		prevValue = null;
		activeOperator = null;
	}

	function registerDigit(digitData: DigitData) {
		switch (digitData.type) {
			case 'operator':
				if (result != null) {
					prevValue = result.toString();
					result = null;
				}
				activeOperator = digitData.value;
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

	// TODO register operator keys
	function registerKeyPress(event: KeyboardEvent) {
		if (event.ctrlKey || event.altKey || event.metaKey) return;

		const digit = event.key;

		event.preventDefault();
		registerKey(digit);
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

		const len = value.length;
		const isZero = value === '0';

		if (isNaN(asNum)) {
			if (digit === Keys.Backspace && !isZero) {
				value = value.substring(0, len - 1);
			}
			if (digit === Keys.Enter) calculateResult();

			return;
		}

		if (isZero) {
			value = digit;

			return;
		}

		value += digit;
	}

	function calculateResult() {
		if (activeOperator == null) return;

		switch (activeOperator) {
			case Digits.Add:
				result = Number(prevValue) + Number(value);
				break;
			case Digits.Subtract:
				result = Number(prevValue) - Number(value);
				break;
			case Digits.Multiply:
				result = Number(prevValue) * Number(value);
				break;
			case Digits.Divide:
				if (value === '0') {
					alert('cannot divide by zero!');
					return;
				}
				result = Number(prevValue) / Number(value);
				break;
			case Digits.Modulo:
				result = Number(prevValue) % Number(value);
				break;
			default:
				break;
		}
	}
</script>

<section class="container">
	<p style="margin-bottom: 0px;">value - {value}</p>
	<p style="margin-bottom: 0px;">prevValue - {prevValue}</p>
	<p style="margin-bottom: 0px;">activeOperator - {activeOperator}</p>
	<p style="margin-bottom: 0px;">result - {result}</p>
	<header class="result">
		{#if prevValue != null || activeOperator != null}
			<span class="operation">{prevValue ?? value} {activeOperator}</span>
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
