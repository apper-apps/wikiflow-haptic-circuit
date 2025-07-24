import usersData from "../mockData/users.json";

class UsersService {
  constructor() {
    this.users = [...usersData];
  }

  async getAll() {
    await this.delay(200);
    return [...this.users];
  }

  async getById(id) {
    await this.delay(150);
    const user = this.users.find(u => u.Id === parseInt(id));
    if (!user) {
      throw new Error("User not found");
    }
    return { ...user };
  }

  async create(userData) {
    await this.delay(300);
    const newUser = {
      ...userData,
      Id: Math.max(...this.users.map(u => u.Id), 0) + 1
    };
    this.users.push(newUser);
    return { ...newUser };
  }

  async update(id, userData) {
    await this.delay(250);
    const index = this.users.findIndex(u => u.Id === parseInt(id));
    if (index === -1) {
      throw new Error("User not found");
    }
    
    this.users[index] = {
      ...this.users[index],
      ...userData
    };
    return { ...this.users[index] };
  }

  async delete(id) {
    await this.delay(200);
    const index = this.users.findIndex(u => u.Id === parseInt(id));
    if (index === -1) {
      throw new Error("User not found");
    }
    
    this.users.splice(index, 1);
    return true;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const usersService = new UsersService();