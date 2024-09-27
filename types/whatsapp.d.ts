import {
  WAContactSchema,
  WAContactWebsocketSchema,
  WAMessageSchema,
  WAMessageWebsocketSchema,
} from "@/utils/validation";
import { z } from "zod";

declare global {
  type WAContact = z.infer<typeof WAContactSchema>;

  type WAContacts = WAContact[];

  type WAMessage = z.infer<typeof WAMessageSchema>;

  type WAMessages = WAMessage[];

  type WAContactSocket = z.infer<typeof WAContactWebsocketSchema>;

  type WAMessagesSocket = z.infer<typeof WAMessageWebsocketSchema>;

}

export {};
