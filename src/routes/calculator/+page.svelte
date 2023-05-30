<script lang="ts">
	import Calculator from './Calculator.svelte';
</script>

<!-- <section class="body"> -->
<!-- <div class="main-content"> -->
<!-- <h1 class="title">Cal-Cute-Lator ✨</h1> -->
<Calculator />

<!-- </div> -->

<!-- </section> -->

<style lang="scss">
	.main-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
		/* background: var(--primary); */
	}

	.title {
		margin: 0;
		padding: 0;
		margin-top: 4px;
		text-align: center;
		flex: 1;
	}
	/* .body {
		background: var(--primary);
		border-radius: 4px;
	} */
</style>
