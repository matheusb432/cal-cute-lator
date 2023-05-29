<script lang="ts">
	import NumberInput from '$lib/components/NumberInput.svelte';
	import Digit from './Digit.svelte';
	import { digitDatasGrid, type DigitData } from './types';

	let digitsClicked: DigitData[] = [];
	let value = '0';

	const digitsGrid = digitDatasGrid;

	function registerClick(digitData: DigitData) {
		digitsClicked = [...digitsClicked, digitData];
		registerDigit(digitData.value);
	}

	function registerKeyPress(event: KeyboardEvent) {
		const digit = event.key;

		if (value === '0') {
			event.preventDefault();
			registerDigit(digit);
		}
	}

	function registerDigit(digit: string) {
		const asNum = Number(digit);

		if (isNaN(asNum)) return;

		if (value === '0') {
			value = digit;

			return;
		}

		value += digit;
	}
</script>

<section class="container">
	<header class="result">
		<p>Clicked digits:</p>
		<button on:click={() => (value = '0')}>Empty input</button>
		<span>{digitsClicked}</span>
		<!-- TODO should register any num or operator -->
		<NumberInput {value} on:keypress={registerKeyPress} />
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
		background: var(--bg-color);
		justify-content: center;
		width: 100%;
		max-width: 380px;
		max-height: 560px;
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
