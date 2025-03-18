/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * The function generates a specified number of nearby colors based on a given base color, with
 * variations in hue, saturation, and lightness.
 * @param {string} baseColor - The baseColor parameter is a string representing a color in HSL format.
 * @param [count=5] - The `count` parameter determines the number of nearby colors to generate. By
 * default, it is set to 5, but you can change it to any positive integer value.
 * @param [hueVariation=0] - The hueVariation parameter determines the range of variation in the hue
 * component of the generated colors. It specifies how much the hue can deviate from the base color. A
 * value of 0 means no deviation, while a positive value allows for variation in the hue.
 * @param [satVariation=5] - The `satVariation` parameter represents the variation in saturation for
 * the generated nearby colors. It determines how much the saturation of the nearby colors can differ
 * from the base color. The value is specified in percentage points. For example, if `satVariation` is
 * set to 5, the saturation
 * @param [lightVariation=10] - The `lightVariation` parameter determines the range of variation in
 * lightness for the generated nearby colors. It specifies how much the lightness value of the base
 * color can be increased or decreased to generate the nearby colors. The value is specified in
 * percentage points. For example, if `lightVariation
 * @returns The function `generateNearbyColors` returns an array of strings representing nearby colors.
 */
export function generateNearbyColors(
  baseColor: string,
  count = 5,
  hueVariation = 0,
  satVariation = 5,
  lightVariation = 10
) {
  // Parse the base color
  const regex = /hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/;
  const match = baseColor.match(regex);

  if (!match) {
    throw new Error("Invalid HSL color format");
  }

  const baseHue = parseInt(match[1]);
  const baseSaturation = parseInt(match[2]);
  const baseLightness = parseInt(match[3]);

  // Generate nearby colors
  const nearbyColors = [];
  for (let i = 0; i < count; i++) {
    const hue = baseHue + randomInRange(-hueVariation, hueVariation);
    const saturation = clamp(
      baseSaturation + randomInRange(-satVariation, satVariation),
      0,
      100
    );
    const lightness = clamp(
      baseLightness + randomInRange(-lightVariation, lightVariation),
      0,
      100
    );

    const generatedColor = `hsl(${hue.toFixed(0)},${saturation.toFixed(
      0
    )}%,${lightness.toFixed(0)}%)`;
    nearbyColors.push(generatedColor);
  }

  return nearbyColors;
}

/**
 * The randomInRange function generates a random number within a specified range.
 * @param {number} min - The minimum value of the range.
 * @param {number} max - The maximum value that the random number can be.
 * @returns a random number within the range specified by the minimum and maximum values.
 */
function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

/**
 * The `clamp` function takes a value and ensures it falls within a specified range.
 * @param {number} value - The value parameter represents the number that you want to clamp or restrict
 * within a certain range.
 * @param {number} min - The `min` parameter represents the minimum value that the `value` parameter
 * can be.
 * @param {number} max - The `max` parameter represents the maximum value that the `value` parameter
 * can be.
 * @returns the clamped value of the input number.
 */
function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/**
 * The function `colorGenPlusOtherObj` takes an array of objects and adds a color property to each
 * object based on a base color, with optional variations in hue, saturation, and lightness.
 * @param {Record<keyof T, any>[]} obj - An array of objects where each object has keys of type T.
 * @param {string} baseColor - The `baseColor` parameter is a string representing the base color that
 * will be used as a starting point for generating nearby colors.
 * @param {string} baseColorKey - The `baseColorKey` parameter is the key in the `obj` array of objects
 * where the generated colors will be stored.
 * @param [hueVariation=0] - The `hueVariation` parameter determines the range of variation in hue for
 * the generated colors. A value of 0 means no variation, while a positive value will result in colors
 * with slightly different hues.
 * @param [satVariation=5] - The `satVariation` parameter represents the variation in saturation of the
 * generated colors. It determines how much the saturation of the base color can vary when generating
 * nearby colors. The value is set to 5 by default, but you can adjust it to increase or decrease the
 * range of saturation variation.
 * @param [lightVariation=10] - The `lightVariation` parameter represents the variation in lightness of
 * the generated colors. It determines how much the lightness value of the base color can vary when
 * generating nearby colors. The higher the value, the greater the variation in lightness.
 * @returns the modified object with the injected color values.
 */
export function colorGenPlusOtherObj(
  obj: Record<string, any>[],
  baseColor: string,
  baseColorKey: string,
  hueVariation = 0,
  satVariation = 5,
  lightVariation = 10
) {
  // get the obj length and inject the color to the obj
  const objLength = obj.length;
  const colors = generateNearbyColors(
    baseColor,
    objLength,
    hueVariation,
    satVariation,
    lightVariation
  );
  for (let i = 0; i < objLength; i++) {
    obj[i][baseColorKey] = colors[i];
  }
  return obj;
}

/**
 * The function `colorGenPlusOtherObjTailwind` generates nearby colors based on a base color and
 * injects them into an array of objects using a specified key.
 * @param {Record<string, any>[]} obj - The `obj` parameter is an array of objects where each object
 * represents a record with string keys and any corresponding values.
 * @param {string} baseColor - The `baseColor` parameter is the starting color that will be used as a
 * base for generating nearby colors.
 * @param {string} baseColorKey - The `baseColorKey` parameter in the `colorGenPlusOtherObjTailwind`
 * function is used to specify the key in each object of the `obj` array where the generated colors
 * will be stored. This key will be used to update the color value for each object in the array.
 * @param [hueVariation=0] - The `hueVariation` parameter in the `colorGenPlusOtherObjTailwind`
 * function determines the range of variation in hue for generating nearby colors based on the base
 * color. A higher `hueVariation` value will result in a wider range of hues in the generated colors,
 * while a lower
 * @param [satVariation=5] - The `satVariation` parameter in the `colorGenPlusOtherObjTailwind`
 * function represents the amount of variation in the saturation of the generated colors. It is used to
 * adjust the saturation level of the colors generated based on the base color provided. A higher
 * `satVariation` value will
 * @param [lightVariation=10] - The `lightVariation` parameter in the `colorGenPlusOtherObjTailwind`
 * function represents the amount of variation in lightness that will be applied to the base color when
 * generating nearby colors. This parameter allows you to control how much lighter or darker the
 * generated colors will be compared to the base
 * @returns The function `colorGenPlusOtherObjTailwind` returns an array of type `T` after injecting
 * generated colors into the objects in the input array `obj` based on the specified parameters such as
 * `baseColor`, `hueVariation`, `satVariation`, and `lightVariation`.
 */
export function colorGenPlusOtherObjTailwind<T>(
  obj: Record<string, any>[],
  baseColor: string,
  baseColorKey: string,
  hueVariation = 0,
  satVariation = 5,
  lightVariation = 10
): T[] {
  // get the obj length and inject the color to the obj
  const objLength = obj.length;
  const colors = generateNearbyColors(
    baseColor,
    objLength,
    hueVariation,
    satVariation,
    lightVariation
  );

  for (let i = 0; i < objLength; i++) {
    obj[i][baseColorKey] = colors[i];
  }
  return obj as T[];
}

/* The `export function parsingColorToObject<T>(` function is a utility function that takes in
parameters to generate nearby colors based on a base color and injects those colors into an array of
objects. Here's a breakdown of its functionality: */
export function parsingColorToObject<T>({
  obj,
  color,
  colorKey = "color",
  hue = 0,
  sat = 5,
  light = 10,
}: {
  obj: Record<string, any>[];
  color: string;
  colorKey?: string;
  hue?: number;
  sat?: number;
  light?: number;
}): T[] {
  return colorGenPlusOtherObjTailwind<T>(obj, color, colorKey, hue, sat, light);
}

/**
 * The `generateSingleColor` function takes a base color in HSL format and generates a single color
 * with variations in hue, saturation, and lightness.
 * @param {string} baseColor - The baseColor parameter is a string representing a color in HSL format.
 * For example, "hsl(200, 50%, 50%)" represents a color with a hue of 200, saturation of 50%, and
 * lightness of 50%.
 * @param [hueVariation=0] - The `hueVariation` parameter determines the range of variation in the hue
 * value of the generated color. It specifies how much the hue can deviate from the base color. A value
 * of 0 means no variation, while a positive value allows for variation in both directions (positive
 * and negative).
 * @param [satVariation=5] - The `satVariation` parameter represents the variation in saturation of the
 * generated color. It determines how much the saturation of the generated color can deviate from the
 * base color. The value is specified in percentage points, where a positive value increases the
 * saturation and a negative value decreases it. The default value
 * @param [lightVariation=10] - The `lightVariation` parameter determines the range of variation in
 * lightness for the generated color. It specifies how much the lightness value of the base color can
 * be increased or decreased to generate a new color. The value is given in percentage, where 0 means
 * no variation and 100 means
 * @returns The function `generateSingleColor` returns a string representing a generated color in the
 * HSL format.
 */
export function generateSingleColor(
  baseColor: string,
  hueVariation = 0,
  satVariation = 5,
  lightVariation = 10
): string {
  // Parse the base color
  const regex = /hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/;
  const match = baseColor.match(regex);

  if (!match) {
    throw new Error("Invalid HSL color format");
  }

  const baseHue = parseInt(match[1]);
  const baseSaturation = parseInt(match[2]);
  const baseLightness = parseInt(match[3]);

  // Generate a single color
  const hue = baseHue + randomInRange(-hueVariation, hueVariation);
  const saturation = clamp(
    baseSaturation + randomInRange(-satVariation, satVariation),
    0,
    100
  );
  const lightness = clamp(
    baseLightness + randomInRange(-lightVariation, lightVariation),
    0,
    100
  );

  const generatedColor = `hsl(${hue.toFixed(0)},${saturation.toFixed(
    0
  )}%,${lightness.toFixed(0)}%)`;

  return generatedColor;
}
