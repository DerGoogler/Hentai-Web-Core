/**
 * Converts an string into boolean
 * @param string
 * @returns {Boolean}
 */
export function stringToBoolean(string: string): boolean {
  switch (string.toLowerCase().trim()) {
    case "true":
    case "yes":
    case "1":
      return true;

    case "false":
    case "no":
    case "0":
    case null:
      return false;

    default:
      return Boolean(string);
  }
}
