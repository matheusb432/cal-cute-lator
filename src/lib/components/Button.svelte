<script lang="ts">
	export let label: string;
</script>

<button class="test blue" on:click>
	{label}
</button>

<style lang="scss">
	.test {
		color: red;
		&.blue {
			color: blue;
		}
	}
</style>
