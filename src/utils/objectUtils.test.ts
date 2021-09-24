import { deepCamelCaseKeys, deepSnakeCaseKeys, deepTrim } from "./objectUtils";

/* eslint-disable @typescript-eslint/camelcase */
describe("deepCamelCaseKeys", () => {
  it("should convert deep object indices to camel case", () => {
    const originalData = {
      name: "sample title",
      output_config: [
        {
          max_choices: 4,
        },
      ],
    };

    const result = deepCamelCaseKeys(originalData);
    const expected = {
      name: "sample title",
      outputConfig: [
        {
          maxChoices: 4,
        },
      ],
    };

    expect(result).toEqual(expected);
  });

  it("should convert simple object indices to camel case", () => {
    const originalData = {
      original_title: "sample original title",
    };

    const result = deepCamelCaseKeys(originalData);
    const expected = {
      originalTitle: "sample original title",
    };

    expect(result).toEqual(expected);
  });

  it("should convert array of object's indices to camel case", () => {
    const originalData = [
      { original_title: "sample original title" },
      { another_title: "some other title" },
    ];

    const result = deepCamelCaseKeys(originalData);
    const expected = [
      { originalTitle: "sample original title" },
      { anotherTitle: "some other title" },
    ];

    expect(result).toEqual(expected);
  });

  it("should do nothing to base types", () => {
    const originalData = [1, "", null, {}];
    const result = deepCamelCaseKeys(originalData);
    expect(result).toEqual(originalData);
  });
});
/* eslint-enable @typescript-eslint/camelcase */

/* eslint-disable @typescript-eslint/camelcase */
describe("deepSnakeCaseKeys", () => {
  it("should convert deep object indices to camel case", () => {
    const originalData = {
      name: "sample title",
      outputConfig: [
        {
          maxChoices: 4,
        },
      ],
    };

    const result = deepSnakeCaseKeys(originalData);
    const expected = {
      name: "sample title",
      output_config: [
        {
          max_choices: 4,
        },
      ],
    };

    expect(result).toEqual(expected);
  });

  it("should convert simple object indices to camel case", () => {
    const originalData = {
      originalTitle: "sample original title",
    };

    const result = deepSnakeCaseKeys(originalData);
    const expected = {
      original_title: "sample original title",
    };

    expect(result).toEqual(expected);
  });

  it("should convert array of object's indices to camel case", () => {
    const originalData = [
      { originalTitle: "sample original title" },
      { anotherTitle: "some other title" },
    ];

    const result = deepSnakeCaseKeys(originalData);
    const expected = [
      { original_title: "sample original title" },
      { another_title: "some other title" },
    ];

    expect(result).toEqual(expected);
  });

  it("should do nothing to base types", () => {
    const originalData = [1, "", null, {}];
    const result = deepSnakeCaseKeys(originalData);
    expect(result).toEqual(originalData);
  });
});
/* eslint-enable @typescript-eslint/camelcase */

describe("deepTrim", () => {
  it("should trim string type", () => {
    const originalString = " John Doe         ";

    const result = deepTrim(originalString);
    const expected = "John Doe";

    expect(result).toEqual(expected);
  });

  it("should trim object type", () => {
    const originalData = {
      firstName: "      John     ",
      lastName: "Doe       ",
      eyeColor: "   blue",
    };

    const result = deepTrim(originalData);
    const expected = {
      firstName: "John",
      lastName: "Doe",
      eyeColor: "blue",
    };

    expect(result).toEqual(expected);
  });

  it("should trim array type", () => {
    const originalData = ["  John", "        Doe          "];

    const result = deepTrim(originalData);
    const expected = ["John", "Doe"];

    expect(result).toEqual(expected);
  });

  it("should trim complex type", () => {
    const originalData = {
      a: "       Here is         ",
      b: "       The way to write your code     ",
      c: {
        c1: "      React      ",
        c2: "       JavaScript      ",
      },
      d: ["1", "    2 ", "3       "],
      e: [
        { e1: "      Node.js     ", e2: "     PHP" },
        { e1: "      Next.js     ", e2: "     Git" },
      ],
      f: [["    1", "2", "    3   "], { f1: "     Follow us!" }],
    };

    const result = deepTrim(originalData);
    const expected = {
      a: "Here is",
      b: "The way to write your code",
      c: {
        c1: "React",
        c2: "JavaScript",
      },
      d: ["1", "2", "3"],
      e: [
        { e1: "Node.js", e2: "PHP" },
        { e1: "Next.js", e2: "Git" },
      ],
      f: [["1", "2", "3"], { f1: "Follow us!" }],
    };

    expect(result).toEqual(expected);
  });

  it("should do nothing to base types", () => {
    const originalData = [1, "", null, {}, undefined, true, []];
    const result = deepTrim(originalData);
    expect(result).toEqual(originalData);
  });
});
