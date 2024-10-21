import { z } from "zod";
import { serviceSchema } from "./items";

export const organizationSchema = z.object({
  id: z.number().optional(), // Assuming id is automatically generated by Django
  name: z.string().max(200),
  description: z.string(),
  logo: z.string().optional().nullable(), // Image path
  Organizationlogoname: z.string().optional().nullable(), // Image name or file input
  Organizationlogo: z.string().url().optional().nullable(), // Image full url or file input
  vision: z.string(),
  mission: z.string(),
  email: z.string().email(),
  phone: z.string().max(20),
  address: z.string(),
  whatsapplink: z.string().max(200).optional().nullable(),
  facebooklink: z.string().max(200).optional().nullable(),
  instagramlink: z.string().max(200).optional().nullable(),
  twitterlink: z.string().max(200).optional().nullable(),
  tiktoklink: z.string().max(200).optional().nullable(),
  linkedinlink: z.string().max(200).optional().nullable(),
  youtubechannel: z.string().max(200).optional().nullable(),
  privacy_policy: z.string().optional().nullable(), // RichTextField
  terms_of_use: z.string().optional().nullable(), // RichTextField,
  created_at: z.coerce.date(),
  last_updated_date: z.coerce.date(),
});

export const organizationArraySchema = z.array(organizationSchema);

export const staffSchema = z.object({
  id: z.number().optional(), // Assuming id is automatically generated by Django
  organization: z.number().optional().nullable(), // ForeignKey, represented by ID
  first_name: z.string().max(100),
  last_name: z.string().max(100),
  other_names: z.string().max(100).optional().nullable(),
  email: z.string().email(),
  phone: z.string().max(20),
  address: z.string(),
  img: z.string().optional().nullable(), // Image field
  img_url: z.string().url().optional().nullable(), // Image field
  img_name: z.string().optional().nullable(), // Image field
  role: z.string().max(100).optional().nullable(),
  facebooklink: z.string().max(100).optional().nullable(),
  instagramlink: z.string().max(100).optional().nullable(),
  twitterlink: z.string().max(100).optional().nullable(),
  linkedinlink: z.string().max(100).optional().nullable(),
  created_at:z.coerce.date(),
  last_updated_date:z.coerce.date()
});

export const staffResponseSchema = z.object({
  count: z.number(),
  next: z.string().nullable(), // next can be null
  previous: z.string().nullable(), // previous can be null
  results: z.array(staffSchema),
});

export const testimonialSchema = z.object({
  id: z.number().optional(), // Assuming id is automatically generated by Django
  organization: z.number().optional().nullable(), // ForeignKey, represented by ID
  name: z.string().max(100).default("Anonymous"),
  content: z.string(),
  role: z.string().max(100).optional().nullable(),
  img: z.string().optional().nullable(), // Image field
  img_url: z.string().url().optional().nullable(), // Image field
  img_name: z.string().optional().nullable(), // Image field
  rating: z.number().min(0).max(5).optional().nullable(), // Rating out of 5
  created_at:z.coerce.date(),
  last_updated_date:z.coerce.date()
});

export const testimonialsResponseSchema = z.object({
  count: z.number(),
  next: z.string().nullable(), // next can be null
  previous: z.string().nullable(), // previous can be null
  results: z.array(testimonialSchema),
});

export const subscriptionSchema = z.object({
  id: z.number().optional(), // Assuming id is automatically generated by Django
  email: z.string().email(),
  date_added: z.coerce.date(),
});

export const subscriptionsResponseSchema = z.object({
  count: z.number(),
  next: z.string().nullable(), // next can be null
  previous: z.string().nullable(), // previous can be null
  results: z.array(subscriptionSchema),
});

export const departmentServiceSchema = z.object({
  id: z.number().optional(), // Assuming id is automatically generated by Django
  name: z.string().max(300),
});

export const departmentServiceResponseSchema = z.object({
  count: z.number(),
  next: z.string().nullable(), // next can be null
  previous: z.string().nullable(), // previous can be null
  results: z.array(departmentServiceSchema),
});

export const departmentSchema = z.object({
  id: z.number().optional().nullable(),
  organization: organizationSchema
    .pick({
      id: true,
      name: true,
    })
    .nullable(),
  img: z.string().optional().nullable(), // Image field
  img_url: z.string().url().optional().nullable(), // Image field
  img_name: z.string().optional().nullable(), // Image field
  name: z.string().max(100),
  description: z.string(),
  staff_in_charge: z
    .object({
      id: z.number().optional().nullable(),
      name: z.string().max(100),
      img_url: z.string().url().optional().nullable(),
    })
    .optional()
    .nullable(),
  services: z
    .array(
      serviceSchema.pick({
        id: true,
        name: true,
      })
    )
    .optional(),
  created_at: z.coerce.date(),
  last_updated_date: z.coerce.date(),
});

export const departmentResponseSchema = z.object({
  count: z.number(),
  next: z.string().nullable(), // next can be null
  previous: z.string().nullable(), // previous can be null
  results: z.array(departmentSchema),
});
