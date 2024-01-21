import * as z from "zod";

export const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Speech Text is required."
  }),
});