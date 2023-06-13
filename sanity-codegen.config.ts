import { SanityCodegenConfig } from "sanity-codegen";

const config: SanityCodegenConfig = {
	schemaPath: "./studio/schemas",
	outputPath: "./src/lib/types/SanitySchema.ts",
};

export default config;
