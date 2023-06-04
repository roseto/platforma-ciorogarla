export const getModal = (id: string) => {
	const modal = document.getElementById(id) as HTMLDialogElement | null;

	return modal;
};

export const openModal = (id: string) => {
	const modal = getModal(id);

	if (modal) {
		modal.showModal();
	}
}
