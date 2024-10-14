// types.d.ts
import {
  departmentResponseSchema,
  departmentSchema,
  departmentServiceResponseSchema,
  departmentServiceSchema,
  organizationSchema,
  staffResponseSchema,
  staffSchema,
  subscriptionSchema,
  subscriptionsResponseSchema,
  testimonialSchema,
  testimonialsResponseSchema,
} from "@/schemas/organizations";
import { z } from "zod";
declare global {
  type Organization = z.infer<typeof organizationSchema>;

  type Organizations = Organization[];

  type Staff = z.infer<typeof staffSchema>;

  type Staffpaginated = z.infer<typeof staffResponseSchema>;

  type Staffs = Staff[];

  type Testimony = z.infer<typeof testimonialSchema>;

  type Testimonypaginated = z.infer<typeof testimonialsResponseSchema>;

  type Testimonies = Testimony[];

  type Subscription = z.infer<typeof subscriptionSchema>;

  type Subscriptionpaginated = z.infer<typeof subscriptionsResponseSchema>;

  type Subscriptions = Subscription[];

  type Departmentservice = z.infer<typeof departmentServiceSchema>;

  type Departmentservice = z.infer<typeof departmentServiceResponseSchema>;

  type Departmentservices = Department[];

  type Department = z.infer<typeof departmentSchema>;

  type Department = z.infer<typeof departmentResponseSchema>;

  type Departments = Subscription[];
}

export {};
