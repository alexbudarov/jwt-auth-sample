import { assertFalseValidator } from "./assertFalseValidator";
import { VALIDATION_FAILED } from "./reject-reason";

describe("assertFalseValidator", () => {
  it("resolves when value is true", async () => {
    await expect(assertFalseValidator({}, false)).resolves.toEqual(undefined);
  });
  it("rejects when value is other than true", async () => {
    await expect(assertFalseValidator({}, true)).rejects.toEqual(
      VALIDATION_FAILED
    );
    await expect(assertFalseValidator({}, "sdfsdf")).rejects.toEqual(
      VALIDATION_FAILED
    );
  });
});
