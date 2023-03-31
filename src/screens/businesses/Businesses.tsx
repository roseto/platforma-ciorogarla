import { useQuery } from "react-query";
import { Text, List, Button } from "react-native-paper";
import Container from "../../components/Container";
import { useHeader } from "../../hooks/useHeader";
import { sanityClient, urlFor } from "../../lib/sanity";
import { View } from "react-native";
import { Business } from "../../types/SanitySchema";
import { useNavigation } from "@react-navigation/native";

const getBusinesses = async () => {
	const res = await sanityClient.fetch<Business[] | undefined>(`*[_type == "business"] {name, logo, description, slug}`);

	return res;
}


export default function Businesses() {
	const navigation = useNavigation();
	const { data } = useQuery("businesses", getBusinesses);
	const { onScroll } = useHeader({
		animated: true
	});

	return (
		<Container.ScrollView onScroll={onScroll}>
			<Text
				variant="displayMedium"
			>
				Afaceri locale & altele
			</Text>
			<View
				style={{
					flexDirection: "row",
				}}
			>
				<Button
					style={{ flex: 1, marginRight: 4 }}
					mode="contained"
					icon="magnify"
				>
					Exploreaza
				</Button>
				<Button
					style={{ flex: 1, marginLeft: 4 }}
					mode="contained-tonal"
					icon="plus"
				>
					Adauga
				</Button>
			</View>
			<List.Section>
				{data?.map((business, index) => (
					<List.Item
						key={index}
						title={business.name}
						description={business.description}
						onPress={() => {
							navigation.navigate("Business", {
								id: business.slug.current,
							})
						}}
						left={(props) => (
							<List.Image
								{...props}
								source={{ uri: urlFor(business.logo).width(72).height(72).url() }}
								style={[{
									borderRadius: 8,
								}, props.style]}
							/>
						)}
					/>
				))}
			</List.Section>
		</Container.ScrollView>
	)
}
