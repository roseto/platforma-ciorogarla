export const getModal = (id: string) => {
	const modal = document.getElementById(id) as HTMLDialogElement | null;

	return modal;
};
