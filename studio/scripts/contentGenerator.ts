import { Business, Knowledge, Organisation, VolunteeringProject } from "../../app/src/lib/types/SanitySchema";

export const cleanString = (str: string) => {
	// Remove indents
	str = str.replace(/\n/g, "");
	// Remove extra spaces
	str = str.replace(/\s+/g, " ");
	// Remove trailing spaces
	str = str.replace(/\s+$/g, "");
	// Remove leading spaces
	str = str.replace(/^\s+/g, "");
	// Remove newlines
	str = str.replace(/\r?\n|\r/g, "");
	// Remove tabs
	str = str.replace(/\t/g, "");

	return str;
};

export const businessContentGenerator = (business: Business) => {
	const string = `
		${business.name} este o afacere ${business.type} localizata in ${business.location?.address}.

		Descriere: ${business.description},
		Link la preturi: ${business.pricesLink || "none"},
		Nivel Preturi: ${business.prices || "none"},
		Website: ${business.contact?.website || "none"},
		Telefon: ${business.contact?.phone || "none"},
		Email: ${business.contact?.email || "none"},
		Instagram: ${business.contact?.instagram || "none"},
		Facebook: ${business.contact?.facebook || "none"},
	`;

	return cleanString(string);
};

export const projectContentGenerator = (project: VolunteeringProject) => {
	const string = `
		${project.name} este un proiect de voluntariat localizat in ${project.location?.address}.

		Descriere: ${project.description},
		Se desfasoara in: ${project.country || "none"},
		Link la infopack: ${project.infopack || "none"},
		Tari participante: ${project.participatingCountries || "none"},
		Organizatia: ${(project.organisation as unknown as Organisation).name || "none"},
		Mai multe informatii link: ${project.infoLink || "none"},
	`;

	return cleanString(string);
};

export const knowledgeContentGenerator = (knowledge: Knowledge) => {
	return cleanString(knowledge.content);
};