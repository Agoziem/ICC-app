// types.d.ts
import { UserSchema } from "@/schemas/users";
import { z } from "zod";
declare global {
  type User = z.infer<typeof UserSchema>;

  type Users = User[];
}

export {};
