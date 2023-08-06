/** @module cookingUnitConverter */

/**
 * Excerpt of Base and Derived Quantities as defined by the International System of Quantities (ISQ)
 * @typedef {("length"|"mass"|"time"|"thermodynamic temperature"|"area"|"volume")} ISQQuantityType
 * @see https://en.wikipedia.org/wiki/International_System_of_Quantities
 */
type ISQQuantityType =
  | "length"
  | "mass"
  | "time"
  | "thermodynamic temperature"
  | "area"
  | "volume";

/**
 * Excerpt of Quantity Names as defined by the International System of Quantities (ISQ)
 * @typedef {("metre"|"kilogram"|"second"|"kelvin"|"square metres"|"cubic metres")} ISQNameType
 * @see https://en.wikipedia.org/wiki/International_System_of_Quantities
 */
type ISQNameType =
  | "metre"
  | "kilogram"
  | "second"
  | "kelvin"
  | "square metres"
  | "cubic metres";

/**
 * Excerpt of Quantity Symbols as defined by the International System of Quantities (ISQ)
 * @typedef {("m"|"kg"|"s"|"K"|"m²"|"m³")} ISQSymbolType
 * @see https://en.wikipedia.org/wiki/International_System_of_Quantities
 */
type ISQSymbolType = "m" | "kg" | "s" | "K" | "m²" | "m³";

/**
 * Excerpt of UN/CEFACT Quantity Unit Codes
 * @typedef {("MTR"|"DMT"|"CMT"|"MMT"|"INH"|"FOT"|"KGM"|"GRM"|"MRM"|"LBR"|"ONZ"|"SEC"|"MIN"|"HUR"|"DAY"|"WEE"|"MON"|"ANN"|"CEL"|"FAH"|"MTK"|"DMK"|"CMK"|"MMK"|"INK"|"FTK"|"MTQ"|"LTR"|"DLT"|"CLT"|"MLT"|"GLI"|"PTI"|"QTI"|"OZI"|"GLL"|"PTL"|"QTL"|"OZA"|"G21"|"G24"|"G25")} UNCEFACTUnitCodeType
 * @see https://unece.org/sites/default/files/2021-06/rec20_Rev17e-2021.xlsx
 */
export type UNCEFACTUnitCodeType =
  | "MTR"
  | "DMT"
  | "CMT"
  | "MMT"
  | "INH"
  | "FOT"
  | "KGM"
  | "GRM"
  | "MRM"
  | "LBR"
  | "ONZ"
  | "SEC"
  | "MIN"
  | "HUR"
  | "DAY"
  | "WEE"
  | "MON"
  | "ANN"
  | "CEL"
  | "FAH"
  | "MTK"
  | "DMK"
  | "CMK"
  | "MMK"
  | "INK"
  | "FTK"
  | "MTQ"
  | "LTR"
  | "DLT"
  | "CLT"
  | "MLT"
  | "GLI"
  | "PTI"
  | "QTI"
  | "OZI"
  | "GLL"
  | "PTL"
  | "QTL"
  | "OZA"
  | "G21"
  | "G24"
  | "G25";

/**
 * @description Excerpt of UN/CEFACT Quantity Unit Symbols
 * - tablespoon (US) -> tbsp.
 * - teaspoon (US) -> tsp.
 * @typedef {("m"|"dm"|"cm"|"mm"|"in"|"ft"|"kg"|"g"|"mg"|"lb"|"oz"|"s"|"min"|"h"|"d"|"wk"|"mo"|"y"|"°C"|"°F"|"m²"|"dm²"|"cm²"|"mm²"|"in²"|"ft²"|"m³"|"l"|"dl"|"cl"|"ml"|"gal (UK)"|"pt (UK)"|"qt (UK)"|"fl oz (UK)"|"gal (US)"|"liq pt (US)"|"liq qt (US)"|"fl oz (US)"|"cup (US)"|"tbsp."|"tsp.")} UNCEFACTUnitSymbolType
 * @see https://unece.org/sites/default/files/2021-06/rec20_Rev17e-2021.xlsx
 */
type UNCEFACTUnitSymbolType =
  | "m"
  | "dm"
  | "cm"
  | "mm"
  | "in"
  | "ft"
  | "kg"
  | "g"
  | "mg"
  | "lb"
  | "oz"
  | "s"
  | "min"
  | "h"
  | "d"
  | "wk"
  | "mo"
  | "y"
  | "°C"
  | "°F"
  | "m²"
  | "dm²"
  | "cm²"
  | "mm²"
  | "in²"
  | "ft²"
  | "m³"
  | "l"
  | "dl"
  | "cl"
  | "ml"
  | "gal (UK)"
  | "pt (UK)"
  | "qt (UK)"
  | "fl oz (UK)"
  | "gal (US)"
  | "liq pt (US)"
  | "liq qt (US)"
  | "fl oz (US)"
  | "cup (US)"
  | "tbsp."
  | "tsp.";

/**
 * Standard Units of Measure defined by the International System of Units (SI)
 * @typedef {Object} SIUnitType
 * @property {ISQQuantityType} quantity
 * @property {ISQNameType} name
 * @property {ISQSymbolType} symbol
 * @see https://en.wikipedia.org/wiki/SI_base_unit
 */
export interface SIUnitType {
  quantity: ISQQuantityType;
  name: ISQNameType;
  symbol: ISQSymbolType;
}

/**
 * Units of Measure based on UN/CEFACT Codes
 * @typedef {Object} UnitOfMeasureType
 * @property {ISQQuantityType} quantity
 * @property {UNCEFACTUnitCodeType} unitCode
 * @property {UNCEFACTUnitSymbolType} symbol
 * @property {number} [baseFactor] - Base unit conversion factor
 * @see https://unece.org/sites/default/files/2021-06/rec20_Rev17e-2021.xlsx
 */
export interface UnitOfMeasureType {
  quantity: ISQQuantityType;
  unitCode: UNCEFACTUnitCodeType;
  symbol: UNCEFACTUnitSymbolType;
  baseFactor?: number;
}

/**
 * Units of Measure based on UN/CEFACT Codes
 * @typedef {Object} LookupUnitOfMeasureType
 * @property {UnitOfMeasureType} result - Looked up unit of measure
 * @property {UnitOfMeasureType} base - Base unit of measure
 */
export interface LookupUnitOfMeasureType {
  result: UnitOfMeasureType;
  base: UnitOfMeasureType;
}

/**
 * @typedef {Object} RequiredQuantityType
 * @property {number} value
 * @property {UNCEFACTUnitCodeType} [unitCode]
 * @see https://schema.org/QuantitativeValue
 */
export interface RequiredQuantityType {
  value: number;
  unitCode?: UNCEFACTUnitCodeType;
}

/**
 * @typedef {Object} ToolType
 * @property {string} name
 * @property {number} requiredQuantity
 * @see https://schema.org/tool
 */
export interface ToolType {
  name: string;
  requiredQuantity: number;
}

/**
 * @typedef {Object} SupplyType
 * @property {(string | string[])} name
 * @property {RequiredQuantityType} requiredQuantity
 * @see https://schema.org/supply
 */
export interface SupplyType {
  name: string | string[];
  requiredQuantity: RequiredQuantityType;
}

/**
 * @typedef {Object} ResultSetType
 * @property {number} value
 * @property {UNCEFACTUnitCodeType} unitCode
 * @property {UNCEFACTUnitSymbolType} symbol
 * @property {ISQQuantityType} quantity
 */
export interface ResultSetType {
  value: number;
  unitCode: UNCEFACTUnitCodeType;
  symbol: UNCEFACTUnitSymbolType;
  quantity: ISQQuantityType;
}

/**
 * @typedef {Object} ItemRequiredProps
 * @property {string} locale
 * @property {SupplyType} item
 * @property {boolean} [debug]
 */
export interface ItemRequiredProps {
  locale: string;
  item: SupplyType;
  debug?: boolean;
}

/**
 * @typedef {Object} MatchProps
 * @property {string} locale
 * @property {number} value
 * @property {UNCEFACTUnitCodeType} unitCode
 * @property {boolean} [debug]
 */
export interface MatchProps {
  locale: string;
  value: number;
  unitCode: UNCEFACTUnitCodeType;
  debug?: boolean;
}
