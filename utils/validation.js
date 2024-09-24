import { z } from "zod";

export const emailSchema = z.object({
  id: z.number(), // Required field
  organization: z.number().nullable(), // Nullable but required field
  name: z.string(), // Required field
  email: z.string().email(), // Required field with email validation
  subject: z.string(), // Required field
  message: z.string(), // Required field
  created_at: z.string(), // Required field
  read: z.boolean(),
});

export const emailArraySchema = z.array(emailSchema);

// Define the Zod schema for form validation
export const emailResponseSchema = z.object({
  message:z.number(),
  recipient_email:z.string(),
  response_subject:z.string(),
  response_message: z.string().min(7, { message: "Message cannot be empty" }),
  created_at: z.string().optional()
});

export const emailResponseArraySchema = z.array(emailResponseSchema)

export const MessageWebsocketSchema = z.object({
  operation: z.string(),
  message: emailSchema
})
