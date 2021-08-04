const { treeWalker } = require("./treeWalker.js");
const { dirStorageInstance } = require("./DirStorageCounter.js");
const { parseTree } = require("./parseTree.js");
jest.mock("./treeWalker.js", () => {
  return { treeWalker: jest.fn() };
});

const mockTreeData = {
  name: "mock",
  items: [
    {
      name: "test1.txt"
    },
    {
      name: "test2.txt"
    },
    {
      name: "testDir",
      items: [
        {
          name: "test3.txt"
        }
      ]
    }
  ]
};

afterEach(() => {
  jest.clearAllMocks();
});

test("Test that the first file name was logged", () => {
  const consoleLogSpy = jest.spyOn(console, "log");
  parseTree(mockTreeData);

  expect(consoleLogSpy).toHaveBeenCalledWith(mockTreeData.name);
});

test("Test that the method getCounters of dirStorageInstance was called ", () => {
  const countersSpy = jest.spyOn(dirStorageInstance, "getCounters");
  parseTree(mockTreeData);

  expect(countersSpy).toHaveBeenCalledTimes(1);
});

test("Test that treeWalker was not called if data argument has no children (items)", () => {
  parseTree({ name: "test" });

  expect(treeWalker).toHaveBeenCalledTimes(0);
});

test("Test that treeWalker will be called without depth and lastItemDepth params if there is no depth provided", () => {
  parseTree(mockTreeData);

  expect(treeWalker).toHaveBeenCalledWith({
    treeNode: mockTreeData.items,
    childLength: mockTreeData.items.length
  });
});

test("Test that treeWalker will be called with depth and lastItemDepth", () => {
  parseTree(mockTreeData, 2);

  expect(treeWalker).toHaveBeenCalledWith({
    treeNode: mockTreeData.items,
    childLength: mockTreeData.items.length,
    depth: 2,
    lastItemDepth: 1
  });
});
