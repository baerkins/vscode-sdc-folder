/**
 * Convert a string into an array of cleaned words:
 * - Removes numbers
 * - Splits on space, hyphen, underscore
 * - Filters empty parts
 */
function toWords(input: string): string[] {
  return input
    .replace(/[0-9]/g, "")                   // remove numbers
    .split(/[\s\-_]+/)                        // split on space, hyphen, underscore
    .filter(Boolean);                         // remove empty
}

/**
 * camelCase (first letter lowercase)
 */
export function toCamelCase(input: string): string {
  const words = toWords(input);
  if (words.length === 0) {
    return "";
  }

  return (
    words[0].toLowerCase() +
    words
      .slice(1)
      .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join("")
  );
}

/**
 * PascalCase (first letter uppercase)
 */
export function toPascalCase(input: string): string {
  const words = toWords(input);
  return words
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join("");
}

/**
 * Title Case (spaces instead of hyphens/underscores)
 * - Hyphens/underscores -> spaces
 * - Preserves acronyms (ALL CAPS, e.g. SDC, HTML5)
 * - Preserves camel/mixed-case words (e.g. iOS, eBay)
 */
export function toTitleCase(input: string): string {
  return input
    .split(/[\s\-_]+/) // split on spaces, hyphens, underscores
    .filter(Boolean)
    .map(titleCaseWord)
    .join(" ");
}

function titleCaseWord(word: string): string {
  // 1. Preserve acronyms: all caps/digits, length > 1, and at least one letter
  if (/^[A-Z0-9]+$/.test(word) && /[A-Z]/.test(word) && word.length > 1) {
    return word;
  }

  // 2. Preserve camel/mixed-case patterns like "iOS", "eBay"
  // (lowercase followed by uppercase somewhere inside)
  if (/[a-z][A-Z]/.test(word)) {
    return word;
  }

  // 3. Default: basic Title Case (first letter upper, rest lower)
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}