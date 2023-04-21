export const generateStaticMapUrl = (lng: number, lat: number, width: number, height: number, theme: "light" | "dark") => {
	const apiKey = import.meta.env.VITE_MAPBOX_API_KEY;

	return `https://api.mapbox.com/styles/v1/mapbox/${theme}-v10/static/pin-s+000(${lat},${lng})/${lat},${lng},13,0,0/${width}x${height}@2x?access_token=${apiKey}`;
};
