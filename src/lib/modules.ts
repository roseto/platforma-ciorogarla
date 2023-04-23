import BusinessIcon from "@suid/icons-material/Business";
import CalendarIcon from "@suid/icons-material/CalendarMonth";
import NewsIcon from "@suid/icons-material/Newspaper";
import ForumIcon from "@suid/icons-material/Forum";
import VolunteerIcon from "@suid/icons-material/People";
import AIIcon from "@suid/icons-material/Chat";

export const modules = [
	{
		name: "Afaceri locale",
		description: "Locul afacerilor din Ciorogârla",
		icon: BusinessIcon,
		path: "/businesses",
	},
	{
		name: "Oportunități de voluntariat",
		description: "Locul unde poți găsi oportunități de voluntariat",
		icon: VolunteerIcon,
		path: "/volunteering",
	},
	{
		name: "ChatGPT Plugin",
		description: "Plugin prin care poti conversa cu ChatGPT pentru a afla mai multe informatii",
		icon: AIIcon,
		disabled: true
	},
	{
		name: "Calendar de evenimente",
		description: "Evenimentele din Ciorogârla",
		icon: CalendarIcon,
		disabled: true
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
]
