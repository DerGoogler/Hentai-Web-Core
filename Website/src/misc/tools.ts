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

/**
 * Simplfied
 * @param id
 * @param callback
 */
export function getByElementId(id: string, callback: Function) {
  var e: HTMLElement | null;
  if ((e = document.getElementById(id))) {
    if (typeof callback == "function") {
      callback(e);
    }
  }
}

export function typeIF(_: any, __: any, ___: any) {
  if (stringToBoolean(_)) {
    return __;
  } else {
    return ___;
  }
}
