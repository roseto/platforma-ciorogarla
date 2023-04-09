import { UAParser } from "ua-parser-js";

export const parser = new UAParser();

export const isIos = () => parser.getDevice().vendor === "Apple";
