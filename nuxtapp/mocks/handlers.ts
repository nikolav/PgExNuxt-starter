// src/mocks/handlers.js
import { rest } from "msw"
import { FAKE_API_STATUS_URL } from "../config/vars";

export const handlers = [
  rest.post(FAKE_API_STATUS_URL, (req, res, ctx) =>
    res(ctx.status(200), ctx.json({ status: "ok" }))
  ),

  // rest.get("/user", (req, res, ctx) => {
  //   // Check if the user is authenticated in this session
  //   // eslint-disable-next-line no-undef
  //   const isAuthenticated = sessionStorage.getItem("is-authenticated")

  //   if (!isAuthenticated) {
  //     // If not authenticated, respond with a 403 error
  //     return res(
  //       ctx.status(403),
  //       ctx.json({
  //         errorMessage: "Not authorized",
  //       })
  //     )
  //   }

  //   // If authenticated, return a mocked user details
  //   return res(
  //     ctx.status(200),
  //     ctx.json({
  //       username: "admin",
  //     })
  //   )
  // }),
]