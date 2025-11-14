import { writeFile } from "node:fs";
import { resolve } from "node:path";

export function createFile(filePath: string, name: string, ext: string): void {
  writeFile(resolve(filePath, `${name}.${ext}`), '', (err) => {
    if (err) {
      throw err;
    }
  });
}