import { z } from "zod";

const ResponseDataSchema = z.object({
  title: z.string(),
  description: z.string(),
  type: z.enum(["single", "multiple", "subjective", "survey"]),
  response_ans_data: z.array(z.record(z.string())),
});

export const responseSchema = z.object({
  user_id: z.string(),
  form_id: z.string(),
  response_data: ResponseDataSchema,
});

export type responseSchemaType = z.infer<typeof responseSchema>;

export const idSchema = z.string();
