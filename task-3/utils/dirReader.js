const fs = require("fs");
const path = require("path");
const { dirStorageInstance } = require("./DirStorageCounter.js");

const dirReader = (filePath, depth, itemDepth = 0) => {
  if (!filePath) {
    throw new Error("No file path argument provided");
  }

  const stats = fs.lstatSync(filePath);
  const isDir = stats.isDirectory();
  const data = {
    name: path.basename(filePath)
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

exports.dirReader = dirReader;
