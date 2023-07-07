<script lang="ts">
	import { toast } from "$lib/utils/toast";
	import Icon from "./Icon.svelte";

	$: {
		if ($toast.open) {
			setTimeout(() => {
				$toast.open = false;
			}, 5000);
		}
	}

	const icon = {
		success: "check",
		error: "error",
		warning: "warning",
		info: "info",
	};
</script>

<div
	class="toast toast-bottom toast-center opacity-0 transition-opacity"
	class:opacity-100={$toast.open}
	class:pointer-events-none={!$toast.open}
>
	<div
		class="alert"
		class:alert-success={$toast.type === "success"}
		class:alert-error={$toast.type === "error"}
		class:alert-warning={$toast.type === "warning"}
		class:alert-info={$toast.type === "info"}
	>
		<Icon name={icon[$toast.type]} />
		{$toast.content}
	</div>
</div>
