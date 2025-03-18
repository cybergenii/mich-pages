

export function convertDateFormat(inputDateString: string): string {
  // Convert the input string to a Date object
  const inputDate = new Date(inputDateString);


  // Check if the conversion was successful
  if (isNaN(inputDate.getTime())) {
    return inputDateString;
  }

  // Format the Date object in the desired format
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
  };
  const outputDateString = inputDate.toLocaleDateString("en-US", options);

  return outputDateString;
}

// Example usage:
