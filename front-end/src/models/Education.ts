interface Education {
  schoolName: string,
  degree: string,
  fieldOfStudy: string,
  startYear: number,
  endYear: number,
  grade: number,
  description: string,
}

class Education {
  constructor(
    schoolName: string,
    degree: string,
    fieldOfStudy: string,
    startYear: number,
    endYear: number,
    grade: number,
    description: string,
  ) {
    this.schoolName = schoolName;
    this.degree = degree;
    this.fieldOfStudy = fieldOfStudy;
    this.startYear = startYear;
    this.endYear = endYear;
    this.grade = grade;
    this.description = description;
  }
}

export default Education;