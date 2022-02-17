import React from "react";
const placeholderRegex = /(\{[\d|\w]+\})/;

const formatString = (str: string, ...valuesForPlaceholders: any): any => {
  let hasObject = false;
  const res = (str || "")
    .split(placeholderRegex)
    .filter((textPart) => !!textPart)
    .map((textPart, index) => {
      if (textPart.match(placeholderRegex)) {
        const matchedKey = textPart.slice(1, -1);
        let valueForPlaceholder = valuesForPlaceholders[matchedKey];

        // If no value found, check if working with an object instead
        if (valueForPlaceholder == undefined) {
          const valueFromObjectPlaceholder = valuesForPlaceholders[0][matchedKey];
          if (valueFromObjectPlaceholder !== undefined) {
            valueForPlaceholder = valueFromObjectPlaceholder;
          } else {
            // If value still isn't found, then it must have been undefined/null
            return valueForPlaceholder;
          }
        }

        if (React.isValidElement(valueForPlaceholder)) {
          hasObject = true;
          return React.Children.toArray(valueForPlaceholder).map((component) => ({
            // @ts-ignore
            ...component,
            key: index.toString(),
          }));
        }

        return valueForPlaceholder;
      }
      return textPart;
    });
  // If the results contains a object return an array otherwise return a string
  if (hasObject) return res;
  return res.join("");
};

export default formatString;
