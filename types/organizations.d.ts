// types.d.ts
import {
  departmentSchema,
  departmentServiceSchema,
  organizationSchema,
  staffSchema,
  subscriptionSchema,
  testimonialSchema,
} from "@/schemas/organizations";
import { z } from "zod";
declare global {
  type Organization = z.infer<typeof organizationSchema>;

  type Organizations = Organization[];

  type Staff = z.infer<typeof staffSchema>;

  type Staffs = Staff[];

  type Testimony = z.infer<typeof testimonialSchema>;

  type Testimonies = Testimony[];

  type Subscription = z.infer<typeof subscriptionSchema>;

  type Subscriptions = Subscription[];

  type Departmentservice = z.infer<typeof departmentServiceSchema>;

  type Departmentservices = Department[];

  type Department = z.infer<typeof departmentSchema>;

  type Departments = Subscription[];
}

export {};
