/** @module i18n */
import { readFileSync } from "node:fs";
import path from "node:path";

/**
 * Pluralizes a string expression based on the quantity provided
 * @public
 * @param {number} qty - The quantity to determine the pluralization.
 * @param {string} expr - The expression with pluralization format (e.g., "Tomatoe[|s]").
 * @returns {string} - The pluralized string.
 * @example
 * console.log(pluralize(1, "Tomate[|n]")); // Output: "1 Tomate"
 * console.log(pluralize(3, "W[urst|ürste]")); // Output: "3 Würste"
 */
export function pluralize(qty: number, expr: string): string {
  return expr.replace(/\[([^|]*)\|([^\]]*)\]/g, qty <= 1 ? "$1" : "$2");
}

/**
 * Retrieves an internationalization (i18n) object for the specified locale
 * @public
 * @param {string} [locale=en] - The locale identifier (e.g., "en", "de").
 * @param {string} [node] - The specific node within the translation JSON object to retrieve. Defaults to the entire object.
 * @returns {string} - The i18n object or a specific node within it.
 * @example
 * // Fetch the entire i18n object for the "en" locale
 * const i18nObj = getI18nObj("en");
 *
 * // Fetch a specific node ("ingredient") within the i18n object for the "de" locale
 * const i18nObjIngredient = getI18nObj("de", "ingredient");
 */
export function getI18nObj(locale: string = "en", node?: string): string {
  const localeObj = new Intl.Locale(locale);
  locale = localeObj.language;

  const filePath = path.join(
    process.cwd(),
    `public/locales/${locale}/translation.json`,
  );
  const fileContents = readFileSync(filePath, "utf-8");
  const json = JSON.parse(fileContents);

  return node ? json[node] : json;
}

/**
 * Translates and optionally pluralizes a string key using an i18n object
 * @public
 * @param {string} key - The translation key.
 * @param {(number | Record<string, string>)} qtyOrI18nObj - The quantity to determine pluralization or the i18n object.
 * @param {Record<string, string>} [i18nObj] - The i18n object containing translations. If qty is provided, this is the i18n object. Otherwise, qty is the second argument.
 * @returns {string} - The translated and possibly pluralized string.
 * @example
 * const i18nObj = {
 *   "tomatoe": "Tomate[|n]",
 *   "sausage": "W[urst|ürste]"
 * };
 * console.log(i18n("tomatoe", 1, i18nObj)); // Output: "1 Tomate"
 * console.log(i18n("tomatoe", 2, i18nObj)); // Output: "2 Tomaten"
 * console.log(i18n("sausage", 1, i18nObj)); // Output: "1 Wurst"
 * console.log(i18n("sausage", 2, i18nObj)); // Output: "2 Würste"
 */
export function i18n(
  key: string,
  qtyOrI18nObj: number | Record<string, string>,
  i18nObj?: Record<string, string>,
): string {
  const qty = typeof qtyOrI18nObj === "number" ? qtyOrI18nObj : false;
  const obj = typeof qtyOrI18nObj === "object" ? qtyOrI18nObj : i18nObj;

  try {
    const expr = obj?.[key];
    return qty ? pluralize(qty, expr || key) : expr || key;
  } catch (error) {
    return key;
  }
}
