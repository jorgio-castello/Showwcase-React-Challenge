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

  getUser(): User {
    return this;
  }

  deleteEducation(id: string): void {
    if (this.education[id]) {
      delete this.education[id];
    }
    if (id === this.educationInFocus) {
      this.educationInFocus = '';
    }
    this.saveUser();
  }

  getEducationInFocus(): Education {
    const education: Education = this.education[this.educationInFocus];
    if (education) {
      return education;
    }
    return new Education();
  }

  setEducationInFocus(id: string): void {
    if (this.education[id]) {
      this.educationInFocus = id;
      this.saveUser();
    }
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
    return education.sort((a, b) => b.startYear - a.startYear);
  }

  saveUser(): void {
    const user = JSON.stringify(this);
    localStorage.setItem(this.name, user);
  }
}

export default User;