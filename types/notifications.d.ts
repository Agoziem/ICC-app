// types.d.ts
import {
  notificationActionSchema,
  notificationSchema,
} from "@/schemas/notifications";
import { z } from "zod";

declare global {
  type NotificationMessage = z.infer<typeof notificationSchema>;

  type NotificationMessages = NotificationMessage[];

  type NotificationAction = z.infer<typeof notificationActionSchema>;
}

export {};
