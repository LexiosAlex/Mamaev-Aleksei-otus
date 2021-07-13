import fs from "fs";
import path from "path";
import DirStorageCounter from "./DirStorageCounter.js";

export const dirReader = filePath => {
  const stats = fs.lstatSync(filePath);
  const info = {
    name: path.basename(filePath)
  };

  if (stats.isDirectory()) {
    DirStorageCounter.increaseFoldersCounter();
    info.items = fs.readdirSync(filePath).map(child => {
      return dirReader(filePath + "/" + child);
    });
  } else {
    DirStorageCounter.increaseFilesCounter();
  }

  return info;
};
