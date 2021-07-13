class DirStorageCounter {
  constructor() {
    this.foldersCount = 0;
    this.filesCount = 0;
  }

  increaseFoldersCounter() {
    this.foldersCount++;
  }

  increaseFilesCounter() {
    this.filesCount++;
  }

  getCounters() {
    return `${this.foldersCount} directories, ${this.filesCount} files`;
  }
}

export default new DirStorageCounter();
