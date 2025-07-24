import versionsData from "../mockData/versions.json";

class VersionsService {
  constructor() {
    this.versions = [...versionsData];
  }

  async getAll() {
    await this.delay(200);
    return [...this.versions];
  }

  async getByPageId(pageId) {
    await this.delay(250);
    return this.versions.filter(v => v.pageId === parseInt(pageId));
  }

  async getById(id) {
    await this.delay(150);
    const version = this.versions.find(v => v.Id === parseInt(id));
    if (!version) {
      throw new Error("Version not found");
    }
    return { ...version };
  }

  async create(versionData) {
    await this.delay(300);
    const newVersion = {
      ...versionData,
      Id: Math.max(...this.versions.map(v => v.Id), 0) + 1,
      createdAt: new Date().toISOString()
    };
    this.versions.push(newVersion);
    return { ...newVersion };
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const versionsService = new VersionsService();