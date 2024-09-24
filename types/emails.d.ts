// types.d.ts
import { z } from "zod";
import { emailArraySchema,emailResponseSchema,emailSchema, MessageWebsocketSchema } from "@/utils/validation";

declare global {
    type Email = z.infer<typeof emailSchema>

    type EmailArrays = Email[]

    type EmailResponse = z.infer<typeof emailResponseSchema>

    type EmailResponseArray = EmailResponse[]

    type EmailWebsocket = z.infer<typeof MessageWebsocketSchema>
  }
  
export {};
  