import {defineString, defineSecret} from "firebase-functions/params";
import {createClient} from "@sanity/client";

export const SANITY_PROJECT_ID = defineString("SANITY_PROJECT_ID");
export const SANITY_DATASET = defineString("SANITY_DATASET");
export const SANITY_API_VERSION = defineString("SANITY_API_VERSION");
export const SANITY_TOKEN = defineSecret("SANITY_TOKEN");

export const createSanityClient = () => {
  return createClient({
    dataset: SANITY_DATASET.value(),
    projectId: SANITY_PROJECT_ID.value(),
    apiVersion: SANITY_API_VERSION.value(),
    token: SANITY_TOKEN.value(),
    useCdn: false,
    withCredentials: true,
  });
};

