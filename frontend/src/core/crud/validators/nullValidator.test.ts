import { nullValidator } from "./nullValidator";
import { VALIDATION_FAILED } from "./reject-reason";

describe("nullValidator", () => {
  it("resolves when value is nullish", async () => {
    await expect(nullValidator({}, null)).resolves.toEqual(undefined);
    await expect(nullValidator({}, undefined)).resolves.toEqual(undefined);
  });
  it("rejects when value is not nullish", async () => {
    await expect(nullValidator({}, false)).rejects.toEqual(VALIDATION_FAILED);
    await expect(nullValidator({}, "sdfsdf")).rejects.toEqual(
      VALIDATION_FAILED
    );
    await expect(nullValidator({}, 0)).rejects.toEqual(VALIDATION_FAILED);
  });
  it("rejects when value is an empty string", async () => {
    await expect(nullValidator({}, "")).rejects.toEqual(VALIDATION_FAILED);
  });
});
