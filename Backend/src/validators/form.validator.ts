import z from "zod";

const optionSchema = z.object({
  content: z.string(),
  is_correct: z.boolean(),
});

const questionSchema = z.object({
  question: z.string(),
  options: z.array(optionSchema),
});

const form_data = z.object({
  title: z.string(),
  description: z.string(),
  type: z.enum(["survey", "single", "multiple", "subjective"]),
  question_data: z.array(questionSchema),
});

export const formData = z.object({
  form_data: form_data,
  user_id: z.string(),
});

export const getSchema = z.string();

export type getSchemaData = z.infer<typeof getSchema>;
export type formDataType = z.infer<typeof formData>;

// {
//     "form_data": {
//         "title": "test hi",
//         "description": "something",
//         "type": "single",
//         "question_data": [
//             {
//                 "question": "question",
//                 "options": [
//                     {
//                         "id": "adwwada",
//                         "content": "1",
//                         "is_correct": true
//                     },
//                     {
//                         "id": "adwwada",
//                         "content": "2",
//                         "is_correct": false
//                     },
//                     {
//                         "id": "adwwada",
//                         "content": "3",
//                         "is_correct": false
//                     },
//                     {
//                         "id": "adwwada",
//                         "content": "4",
//                         "is_correct": false
//                     }
//                 ]
//             }
//         ]
//     }
// }
