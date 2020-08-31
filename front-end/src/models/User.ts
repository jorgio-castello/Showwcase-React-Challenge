import Education from "./Education";
import { v4 as uuidv4 } from 'uuid';

interface User {
  name: string,
  education: { [key: string]: Education },
  educationInFocus: string,
}

class User {
  constructor(name: string) {
    this.name = name;
    this.education = {};
    this.educationInFocus = '';
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

  getEducationInFocus(): Education {
    const education = this.education[this.educationInFocus];
    if (education) {
      return education;
    }
    return new Education();
  }

  updateEducation(university: Education): void {
    if (university.id) {
      this.education[university.id] = university;
    } else {
      university.id = uuidv4();
      this.education[university.id] = university;
    }
    this.saveUser();
  }

  retrieveEducation(): Education[] {
    const education: Education[] = Object.values(this.education);
    return education.sort((a, b) => a.startYear - b.startYear);
  }

  saveUser(): void {
    const user = JSON.stringify(this);
    localStorage.setItem(this.name, user);
  }
}

export default User;