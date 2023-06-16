import { SanityCodegenConfig } from "sanity-codegen";

const config: SanityCodegenConfig = {
	schemaPath: "./schemas",
	outputPath: "../app/src/lib/types/SanitySchema.ts",
};

export default config;
