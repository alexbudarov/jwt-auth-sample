import dayjs from "dayjs";
import * as MockDate from "mockdate";
import { pastOrPresentDateValidator } from "./pastOrPresentDateValidator";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { INVALID_VALUE_TYPE, VALIDATION_FAILED } from "../reject-reason";

dayjs.extend(customParseFormat);

describe("pastOrPresentDateValidator", () => {
  beforeEach(() => {
    MockDate.set("2000-01-01 12:00:00.000");
  });
  afterEach(() => {
    MockDate.reset();
  });

  it("resolves when value is a past date", async () => {
    await expect(
      pastOrPresentDateValidator({}, dayjs("1999-12-31"))
    ).resolves.toEqual(undefined);
  });

  it("resolves when value is present date", async () => {
    await expect(
      pastOrPresentDateValidator({}, dayjs("2000-01-01"))
    ).resolves.toEqual(undefined);
  });

  it("rejects when value is a future date", async () => {
    await expect(
      pastOrPresentDateValidator({}, dayjs("2023-01-01"))
    ).rejects.toEqual(VALIDATION_FAILED);
  });

  it("rejects when value is not a Dayjs object", async () => {
    await expect(pastOrPresentDateValidator({}, "sdfsdfsdf")).rejects.toEqual(
      INVALID_VALUE_TYPE
    );
  });
});
