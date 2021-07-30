const LAST = "└──";
const NEXT = "│";
const SPACE = "   ";
const CROSS = "├──";

const treeWalker = ({
  treeNode,
  prefix = "",
  childLength = 1,
  depth,
  lastItemDepth
}) => {
  if (depth < lastItemDepth) return null;

  treeNode.map((it, index) => {
    const isLast = childLength - 1 === index;

    if (isLast) console.log(prefix + LAST + it.name);
    else console.log(prefix + CROSS + it.name);

    it?.items &&
      treeWalker({
        treeNode: it.items,
        childLength: it.items.length,
        prefix: isLast ? prefix + SPACE : prefix + NEXT + SPACE,
        depth: depth,
        lastItemDepth: lastItemDepth + 1
      });

    return null;
  });
};

exports.treeWalker = treeWalker;
