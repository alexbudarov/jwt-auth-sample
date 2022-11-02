import { Rule } from "antd/lib/form";
import { Decimal } from "decimal.js";
import { INVALID_VALUE_TYPE, VALIDATION_FAILED } from "../reject-reason";

export async function negativeOrZeroValidator(
  _rule: Rule,
  value: any
): Promise<void> {
  let num: Decimal;
  try {
    num = new Decimal(value);
  } catch (err) {
    return Promise.reject(INVALID_VALUE_TYPE);
  }

  if (num.isNaN()) {
    return Promise.reject(INVALID_VALUE_TYPE);
  }

  return num.lessThanOrEqualTo(0)
    ? Promise.resolve()
    : Promise.reject(VALIDATION_FAILED);
}
