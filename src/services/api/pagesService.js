import pagesData from "../mockData/pages.json";

class PagesService {
  constructor() {
    this.pages = [...pagesData];
  }

  async getAll() {
    await this.delay(300);
    return [...this.pages];
  }

  async getById(id) {
    await this.delay(200);
    const page = this.pages.find(p => p.Id === parseInt(id));
    if (!page) {
      throw new Error("Page not found");
    }
    return { ...page };
  }

  async create(pageData) {
    await this.delay(400);
    const newPage = {
      ...pageData,
      Id: Math.max(...this.pages.map(p => p.Id), 0) + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: "draft"
    };
    this.pages.push(newPage);
    return { ...newPage };
  }

  async update(id, pageData) {
    await this.delay(350);
    const index = this.pages.findIndex(p => p.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Page not found");
    }
    
    this.pages[index] = {
      ...this.pages[index],
      ...pageData,
      updatedAt: new Date().toISOString()
    };
    return { ...this.pages[index] };
  }

  async delete(id) {
    await this.delay(250);
    const index = this.pages.findIndex(p => p.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Page not found");
    }
    
    this.pages.splice(index, 1);
    return true;
  }

  async search(query) {
    await this.delay(300);
    const lowerQuery = query.toLowerCase();
    return this.pages.filter(page => 
      page.title.toLowerCase().includes(lowerQuery) ||
      page.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
      page.category.toLowerCase().includes(lowerQuery)
    );
  }

  async getByCategory(category) {
    await this.delay(250);
    return this.pages.filter(page => page.category === category);
  }

  async getByTag(tag) {
    await this.delay(250);
    return this.pages.filter(page => page.tags.includes(tag));
  }

  async publish(id) {
    await this.delay(300);
    const index = this.pages.findIndex(p => p.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Page not found");
    }
    
    this.pages[index].status = "published";
    this.pages[index].updatedAt = new Date().toISOString();
    return { ...this.pages[index] };
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const pagesService = new PagesService();