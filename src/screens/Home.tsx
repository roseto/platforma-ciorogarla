import { Card, Text, useTheme } from "react-native-paper";
import Icon from "@expo/vector-icons/MaterialIcons"
import Container from "../components/Container";
import { useHeader } from "../hooks/useHeader";
import {useNavigation} from "@react-navigation/native";
import Stack from "../components/Stack";


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
		description: "Aici gasesti informatii despre evenimentele din comuna Ciorogârla",
		icon: "event",
		disabled: true
	},
	{
		name: "Stiri",
		description: "Aici gasesti informatii despre stiri din comuna Ciorogârla",
		icon: "new-releases",
		disabled: true
	},
	{
		name: "Oportunitati de voluntariat",
		description: "Aici gasesti informatii despre oportunitati de voluntariat din comuna Ciorogârla",
		icon: "group-work",
		disabled: true
	},
] as const;


export default function Home() {
	const theme = useTheme()
	const navigation = useNavigation();
	const { onScroll } = useHeader({
		animated: true
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
							backgroundColor: module.disabled ? theme.colors.surfaceDisabled : theme.colors.elevation.level1,
						}} 
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
