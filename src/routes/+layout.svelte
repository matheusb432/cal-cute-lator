<script lang="ts">
	import './styles.scss';
</script>

<main>
	<h1>Header</h1>
	<section class="body">
		<slot />
	</section>
	<footer>Footer</footer>
</main>

<style lang="scss">
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
	}
	.body {
		padding: 2rem;
	}
</style>
