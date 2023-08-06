/** @module utils */

/**
 * Compares two names and returns a sorting order based on their lexicographical order.
 *
 * @param {string} name_a - The first name.
 * @param {string} name_b - The second name.
 * @returns {number} - A negative value if name_a comes before name_b, a positive value if name_a comes after name_b,
 * and 0 if the names are equal.
 *
 * @example
 * const nameArray = ['Charlie', 'Bob', 'Alice', 'Eve'];
 * const sortedNames = nameArray.sort(sortByName);
 * console.log(sortedNames); // Output: ['Alice', 'Bob', 'Charlie', 'Eve']
 */
export function sortByName(name_a: string, name_b: string): number {
  if (name_a < name_b) {
    return -1;
  }

  if (name_a > name_b) {
    return 1;
  }

  return 0;
}

/**
 * Compares two date strings and returns a sorting order based on their chronological order.
 *
 * @param {string} datestring_a - The first date string.
 * @param {string} datestring_b - The second date string.
 * @returns {number} - A negative value if datestring_a is earlier than datestring_b,
 * a positive value if datestring_a is later than datestring_b,
 * and 0 if the date strings represent the same date and time.
 *
 * @example
 * const dateArray = ['2022-05-15', '2021-12-31', '2023-03-20'];
 * const sortedDates = dateArray.sort(sortByDatestring);
 * console.log(sortedDates); // Output: ['2021-12-31', '2022-05-15', '2023-03-20']
 */
export function sortByDatestring(
  datestring_a: string,
  datestring_b: string,
): number {
  return Date.parse(datestring_a) - Date.parse(datestring_b);
}
