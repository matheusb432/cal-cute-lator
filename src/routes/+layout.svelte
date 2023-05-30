<script lang="ts">
	import './styles.scss';
</script>

<main>
	<slot />
</main>

<style lang="scss">
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
		background: var(--primary);
		overflow-x: hidden;
	}
</style>
