import { digitsValidator } from "./digitsValidator";
import { VALIDATION_FAILED } from "../reject-reason";

describe("digitsValidator", () => {
  const opts = { integer: 3, fraction: 2 };

  it("rejects when more digits that allowed", async () => {
    await expect(digitsValidator(opts, {}, 12345.1)).rejects.toEqual(
      VALIDATION_FAILED
    );
    await expect(digitsValidator(opts, {}, 1.12345)).rejects.toEqual(
      VALIDATION_FAILED
    );
    await expect(digitsValidator(opts, {}, 12345)).rejects.toEqual(
      VALIDATION_FAILED
    );
    await expect(digitsValidator(opts, {}, "12345.1")).rejects.toEqual(
      VALIDATION_FAILED
    );
    await expect(digitsValidator(opts, {}, "1.12345")).rejects.toEqual(
      VALIDATION_FAILED
    );
    await expect(digitsValidator(opts, {}, "12345")).rejects.toEqual(
      VALIDATION_FAILED
    );
  });
  it("resolves when number of digits is less or equal to allowed number", async () => {
    await expect(digitsValidator(opts, {}, 1.1)).resolves.toEqual(undefined);
    await expect(digitsValidator(opts, {}, 123.12)).resolves.toEqual(undefined);
    await expect(digitsValidator(opts, {}, 1)).resolves.toEqual(undefined);
    await expect(digitsValidator(opts, {}, "1.1")).resolves.toEqual(undefined);
    await expect(digitsValidator(opts, {}, "123.12")).resolves.toEqual(
      undefined
    );
    await expect(digitsValidator(opts, {}, "1")).resolves.toEqual(undefined);
  });
});
