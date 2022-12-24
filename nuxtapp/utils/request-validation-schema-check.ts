import { ZodType } from "zod";
import { H3Event, readBody, getQuery, getRouterParams, createError } from "h3";
import httpStatus from "http-status";

import { assign } from "./index";

type TBQP = "body" | "query" | "params";
type TValidationResult = {
  body: any;
  query: any;
  params: any;
};
type TSchemaValidation = {
  [key: string]: ZodType;
};

const badRequest = (error: any) =>
  createError({
    statusCode: httpStatus.BAD_REQUEST,
    statusText: error?.message || `bad request`,
  });
const inputs = {
  body: readBody,
  query: getQuery,
  params: getRouterParams,
};
const validate =
  (type: TBQP = "body") =>
  async (event: H3Event, schema: ZodType) => {
    try {
      return schema.parse(await inputs[type](event));
    } catch (error) {
      throw badRequest(error);
    }
  };

const validated = {
  body: validate("body"),
  query: validate("query"),
  params: validate("params"),
};

// @use; requestValidationSchemaCheck as check
// const { body, query, params } =
//   await check(event, { body: <schema> });
export const requestValidationSchemaCheck = (
  event: H3Event,
  schema: TSchemaValidation
) =>
  Promise.all(
    ["body", "query", "params"].map(async (field) => [
      field,
      field in schema
        ? await validated[field as TBQP](event, schema[field])
        : null,
    ])
  ).then((res) =>
    res.reduce(
      (accum, [field, node]) => assign(accum, { [field]: node }),
      <TValidationResult>{}
    )
  );
