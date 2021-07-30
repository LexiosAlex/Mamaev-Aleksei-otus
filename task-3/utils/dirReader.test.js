const fs = require("fs");
const { dirReader } = require("./dirReader.js");
const { dirStorageInstance } = require("./DirStorageCounter.js");

const mockFolderName = "mock";

const createMockFolder = () => {
  fs.mkdirSync(mockFolderName);
  fs.writeFileSync(`./${mockFolderName}/test1.txt`, "1");
  fs.writeFileSync(`./${mockFolderName}/test2.txt`, "2");
  fs.mkdirSync(`./${mockFolderName}/testDir`);
  fs.writeFileSync(`./${mockFolderName}/testDir/test3.txt`, "3");
};

const removeMockFolder = () => {
  fs.rmdirSync(mockFolderName, { recursive: true });
};

beforeEach(() => {
  dirStorageInstance.resetCounters();
  createMockFolder();
});

afterEach(() => {
  removeMockFolder();
});

test("Test if it throws an error when there is no filePath provided", () => {
  expect(() => dirReader()).toThrowError();
});

test("Test if it work properly when no depth argument provided", () => {
  const data = dirReader(mockFolderName);
  expect(data).toMatchObject({
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
  });
});

test("Test if depth work properly", () => {
  const data = dirReader(mockFolderName, 1);
  expect(data).toMatchObject({
    items: [
      {
        name: "test1.txt"
      },
      {
        name: "test2.txt"
      },
      {
        name: "testDir"
      }
    ],
    name: "mock"
  });
});

test("Test if it reads data from path and returns data correctly", () => {
  const data = dirReader(mockFolderName, 2);
  expect(data).toMatchObject({
    items: [
      {
        name: "test1.txt"
      },
      {
        name: "test2.txt"
      },
      {
        items: [
          {
            name: "test3.txt"
          }
        ],
        name: "testDir"
      }
    ],
    name: "mock"
  });
});

test("Test if it counts files correctly", () => {
  dirReader(mockFolderName);
  expect(dirStorageInstance.getCounters()).toBe(`2 directories, 3 files`);
});
