export const setCookie = async (name: string, value: string) => {
	const response = await fetch("/api/cookies", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ name, value }),
	});

	return response.ok;
};

export const getCookie = async (name: string) => {
	const response = await fetch("/api/cookies", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ name }),
	});

	if (!response.ok) return null;

	const data = await response.json();

	return data.value as string;
};

export const deleteCookie = async (name: string) => {
	const response = await fetch("/api/cookies", {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ name }),
	});

	return response.ok;
};
