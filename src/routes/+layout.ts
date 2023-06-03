import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from "$env/static/public";
import { createSupabaseLoadClient } from "@supabase/auth-helpers-sveltekit";
import type { LayoutLoad } from "./$types";

export const load = (async ({ fetch, data, depends }) => {
	depends("supabase:auth");

	const supabase = createSupabaseLoadClient({
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		supabaseUrl: PUBLIC_SUPABASE_URL,
		event: { fetch },
		serverSession: data.session,
	});

	const {
		data: { session },
	} = await supabase.auth.getSession();

	return {
		session: session || undefined,
		supabase,
	};
}) satisfies LayoutLoad;
