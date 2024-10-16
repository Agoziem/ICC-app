import { z } from "zod";
import { categorySchema, subcategorySchema } from "./categories";

// ------------------------------------
// Service Schema
// ------------------------------------
export const serviceSchema = z.object({
  id: z.number().optional(), // Auto-generated by Django
  organization: z
    .object({
      id: z.number().optional().nullable(),
      name: z.string().max(100),
    })
    .optional()
    .nullable(), // ForeignKey to Organization model, represented by organization ID
  preview: z.string().optional().nullable(), // Image URL for service preview
  img_url: z.string().url().optional().nullable(), // Image URL for service preview
  img_name: z.string().optional().nullable(), // Image URL for service preview
  name: z.string().max(100), // Service name
  description: z.string().optional().nullable(), // Description of the service
  service_token: z.string().optional().nullable(), // Token used for service access
  service_flow: z.string().optional().nullable(), // Service flow, RichTextField
  price: z.string().refine((val) => !isNaN(parseFloat(val)), {
    message: "Price must be a valid number",
  }), // DecimalField, parsed as string for input handling
  number_of_times_bought: z.number().optional().nullable(), // Integer, default is 0
  category: categorySchema.nullable(), // ForeignKey to Category model, represented as category ID
  subcategory: subcategorySchema.nullable(), // ForeignKey to SubCategory model, represented as subcategory ID
  userIDs_that_bought_this_service: z.array(z.number()).optional(), // ManyToManyField as array of user IDs
  userIDs_whose_services_is_in_progress: z.array(z.number()).optional(), // ManyToManyField as array of user IDs
  userIDs_whose_services_have_been_completed: z.array(z.number()).optional(), // ManyToManyField as array of user IDs
  created_at: z.coerce.date().optional(), // auto_now_add, handled by backend
  updated_at: z.coerce.date().optional(), // auto_now, handled by backend
});

export const servicesResponseSchema = z.object({
  count: z.number(),
  next: z.string().nullable(), // next can be null
  previous: z.string().nullable(), // previous can be null
  results: z.array(serviceSchema),
});

// ------------------------------------
// Product Schema
// ------------------------------------
export const productSchema = z.object({
  id: z.number().optional(), // Assuming id is automatically generated by Django
  organization: z
    .object({
      id: z.number().optional().nullable(),
      name: z.string().max(100),
    })
    .optional()
    .nullable(), // ForeignKey, represented by the organization ID
  preview: z.string().optional().nullable(), // Image URL or file
  img_url: z.string().url().optional().nullable(), // Image URL or file
  img_name: z.string().optional().nullable(), // Image URL or file
  name: z.string().max(200).nullable(), // Name is required but can be null in DB
  description: z.string().default("No description available"),
  price: z.string().refine((val) => !isNaN(parseFloat(val)), {
    message: "Price must be a valid number",
  }), // DecimalField, string to handle input
  rating: z.number().min(0).max(5).default(0), // Rating out of 5
  product: z.string().optional().nullable(), // File URL or input
  product_url: z.string().url().optional().nullable(), // File URL or input
  product_name: z.string().optional().nullable(), // File URL or input
  product_token: z.string().max(200).optional(), // Product access token
  userIDs_that_bought_this_product: z.array(z.number()).optional(), // ManyToManyField, array of user IDs
  subcategory: subcategorySchema.nullable(), // ForeignKey, represented by subcategory ID
  number_of_times_bought: z.number().optional().nullable(), // Default is 0
  digital: z.boolean().default(true), // Boolean flag for digital products
  category: categorySchema.optional().nullable(), // ForeignKey, represented by category ID
  created_at: z.coerce.date().optional(), // auto_now_add, handled by the backend
  last_updated_date: z.coerce.date().optional(), // auto_now, handled by the backend
  free: z.boolean().default(false), // Boolean flag for free products
});

export const productsResponseSchema = z.object({
  count: z.number(),
  next: z.string().nullable(), // next can be null
  previous: z.string().nullable(), // previous can be null
  results: z.array(productSchema),
});


// ----------------------------------------------
// Video Schema
// ----------------------------------------------
export const videoSchema = z.object({
  id: z.number().optional(), // Auto-generated by Django
  title: z.string().max(100), // Title of the video
  description: z.string(), // Description of the video
  price: z.string().refine((val) => !isNaN(parseFloat(val)), {
    message: "Price must be a valid number",
  }), // DecimalField, parsed as string for input handling
  video: z.string().optional().nullable(), // Video file URL
  video_url: z.string().url().optional().nullable(), // Video file URL
  video_name: z.string().optional().nullable(), // Video file URL
  thumbnail: z.string().optional().nullable(), // Thumbnail image URL
  img_url: z.string().url().optional().nullable(), // Thumbnail image URL
  img_name: z.string().optional().nullable(), // Thumbnail image URL
  organization: z
    .object({
      id: z.number().optional().nullable(),
      name: z.string().max(100),
    })
    .optional()
    .nullable(), // ForeignKey to Organization model, represented by organization ID
  category: categorySchema, // ForeignKey to Category model, nullable
  subcategory: subcategorySchema, // ForeignKey to SubCategory model, nullable
  video_token: z.string().optional(), // Token used for video access
  userIDs_that_bought_this_video: z.array(z.number()).optional(), // ManyToManyField as array of user IDs
  number_of_times_bought: z.number().optional().nullable(), // Integer field, default is 0
  created_at: z.coerce.date().optional(), // auto_now_add, handled by backend
  updated_at: z.coerce.date().optional(), // auto_now, handled by backend
  free: z.boolean().optional(), // Boolean indicating if the video is free
});

export const videosResponseSchema = z.object({
  count: z.number(),
  next: z.string().nullable(), // next can be null
  previous: z.string().nullable(), // previous can be null
  results: z.array(videoSchema),
});
