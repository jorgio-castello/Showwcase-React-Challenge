class Expect {
  constructor() { }

  isTrue(a, b) {
    if (a === b) {
      console.log(`Test Passed: ${a} === ${b}`);
      return;
    }
    console.log(`Test Failed: ${a} !== ${b}`);
  }

  isFalse(a, b) {
    if (a !== b) {
      console.log(`Test Passed: ${a} !== ${b}`);
      return;
    }
    console.log(`Test Failed: ${a} === ${b}`);
  }
}

module.exports = Expect;