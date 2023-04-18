import {Accessor, createEffect, createSignal} from "solid-js";

export const createScrollTrigger = (threshold: number | Accessor<number>) => {
	const thresholdValue = typeof threshold === "number" ? () => threshold : threshold;
	const [triggered, setTriggered] = createSignal(window.scrollY > thresholdValue());

	const handleScroll = () => {
		setTriggered(window.scrollY > thresholdValue());
	}

	createEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	});

	return triggered;
}
