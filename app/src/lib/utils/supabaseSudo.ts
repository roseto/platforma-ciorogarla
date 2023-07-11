import { SUPABASE_SERVICE_KEY } from "$env/static/private";
import { PUBLIC_SUPABASE_URL } from "$env/static/public";
import { createClient } from "@supabase/supabase-js";

export const supabaseSudo = createClient(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_KEY);
