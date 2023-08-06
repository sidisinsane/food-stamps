/** @module cookingUnitConverter */
import { UNITS_OF_MEASURE } from "./constants";

import type {
  LookupUnitOfMeasureType,
  ResultSetType,
  UnitOfMeasureType,
} from "./types";

/**
 * Converts a value from a given unit code to its corresponding base unit representation
 * and returns an object containing the converted value and its unit information.
 * @public
 * @param {number} value - The value to be converted.
 * @param {string} unitCode - The unit code of the original value (e.g., "GRM" for grams, "MLT" for milliliters).
 * @param {boolean} [debug] - Optional flag to enable debug logging. Default is false.
 *
 * @returns {ResultSetType} - An object containing the following properties:
 *  - "value": The converted value in its base unit representation.
 *  - "unitCode": The unit code of the base unit representation.
 *  - "symbol": The symbol of the target unit representation.
 *  - "quantity": The quantity description of the base unit representation.
 *
 * @example
 * const result = convertToBase(1000, "GRM");
 * console.log(result); // Output: { value: 1, unitCode: 'KGM', symbol: 'kg', quantity: 'mass' }
 */
export function convertToBase(
  value: number,
  unitCode: string,
  debug?: boolean,
): ResultSetType {
  const lookup = lookupUnitOfMeasure(unitCode, debug);
  const baseFactor = lookup.result.baseFactor;

  const res: any = {};
  res["unitCode"] = lookup.base.unitCode;
  res["symbol"] = lookup.base.symbol;
  res["quantity"] = lookup.base.quantity;

  if (debug) {
    console.log("");
    console.log("--- convertToBase ---");
  }

  if (baseFactor) {
    res["value"] = value * baseFactor;

    if (debug) {
      console.log(
        `${value} ${unitCode} equals ${res["value"]} ${res["unitCode"]}`,
      );
      console.log(res);
    }
  } else {
    if (debug) {
      console.log("THIS MUST BE TEMPERATURE...");
      console.log(res);
    }
  }

  if (debug) {
    console.log("--- convertToBase ---");
    console.log("");
  }

  return res;
}

/**
 * Converts a value from a base unit representation to the target unit representation
 * specified by the given unit code and returns an object containing the converted value
 * and its unit information.
 * @public
 * @param {number} value - The value in its base unit representation.
 * @param {string} unitCode - The unit code of the target unit representation
 * (e.g., "KGM" for kilograms, "FAH" for Fahrenheit).
 * @param {boolean} [debug] - Optional flag to enable debug logging. Default is false.
 *
 * @returns {ResultSetType} - An object containing the following properties:
 *  - "value": The converted value in the target unit representation.
 *  - "unitCode": The unit code of the target unit representation.
 *  - "symbol": The symbol of the target unit representation.
 *  - "quantity": The quantity description of the target unit representation.
 *
 * @example
 * const result = convertFromBase(1, "GRM");
 * console.log(result); // Output: { value: 1000, unitCode: 'GRM', symbol: 'g', quantity: 'mass' }
 */
export function convertFromBase(
  value: number,
  unitCode: string,
  debug?: boolean,
): ResultSetType {
  const lookup = lookupUnitOfMeasure(unitCode, debug);
  const baseFactor = lookup.result.baseFactor;
  const baseUnitCode = lookup.base.unitCode;
  const symbol = lookup.result.symbol;

  const res: any = {};
  res["unitCode"] = unitCode;
  res["symbol"] = symbol;
  res["quantity"] = lookup.base.quantity;

  if (!baseFactor) {
    if (unitCode === "FAH") {
      res["value"] = convertFahToCel(value);
    } else {
      res["value"] = value;
    }
  }

  if (baseFactor) {
    res["value"] = value / baseFactor;
  }

  if (debug) {
    console.log("");
    console.log("--- convertFromBase ---");
    console.log(`${value} ${baseUnitCode} equals ${res["value"]} ${unitCode}`);
    console.log(res);
    console.log("--- convertFromBase ---");
    console.log("");
  }

  return res;
}

/**
 * Converts Fahrenheit to Celsius.
 * @public
 * @param {number} fah - The temperature in Fahrenheit.
 * @returns {number} - The temperature in Celsius.
 *
 * @example
 * const celsiusValue = convertFahToCel(98.6);
 * console.log(celsiusValue); // Output: 37
 */
export function convertFahToCel(fah: number): number {
  return ((fah - 32) * 5) / 9;
}

/**
 * Converts Celsius to Fahrenheit.
 * @public
 * @param {number} cel - The temperature in Celsius.
 * @returns {number} - The temperature in Fahrenheit.
 *
 * @example
 * const fahrenheitValue = convertCelToFah(37);
 * console.log(fahrenheitValue); // Output: 98.6
 */
export function convertCelToFah(cel: number): number {
  return (cel * 9) / 5 + 32;
}

/**
 * Looks up unit of measure information based on the provided unit code.
 *
 * @param {string} unitCode - The unit code to look up (e.g., "g" for grams, "ml" for milliliters).
 * @returns {LookupUnitOfMeasureType} - An object containing the following key-value pairs:
 *  - "result": An object representing the unit of measure information that matches the provided unitCode.
 *  - "base": An object representing the base unit of measure information for the matched unit.
 * If no match is found for the provided unitCode, both "result" and "base" will be undefined in the Map.
 *
 * @example
 * const unitCode = "MIN";
 * const unitInfoMap = lookupUnitOfMeasure(unitCode);
 * console.log(unitInfoMap.get("result")); // Output: { quantity: "time", unitCode: "MIN", symbol: "min", baseFactor: 60 }
 * console.log(unitInfoMap.get("base"));   // Output: { quantity: "time", unitCode: "SEC", symbol: "s", baseFactor: 1 }
 */
function lookupUnitOfMeasure(
  unitCode: string,
  debug: boolean = false,
): LookupUnitOfMeasureType {
  const obj = UNITS_OF_MEASURE.filter((obj) => {
    return obj["unitCode"] === unitCode;
  });

  const objBase: UnitOfMeasureType[] = UNITS_OF_MEASURE.filter((objBase) => {
    return (
      objBase["quantity"] === obj[0].quantity && objBase["baseFactor"] == 1
    );
  });

  const res: any = {};
  res["result"] = obj[0] as UnitOfMeasureType;
  res["base"] = objBase[0] as UnitOfMeasureType;

  if (debug) {
    console.log("");
    console.log("---lookupUnitOfMeasure ---");
    console.log(
      `Input: ${unitCode} (${
        unitCode === res["base"]["unitCode"] ? "isBase" : "notBase"
      })`,
    );
    console.log(res);
    console.log("--- lookupUnitOfMeasure ---");
  }

  return res;
}
