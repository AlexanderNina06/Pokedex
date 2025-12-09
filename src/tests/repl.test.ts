import { cleanInput } from "../repl";
import { describe, expect, test } from "vitest";

describe.each([
  {
    input: "  hello  world  ",
    expected: ["hello", "world"],
  },
  // TODO: more test cases here
])("cleanInput(%j)", ({ input, expected }) => {
  test(`Expected: ${expected.join(", ")}`, () => {

    const actual = cleanInput(input);

    expect(actual).toHaveLength(expected.length);

    for (const i in expected) {
      expect(actual[i]).toBe(expected[i]);
    }
  });
});
