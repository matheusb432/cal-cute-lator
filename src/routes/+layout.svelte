<script lang="ts">
	import './styles.scss';
</script>

<main>
	<!-- <h1>Header</h1> -->
	<section class="body">
		<slot />
	</section>
	<!-- <footer>Footer</footer> -->
</main>

<style lang="scss">
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
		background: var(--primary);
	}
	.body {
		/* padding: 2rem; */
		/* height: 100%; */
		/* height: 100vh; */
		height: 100%;
		width: 100%;
		overflow-x: hidden;
	}
</style>
