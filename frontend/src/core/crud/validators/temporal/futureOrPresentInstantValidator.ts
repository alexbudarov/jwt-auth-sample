import { Rule } from "antd/lib/form";
import dayjs, { Dayjs, isDayjs } from "dayjs";
import { INVALID_VALUE_TYPE, VALIDATION_FAILED } from "../reject-reason";

export async function futureOrPresentInstantValidator(
  _rule: Rule,
  value: any
): Promise<void> {
  if (!isDayjs(value)) {
    await Promise.reject(INVALID_VALUE_TYPE);
  }
  const date = value as Dayjs;

  date.isAfter(dayjs(), "second") || date.isSame(dayjs(), "second")
    ? await Promise.resolve()
    : await Promise.reject(VALIDATION_FAILED);
}
