<script lang="ts">
	export let value: string;
	export let styles = '';
</script>

<input style={styles} type="number" bind:value on:keypress />

<style lang="scss">
	input {
		width: 100%;
		padding: 0.5rem;
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
			background: #e6e6e6;
		}
	}
</style>
