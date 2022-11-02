import { Rule } from "antd/lib/form";
import { VALIDATION_FAILED } from "../reject-reason";
import Decimal from "decimal.js";

interface CompareValidatorOptions {
  min?: number | string;
  max?: number | string;
  includeMin?: boolean;
  includeMax?: boolean;
  mode?: "number" | "BigInt" | "BigDecimal";
}

/**
 * To be used in more complex cases, such as supporting BigInt / BigDecimal, custom min/max thresholds.
 * When using 'BigInt' or 'BigDecimal' mode, validation will fail if any of the values cannot be converted to BigInt/Decimal.
 *
 * @param opts
 * @param _rule
 * @param value
 */
export async function compareValidator(
  opts: CompareValidatorOptions,
  _rule: Rule,
  value: any
): Promise<void> {
  const { min, max, includeMin = true, includeMax = true } = opts;

  if (min == null && max == null) {
    return Promise.resolve();
  }

  // value, min, max can be a number, string representing Java BigInteger, or string representing Java BigDecimal
  // by converting them to Decimal we cover all cases

  const bigDecimalValue = new Decimal(value);

  if (min != null) {
    const bigDecimalMin = new Decimal(min);
    if (
      includeMin
        ? bigDecimalValue.lessThan(bigDecimalMin)
        : bigDecimalValue.lessThanOrEqualTo(bigDecimalMin)
    ) {
      return Promise.reject(VALIDATION_FAILED);
    }
  }

  if (max != null) {
    const bigDecimalMax = new Decimal(max);
    if (
      includeMax
        ? bigDecimalValue.greaterThan(bigDecimalMax)
        : bigDecimalValue.greaterThanOrEqualTo(bigDecimalMax)
    ) {
      return Promise.reject(VALIDATION_FAILED);
    }
  }

  return Promise.resolve();
}
