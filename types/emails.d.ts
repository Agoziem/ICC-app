// types.d.ts
import {
  emailMessageSchema,
  emailResponseSchema,
  emailSchema,
  MessageWebsocketSchema,
} from "@/schemas/emails";
import { z } from "zod";

declare global {
  type Email = z.infer<typeof emailSchema>;

  type EmailArrays = Email[];

  type EmailResponse = z.infer<typeof emailResponseSchema>;

  type EmailResponseArray = EmailResponse[];

  type EmailWebsocket = z.infer<typeof MessageWebsocketSchema>;

  type EmailMessage = z.infer<typeof emailMessageSchema>;

  type EmailMessageArray = EmailMessage[];
}

export {};
