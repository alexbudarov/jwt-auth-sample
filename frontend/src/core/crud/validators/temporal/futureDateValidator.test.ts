import dayjs from "dayjs";
import * as MockDate from "mockdate";
import { futureDateValidator } from "./futureDateValidator";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { INVALID_VALUE_TYPE, VALIDATION_FAILED } from "../reject-reason";

dayjs.extend(customParseFormat);

describe("futureDateValidator", () => {
  beforeEach(() => {
    MockDate.set("2000-01-01 12:00:00.000");
  });
  afterEach(() => {
    MockDate.reset();
  });

  it("rejects when value is a past date", async () => {
    await expect(futureDateValidator({}, dayjs("1999-12-31"))).rejects.toEqual(
      VALIDATION_FAILED
    );
  });

  it("rejects when value is present date", async () => {
    await expect(futureDateValidator({}, dayjs("2000-01-01"))).rejects.toEqual(
      VALIDATION_FAILED
    );
  });

  it("rejects when value is present date, future time", async () => {
    await expect(
      futureDateValidator({}, dayjs("2000-01-01 13:00:00"))
    ).rejects.toEqual(VALIDATION_FAILED);
  });

  it("resolves when value is a future date", async () => {
    await expect(futureDateValidator({}, dayjs("2023-01-01"))).resolves.toEqual(
      undefined
    );
  });

  it("rejects when value is not a Dayjs object", async () => {
    await expect(futureDateValidator({}, "sdfsdfsdf")).rejects.toEqual(
      INVALID_VALUE_TYPE
    );
  });
});
