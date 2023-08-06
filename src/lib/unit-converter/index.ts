/** @module cookingUnitConverter */
import type {
  ItemRequiredProps,
  MatchProps,
  RequiredQuantityType,
  ResultSetType,
  SupplyType,
  UNCEFACTUnitCodeType,
  UnitOfMeasureType,
} from "./types";

import {
  EXCLUDED_NON_US,
  EXCLUDED_UNITS_OF_MEASURE,
  EXCLUDED_US,
  UNITS_OF_MEASURE,
} from "./constants";

import { convertFromBase, convertToBase } from "./converters";

function getBestMatchOpts(locale: string = "en", debug?: boolean) {
  const excludedLocale = locale == "en" ? EXCLUDED_US : EXCLUDED_NON_US;
  const excluded = [...EXCLUDED_UNITS_OF_MEASURE, ...excludedLocale];

  if (debug) {
    console.log(locale);
    console.log(excluded);
  }

  return {
    exclude: excluded,
    minValue: 1,
    maxValue: 999,
    preferMax: false,
  };
}

function getAvailableUnits(
  locale: string,
  quantity: string,
  debug?: boolean,
): UnitOfMeasureType[] {
  const options = getBestMatchOpts(locale, debug);

  const res = UNITS_OF_MEASURE.filter(
    (unit) =>
      unit["quantity"] == quantity &&
      !options.exclude.includes(unit["unitCode"]),
  );

  if (debug) {
    console.log("");
    console.log("--- getAvailableUnits ---");
    console.log(res);
    console.log("--- getAvailableUnits ---");
    console.log("");
  }

  return res;
}

function convertToAllAvailableUnits(
  baseValue: number,
  availableUnits: UnitOfMeasureType[],
  debug?: boolean,
): ResultSetType[] {
  const res = availableUnits.map((unit) =>
    convertFromBase(baseValue, unit.unitCode),
  );

  if (debug) {
    console.log("");
    console.log("--- convertToAllAvailableUnits ---");
    console.log(res);
    console.log("--- convertToAllAvailableUnits ---");
    console.log("");
  }

  return res;
}

function getClosest(
  convertedToAllAvailableUnits: ResultSetType[],
  goal?: number,
  debug?: boolean,
) {
  goal = goal || 250;
  const valuesArr = convertedToAllAvailableUnits.map((unit) => unit["value"]);
  const closestVal = closest(valuesArr, goal);

  const res = convertedToAllAvailableUnits.filter(
    (unit) => unit["value"] == closestVal,
  );

  if (debug) {
    console.log("");
    console.log("--- getClosest ---");
    console.log(res[0]);
    console.log("--- getClosest ---");
    console.log("");
  }

  return res[0];
}

function getBestMatch(props: MatchProps) {
  const { locale, value, unitCode, debug } = props;

  // 1. Convert given value to base
  const convertedToBase = convertToBase(value, unitCode, debug);
  // 2. Get all available units
  const availableUnits = getAvailableUnits(
    locale,
    convertedToBase["quantity"],
    debug,
  );
  // 3. Convert to all available units
  const convertedToAllAvailableUnits = convertToAllAvailableUnits(
    convertedToBase.value,
    availableUnits,
    debug,
  );
  // 4. Get closest match
  const closestValMatch = getClosest(convertedToAllAvailableUnits, 250, debug);

  if (debug) {
    console.log("");
    console.log("--- getBestMatch ---");
    console.log(closestValMatch);
    console.log("--- getBestMatch ---");
    console.log("");
  }

  return closestValMatch;
}

/**
 * Finds the number in an array that is closest to a given goal number.
 *
 * @param arr An array of numbers.
 * @param goal The target number to which the closest number will be found.
 * @returns The number in the array that is closest to the given goal number.
 * If the input array is empty, the function returns undefined.
 *
 * @example
 * const numberArray = [1, 4, 6, 8, 10];
 * const goalNumber = 7;
 * const closestNumber = closest(numberArray, goalNumber);
 * console.log(closestNumber); // Output: 8
 */
function closest(arr: number[], goal: number): number | undefined {
  if (arr.length === 0) {
    return undefined;
  }

  return arr.reduce((prev, curr) => {
    return Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev;
  });
}

/**
 * Formats a numeric value with the provided locale using the Intl.NumberFormat API.
 *
 * @param {number} value - The numeric value to be formatted.
 * @param {string} [locale="en"] - The locale code specifying the format rules. Default is "en" (English).
 *
 * @returns {string} - The formatted numeric value as a string according to the locale's format rules.
 */
function formatValue(value: number, locale: string = "en") {
  return new Intl.NumberFormat(locale, {
    maximumSignificantDigits: 2,
  }).format(value);
}

function getMatch(props: MatchProps) {
  const { locale, value, unitCode, debug } = props;
  // const opts = getBestMatchOpts(locale);

  let newValue = value;
  let newSymbol = "";

  if (unitCode) {
    const match = getBestMatch(props);
    newValue = match["value"] as number;
    newSymbol = match["symbol"];
  }

  const valueStr: string = formatValue(newValue, locale);

  const res: any = {};
  res["value"] = valueStr;
  //res["valueStr"] = valueStr;
  res["symbol"] = newSymbol;

  if (debug) {
    console.log("");
    console.log("--- getMatch ---");
    console.log(`${res["value"]} ${res["symbol"]}`);
    console.log(res);
    console.log("--- getMatch ---");
  }

  return res;
}

function itemRequiredQuantity(props: ItemRequiredProps) {
  const { locale, item, debug } = props;

  const requiredQuantity: RequiredQuantityType = item["requiredQuantity"];
  const value = requiredQuantity["value"] as number;
  const unitCode = requiredQuantity["unitCode"];

  const match = getMatch({
    locale: locale,
    value: value,
    unitCode: unitCode,
    debug: debug,
  } as MatchProps);

  if (debug) {
    console.log("");
    console.log("--- itemRequiredQuantity ---");
    console.log("item:", `${value} ${unitCode}`);
    console.log("match:", match);
    console.log("--- itemRequiredQuantity ---");
  }

  return match;
}

/**
 * Called in FoodStamp Component
 */

/**
 * Groups ingredients based on their required quantity (value and unit code).
 * Ingredients with the same quantity value and unit code are grouped together.
 * @public
 * @param {SupplyType[]} ingredients - An array of ingredients to be grouped.
 * Each ingredient should have the properties "name" (ingredient name) and "requiredQuantity"
 * (an object containing "value" for quantity value and "unitCode" for the unit code).
 *
 * @returns {SupplyType[]} - An array of grouped ingredients. Each grouped ingredient
 * contains a "name" property as an array of ingredient names and "requiredQuantity"
 * property as an object with "value" and "unitCode" representing the grouped quantity.
 */
export function groupIngredientsByQuantity(
  ingredients: SupplyType[],
): SupplyType[] {
  const groupedIngredients = [];
  const groupedNames = new Map();

  for (const ingredient of ingredients) {
    const { name, requiredQuantity } = ingredient as SupplyType;
    const { value, unitCode } = requiredQuantity as RequiredQuantityType;
    const key = value + (unitCode as UNCEFACTUnitCodeType);

    if (groupedNames.has(key)) {
      groupedNames.get(key).push(name);
    } else {
      groupedNames.set(key, [name]);
    }
  }

  for (const [, names] of groupedNames) {
    const { value, unitCode } = ingredients.find(
      (ingredient) => ingredient.name === names[0],
    )?.requiredQuantity as RequiredQuantityType;

    groupedIngredients.push({
      name: names,
      requiredQuantity: {
        value,
        unitCode,
      },
    });
  }

  return groupedIngredients;
}

export function itemRequiredQuantityValue(props: ItemRequiredProps) {
  const { debug } = props;

  const match = itemRequiredQuantity(props);
  const value = match["value"];

  if (debug) {
    console.log("");
    console.log("--- itemRequiredQuantityValue ---");
    console.log(value);
    console.log(match);
    console.log("--- itemRequiredQuantityValue ---");
  }

  return value;
}

export function itemRequiredQuantitySymbol(props: ItemRequiredProps) {
  const { debug } = props;

  const match = itemRequiredQuantity(props);
  const symbol = match["symbol"];

  if (debug) {
    console.log("");
    console.log("--- itemRequiredQuantitySymbol ---");
    console.log(symbol);
    console.log(match);
    console.log("--- itemRequiredQuantitySymbol ---");
  }

  return symbol;
}
