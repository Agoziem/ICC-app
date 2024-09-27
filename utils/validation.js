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
  message: z.number(),
  recipient_email: z.string(),
  response_subject: z.string(),
  response_message: z.string().min(7, { message: "Message cannot be empty" }),
  created_at: z.string().optional(),
});

export const emailResponseArraySchema = z.array(emailResponseSchema);

export const MessageWebsocketSchema = z.object({
  operation: z.string(),
  message: emailSchema,
});

export const MESSAGE_TYPES = [
  "text",
  "image",
  "video",
  "audio",
  "document",
  "sticker",
];
export const MESSAGE_MODES = ["received", "sent"];

// Create the Zod schema for the Message model ..
export const WAMessageSchema = z.object({
  id: z.number().optional().nullable(),
  message_id: z.string().optional(),
  contact: z
    .number()
    .positive("Contact ID must be a positive number")
    .nullable(),
  message_type: z.enum([
    "text",
    "image",
    "video",
    "audio",
    "document",
    "sticker",
  ]),
  body: z.string().optional(), // Text message body
  media_id: z.string().optional(), // Media message ID
  mime_type: z.string().optional(), // MIME type for media messages
  filename: z.string().optional(), // Filename forideos/documents
  animated: z.boolean().optional(), // For stickers
  caption: z.string().optional(), // Caption for media
  timestamp: z.string().optional(), // ISO date string
  message_mode: z.enum(["received", "sent"]),
  seen: z.boolean().optional(), // Seen status for received messages
  link: z.string().url().optional(),
  status: z.enum(["pending", "sent"]).optional(), // Status for sent messages
});

export const WAMessageArraySchema = z.array(WAMessageSchema);

export const LastMessageSchema = z.object({
  id: z.number().optional(),
  message_id: z.string().min(1, "Message ID is required"),
  message_type: z.enum([
    "text",
    "image",
    "video",
    "audio",
    "document",
    "sticker",
  ]),
  body: z.string().optional(),
  timestamp: z.string().optional(),
});

export const WAContactSchema = z.object({
  id: z.number().optional(),
  wa_id: z.string(),
  profile_name: z.string().optional(),
  last_message: LastMessageSchema.optional(),
  unread_message_count: z.number(),
});

export const WAContactArraySchema = z.array(WAContactSchema);

// Whatsapp Websocket types
export const WAContactWebsocketSchema = z.object({
  operation: z.string(),
  contact: WAContactSchema,
});

export const WAMessageWebsocketSchema = z.object({
  operation: z.string(),
  contact: WAContactSchema,
  message: WAMessageSchema,
});
