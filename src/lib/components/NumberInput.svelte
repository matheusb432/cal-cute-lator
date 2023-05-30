<script lang="ts">
	import { getPasteData } from '$lib/utils/clipboard-util';

	export let value: string;
	export let styles = '';

	function handlePaste(event: ClipboardEvent) {
		const pastedText = getPasteData(event);
		const pastedNumber = Number(pastedText);

		if (!pastedText || isNaN(pastedNumber)) event.preventDefault();
	}
</script>

<input style={styles} type="number" bind:value on:keypress on:keydown on:paste={handlePaste} />

<style lang="scss">
	input {
		width: 100%;
		padding: 0.5rem;
		padding-right: 1rem;
		padding-left: 1rem;
		font-size: 14px;
		color: var(--text-light);
		transition: all 0.2s ease-in-out;
		border: none;
		background: none;

		&::-webkit-outer-spin-button,
		&::-webkit-inner-spin-button {
			-webkit-appearance: none;
			margin: 0;
		}

		&:focus {
			outline: none;
		}

		&:hover {
			transform: translateX(4px) translateY(1px);
		}
	}
</style>
