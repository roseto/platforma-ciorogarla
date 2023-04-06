import BusinessIcon from "@suid/icons-material/Business";
import CalendarIcon from "@suid/icons-material/CalendarMonth";
import NewsIcon from "@suid/icons-material/Newspaper";
import ForumIcon from "@suid/icons-material/Forum";
import VolunteerIcon from "@suid/icons-material/People";

export const modules = [
	{
		name: "Afaceri locale",
		description: "Locul afacerilor din Ciorogârla",
		icon: BusinessIcon,
		path: "/businesses",
	},
	{
		name: "Calendar de evenimente",
		description: "Evenimentele din Ciorogârla",
		icon: CalendarIcon,
		path: "/events",
	},
	{
		name: "News",
		description: "Noutăți din Ciorogârla",
		icon: NewsIcon,
		disabled: true
	},
	{
		name: "Forum",
		description: "Locul unde poți discuta cu alți oameni din Ciorogârla",
		icon: ForumIcon,
		disabled: true
	},
	{
		name: "Oportunități de voluntariat",
		description: "Locul unde poți găsi oportunități de voluntariat",
		icon: VolunteerIcon,
		disabled: true
	},
]
