const { treeWalker } = require("./treeWalker.js");
const { dirStorageInstance } = require("./DirStorageCounter.js");

const parseTree = (treeData, depth) => {
  console.log(treeData.name);

  treeData.hasOwnProperty('items') &&
    treeData.items.length > 0 &&
    (isNaN(depth)
      ? treeWalker({
          treeNode: treeData.items,
          childLength: treeData.items.length
        })
      : treeWalker({
          treeNode: treeData.items,
          childLength: treeData.items.length,
          depth,
          lastItemDepth: 1
        }));

  console.log(dirStorageInstance.getCounters());
};

exports.parseTree = parseTree;
