<script lang="ts">
	import { onMount } from 'svelte';

	import TestMenu from '../utils/route-header.svelte';
	import BaseStage from '../utils/test-stage.svelte';

	onMount(async () => (document.title = 'IDLE'));
</script>

<main>
	<TestMenu />
	<BaseStage />
</main>
