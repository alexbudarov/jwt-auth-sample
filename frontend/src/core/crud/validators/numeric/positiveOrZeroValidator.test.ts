import { positiveOrZeroValidator } from "./positiveOrZeroValidator";
import { INVALID_VALUE_TYPE, VALIDATION_FAILED } from "../reject-reason";

describe("positiveOrZeroValidator", () => {
  it("resolves when value is zero", async () => {
    await expect(positiveOrZeroValidator({}, 0)).resolves.toEqual(undefined);
    await expect(positiveOrZeroValidator({}, -0)).resolves.toEqual(undefined);
  });
  it("resolves when value is positive", async () => {
    await expect(positiveOrZeroValidator({}, +17)).resolves.toEqual(undefined);
  });
  it("rejects when value is negative", async () => {
    await expect(positiveOrZeroValidator({}, -17)).rejects.toEqual(
      VALIDATION_FAILED
    );
  });
  it("rejects when value is not a number", async () => {
    await expect(positiveOrZeroValidator({}, "sdfsdfsdf")).rejects.toEqual(
      INVALID_VALUE_TYPE
    );
    await expect(positiveOrZeroValidator({}, NaN)).rejects.toEqual(
      INVALID_VALUE_TYPE
    );
  });
  it("behaves correctly when number is represented as a string", async () => {
    await expect(positiveOrZeroValidator({}, "+17")).resolves.toEqual(
      undefined
    );
    await expect(positiveOrZeroValidator({}, "0")).resolves.toEqual(undefined);
    await expect(positiveOrZeroValidator({}, "-17")).rejects.toEqual(
      VALIDATION_FAILED
    );
  });
  it("behaves correctly with BigDecimal", async () => {
    const zeroWhenConvertedToNumber = "-1e-399";
    await expect(
      positiveOrZeroValidator({}, zeroWhenConvertedToNumber)
    ).rejects.toEqual(VALIDATION_FAILED);
  });
});
