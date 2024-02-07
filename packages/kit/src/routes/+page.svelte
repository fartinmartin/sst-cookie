<script lang="ts">
	import type { PageData } from "./$types";
	import Ping from "./ping.svelte";

	export let data: PageData;
</script>

<h1>home</h1>

<pre>PageData: {JSON.stringify(data, null, 2)}</pre>

<Ping />
