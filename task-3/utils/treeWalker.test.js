const TreeWalker = require("./treeWalker.js");

const mockTreeNodes = [
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
      },
      {
        name: "test4.txt"
      }
    ]
  },
  { name: "test5.txt" }
];

const expectedOutputCalls = {
  "1": "├──test1.txt",
  "2": "├──test2.txt",
  "3": "├──testDir",
  "4": "│   ├──test3.txt",
  "5": "│   └──test4.txt",
  "6": "└──test5.txt"
};

afterEach(() => {
  jest.clearAllMocks();
});

test("It returns null if depth < lastItemDepth", () => {
  expect(TreeWalker.treeWalker({ depth: 0, lastItemDepth: 1 })).toBeNull();
});

test("It should call console log to current number of times", () => {
  const consoleLogSpy = jest.spyOn(console, "log");
  TreeWalker.treeWalker({
    treeNode: mockTreeNodes,
    childLength: mockTreeNodes.length
  });

  expect(consoleLogSpy).toHaveBeenCalledTimes(6);
});

test("It should call '├──' when its not last item in node tree", () => {
  const consoleLogSpy = jest.spyOn(console, "log");
  TreeWalker.treeWalker({
    treeNode: mockTreeNodes,
    childLength: mockTreeNodes.length
  });

  expect({
    1: consoleLogSpy.mock.calls[0][0],
    2: consoleLogSpy.mock.calls[1][0],
    3: consoleLogSpy.mock.calls[2][0],
    4: consoleLogSpy.mock.calls[3][0]
  }).toEqual({
    1: expectedOutputCalls["1"],
    2: expectedOutputCalls["2"],
    3: expectedOutputCalls["3"],
    4: expectedOutputCalls["4"]
  });
});

test("It should call '└──' when its last item in node tree", () => {
  const consoleLogSpy = jest.spyOn(console, "log");
  TreeWalker.treeWalker({
    treeNode: mockTreeNodes,
    childLength: mockTreeNodes.length
  });

  expect(consoleLogSpy).toHaveBeenLastCalledWith(expectedOutputCalls["6"]);
});

describe("It should be called if treeNode item contains children (items) inside", () => {
  it("Should not be called recursive if there is no item with children (items) inside", () => {
    const spy = jest.spyOn(TreeWalker, "treeWalker");
    const recursiveCalls = 0;

    TreeWalker.treeWalker({
      treeNode: [{ name: "test1" }],
      childLength: 1
    });

    expect(spy).toHaveBeenCalledTimes(1 + recursiveCalls);
  });

  it("Should be called once", () => {
    const spy = jest.spyOn(TreeWalker, "treeWalker");
    const recursiveCalls = 1;

    TreeWalker.treeWalker({
      treeNode: [{ name: "test1", items: [{ name: "test2" }] }],
      childLength: 1
    });

    expect(spy).toHaveBeenCalledTimes(1 + recursiveCalls);
  });

  it("Should be called three times", () => {
    const spy = jest.spyOn(TreeWalker, "treeWalker");
    const recursiveCalls = 3;

    TreeWalker.treeWalker({
      treeNode: [
        {
          name: "test1",
          items: [
            { name: "test2", items: [{ name: "test3" }] },
            { name: "test4", items: [{ name: "test5" }] }
          ]
        }
      ],
      childLength: 1
    });

    expect(spy).toHaveBeenCalledTimes(1 + recursiveCalls);
  });
});
