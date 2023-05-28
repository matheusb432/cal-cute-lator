<script lang="ts">
	import Digit from './Digit.svelte';
	import { Digits } from './types';

	let digitsClicked: Digits[] = [];

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
	}

	function registerKeyPress(event: KeyboardEvent) {
		const digit = event.key;
		console.log(digit);
	}
</script>

<section class="container">
	<p>Clicked digits:</p>
	<span>{digitsClicked}</span>
	<!-- TODO should register any num or operator -->
	<input type="text" on:keypress={registerKeyPress} />
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
	}

	.digits-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
	}
</style>
