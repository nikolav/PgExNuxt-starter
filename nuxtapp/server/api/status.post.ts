import { requestValidationSchemaCheck as check } from "@/utils";
import { apiStatus } from "@/validations";

export default defineEventHandler(async (event) => {
  const { body } = await check(event, { body: apiStatus });
  return {
    status: "ok",
    received: {
      message: body?.message,
    },
  };
});
