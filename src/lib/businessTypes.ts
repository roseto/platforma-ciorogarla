import {OverridableComponent} from "@suid/material/OverridableComponent";
import {SvgIconTypeMap} from "@suid/material/SvgIcon";

import RestaurantIcon from "@suid/icons-material/Restaurant";
import CafeIcon from "@suid/icons-material/LocalCafe";
import PubIcon from "@suid/icons-material/LocalBar";
import BarbershopIcon from "@suid/icons-material/ContentCut";
import ITPIcon from "@suid/icons-material/CarRepair";
import MarketIcon from "@suid/icons-material/LocalGroceryStore";
import PizzaIcon from "@suid/icons-material/LocalPizza";
import ShowroomIcon from "@suid/icons-material/Storefront";
import AutoPartsIcon from "@suid/icons-material/Build";
import DistributorIcon from "@suid/icons-material/LocalShipping";


export const businessTypes = new Map<string, { name: string, icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> }>([
	["restaurant", {name: "Restaurant", icon: RestaurantIcon}],
	["cafe", {name: "Cafenea", icon: CafeIcon}],
	["pub", {name: "Bar", icon: PubIcon}],
	["barbershop", {name: "Frizerie", icon: BarbershopIcon}],
	["itp", {name: "ITP", icon: ITPIcon}],
	["market", {name: "Magazin", icon: MarketIcon}],
	["pizza", {name: "Pizzerie", icon: PizzaIcon}],
	["showroom", {name: "Showroom", icon: ShowroomIcon}],
	["autoParts", {name: "Parti Auto", icon: AutoPartsIcon}],
	["distributor", {name: "Distribuitor", icon: DistributorIcon}],
]);
