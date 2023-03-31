import { Button, Chip, List, Text, useTheme } from "react-native-paper";
import { Animated, Dimensions, Image, ImageBackground, Linking, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import Container from "../../components/Container";
import { sanityClient, urlFor } from "../../lib/sanity";
import { useQuery } from "react-query"; 
import { Business } from "../../types/SanitySchema";
import { useHeader } from "../../hooks/useHeader";
import Stack from "../../components/Stack";
import {queryClient} from "../../lib/queryClient";

const businessTypes = new Map([
	["market", { name: "Magazin", icon: "shopping" } as const],
	["restaurant", { name: "Restaurant", icon: "food" } as const],
	["pub", { name: "Pub", icon: "glass-mug" } as const],
	["barbershop", { name: "Frizerie", icon: "scissors-cutting" } as const],
	["itp", { name: "ITP", icon: "car" } as const],
	["pizza", { name: "Pizzerie", icon: "pizza" } as const],
	["cafe", { name: "Cafenea", icon: "coffee" } as const],
])

const getBusiness = async (slug: string) => {
	const res = await sanityClient.fetch<Business | undefined>(`*[_type == "business" && slug.current == $slug][0] {
		..., cover { ..., asset -> { ..., metadata } }
	}`, { slug });

	return res;
}

export default function BusinessPage() {
	const theme = useTheme();
	const screenWidth = Dimensions.get("window").width;
	const route = useRoute();
	const { id } = route.params as { id: string };
	const { data, isLoading } = useQuery(`businesses.${id}`, () => getBusiness(id), {
		initialData: () => {
			return queryClient.getQueryData<Business[] | undefined>("businesses")
				?.find((business: Business) => business.slug.current === id);
		}
	});
	const { onScroll } = useHeader({
		animated: true,
		title: data?.name,
		transparent: true,
	})

	return (
		<Animated.ScrollView onScroll={onScroll}>
			{isLoading || !data.cover ?
				<View
					style={{
						width: screenWidth,
						height: 128,
						backgroundColor: theme.colors.elevation.level1
					}}
				/>
				:
				<ImageBackground 
					source={{ uri: data?.cover.asset.metadata.lqip }}
					style={{
						width: screenWidth,
						height: 128,
						backgroundColor: theme.colors.elevation.level1
					}}
				>
					<Image
						source={{ uri: urlFor(data.cover).height(256).width(screenWidth * 2).url() }}
						style={{ 
							width: screenWidth, 
							height: 128,
							resizeMode: "cover",
						}}
					/>
				</ImageBackground>
			}
			<View
				style={{
					position: "absolute",
					top: 64 + 8,
					left: screenWidth / 2 - 48 - 8,
					backgroundColor: theme.colors.background,
					padding: 8,
					borderRadius: 16,
				}}
			>
				{isLoading || !data.logo ?
					<View
						style={{
							width: 96,
							height: 96,
							borderRadius: 12,
							backgroundColor: theme.colors.elevation.level1,
						}}
					/>
					:
					<Image
						source={{ uri: urlFor(data.logo).height(128).width(128).url() }}
						style={{
							width: 96,
							height: 96,
							resizeMode: "contain",
							borderRadius: 12,
							backgroundColor: theme.colors.elevation.level1
						}}
					/>
				}
			</View>
			<Container>
				<Stack>
					<Text 
						style={{
							marginTop: 64,
							textAlign: "center",
						}}
						variant="headlineLarge"
					>
						{data?.name}
					</Text>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "center",
							gap: 4,
						}}
					>
						<Chip
							icon={businessTypes.get(data.type)?.icon}
							mode="outlined"
						>
							{businessTypes.get(data.type)?.name}
						</Chip>
					</View>
					{(isLoading || data?.location) && 
						<Button
							mode="contained"
							onPress={() => {
								Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${data.location.coordinates.lat},${data.location.coordinates.lng}`)
							}}
							icon="map-marker"
							disabled={isLoading}
						>
							Arata locatia
						</Button>
					}
					{(isLoading || data.contact?.website) && 
						<Button
							mode="contained-tonal"
							onPress={() => {
								Linking.openURL(data.contact.website)
							}}
							icon="web"
							disabled={isLoading}
						>
							Deschide site-ul
						</Button>
					}
					<Text>
						{data?.description}
					</Text>
					<List.Section>
						<List.Subheader>
							Contact
						</List.Subheader>
						{!isLoading && data.contact?.phone && (
							<List.Item
								title="Telefon"
								description={data.contact.phone}
								left={(props) => <List.Icon icon="phone" {...props} />}
								onPress={() => {
									Linking.openURL(`tel:${data.contact.phone}`)
										.catch(() => null)
								}}
							/>
						)}
						{!isLoading && data.contact?.email && (
							<List.Item
								title="Email"
								description={data.contact.email}
								left={(props) => <List.Icon icon="email" {...props} />}
								onPress={() => {
									Linking.openURL(`mailto:${data.contact.email}`)
										.catch(() => null)
								}}
							/>
						)}
					</List.Section>
				</Stack>
			</Container>
		</Animated.ScrollView>
	)
}
