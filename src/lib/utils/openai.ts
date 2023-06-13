import { OPENAI_KEY } from "$env/static/private";
import { Configuration, OpenAIApi } from "openai";

const openaiConfiguration = new Configuration({
	apiKey: OPENAI_KEY as string,
});

export const openai = new OpenAIApi(openaiConfiguration);
