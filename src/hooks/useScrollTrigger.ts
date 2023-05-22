import {Accessor, createEffect, createSignal, onMount, onCleanup} from "solid-js";

export const createScrollTrigger = (threshold: number | Accessor<number>) => {
	const thresholdValue = typeof threshold === "number" ? () => threshold : threshold;
	const [triggered, setTriggered] = createSignal(window.scrollY > thresholdValue());

	const handleScroll = () => {
		setTriggered(window.scrollY > thresholdValue());
	}

	onMount(() => {
		// Also on page change
		handleScroll();
		window.addEventListener("scroll", handleScroll);
	});

	onCleanup(() => window.removeEventListener("scroll", handleScroll));

	return triggered;
}
