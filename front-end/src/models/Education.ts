interface Education {
  id: string,
  school: string,
  degree: string,
  fieldOfStudy: string,
  startYear: number,
  endYear: number,
  grade: number,
  description: string[],
}

class Education {
  [indexSignature: string]: number | string | string[];
  constructor(
    id?: string,
    school?: string,
    degree?: string,
    fieldOfStudy?: string,
    startYear?: number,
    endYear?: number,
    grade?: number,
    description?: string[],
  ) {
    this.school = school || '';
    this.degree = degree || '';
    this.fieldOfStudy = fieldOfStudy || '';
    this.startYear = startYear || 2020;
    this.endYear = endYear || 2020;
    this.grade = grade || 4;
    this.description = description || [];
  }

  static generateYearOptions(startYear: number, endYear: number): number[] {
    const result: number[] = [];
    for (endYear; endYear >= startYear; endYear -= 1) {
      result.push(endYear);
    }
    return result;
  }
}

export default Education;