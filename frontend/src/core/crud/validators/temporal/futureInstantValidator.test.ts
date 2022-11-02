import dayjs from "dayjs";
import * as MockDate from "mockdate";
import { futureInstantValidator } from "./futureInstantValidator";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { INVALID_VALUE_TYPE, VALIDATION_FAILED } from "../reject-reason";

dayjs.extend(customParseFormat);

describe("futureInstantValidator", () => {
  beforeEach(() => {
    MockDate.set("2000-01-01 12:00:00.000");
  });
  afterEach(() => {
    MockDate.reset();
  });

  it("rejects when value is a past datetime", async () => {
    await expect(
      futureInstantValidator({}, dayjs("2000-01-01 11:00:00.000"))
    ).rejects.toEqual(VALIDATION_FAILED);
  });

  it("rejects when value is present datetime", async () => {
    await expect(
      futureInstantValidator({}, dayjs("2000-01-01 12:00:00.000"))
    ).rejects.toEqual(VALIDATION_FAILED);
  });

  it("rejects when value is a past time", async () => {
    await expect(
      futureInstantValidator({}, dayjs("11:00:00", "h:m:s"))
    ).rejects.toEqual(VALIDATION_FAILED);
  });

  it("rejects when value is a present time", async () => {
    await expect(
      futureInstantValidator({}, dayjs("12:00:00", "h:m:s"))
    ).rejects.toEqual(VALIDATION_FAILED);
  });

  it("resolves when value is a future datetime", async () => {
    await expect(
      futureInstantValidator({}, dayjs("2023-01-01 12:00:00.000"))
    ).resolves.toEqual(undefined);
  });

  it("resolves when value is a future time", async () => {
    await expect(
      futureInstantValidator({}, dayjs("13:00:00", "h:m:s"))
    ).resolves.toEqual(undefined);
  });

  it("compares time without milliseconds", async () => {
    await expect(
      futureInstantValidator({}, dayjs("2000-01-01 12:00:00.999"))
    ).rejects.toEqual(VALIDATION_FAILED);
  });

  it("rejects when value is not a Dayjs object", async () => {
    await expect(futureInstantValidator({}, "sdfsdfsdf")).rejects.toEqual(
      INVALID_VALUE_TYPE
    );
  });
});
