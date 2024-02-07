<script lang="ts">
	import { onMount } from "svelte";

	let message = "";

	const getMessage = async () => {
		try {
			message = "fetching...";

			const url = `${import.meta.env.VITE_APP_API_URL}/cookie`;
			console.log(url);

			const response = await fetch(url, { credentials: "include" });
			console.log(response);

			message = await response.text();
		} catch (error) {
			message = error instanceof Error ? error.message : String(error);
		}
	};

	onMount(getMessage);

	onMount(async () => {
		const url = `${import.meta.env.VITE_APP_API_URL}/auth/guest/authorize`;
		console.log(url);
		const response = await fetch(url, { credentials: "include" });
		console.log(response);
	});
</script>

<main>
	<button on:click={getMessage}>ping</button>
	<pre>{message}</pre>
</main>
