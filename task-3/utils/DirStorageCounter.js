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

  resetCounters() {
    this._foldersCount = 0;
    this._filesCount = 0;
  }
}

exports.dirStorageInstance = new DirStorageCounter();
exports.DirStorageCounter = DirStorageCounter;
