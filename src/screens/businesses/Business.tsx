import React from "react";
import { Button, Card, Chip, List, Text, useTheme } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { Animated, Dimensions, Image, ImageBackground, Linking, Platform, ScrollView, View } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { useNavigation, useRoute } from "@react-navigation/native";
import Container from "../../components/Container";
import { sanityClient, urlFor } from "../../lib/sanity";
import { useQuery } from "@tanstack/react-query"; 
import { Business } from "../../types/SanitySchema";
import { useHeader } from "../../hooks/useHeader";
import Stack from "../../components/Stack";
import {queryClient} from "../../lib/queryClient";
import Icon from "@expo/vector-icons/MaterialIcons"
import {businessTypes} from "../../lib/business";

const getBusiness = async (slug: string) => {
	const res = await sanityClient.fetch<Business | undefined>(`*[_type == "business" && slug.current == $slug][0] {
		..., cover { ..., asset -> { ..., metadata } }
	}`, { slug });

	return res;
}

export default function BusinessPage() {
	const theme = useTheme();
	const navigation = useNavigation();
	const screenWidth = Dimensions.get("window").width;
	const route = useRoute();
	const { id } = route.params as { id: string };
	const { data, isLoading } = useQuery([`businesses.${id}`], () => getBusiness(id), {
		initialData: () => {
			return queryClient.getQueryData<Business[] | undefined>(["businesses"])
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
			{isLoading || !data?.cover ?
				<View
					style={{
						width: screenWidth,
						height: 128,
						backgroundColor: theme.colors.elevation.level1
					}}
				/>
				:
				<ImageBackground 
					source={{ uri: data.cover.asset.metadata.lqip }}
					style={{
						width: screenWidth,
						height: 128,
						backgroundColor: theme.colors.elevation.level1
					}}
				>
					<Image
						source={{ uri: urlFor(data.cover).height(128).width(screenWidth).url() }}
						style={{ 
							width: screenWidth, 
							height: 128,
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
				{isLoading || !data?.logo ?
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
							marginTop: 56,
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
							icon={businessTypes.get(data?.type)?.icon}
							mode="outlined"
							onPress={() => {
								navigation.navigate({
									name: "Businesses",
									params: { sortByTypes: [data?.type] },
									merge: true
								})
							}}
						>
							{businessTypes.get(data?.type)?.name}
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
					{(isLoading || data?.contact?.website) && 
						<Button
							mode="contained-tonal"
							onPress={() => {
								Platform.OS === "web"
								? Linking.openURL(data.contact.website)
								: WebBrowser.openBrowserAsync(data.contact.website)
							}}
							icon="web"
							disabled={isLoading}
						>
							Deschide site-ul
						</Button>
					}
					{!isLoading && data?.isSponsor && (
						<LinearGradient
							colors={[theme.colors.primaryContainer, theme.colors.tertiaryContainer]}
							start={{ x: 0.5, y: 0 }}
							end={{ x: 0.6, y: 1 }}
							style={{
								borderRadius: theme.roundness * 2
							}}
						>
							<Card
								style={{
									backgroundColor: "transparent",
									paddingVertical: 16
								}}
								mode="contained"
								onPress={() => {
									Linking.openURL("https://opencollective.com/ciorogarlaunita")
								}}
							>
								<Card.Title
									title="Sponsor Ciorogarla Unita!"
									subtitle="Aceasta afacere este sponsorul nostru. Daca doresti sa devii si tu sponsor, apasa aici!"
									subtitleNumberOfLines={5}
									left={(props) => <Icon name="stars" {...props} color={theme.colors.primary} />}
								/>
							</Card>
						</LinearGradient>
					)}
					<Card>
						<Card.Title
							title="Descriere"
						/>
						<Card.Content>
							<Text>
								{data?.description}
							</Text>
						</Card.Content>
					</Card>
					<ScrollView
						horizontal
						contentContainerStyle={{
							flex: 1,
							gap: 8
						}}
					>
						{!isLoading && data?.prices && (
							<Chip mode="outlined" compact>
								Nivel de preturi: <Text style={{ color: theme.colors.primary }}>{data.prices}</Text>
							</Chip>
						)}
						{!isLoading && data?.pricesLink && (
							<Chip 
								mode="outlined" 
								compact
								icon="clipboard-outline"
								onPress={() => {
									Platform.OS === "web"
									? Linking.openURL(data.pricesLink)
									: WebBrowser.openBrowserAsync(data.pricesLink)
								}}
								textStyle={{
									color: theme.colors.primary
								}}
							>
									Link preturi
							</Chip>
						)}
					</ScrollView>
					<List.Section>
						<List.Subheader>
							Contact
						</List.Subheader>
						{!isLoading && data?.contact?.phone && (
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
						{!isLoading && data?.contact?.email && (
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
