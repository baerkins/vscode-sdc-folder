export function getDirAfter(path: string, after: string): string | null {
  const idx = path.indexOf(after);
  if (idx === -1) {
    return null; // "after" not found
  }

  // Start right after the "after" substring
  let start = idx + after.length;

  // Skip any leading slashes after that
  while (path[start] === '/') {
    start++;
  }

  // Find the end of the next segment
  const end = path.indexOf('/', start);
  if (end === -1) {
    // No more slashes, so the rest of the string is the segment
    return path.slice(start);
  }

  return path.slice(start, end);
}