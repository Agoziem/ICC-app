import {
  WAContactSchema,
  WAContactWebsocketSchema,
  WAMessageSchema,
  WAMessageWebsocketSchema,
  WATemplateArraySchema,
  WATemplateSchema,
} from "@/utils/validation";
import { z } from "zod";

declare global {
  type WAContact = z.infer<typeof WAContactSchema>;

  type WAContacts = WAContact[];

  type WAMessage = z.infer<typeof WAMessageSchema>;

  type WAMessages = WAMessage[];

  type WAContactSocket = z.infer<typeof WAContactWebsocketSchema>;

  type WAMessagesSocket = z.infer<typeof WAMessageWebsocketSchema>;

  type WATemplate = z.infer<typeof WATemplateSchema>;

  type WATemplateArray = z.infer<typeof WATemplateArraySchema>;

}

export {};
