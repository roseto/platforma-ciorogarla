import { useQuery } from "@tanstack/react-query";
import { Text, List, Chip, Searchbar } from "react-native-paper";
import Container from "../../components/Container";
import { useHeader } from "../../hooks/useHeader";
import { sanityClient, urlFor } from "../../lib/sanity";
import { businessTypes } from "../../lib/business";
import { ScrollView, View } from "react-native";
import { Business } from "../../types/SanitySchema";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import { useDebounce } from "../../hooks/useDebounce";
import Stack from "../../components/Stack";

const getBusinesses = async (search: string, types?: string[]) => {
	const groqQuery = `*[_type == "business" 
		${types.length ? `&& type in ${JSON.stringify(types)}` : ""}
		${search.length ? `&& name match "*${search}*"` : ""}
	] {name, logo, description, slug, type}`;

	const res = await sanityClient.fetch<Business[] | undefined>(groqQuery);

	return res;
}


export default function Businesses() {
	const theme = useTheme();
	const route = useRoute();
	const params = route.params as { sortByTypes?: string[] }
	const [search, setSearch] = useState("");
	const [sortByTypes, setSortByTypes] = useState(params?.sortByTypes ?? []);
	const navigation = useNavigation();
	const debouncedSearch = useDebounce(search, 500);
	const { data, isLoading } = useQuery(["businesses", sortByTypes, debouncedSearch], () => getBusinesses(search, sortByTypes));
	const { onScroll } = useHeader({
		animated: true
	});


	useEffect(() => {
		if (params?.sortByTypes) {
			setSortByTypes(params.sortByTypes);
		}
	}, [params?.sortByTypes])

	return (
		<Container.ScrollView onScroll={onScroll}>
			<Stack>
				<Text
					variant="displayMedium"
				>
					Afaceri locale & altele
				</Text>
				<Searchbar 
					value={search}
					onChangeText={setSearch}
					placeholder="Caută..."
				/>
				<ScrollView
					horizontal
					contentContainerStyle={{
						gap: 4
					}}
					showsHorizontalScrollIndicator={false}
				>
					{Array.from(businessTypes)
						// Sort by types in sortByTypes
						.sort(([keyA], [keyB]) => {
							const indexA = sortByTypes.indexOf(keyA);
							const indexB = sortByTypes.indexOf(keyB);

							if (indexA === -1 && indexB === -1) {
								return 0;
							}

							if (indexA === -1) {
								return 1;
							}

							if (indexB === -1) {
								return -1;
							}

							return indexA - indexB;
						})
						.map(([key, value]) => (
						<Chip
							key={key}
							icon={value.icon}
							mode={sortByTypes.includes(key) ? "flat" : "outlined"}
							onPress={() => {
								if (sortByTypes.includes(key)) {
									setSortByTypes(sortByTypes.filter((type) => type !== key));
								} else {
									setSortByTypes([...sortByTypes, key]);
								}
							}}
						>
							{value.name}
						</Chip>
					))}	
				</ScrollView>
				<List.Section>
					{isLoading
						? Array(5).fill(null).map((_, idx) => (
							<List.Item
								key={idx}
								title="Loading"
								description="Loading..."
								left={(props) => (
									<View
										{...props}
										style={[{
											borderRadius: 8,
											width: 48,
											height: 48,
											backgroundColor: theme.colors.border
										}, props.style]}
									/>
								)}
							/>
						))
						: data?.map((business, index) => (
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
			</Stack>
		</Container.ScrollView>
	)
}
