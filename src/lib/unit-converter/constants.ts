/** @module cookingUnitConverter */
import type {
  SIUnitType,
  UNCEFACTUnitCodeType,
  UnitOfMeasureType,
} from "./types";

/**
 * @type {import('./types.js').SIUnitType[]}
 */
export const SI_UNITS: SIUnitType[] = [
  {
    quantity: "length",
    name: "metre",
    symbol: "m",
  },
  {
    quantity: "mass",
    name: "kilogram",
    symbol: "kg",
  },
  {
    quantity: "time",
    name: "second",
    symbol: "s",
  },
  {
    quantity: "thermodynamic temperature",
    name: "kelvin",
    symbol: "K",
  },
  {
    quantity: "area",
    name: "square metres",
    symbol: "m²",
  },
  {
    quantity: "volume",
    name: "cubic metres",
    symbol: "m³",
  },
];

/**
 * @type {import('./types.js').UnitOfMeasureType[]}
 */
export const UNITS_OF_MEASURE: UnitOfMeasureType[] = [
  {
    quantity: "length",
    unitCode: "MTR",
    symbol: "m",
    baseFactor: 1,
  },
  {
    quantity: "length",
    unitCode: "DMT",
    symbol: "dm",
    baseFactor: Math.pow(10, -1),
  },
  {
    quantity: "length",
    unitCode: "CMT",
    symbol: "cm",
    baseFactor: Math.pow(10, -2),
  },
  {
    quantity: "length",
    unitCode: "MMT",
    symbol: "mm",
    baseFactor: Math.pow(10, -3),
  },
  {
    quantity: "length",
    unitCode: "INH",
    symbol: "in",
    baseFactor: 25.4 * Math.pow(10, -3),
  },
  {
    quantity: "length",
    unitCode: "FOT",
    symbol: "ft",
    baseFactor: 0.3048,
  },
  {
    quantity: "mass",
    unitCode: "KGM",
    symbol: "kg",
    baseFactor: 1,
  },
  {
    quantity: "mass",
    unitCode: "GRM",
    symbol: "g",
    baseFactor: Math.pow(10, -3),
  },
  {
    quantity: "mass",
    unitCode: "MRM",
    symbol: "mg",
    baseFactor: Math.pow(10, -6),
  },
  {
    quantity: "mass",
    unitCode: "LBR",
    symbol: "lb",
    baseFactor: 0.45359237,
  },
  {
    quantity: "mass",
    unitCode: "ONZ",
    symbol: "oz",
    baseFactor: 2.834952 * Math.pow(10, -2),
  },
  {
    quantity: "time",
    unitCode: "SEC",
    symbol: "s",
    baseFactor: 1,
  },
  {
    quantity: "time",
    unitCode: "MIN",
    symbol: "min",
    baseFactor: 60,
  },
  {
    quantity: "time",
    unitCode: "HUR",
    symbol: "h",
    baseFactor: 3600,
  },
  {
    quantity: "time",
    unitCode: "DAY",
    symbol: "d",
    baseFactor: 86400,
  },
  {
    quantity: "time",
    unitCode: "WEE",
    symbol: "wk",
    baseFactor: 6.048 * Math.pow(10, 5),
  },
  {
    quantity: "time",
    unitCode: "MON",
    symbol: "mo",
    baseFactor: 2.6298 * Math.pow(10, 6),
  },
  {
    quantity: "time",
    unitCode: "ANN",
    symbol: "y",
    baseFactor: 3.15576 * Math.pow(10, 7),
  },
  {
    quantity: "thermodynamic temperature",
    unitCode: "CEL",
    symbol: "°C",
    baseFactor: 1,
  },
  {
    quantity: "thermodynamic temperature",
    unitCode: "FAH",
    symbol: "°F",
  },
  {
    quantity: "area",
    unitCode: "MTK",
    symbol: "m²",
    baseFactor: 1,
  },
  {
    quantity: "area",
    unitCode: "DMK",
    symbol: "dm²",
    baseFactor: Math.pow(10, -2),
  },
  {
    quantity: "area",
    unitCode: "CMK",
    symbol: "cm²",
    baseFactor: Math.pow(10, -4),
  },
  {
    quantity: "area",
    unitCode: "MMK",
    symbol: "mm²",
    baseFactor: Math.pow(10, -6),
  },
  {
    quantity: "area",
    unitCode: "INK",
    symbol: "in²",
    baseFactor: 6.4516 * Math.pow(10, -4),
  },
  {
    quantity: "area",
    unitCode: "FTK",
    symbol: "ft²",
    baseFactor: 9.290304 * Math.pow(10, -2),
  },
  {
    quantity: "volume",
    unitCode: "MTQ",
    symbol: "m³",
    baseFactor: 1,
  },
  {
    quantity: "volume",
    unitCode: "LTR",
    symbol: "l",
    baseFactor: Math.pow(10, -3),
  },
  {
    quantity: "volume",
    unitCode: "DLT",
    symbol: "dl",
    baseFactor: Math.pow(10, -4),
  },
  {
    quantity: "volume",
    unitCode: "CLT",
    symbol: "cl",
    baseFactor: Math.pow(10, -5),
  },
  {
    quantity: "volume",
    unitCode: "MLT",
    symbol: "ml",
    baseFactor: Math.pow(10, -6),
  },
  {
    quantity: "volume",
    unitCode: "GLI",
    symbol: "gal (UK)",
    baseFactor: 4.546092 * Math.pow(10, -3),
  },
  {
    quantity: "volume",
    unitCode: "PTI",
    symbol: "pt (UK)",
    baseFactor: 5.68261 * Math.pow(10, -4),
  },
  {
    quantity: "volume",
    unitCode: "QTI",
    symbol: "qt (UK)",
    baseFactor: 1.1365225 * Math.pow(10, -3),
  },
  {
    quantity: "volume",
    unitCode: "OZI",
    symbol: "fl oz (UK)",
    baseFactor: 2.841306 * Math.pow(10, -5),
  },
  {
    quantity: "volume",
    unitCode: "GLL",
    symbol: "gal (US)",
    baseFactor: 3.785412 * Math.pow(10, -3),
  },
  {
    quantity: "volume",
    unitCode: "PTL",
    symbol: "liq pt (US)",
    baseFactor: 4.731765 * Math.pow(10, -4),
  },
  {
    quantity: "volume",
    unitCode: "QTL",
    symbol: "liq qt (US)",
    baseFactor: 9.463529 * Math.pow(10, -4),
  },
  {
    quantity: "volume",
    unitCode: "OZA",
    symbol: "fl oz (US)",
    baseFactor: 2.957353 * Math.pow(10, -5),
  },
  {
    quantity: "volume",
    unitCode: "G21",
    symbol: "cup (US)",
    baseFactor: 2.365882 * Math.pow(10, -4),
  },
  {
    quantity: "volume",
    unitCode: "G24",
    symbol: "tbsp.",
    baseFactor: 1.478676 * Math.pow(10, -5),
  },
  {
    quantity: "volume",
    unitCode: "G25",
    symbol: "tsp.",
    baseFactor: 4.928922 * Math.pow(10, -6),
  },
];

/** @type {import('./types.js').UNCEFACTUnitCodeType[]} */
export const EXCLUDED_UNITS_OF_MEASURE: UNCEFACTUnitCodeType[] = [
  "DMT",
  "DMK",
  "MTQ",
  "CLT",
];

/** @type {import('./types.js').UNCEFACTUnitCodeType[]} */
export const EXCLUDED_US: UNCEFACTUnitCodeType[] = ["CEL", "KGM", "GRM", "MRM"];

/** @type {import('./types.js').UNCEFACTUnitCodeType[]} */
export const EXCLUDED_NON_US: UNCEFACTUnitCodeType[] = [
  "FAH",
  "GLI",
  "PTI",
  "QTI",
  "OZI",
  "GLL",
  "PTL",
  "QTL",
  "OZA",
  "ONZ",
];
