<script lang="ts">
	import { Digits } from './types';

	const digitsGrid = [
		[Digits.Modulo, Digits.ClearEntry, Digits.Clear, Digits.Delete],
		[Digits.Inverse, Digits.Square, Digits.Sqrt, Digits.Divide],
		[Digits.Seven, Digits.Eight, Digits.Nine, Digits.Multiply],
		[Digits.Four, Digits.Five, Digits.Six, Digits.Subtract],
		[Digits.One, Digits.Two, Digits.Three, Digits.Add],
		[Digits.PlusMinus, Digits.Zero, Digits.Decimal, Digits.Equals]
	];
</script>

<section class="container">
	<div class="digits-grid">
		{#each digitsGrid as digitsRow}
			{#each digitsRow as digit}
				<div>{digit}</div>
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
		grid-template-columns: repeat(3, 1fr);
	}
</style>
