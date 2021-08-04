const { dirReader } = require("./dirReader.js");
const { dirStorageInstance } = require("./DirStorageCounter.js");
const mockFs = require("mock-fs");

const mockFolderName = "mock";

const createMockFolder = () => {
  mockFs({
    [mockFolderName]: {
      test1: "1",
      test2: "2",
      testDir: {
        test3: "3",
      },
    },
  });
};

beforeEach(() => {
  createMockFolder();
  dirStorageInstance.resetCounters();
});

afterEach(() => {
  mockFs.restore();
});

test("Test if it throws an error when there is no filePath provided", () => {
  expect(() => dirReader()).toThrowError();
});

test("Test if it work properly when no depth argument provided", () => {
  const data = dirReader(mockFolderName);
  expect(data).toMatchObject({
    name: mockFolderName,
    items: [
      {
        name: "test1",
      },
      {
        name: "test2",
      },
      {
        name: "testDir",
        items: [
          {
            name: "test3",
          },
        ],
      },
    ],
  });
});

test("Test if depth work properly", () => {
  const data = dirReader(mockFolderName, 1);
  expect(data).toMatchObject({
    name: mockFolderName,
    items: [
      {
        name: "test1",
      },
      {
        name: "test2",
      },
      {
        name: "testDir",
      },
    ],
  });
});

test("Test if it reads data from path and returns data correctly", () => {
  const data = dirReader(mockFolderName, 2);
  expect(data).toMatchObject({
    name: mockFolderName,
    items: [
      {
        name: "test1",
      },
      {
        name: "test2",
      },
      {
        items: [
          {
            name: "test3",
          },
        ],
        name: "testDir",
      },
    ],
  });
});

test("Test if it counts files correctly", () => {
  dirReader(mockFolderName);
  expect(dirStorageInstance.getCounters()).toBe(`2 directories, 3 files`);
});
