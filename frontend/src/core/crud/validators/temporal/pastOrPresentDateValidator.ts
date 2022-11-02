import { Rule } from "antd/lib/form";
import dayjs, { Dayjs, isDayjs } from "dayjs";
import { INVALID_VALUE_TYPE, VALIDATION_FAILED } from "../reject-reason";

export async function pastOrPresentDateValidator(
  _rule: Rule,
  value: any
): Promise<void> {
  if (!isDayjs(value)) {
    await Promise.reject(INVALID_VALUE_TYPE);
  }
  const date = value as Dayjs;

  date.isBefore(dayjs(), "day") || date.isSame(dayjs(), "day")
    ? await Promise.resolve()
    : await Promise.reject(VALIDATION_FAILED);
}
