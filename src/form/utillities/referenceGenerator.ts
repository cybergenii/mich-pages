/**
 * Generate reference based on given length
 * @param {number} length
 * @returns {number}
 */

export enum GeneratekeyE {
  alphanum = "alphanum",
  letters = "letters",
  numbers = "numbers",
  default = "default",
  alphanumLower = "alphanumLower",
  characters = "characters",
  password = "password",
}

type PresetType = {
  alphanum: string;
  letters: string;
  numbers: string;
  default: string;
  alphanumLower: string;
  characters: string;
  password: string;
};

export enum GeneratePrefixType {
  NONE = "",
  VIRTUAL_ACCOUNT = "VIR-ACCT",
  TRANSFER = "TRANS",
  WITHDRAWAL = "WITH",
  DEPOSIT = "DEP",
  BILL = "BILL",
}

export function generateAlphanumericReference({
  size = 10,
  type = GeneratekeyE.alphanumLower,
  prefix = GeneratePrefixType.NONE,
}: {
  size?: number;
  type?: GeneratekeyE;
  prefix?: GeneratePrefixType;
}) {
  const numbers = "0123456789";
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const commonCharacters = ".@$#*";
  const characters =
    "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿŒœŠšŸƒˆ˜¡¢£¤¥€¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρςστυφχψωϑϒϖ†‡•…‰′″‾⁄℘ℑℜ™ℵ←↑→↓↔↵⇐⇑⇒⇓⇔∀∂∃∅∇∈∉∋∏∑−∗√∝∞∠∧∨∩∪∫∴∼≅≈≠≡≤≥⊂⊃⊄⊆⊇⊕⊗⊥⋅⌈⌉⌊⌋⟨⟩◊♠♣♥♦";

  const presets: PresetType = {
    numbers,
    letters: `${letters}${letters.toUpperCase()}`,
    alphanum: `${letters}${numbers}${letters.toUpperCase()}`,
    characters,
    default: `${numbers}${letters}${letters.toUpperCase()}${characters}`,
    alphanumLower: `${letters}${numbers}`,
    password: `${commonCharacters}${numbers}${letters}${letters.toUpperCase()}`,
  };
  const presetType = presets[type];
  const genKey = Array(size)
    .fill(null)
    .map(() =>
      presetType.charAt(Math.round(Math.random() * presetType.length) - 1)
    );
  return prefix.length <= 0 ? genKey.join("") : `${prefix}_${genKey.join("")}`;
}
export const generateReference = (length: number) => {
  return generateAlphanumericReference({
    size: length,
    type: GeneratekeyE.numbers,
  });
};
/**
 * The function generates a unique ID based on the current date and time, along with a provided type.
 * @param {string} type - The `type` parameter is a string that represents the type of the ID being
 * generated. It is used to create a unique identifier for a specific type of object or entity.
 * @returns a string that is generated based on the current date and time, along with a random number
 * and the provided type parameter. The returned string has the following format:
 * "TYPE_YYYYMMDDHH_MMSS_RANDOMNUMBER".
 */

export function generateIdWithDate(type: string = "") {
  const id = new Date();

  const i: string = id.toLocaleString();
  const j: string = i.split(",")[0]!;
  const k: string = j.split("/").join("");

  const l: string = i.split(",")[1]!;
  const m: string = l.split(" ")[1]!;
  const n = m.split(":")[0];
  const o = m.split(":")[1];
  const p = m.split(":")[2];
  const q = Math.round(Math.random() * 90000 + 10000);
  const r = `${type.toUpperCase()}_${k}${n}${o}_${p}${o}${n}_${q}`;

  return r;
}

/**
 * Convert hex string to int
 *
 * @param {string} hexString - Hexadecimal string
 * @returns {number} - Integer value
 */
export const convertHexToInteger = (hexString: string): number => {
  // Ensure the hex string starts with '0x'
  // if (!hexString.startsWith('0x')) {
  //   throw new Error('Invalid hex string, it must start with "0x"');
  // }

  // Parse the hexadecimal string and convert to an integer
  const integerValue = parseInt(hexString, 16);

  return integerValue;
};

/**
 * Generate a reference from a hex string by converting it to a UInt32 number.
 *
 * @param {string} hexString - Hexadecimal string
 * @returns {number} - UInt32 number
 */
export const generateReferenceFromHex = (hexString: string): number => {
  // Normalize hex string
  const normalizedHexString = hexString.toUpperCase().replace(/[^0-9A-F]/g, "");

  // Calculate sum of hexadecimal digits
  let sum = 0;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < normalizedHexString.length; i++) {
    const tempStr = normalizedHexString[i];
    if (tempStr !== undefined) {
      sum += parseInt(tempStr, 16);
    }
  }

  // Apply modulo operation
  const uintID = sum % 2 ** 16; // sum % 2 ** 31;

  return uintID;
};
