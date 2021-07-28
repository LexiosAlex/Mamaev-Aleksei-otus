import { treeWalker } from "./treeWalker.js";
import { dirStorageInstance } from "./DirStorageCounter.js";

export const parseTree = (treeData, depth) => {
  console.log(treeData.name);

  if (treeData.items) {
    isNaN(depth)
      ? treeWalker({
          treeNode: treeData.items,
          childLength: treeData.items.length
        })
      : treeWalker({
          treeNode: treeData.items,
          childLength: treeData.items.length,
          depth,
          lastItemDepth: 1
        });
  }

  console.log(dirStorageInstance.getCounters());
};
