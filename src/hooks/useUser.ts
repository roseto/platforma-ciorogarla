import { useSupabaseAuth, useOnAuthStateChange } from "solid-supabase";
import {createResource} from "solid-js";

export const useUser = () => {
	const auth = useSupabaseAuth();
	const [user, { refetch }] = createResource(async () => await auth.getUser().then(res => res.data.user))

	useOnAuthStateChange((event) => {
		if (event === "SIGNED_IN") refetch();
		if (event === "SIGNED_OUT") refetch();
	});

	return user;
}
