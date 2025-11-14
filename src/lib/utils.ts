/** biome-ignore-all lint/style/useTemplate: removing file soon */
export function ucFirst(str: string, cleanString = false, ccToWords = false): string {
  let text = str;

  if ( cleanString ) {
    text = text.replace(/[0-9]/g, '');
    text = text.replace(/^_/g, '');
    text = text.replace(/^-/g, '');
  }

  if ( ccToWords ) {
    text = camelCaseToUcWords(text);
  }

  const toUC = text.charAt(0).toUpperCase() + text.slice(1);

  return toUC.trim();
}

export function camelCaseToUcWords(str: string): string {
  const text = str.replace(/([A-Z])/g, (match) => ` ${match}`).replace(/^./, (match) => match.toUpperCase());
  return text.trim();
}


export function fileNameToCamelCase(str: string): string {
  let text = str;
  text = text.replace(/^__/g, '_');
  text = text.replace(/^--/g, '-');
  text = text.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  text = text.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
  return text.trim();
}

export function fileNameSpacedToUppercase(str: string): string {
  let text = str;
  text = text.replace(/([A-Z])/g, (match) => ` ${match}`).replace(/^./, (match) => match.toUpperCase());
  text = text.replace(/^__/g, '_');
  text = text.replace(/^--/g, '-');
  text = text.replace(/-([a-z])/g, (g) => ' ' + g[1].toUpperCase());
  text = text.replace(/_([a-z])/g, (g) => ' ' + g[1].toUpperCase());
  return text.trim();
}