<script lang="ts">
	import NumberInput from '$lib/components/NumberInput.svelte';
	import { Keys } from '$lib/helpers';
	import Digit from './Digit.svelte';
	import { digitDatasGrid, type DigitData } from './types';

	let digitsClicked: DigitData[] = [];
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

	const digitsGrid = digitDatasGrid;

	function registerClick(digitData: DigitData) {
		digitsClicked = [...digitsClicked, digitData];
		registerDigit(digitData.value);
	}

	function registerKeyPress(event: KeyboardEvent) {
		if (event.ctrlKey || event.altKey || event.metaKey) return;

		const digit = event.key;

		event.preventDefault();
		registerDigit(digit);
	}

	function registerDigit(digit: string) {
		const asNum = Number(digit);
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

	function calculateResult() {}
</script>

<section class="container">
	<header class="result">
		<p>Clicked digits:</p>
		<button on:click={() => (value = '0')}>Empty input</button>
		<!-- TODO should register any num or operator -->
		<NumberInput {value} on:keydown={registerKeyPress} styles={`font-size: ${fontSize};`} />
	</header>
	<div class="digits-grid">
		{#each digitsGrid as digitsRow}
			{#each digitsRow as digitData}
				<Digit data={digitData} on:click={() => registerClick(digitData)} />
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
