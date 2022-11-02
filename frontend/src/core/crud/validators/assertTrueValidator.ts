import { Rule } from "antd/lib/form";
import { VALIDATION_FAILED } from "./reject-reason";

export async function assertTrueValidator(
  _rule: Rule,
  value: any
): Promise<void> {
  return value === true ? Promise.resolve() : Promise.reject(VALIDATION_FAILED);
}
