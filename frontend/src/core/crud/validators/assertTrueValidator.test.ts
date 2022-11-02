import { assertTrueValidator } from "./assertTrueValidator";
import { VALIDATION_FAILED } from "./reject-reason";

describe("assertTrueValidator", () => {
  it("resolves when value is true", async () => {
    await expect(assertTrueValidator({}, true)).resolves.toEqual(undefined);
  });
  it("rejects when value is other than true", async () => {
    await expect(assertTrueValidator({}, false)).rejects.toEqual(
      VALIDATION_FAILED
    );
    await expect(assertTrueValidator({}, "sdfsdf")).rejects.toEqual(
      VALIDATION_FAILED
    );
  });
});
