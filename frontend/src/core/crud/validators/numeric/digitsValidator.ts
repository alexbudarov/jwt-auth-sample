import { Rule } from "antd/lib/form";
import { VALIDATION_FAILED } from "../reject-reason";

export interface DigitsValidatorOpts {
  integer: number;
  fraction: number;
}

export async function digitsValidator(
  opts: DigitsValidatorOpts,
  _rule: Rule,
  value: any
): Promise<void> {
  const { integer, fraction } = opts;

  const [valueInteger, valueFraction] = value.toString().split(".");
  const valueIntegerDigits = valueInteger.length;
  const valueFractionDigits = valueFraction ? valueFraction.length : 0;

  if (valueIntegerDigits > integer || valueFractionDigits > fraction) {
    return Promise.reject(VALIDATION_FAILED);
  }

  return Promise.resolve();
}
