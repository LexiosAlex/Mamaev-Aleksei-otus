const { DirStorageCounter } = require("./DirStorageCounter.js");

let dirStorageCounter;

beforeEach(() => {
  dirStorageCounter = new DirStorageCounter();
});

test("Test if the DirStorageCounter contains all the fields on the class instance", () => {
  expect(dirStorageCounter).toMatchObject({
    _foldersCount: 0,
    _filesCount: 0
  });
});

test("Test increaseFoldersCounter method", () => {
  dirStorageCounter.increaseFoldersCounter();
  expect(dirStorageCounter._foldersCount).toBe(1);
});

test("Test increaseFilesCounter method", () => {
  dirStorageCounter.increaseFilesCounter();
  expect(dirStorageCounter._filesCount).toBe(1);
});

test("Test getCounters method", () => {
  expect(dirStorageCounter.getCounters()).toBe("0 directories, 0 files");
});

test("Test resetCounters method", () => {
  dirStorageCounter.increaseFoldersCounter();
  dirStorageCounter.increaseFilesCounter();
  dirStorageCounter.resetCounters();
  expect(dirStorageCounter).toMatchObject({
    _foldersCount: 0,
    _filesCount: 0
  });
});
