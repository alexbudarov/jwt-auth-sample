import { negativeValidator } from "./negativeValidator";
import { INVALID_VALUE_TYPE, VALIDATION_FAILED } from "../reject-reason";

describe("negativeValidator", () => {
  it("rejects when value is zero", async () => {
    await expect(negativeValidator({}, 0)).rejects.toEqual(VALIDATION_FAILED);
    await expect(negativeValidator({}, -0)).rejects.toEqual(VALIDATION_FAILED);
  });
  it("rejects when value is positive", async () => {
    await expect(negativeValidator({}, +17)).rejects.toEqual(VALIDATION_FAILED);
  });
  it("resolves when value is negative", async () => {
    await expect(negativeValidator({}, -17)).resolves.toEqual(undefined);
  });
  it("rejects when value is not a number", async () => {
    await expect(negativeValidator({}, "sdfsdfsdf")).rejects.toEqual(
      INVALID_VALUE_TYPE
    );
    await expect(negativeValidator({}, NaN)).rejects.toEqual(
      INVALID_VALUE_TYPE
    );
  });
  it("behaves correctly when number is represented as a string", async () => {
    await expect(negativeValidator({}, "-17")).resolves.toEqual(undefined);
    await expect(negativeValidator({}, "0")).rejects.toEqual(VALIDATION_FAILED);
    await expect(negativeValidator({}, "+17")).rejects.toEqual(
      VALIDATION_FAILED
    );
  });
  it("behaves correctly with BigDecimal", async () => {
    const zeroWhenConvertedToNumber = "1e-399";
    await expect(
      negativeValidator({}, zeroWhenConvertedToNumber)
    ).rejects.toEqual(VALIDATION_FAILED);
  });
});
