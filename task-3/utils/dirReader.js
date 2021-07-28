import fs from "fs";
import path from "path";
import { dirStorageInstance } from "./DirStorageCounter.js";

export const dirReader = (filePath, depth, itemDepth = 0) => {
  const stats = fs.lstatSync(filePath);
  const data = {
    name: path.basename(filePath),
    isDir: stats.isDirectory()
  };

  if (data.isDir) {
    dirStorageInstance.increaseFoldersCounter();
  }

  if (!data.isDir) {
    dirStorageInstance.increaseFilesCounter();
  }

  if (data.isDir && !(depth <= 0) && !(depth <= itemDepth)) {
    const newDepth = itemDepth + 1;
    data.items = fs.readdirSync(filePath).map(child => {
      return dirReader(filePath + "/" + child, depth, newDepth);
    });
  }

  return data;
};
