import fs from "fs";
import path from "path";
import DirStorageCounter from "./DirStorageCounter.js";

export const dirReader = (filePath, depth, itemDepth = 0) => {
  const stats = fs.lstatSync(filePath);
  const data = {
    name: path.basename(filePath)
  };


  if (stats.isDirectory() && !(depth <= 0) && !(depth <= itemDepth)) {
    DirStorageCounter.increaseFoldersCounter();
    const newDepth = itemDepth + 1;
    data.items = fs.readdirSync(filePath).map(child => {
      return dirReader(filePath + "/" + child, depth, newDepth);
    });
  } else {
    DirStorageCounter.increaseFilesCounter();
  }

  return data;
};
