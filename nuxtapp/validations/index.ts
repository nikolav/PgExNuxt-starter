import { z } from "zod";

export const apiStatus = z.object({
  message: z.string().optional(),
});
