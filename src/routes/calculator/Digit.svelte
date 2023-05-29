<script lang="ts">
	import type { Digits } from './types';

	export let digit: Digits;
</script>

<button class="digit" type="button" on:click>
	{digit}
</button>

<style lang="scss">
	.digit {
		background: var(--secondary);
		border: 1px solid var(--secondary);
		border-radius: 4px;
		padding: 1rem;
		font-size: 1.5rem;
		width: 100%;
		height: 100%;
		cursor: pointer;
		transition: all 0.2s ease-in-out;

		&:hover {
			opacity: 0.8;
		}
	}
</style>
