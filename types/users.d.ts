// types.d.ts
import { UserSchema } from "@/schemas/users";

declare global {
  type User = z.infer<typeof UserSchema>;

  type Users = User[];
}

export {};
