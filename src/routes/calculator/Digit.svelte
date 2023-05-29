<script lang="ts">
	import type { DigitData } from './types';

	export let data: DigitData;
</script>

<button class={`digit ${data.type}`} type="button" on:click>
	{data.value}
</button>

<style lang="scss">
	.digit {
		background: var(--text-light);
		border: 1px solid var(--text-light);
		border-radius: 4px;
		padding: 1rem;
		font-size: 1.5rem;
		width: 100%;
		height: 100%;
		cursor: pointer;
		color: var(--text-dark);
		transition: all 0.15s ease-in-out;

		&:hover {
			opacity: 0.8;
		}

		&:active {
			opacity: 0.5;
		}

		&.number {
			background-color: var(--bg-color);
			border-color: var(--bg-color);
			color: var(--text-light);

			&:hover {
				background-color: var(--text-light);
				border-color: var(--text-light);
				color: var(--text-dark);
			}
		}

		&.operator {
			background-color: var(--accent);
			border-color: var(--accent);
		}

		&.equal {
			background-color: var(--text-light);
			border-color: var(--text-light);
		}
	}
</style>
