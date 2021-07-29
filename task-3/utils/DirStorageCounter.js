class DirStorageCounter {
  constructor() {
    this._foldersCount = 0;
    this._filesCount = 0;
  }

  increaseFoldersCounter() {
    this._foldersCount++;
  }

  increaseFilesCounter() {
    this._filesCount++;
  }

  getCounters() {
    return `${this._foldersCount} directories, ${this._filesCount} files`;
  }
}

export const dirStorageInstance = new DirStorageCounter();
export default DirStorageCounter;
