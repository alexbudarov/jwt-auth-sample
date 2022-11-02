import { positiveValidator } from "./positiveValidator";
import { INVALID_VALUE_TYPE, VALIDATION_FAILED } from "../reject-reason";

describe("positiveValidator", () => {
  it("rejects when value is zero", async () => {
    await expect(positiveValidator({}, 0)).rejects.toEqual(VALIDATION_FAILED);
    await expect(positiveValidator({}, -0)).rejects.toEqual(VALIDATION_FAILED);
  });
  it("resolves when value is positive", async () => {
    await expect(positiveValidator({}, +17)).resolves.toEqual(undefined);
  });
  it("rejects when value is negative", async () => {
    await expect(positiveValidator({}, -17)).rejects.toEqual(VALIDATION_FAILED);
  });
  it("rejects when value is not a number", async () => {
    await expect(positiveValidator({}, "sdfsdfsdf")).rejects.toEqual(
      INVALID_VALUE_TYPE
    );
    await expect(positiveValidator({}, NaN)).rejects.toEqual(
      INVALID_VALUE_TYPE
    );
  });
  it("behaves correctly when number is represented as a string", async () => {
    await expect(positiveValidator({}, "+17")).resolves.toEqual(undefined);
    await expect(positiveValidator({}, "0")).rejects.toEqual(VALIDATION_FAILED);
    await expect(positiveValidator({}, "-17")).rejects.toEqual(
      VALIDATION_FAILED
    );
  });
  it("behaves correctly with BigDecimal", async () => {
    const zeroWhenConvertedToNumber = "-1e-399";
    await expect(
      positiveValidator({}, zeroWhenConvertedToNumber)
    ).rejects.toEqual(VALIDATION_FAILED);
  });
});
