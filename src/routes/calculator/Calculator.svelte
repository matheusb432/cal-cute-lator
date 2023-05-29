<script lang="ts">
	import NumberInput from '$lib/components/NumberInput.svelte';
	import Digit from './Digit.svelte';
	import { Digits } from './types';

	let digitsClicked: Digits[] = [];
	let value = '0';
	let displayInput: NumberInput;

	const digitsGrid: Digits[][] = [
		[Digits.Modulo, Digits.ClearEntry, Digits.Clear, Digits.Delete],
		[Digits.Inverse, Digits.Square, Digits.Sqrt, Digits.Divide],
		[Digits.Seven, Digits.Eight, Digits.Nine, Digits.Multiply],
		[Digits.Four, Digits.Five, Digits.Six, Digits.Subtract],
		[Digits.One, Digits.Two, Digits.Three, Digits.Add],
		[Digits.PlusMinus, Digits.Zero, Digits.Decimal, Digits.Equals]
	];

	function registerClick(digit: Digits) {
		digitsClicked = [...digitsClicked, digit];
		registerDigit(digit);
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
			{#each digitsRow as digit}
				<Digit {digit} on:click={() => registerClick(digit)} />
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
		max-width: 340px;
		max-height: 520px;
	}

	.result {
		background: var(--accent);
		width: 100%;
		padding: 4px;
	}

	.digits-grid {
		display: grid;
		width: 100%;
		grid-template-columns: repeat(4, 1fr);
		gap: 4px;
		padding: 4px;
	}
</style>
