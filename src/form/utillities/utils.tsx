/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
 
/* eslint-disable react-refresh/only-export-components */



import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { CalendarIcon, FileText, ImageIcon, Info, LinkIcon, List, LockKeyholeIcon, Mail, OptionIcon, Phone, PlusCircle, RefreshCw, Tag, ToggleLeft, ViewIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { PageHeadingI, PageI } from "../interface/interface.form";


export function mergeCssClass(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isMobile = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );


export const isTreatAsImage = (file: File) => {
  const { type, size } = file;
  if (type.startsWith("image")) {
    return size < 1024 * 1024; // 10MB
  }
  return false;
};
export const isElementVisible = (el: Element | null) => {
  if (!el) return false;
  const rect = el.getBoundingClientRect(),
    vWidth = window.innerWidth || document.documentElement.clientWidth,
    vHeight = window.innerHeight || document.documentElement.clientHeight,
    efp = function (x: number, y: number) {
      return document.elementFromPoint(x, y);
    };
  // Return false if it's not in the viewport
  if (
    rect.right < 0 ||
    rect.bottom < 0 ||
    rect.left > vWidth ||
    rect.top > vHeight
  )
    return false;
  // Return true if any of its four corners are visible
  return (
    el.contains(efp(rect.left, rect.top)) ||
    el.contains(efp(rect.right, rect.top)) ||
    el.contains(efp(rect.right, rect.bottom)) ||
    el.contains(efp(rect.left, rect.bottom))
  );
};
export function getDefaultSize(
  size?: { width: number; height: number },
  limit?: { min: number; max: number }
) {
  if (!size) return { width: 0, height: 0 };
  const { min, max } = limit ?? { min: 200, max: 320 };
  const { width: oWidth, height: oHeight } = size;
  if (oWidth == oHeight) {
    const tmp = min > oWidth ? min : oWidth < max ? oWidth : max;
    return { width: tmp, height: tmp };
  }
  const isVertical = oWidth <= oHeight;
  let dWidth = 0;
  let dHeight = 0;
  if (isVertical) {
    dHeight = oHeight < min ? min : oHeight < max ? oHeight : max;
    dWidth = (oWidth / oHeight) * dHeight;
  } else {
    dWidth = oWidth < min ? min : oWidth < max ? oWidth : max;
    dHeight = (oHeight / oWidth) * dWidth;
  }
  return { width: dWidth, height: dHeight };
}

export function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return "0 Bytes";
  const k = 1000;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
export const getImageSize = (url: string) => {
  const size = { width: 0, height: 0 };
  if (!url) return size;
  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      size.width = img.width;
      size.height = img.height;
      resolve(size);
    };
    img.onerror = () => {
      resolve(size);
    };
  });
};

/*!
 * Get the contrasting color for any hex color
 * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
 * Derived from work by Brian Suda, https://24ways.org/2010/calculating-color-contrast/
 * @param  {String} A hexcolor value
 * @return {String} The contrasting color (black or white)
 */
export const getContrastColor = (hexcolor: string) => {
  if (!hexcolor) return "";
  // If a leading # is provided, remove it
  if (hexcolor.slice(0, 1) === "#") {
    hexcolor = hexcolor.slice(1);
  }
  // If a three-character hexcode, make six-character
  if (hexcolor.length === 3) {
    hexcolor = hexcolor
      .split("")
      .map(function (hex) {
        return hex + hex;
      })
      .join("");
  }
  // Convert to RGB value
  const r = parseInt(hexcolor.substr(0, 2), 16);
  const g = parseInt(hexcolor.substr(2, 2), 16);
  const b = parseInt(hexcolor.substr(4, 2), 16);
  // Get YIQ ratio
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  // Check contrast
  return yiq >= 128 ? "black" : "white";
};
export const isElectronContext = () => {
  return navigator.userAgent.toLowerCase().indexOf("electron/") > -1;
};
export const isDarkMode = () => {
  const isDarkMode = localStorage.theme === "dark";
  const isLightMode = localStorage.theme === "light";
  return (
    isDarkMode ||
    (!isLightMode && window.matchMedia("(prefers-color-scheme: dark)").matches)
  );
};
export const platform = () => {
  const ua = navigator.userAgent.toLowerCase();
  const isMac = ua.indexOf("darwin") != -1;
  const isWindows = ua.indexOf("win32") != -1;
  const isLinux = ua.indexOf("linux") != -1;
  return {
    isMac,
    isWindows,
    isLinux,
  };
};


export const capitalize = ( text: string ) => {
  const __text = text ?? "";
  let _text = __text.charAt(0).toUpperCase() + __text.slice(1);

  if (__text.includes(" ")) {
    const newText = __text.split(" ");
    const data = newText.map((item) => {
      return item.charAt(0).toUpperCase() + item.slice(1);
    });
    _text = data.join(" ");
  }
  return _text;
};
/**
 * The function `splitByUppercase` splits a string into an array of words based on uppercase letters.
 * @param {string} text - The `splitByUppercase` function takes a `text` parameter of type string. This
 * function splits the input text into an array of words based on uppercase letters. Each word in the
 * output array is determined by the occurrence of an uppercase letter in the input text.
 * @returns An array of strings where each string is a word split by uppercase letters.
 */

export function splitByUppercase(text: string): string[] {
  const words: string[] = [];
  let currentWord = "";

  for (const char of text) {
    if (char.toUpperCase() === char) {
      if (currentWord) {
        words.push(currentWord);
      }
      currentWord = "";
    }
    currentWord += char;
  }

  if (currentWord) {
    words.push(currentWord);
  }

  return words;
}

/**
 * The `deleteFields` function removes specified fields from an object while preserving the rest of the
 * object's properties.
 * @param {T} obj - The `obj` parameter is an object of type `T`, where `T` is a generic type that
 * extends `object`. This means that `obj` can be any object type, and the function will preserve the
 * type of the object that is passed in.
 * @param {(keyof T)[]} fields - The `fields` parameter in the `deleteFields` function is an array of
 * keys that you want to delete from the object `obj`. These keys should be of the same type as the
 * keys of the object `obj`, which is specified by the generic type `T extends object`.
 * @returns The `deleteFields` function returns a new object that is a partial copy of the input object
 * `obj`, excluding the fields specified in the `fields` array.
 */
export function deleteFields<T extends object>(
  obj: T,
  fields: (keyof T)[]
): Partial<T> {
  return Object.keys(obj)
    .filter(
      (key) =>
        !fields.includes(key as keyof T) &&
        Object.prototype.hasOwnProperty.call(obj, key)
    )
    .reduce((acc, key) => {
      return {
        ...acc,
        [key]: obj[key as keyof T],
      };
    }, {} as Partial<T>);
}

type KeyOf<T> = keyof T;
/**
 * The `easyPick` function takes an object and an array of keys, and returns a new object with only the
 * properties specified by the keys.
 * @param object - The `object` parameter is an object of type `T` or a partial object of type `T`. It
 * represents the object from which properties will be picked.
 * @param {KeyOf<T>[]} keys - An array of keys that represent the properties to be picked from the
 * `object` parameter.
 */
export function easyPick<T>(objs: Partial<T>, keys: KeyOf<T>[]): Partial<T> {
  return keys.reduce((obj, key) => {
    if (objs && Object.prototype.hasOwnProperty.call(objs, key)) {
       
      obj[key] = objs[key];
    }
    return obj;
  }, {} as Partial<T>);
}

/* The above code is a TypeScript React component called `RenderHtml`. It takes in props `jsonData`,
`metaData`, and `subject`. */
export const RenderHtml = ({
  jsonData,
  metaData,
  subject,
}: {
  jsonData: object | string;
  subject?: string;
  metaData?: string;
}) => {
  function parseData(data: object) {
    if (data !== null && data !== undefined) {
      return (
        <div>
          {Object.entries(data).map(([key, value]) => (
            <div
              key={key}
              className="flex flex-row flex-wrap px-2 py-1 overflow-auto "
            >
              {typeof value !== "object" && (
                <div
                  className="text-gray-500"
                  style={{ fontSize: "12px", fontWeight: 400 }}
                >
                  {key}
                </div>
              )}
              {typeof value === "object" && !Array.isArray(value) ? (
                parseData(value)
              ) : Array.isArray(value) ? (
                value.map((d) => {
                  if (typeof d === "object") {
                    return parseData(d);
                  } else {
                    return <div dangerouslySetInnerHTML={{ __html: data }} />;
                  }
                })
              ) : (
                <div
                  className="px-2 text-[var(--primary-darkest)]"
                  style={{ fontSize: "12px", fontWeight: 500 }}
                >
                  {value}
                </div>
              )}
            </div>
          ))}
        </div>
      );
    } else {
      return <></>;
    }
  }

  const renderJsonData = () => {
    if (typeof jsonData === "object" && jsonData) {
      return parseData(jsonData);
    } else {
      return <div dangerouslySetInnerHTML={{ __html: jsonData }} />;
    }
  };

  return (
    <>
      <div className="p-2 rounded-md shadow-lg  w-[100%] justify-start items-center text-sm break-words ">
        <div className="h-2 relative" />
        <div className="h-full justify-start items-center gap-3 block">
          {" "}
          {subject && (
            <div className="text-[16px] font-semibold py-1 text-black leading-none">
              subject
            </div>
          )}
          {subject && (
            <div className="text-[14px] font-normal text-black leading-none">
              {subject}
            </div>
          )}
          <div className="text-[12px] font-normal text-black leading-none">
            <div className="text-[12px] font-semibold py-1 text-black leading-none">
              Details
            </div>

            <div>{renderJsonData()}</div>
          </div>
          {metaData && (
            <div className="text-[14px] font-normal text-black leading-none">
              {metaData}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export function isImageURL(url:string) {
  const imageRegex = /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp|svg)(\?.*)?$/i;
  return imageRegex.test(url);
}

/**
 * The function `reduceTextLength` shortens a given text to a specified length by adding ellipsis if
 * necessary.
 * @param {string} text - The `text` parameter is a string that represents the text that you want to
 * reduce the length of.
 * @param {number} length - The `length` parameter in the `reduceTextLength` function specifies the
 * maximum length that the `text` should be reduced to. If the length of the `text` is greater than the
 * specified `length`, the function will truncate the text and append "..." at the end to indicate that
 * it
 * @returns The function `reduceTextLength` takes a `text` string and a `length` number as parameters.
 * If the length of the `text` is greater than the specified `length`, it returns a substring of the
 * `text` up to `length-3` characters followed by ellipsis (...). If the length of the `text` is less
 * than or equal to the specified `length`,
 */
export function reduceTextLength(text: string, length: number) {
  if (text.length > length) {
    return `${text.substring(0, length-3)}...`;
  }
  return text;
}

/**
 * The function `findKeyByValue` takes an object and a value, and returns the key associated with that
 * value in the object, if it exists.
 * @param obj - The `obj` parameter is an object with string keys and values of any type.
 * @param {string} value - The `value` parameter in the `findKeyByValue` function is the value that you
 * want to search for within the object `obj`. The function will return the key associated with this
 * value in the object, if it exists.
 * @returns The `findKeyByValue` function returns the key of the object `obj` that corresponds to the
 * given `value`. If a key with the specified value is found, it returns the key as a string. If no key
 * with the specified value is found, it returns `undefined`.
 */
export function findKeyByValue(obj: Record<string, any>, value: string): string | undefined {

  
  return Object.keys(obj).find(key => obj[key] === value);
}


/**
 * The function `parseNotification` extracts JSON data, subject, and metadata from a given string.
 * @param {string} s - The `parseNotification` function takes a string `s` as input and extracts JSON
 * data, subject, and metadata from it. The JSON data is extracted from the input string between the
 * first occurrence of "{" and the last occurrence of "}". The function then attempts to parse the
 * extracted JSON data. If
 * @returns The function `parseNotification` returns an object with three properties:
 * 1. `jsonData`: Either a string or an object parsed from the JSON string extracted from the input
 * string `s`.
 * 2. `subject`: The text before the JSON object in the input string `s`.
 * 3. `metaData`: The text after the JSON object in the input string `s`.
 */
export function parseNotification(s: string): {
  jsonData: string | object;
  subject: string;
  metaData: string;
} {
  const startIndex: number = s.indexOf("{");
  const endIndex: number = s.lastIndexOf("}") + 1;

  // Extract JSON string
  let jsonString: string = s.substring(startIndex, endIndex);
  const regex = /}\s*headers\s*{/i;

  if (regex.test(jsonString)) {
    const parts = jsonString.split(regex);
    jsonString = parts[0] + "}";
  }
  // Parse JSON
  let jsonData;
  try {
    jsonData = JSON.parse(jsonString) as object;
  } catch (_e) {
    jsonData = jsonString as string;
  }

  // Extract remaining text
  const remainingBText: string = s.substring(0, startIndex);
  const remainingEText: string = s.substring(endIndex);

  if (remainingBText.includes(":")) {
    remainingBText.split(":")[0];
  }
  if (remainingEText.includes(":")) {
    remainingEText.split(":")[0];
  }

  return { jsonData, subject: remainingBText, metaData: remainingEText };
}



// Helper function to get icon based on formType
/**
 * The function `getIconForFormType` takes a form type as input and returns an appropriate icon
 * component based on the type.
 * @param formType - The `formType` parameter is a type of the `PageHeadingI` interface, which can have
 * values such as "image", "date", "email", "text", "textarea1", "textarea2", "number", "tel",
 * "toggle", "array", "select", "
 * @returns The function `getIconForFormType` returns an icon component based on the input `formType`.
 * The icons returned include ImageIcon, CalendarIcon, Mail, FileText, Info, Phone, ToggleLeft, List,
 * OptionIcon, LockKeyholeIcon, LinkIcon, and Tag.
 */
export const getIconForFormType = (formType: PageHeadingI['formType']) => {
  switch (formType) {
    case "image":
      return <ImageIcon />;
    case "date":
      return <CalendarIcon />;
    case "email":
      return <Mail />;
    case "text":
         case 'textarea1':
    case 'textarea2':
      return <FileText />;
    case "number":
      return <Info />;
    case "tel":
      return <Phone />;
    case "toggle":
      return <ToggleLeft />;
    case "array":
      return <List />;
    
    case "select":
    case 'select2':
    case 'select3':
      return <OptionIcon />
    case 'password':
      return <LockKeyholeIcon />
 
    case 'url':
      return <LinkIcon />
    default:
      return <Tag />;
  }
};


/**
 * The function `getPageType` returns a specific icon component based on the type of page provided as
 * input.
 * @param data - The `data` parameter in the `getPageType` function is of type `PageI['type']`, which
 * means it is expected to be a value that corresponds to the `type` property of an object of type
 * `PageI`. The function uses a switch statement to determine the appropriate icon component
 * @returns The function `getPageType` returns a different icon component based on the value of the
 * `data` parameter. If `data` is equal to 'CREATE', it returns the `<PlusCircle />` component. If
 * `data` is equal to 'UPDATE', it returns the `<RefreshCw />` component. If `data` is equal to 'VIEW',
 * it returns the `<ViewIcon />
 */
export function getPageType (data: PageI['type']) {
  
  switch (data) {
  
    case 'CREATE':
      return <PlusCircle />;

    case 'UPDATE':
      return <RefreshCw />;
    case 'VIEW':
      return <ViewIcon />
  }
}