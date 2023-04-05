import {createSignal} from "solid-js";

export const createScrollTrigger = (threshold: number) => {
	const [triggered, setTriggered] = createSignal(window.scrollY > threshold);

	const handleScroll = () => {
		setTriggered(window.scrollY > threshold);
	}

	window.addEventListener("scroll", handleScroll);

	return triggered;
}
