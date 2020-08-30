import Education from "./Education";

interface User {
  name: string,
  education: Education[]
}

class User {
  constructor(name: string) {
    this.name = name;
    this.education = [];
  }

  init(): void {
    const user: string | null = localStorage.getItem(this.name);
    if (user) {
      const parsedUser: User = JSON.parse(user);
      this.education = parsedUser.education;
    } else {
      const stringifiedUser: string = JSON.stringify(this);
      localStorage.setItem(this.name, stringifiedUser);
    }
  }
}

export default User;