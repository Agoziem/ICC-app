// types.d.ts
import { z } from "zod";
import {
  notificationActionSchema,
  notificationSchema,
} from "@/utils/validation";

declare global {
  type NotificationMessage = z.infer<typeof notificationSchema>;

  type NotificationMessages = NotificationMessage[];

  type NotificationAction = z.infer<typeof notificationActionSchema>;
}

export {};
