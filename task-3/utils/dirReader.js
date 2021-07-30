import fs from "fs";
import path from "path";
import { dirStorageInstance } from "./DirStorageCounter.js";

export const dirReader = (filePath, depth, itemDepth = 0) => {
  if (!filePath) {
    throw new Error('No file path argument provided')
  }

  const stats = fs.lstatSync(filePath);
  const isDir = stats.isDirectory()
  const data = {
    name: path.basename(filePath),
  };

  if (isDir) {
    dirStorageInstance.increaseFoldersCounter();
  }

  if (!isDir) {
    dirStorageInstance.increaseFilesCounter();
  }

  if (isDir && !(depth <= 0) && !(depth <= itemDepth)) {
    const newDepth = itemDepth + 1;
    data.items = fs.readdirSync(filePath).map(child => {
      return dirReader(filePath + "/" + child, depth, newDepth);
    });
  }

  return data;
};
