import { Rule } from "antd/lib/form";
import { VALIDATION_FAILED } from "./reject-reason";

export async function nullValidator(_rule: Rule, value: any): Promise<void> {
  value == null
    ? await Promise.resolve()
    : await Promise.reject(VALIDATION_FAILED);
}
