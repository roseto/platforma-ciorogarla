import { Card, Text } from "react-native-paper";
import Icon from "@expo/vector-icons/MaterialIcons"
import Container from "../components/Container";
import { useHeader } from "../hooks/useHeader";
import { useNavigation } from "@react-navigation/native";
import Stack from "../components/Stack";
import { useTheme } from "../hooks/useTheme";
import { useEffect } from "react";
import { useStoreState } from "../lib/store";


const modules = [
	{
		name: "Afaceri locale, organizatii si institutii",
		description: "Aici gasesti informatii despre afaceri locale, organizatii si institutii din comuna Ciorogârla",
		icon: "business",
		to: "Businesses",
		disabled: false
	},
	{
		name: "Calendar de evenimente",
		description: "Calendarul de evenimente din comuna Ciorogârla",
		icon: "event",
		disabled: true
	},
	{
		name: "Stiri",
		description: "Afla ultimele stiri din comuna Ciorogârla",
		icon: "new-releases",
		disabled: true
	},
	{
		name: "Oportunitati de voluntariat",
		description: "Dezvolta-ti abilitatile si ajuta comunitatea",
		icon: "group-work",
		disabled: true
	},
	{
		name: "Forum",
		description: "Discuta cu ceilalti cetateni despre orice subiect",
		icon: "forum",
		disabled: true
	}
] as const;


export default function Home() {
	const theme = useTheme();
	const hasSeenLanding = useStoreState(state => state.hasSeenLanding);
	const navigation = useNavigation();
	const { onScroll } = useHeader({
		animated: true,
		actions: [
			{
				icon: "cog",
				onPress: () => navigation.navigate("Settings")
			}
		]
	})

	useEffect(() => {
		if (!hasSeenLanding) {
			navigation.reset({
				index: 0,
				routes: [{ name: "Landing" }],
			})
		}
	})

	return (
		<Container.ScrollView onScroll={onScroll}>
			<Stack>
				<Text
					variant="displayMedium"
				>
					Acasa
				</Text>
				{modules.map((module, index) => (
					<Card 
						key={index} 
						style={{
							paddingVertical: 16,
							backgroundColor: module.disabled ? theme.colors.border : theme.colors.elevation.level1,
						}} 
						mode={module.disabled ? "contained" : "elevated"}
						// @ts-ignore
						onPress={module?.to && (() => navigation.navigate(module.to))}
					>
						<Icon
							name={module.icon}
							size={32}
							color={module.disabled ? theme.colors.onSurfaceDisabled : theme.colors.primary}
							style={{ marginLeft: 16, marginBottom: 16 }}
						/>
						<Card.Title 
							title={module.name} 
							subtitle={module.description} 
							titleNumberOfLines={3}
							subtitleNumberOfLines={3}
							titleVariant="titleLarge"
							titleStyle={{
								color: module.disabled ? theme.colors.onSurfaceDisabled : theme.colors.onSurface,
							}}
							subtitleStyle={{
								color: module.disabled ? theme.colors.onSurfaceDisabled : theme.colors.onSurface,
							}}
						/>
					</Card>
				))}
			</Stack>
		</Container.ScrollView>
	)
}
