import {Business} from "../src/types/SanitySchema";

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
}


export const businessContentGenerator = (business: Business) => {
	const string = `
		${business.name} este o afacere ${business.type} localizata in ${business.location?.address}.

		Link la pagina afacerii: "/businesses/${business.slug?.current!}",
	
		Descriere: ${business.description},
		Link la preturi: ${business.pricesLink || "none"},
		Nivel Preturi: ${business.prices || "none"},
		Website: ${business.contact?.website || "none"},
		Telefon: ${business.contact?.phone || "none"},
		Email: ${business.contact?.email || "none"},
		Instagram: ${business.contact?.instagram || "none"},
		Facebook: ${business.contact?.facebook || "none"},
	`

	return cleanString(string);
}
