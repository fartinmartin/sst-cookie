<script lang="ts">
	let message = "";

	const getMessage = async () => {
		const response = await fetch(import.meta.env.VITE_APP_API_URL);
	};
</script>

<main>
	<button on:click={getMessage}>
		Message is "<i>{message}</i>"
	</button>
</main>
