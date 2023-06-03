import { UAParser } from "ua-parser-js";

export const parser = new UAParser();

// We target all Apple devices since they use the same webkit engine
export const isIos = () => parser.getDevice().vendor === "Apple";

export const isInstalled = () => window.matchMedia("(display-mode: standalone)").matches;
