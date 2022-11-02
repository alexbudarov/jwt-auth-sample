import { compareValidator } from "./compareValidator";
import { VALIDATION_FAILED } from "../reject-reason";

describe("compareValidator", () => {
  describe("mode = number", () => {
    it("min, includeMin = true", async () => {
      const opts1 = {
        min: 0
      };
      const opts2 = {
        min: 0,
        includeMin: true
      };

      await expect(compareValidator(opts1, {}, 10)).resolves.toEqual(undefined);
      await expect(compareValidator(opts2, {}, 10)).resolves.toEqual(undefined);
      await expect(compareValidator(opts1, {}, 0)).resolves.toEqual(undefined);
      await expect(compareValidator(opts2, {}, 0)).resolves.toEqual(undefined);
      await expect(compareValidator(opts1, {}, -10)).rejects.toEqual(
        VALIDATION_FAILED
      );
      await expect(compareValidator(opts2, {}, -10)).rejects.toEqual(
        VALIDATION_FAILED
      );
    });

    it("min, includeMin = false", async () => {
      const opts = {
        min: 0,
        includeMin: false
      };

      await expect(compareValidator(opts, {}, 10)).resolves.toEqual(undefined);
      await expect(compareValidator(opts, {}, 0)).rejects.toEqual(
        VALIDATION_FAILED
      );
      await expect(compareValidator(opts, {}, -10)).rejects.toEqual(
        VALIDATION_FAILED
      );
    });

    it("max, includeMax = true", async () => {
      const opts1 = {
        max: 0
      };
      const opts2 = {
        max: 0,
        includeMax: true
      };

      await expect(compareValidator(opts1, {}, -10)).resolves.toEqual(
        undefined
      );
      await expect(compareValidator(opts2, {}, -10)).resolves.toEqual(
        undefined
      );

      await expect(compareValidator(opts1, {}, 0)).resolves.toEqual(undefined);
      await expect(compareValidator(opts2, {}, 0)).resolves.toEqual(undefined);

      await expect(compareValidator(opts1, {}, 10)).rejects.toEqual(
        VALIDATION_FAILED
      );
      await expect(compareValidator(opts2, {}, 10)).rejects.toEqual(
        VALIDATION_FAILED
      );
    });

    it("max, includeMax = false", async () => {
      const opts = {
        max: 0,
        includeMax: false
      };

      await expect(compareValidator(opts, {}, -10)).resolves.toEqual(undefined);
      await expect(compareValidator(opts, {}, 0)).rejects.toEqual(
        VALIDATION_FAILED
      );
      await expect(compareValidator(opts, {}, 10)).rejects.toEqual(
        VALIDATION_FAILED
      );
    });

    it("min and max both", async () => {
      const opts1 = {
        min: -100,
        max: 100
      };
      const opts2 = {
        min: -100,
        max: 100,
        includeMin: false,
        includeMax: false
      };

      await expect(compareValidator(opts1, {}, 0)).resolves.toEqual(undefined);
      await expect(compareValidator(opts1, {}, 100)).resolves.toEqual(
        undefined
      );
      await expect(compareValidator(opts1, {}, -100)).resolves.toEqual(
        undefined
      );
      await expect(compareValidator(opts1, {}, -101)).rejects.toEqual(
        VALIDATION_FAILED
      );
      await expect(compareValidator(opts1, {}, 101)).rejects.toEqual(
        VALIDATION_FAILED
      );

      await expect(compareValidator(opts2, {}, 0)).resolves.toEqual(undefined);
      await expect(compareValidator(opts2, {}, 100)).rejects.toEqual(
        VALIDATION_FAILED
      );
      await expect(compareValidator(opts2, {}, -100)).rejects.toEqual(
        VALIDATION_FAILED
      );
      await expect(compareValidator(opts2, {}, -101)).rejects.toEqual(
        VALIDATION_FAILED
      );
      await expect(compareValidator(opts2, {}, 101)).rejects.toEqual(
        VALIDATION_FAILED
      );
    });
  });

  describe("mode = BigInt", () => {
    it("min, includeMin = true", async () => {
      const opts1 = {
        min: "0",
        mode: "BigInt" as const
      };
      const opts2 = {
        min: "0",
        includeMin: true,
        mode: "BigInt" as const
      };

      await expect(compareValidator(opts1, {}, "10")).resolves.toEqual(
        undefined
      );
      await expect(compareValidator(opts2, {}, "10")).resolves.toEqual(
        undefined
      );
      await expect(compareValidator(opts1, {}, "0")).resolves.toEqual(
        undefined
      );
      await expect(compareValidator(opts2, {}, "0")).resolves.toEqual(
        undefined
      );
      await expect(compareValidator(opts1, {}, "-10")).rejects.toEqual(
        VALIDATION_FAILED
      );
      await expect(compareValidator(opts2, {}, "-10")).rejects.toEqual(
        VALIDATION_FAILED
      );
    });

    it("min, includeMin = false", async () => {
      const opts = {
        min: "0",
        includeMin: false,
        mode: "BigInt" as const
      };

      await expect(compareValidator(opts, {}, "10")).resolves.toEqual(
        undefined
      );
      await expect(compareValidator(opts, {}, "0")).rejects.toEqual(
        VALIDATION_FAILED
      );
      await expect(compareValidator(opts, {}, "-10")).rejects.toEqual(
        VALIDATION_FAILED
      );
    });

    it("max, includeMax = true", async () => {
      const opts1 = {
        max: "0",
        mode: "BigInt" as const
      };
      const opts2 = {
        max: "0",
        includeMax: true,
        mode: "BigInt" as const
      };

      await expect(compareValidator(opts1, {}, "-10")).resolves.toEqual(
        undefined
      );
      await expect(compareValidator(opts2, {}, "-10")).resolves.toEqual(
        undefined
      );

      await expect(compareValidator(opts1, {}, "0")).resolves.toEqual(
        undefined
      );
      await expect(compareValidator(opts2, {}, "0")).resolves.toEqual(
        undefined
      );

      await expect(compareValidator(opts1, {}, "10")).rejects.toEqual(
        VALIDATION_FAILED
      );
      await expect(compareValidator(opts2, {}, "10")).rejects.toEqual(
        VALIDATION_FAILED
      );
    });

    it("max, includeMax = false", async () => {
      const opts = {
        max: "0",
        includeMax: false,
        mode: "BigInt" as const
      };

      await expect(compareValidator(opts, {}, "-10")).resolves.toEqual(
        undefined
      );
      await expect(compareValidator(opts, {}, "0")).rejects.toEqual(
        VALIDATION_FAILED
      );
      await expect(compareValidator(opts, {}, "10")).rejects.toEqual(
        VALIDATION_FAILED
      );
    });

    it("min and max both", async () => {
      const opts1 = {
        min: "-100",
        max: "100",
        mode: "BigInt" as const
      };
      const opts2 = {
        min: "-100",
        max: "100",
        includeMin: false,
        includeMax: false,
        mode: "BigInt" as const
      };

      await expect(compareValidator(opts1, {}, "0")).resolves.toEqual(
        undefined
      );
      await expect(compareValidator(opts1, {}, "100")).resolves.toEqual(
        undefined
      );
      await expect(compareValidator(opts1, {}, "-100")).resolves.toEqual(
        undefined
      );
      await expect(compareValidator(opts1, {}, "-101")).rejects.toEqual(
        VALIDATION_FAILED
      );
      await expect(compareValidator(opts1, {}, "101")).rejects.toEqual(
        VALIDATION_FAILED
      );

      await expect(compareValidator(opts2, {}, "0")).resolves.toEqual(
        undefined
      );
      await expect(compareValidator(opts2, {}, "100")).rejects.toEqual(
        VALIDATION_FAILED
      );
      await expect(compareValidator(opts2, {}, "-100")).rejects.toEqual(
        VALIDATION_FAILED
      );
      await expect(compareValidator(opts2, {}, "-101")).rejects.toEqual(
        VALIDATION_FAILED
      );
      await expect(compareValidator(opts2, {}, "101")).rejects.toEqual(
        VALIDATION_FAILED
      );
    });
  });

  describe("mode = BigDecimal", () => {
    it("min, includeMin = true", async () => {
      const opts1 = {
        min: "0",
        mode: "BigDecimal" as const
      };
      const opts2 = {
        min: "0",
        includeMin: true,
        mode: "BigDecimal" as const
      };

      await expect(compareValidator(opts1, {}, "10")).resolves.toEqual(
        undefined
      );
      await expect(compareValidator(opts1, {}, "0.0001")).resolves.toEqual(
        undefined
      );
      await expect(compareValidator(opts2, {}, "10")).resolves.toEqual(
        undefined
      );
      await expect(compareValidator(opts1, {}, "0")).resolves.toEqual(
        undefined
      );
      await expect(compareValidator(opts2, {}, "0")).resolves.toEqual(
        undefined
      );
      await expect(compareValidator(opts1, {}, "-10")).rejects.toEqual(
        VALIDATION_FAILED
      );
      await expect(compareValidator(opts1, {}, "-0.0001")).rejects.toEqual(
        VALIDATION_FAILED
      );
      await expect(compareValidator(opts2, {}, "-10")).rejects.toEqual(
        VALIDATION_FAILED
      );
    });

    it("min, includeMin = false", async () => {
      const opts = {
        min: "0",
        includeMin: false,
        mode: "BigDecimal" as const
      };

      await expect(compareValidator(opts, {}, "10")).resolves.toEqual(
        undefined
      );
      await expect(compareValidator(opts, {}, "0.001")).resolves.toEqual(
        undefined
      );
      await expect(compareValidator(opts, {}, "0")).rejects.toEqual(
        VALIDATION_FAILED
      );
      await expect(compareValidator(opts, {}, "-10")).rejects.toEqual(
        VALIDATION_FAILED
      );
      await expect(compareValidator(opts, {}, "-0.001")).rejects.toEqual(
        VALIDATION_FAILED
      );
    });

    it("max, includeMax = true", async () => {
      const opts1 = {
        max: "0",
        mode: "BigDecimal" as const
      };
      const opts2 = {
        max: "0",
        includeMax: true,
        mode: "BigDecimal" as const
      };

      await expect(compareValidator(opts1, {}, "-10")).resolves.toEqual(
        undefined
      );
      await expect(compareValidator(opts1, {}, "-0.0001")).resolves.toEqual(
        undefined
      );
      await expect(compareValidator(opts2, {}, "-10")).resolves.toEqual(
        undefined
      );

      await expect(compareValidator(opts1, {}, "0")).resolves.toEqual(
        undefined
      );
      await expect(compareValidator(opts2, {}, "0")).resolves.toEqual(
        undefined
      );

      await expect(compareValidator(opts1, {}, "10")).rejects.toEqual(
        VALIDATION_FAILED
      );
      await expect(compareValidator(opts1, {}, "0.001")).rejects.toEqual(
        VALIDATION_FAILED
      );
      await expect(compareValidator(opts2, {}, "10")).rejects.toEqual(
        VALIDATION_FAILED
      );
    });

    it("max, includeMax = false", async () => {
      const opts = {
        max: "0",
        includeMax: false,
        mode: "BigDecimal" as const
      };

      await expect(compareValidator(opts, {}, "-10")).resolves.toEqual(
        undefined
      );
      await expect(compareValidator(opts, {}, "-0.001")).resolves.toEqual(
        undefined
      );
      await expect(compareValidator(opts, {}, "0")).rejects.toEqual(
        VALIDATION_FAILED
      );
      await expect(compareValidator(opts, {}, "10")).rejects.toEqual(
        VALIDATION_FAILED
      );
      await expect(compareValidator(opts, {}, "0.001")).rejects.toEqual(
        VALIDATION_FAILED
      );
    });

    it("min and max both", async () => {
      const opts1 = {
        min: "-100",
        max: "100",
        mode: "BigDecimal" as const
      };
      const opts2 = {
        min: "-100",
        max: "100",
        includeMin: false,
        includeMax: false,
        mode: "BigDecimal" as const
      };

      await expect(compareValidator(opts1, {}, "0")).resolves.toEqual(
        undefined
      );
      await expect(compareValidator(opts1, {}, "100")).resolves.toEqual(
        undefined
      );
      await expect(compareValidator(opts1, {}, "-100")).resolves.toEqual(
        undefined
      );
      await expect(compareValidator(opts1, {}, "-101")).rejects.toEqual(
        VALIDATION_FAILED
      );
      await expect(compareValidator(opts1, {}, "101")).rejects.toEqual(
        VALIDATION_FAILED
      );

      await expect(compareValidator(opts2, {}, "0")).resolves.toEqual(
        undefined
      );
      await expect(compareValidator(opts2, {}, "100")).rejects.toEqual(
        VALIDATION_FAILED
      );
      await expect(compareValidator(opts2, {}, "-100")).rejects.toEqual(
        VALIDATION_FAILED
      );
      await expect(compareValidator(opts2, {}, "-101")).rejects.toEqual(
        VALIDATION_FAILED
      );
      await expect(compareValidator(opts2, {}, "101")).rejects.toEqual(
        VALIDATION_FAILED
      );
    });

    it("decimal value", async () => {
      const opts = {
        max: "0.5",
        includeMax: false,
        mode: "BigDecimal" as const
      };

      await expect(compareValidator(opts, {}, "-1")).resolves.toEqual(
        undefined
      );
      await expect(compareValidator(opts, {}, "0.1")).resolves.toEqual(
        undefined
      );
      await expect(compareValidator(opts, {}, "0.5")).rejects.toEqual(
        VALIDATION_FAILED
      );
      await expect(compareValidator(opts, {}, "0.6")).rejects.toEqual(
        VALIDATION_FAILED
      );
      await expect(compareValidator(opts, {}, "1")).rejects.toEqual(
        VALIDATION_FAILED
      );
    });
  });
});
