import { Rule } from "antd/lib/form";
import { VALIDATION_FAILED } from "./reject-reason";

export async function assertFalseValidator(
  _rule: Rule,
  value: any
): Promise<void> {
  return value === false
    ? Promise.resolve()
    : Promise.reject(VALIDATION_FAILED);
}
