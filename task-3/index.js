const { dirReader } = require("./utils/dirReader.js");
const { parseTree } = require("./utils/parseTree.js");
const dirPath = process.argv[2];
const depth = process.argv[3];

const data = dirReader(dirPath, depth);
parseTree(data, depth);
