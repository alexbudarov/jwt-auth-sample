import { negativeOrZeroValidator } from "./negativeOrZeroValidator";
import { INVALID_VALUE_TYPE, VALIDATION_FAILED } from "../reject-reason";

describe("negativeOrZeroValidator", () => {
  it("resolves when value is zero", async () => {
    await expect(negativeOrZeroValidator({}, 0)).resolves.toEqual(undefined);
    await expect(negativeOrZeroValidator({}, -0)).resolves.toEqual(undefined);
  });
  it("rejects when value is positive", async () => {
    await expect(negativeOrZeroValidator({}, +17)).rejects.toEqual(
      VALIDATION_FAILED
    );
  });
  it("resolves when value is negative", async () => {
    await expect(negativeOrZeroValidator({}, -17)).resolves.toEqual(undefined);
  });
  it("rejects when value is not a number", async () => {
    await expect(negativeOrZeroValidator({}, "sdfsdfsdf")).rejects.toEqual(
      INVALID_VALUE_TYPE
    );
    await expect(negativeOrZeroValidator({}, NaN)).rejects.toEqual(
      INVALID_VALUE_TYPE
    );
  });
  it("behaves correctly when an integer number is represented as a string", async () => {
    await expect(negativeOrZeroValidator({}, "-17")).resolves.toEqual(
      undefined
    );
    await expect(negativeOrZeroValidator({}, "0")).resolves.toEqual(undefined);
    await expect(negativeOrZeroValidator({}, "+17")).rejects.toEqual(
      VALIDATION_FAILED
    );
  });
  it("behaves correctly with BigDecimal", async () => {
    const zeroWhenConvertedToNumber = "1e-399";
    await expect(
      negativeOrZeroValidator({}, zeroWhenConvertedToNumber)
    ).rejects.toEqual(VALIDATION_FAILED);
  });
});
