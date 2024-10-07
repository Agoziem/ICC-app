import { z } from "zod";

// ---------------------------------------------------------------------
// Validations for emails
// ---------------------------------------------------------------------
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

// Zod Validation for emails Array
export const emailArraySchema = z.array(emailSchema);

// Zod Validation for emails response
export const emailResponseSchema = z.object({
  message: z.number(),
  recipient_email: z.string(),
  response_subject: z.string(),
  response_message: z.string().min(7, { message: "Message cannot be empty" }),
  created_at: z.string().optional(),
});

// Zod Validation for emails responses Array
export const emailResponseArraySchema = z.array(emailResponseSchema);

// Zod Validation for emails message
export const emailMessageSchema = z.object({
  id: z.number().optional(),
  subject: z.string().min(7, { message: "your Email must have a Subject" }),
  body: z.string().min(7, { message: "Your Email Body cannot be empty" }),
  template: z.string().nullable().optional(),
  created_at: z.string().optional(),
  status: z.string(),
});

// Zod Validation for emails messages array
export const emailMessagesArraySchema = z.array(emailMessageSchema);

// Zod Validation for emails Websocket
export const MessageWebsocketSchema = z.object({
  operation: z.string(),
  message: emailSchema,
});


// ---------------------------------------------------------------------
// Validations for WA API
// ---------------------------------------------------------------------
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

// ---------------------------------------------------------------------
// Validations for Notification data
// ---------------------------------------------------------------------
export const notificationSchema = z.object({
  id: z.number(),
  title: z.string().min(1, { message: "Title is required" }),
  message: z.string().min(1, { message: "Message is required" }),
  viewed: z.boolean(),
  updated_at: z.string().optional(),  // ISO string date format validation can be added if needed
  created_at: z.string().optional(),  // Optional but expect ISO string format
});

export const notificationArraySchema = z.array(notificationSchema);

// Define the full schema with action and notification
export const notificationActionSchema = z.object({
  action: z.enum(["add", "update", "delete", "mark_viewed"]),
  notification: notificationSchema,
});



