import { z } from 'zod';


/**
 * Payment Status tuple
 * @type {['Pending', 'Completed', 'Failed']}
 */
export const paymentStatusEnum = ['Pending', 'Completed', 'Failed'];

export const ordersSchema = z.object({
  id: z.number().optional(), // Assuming id is automatically generated by Django
  organization: z.number().optional().nullable(),  // ForeignKey, represented by ID
  customer: z.number(),                            // ForeignKey, represented by ID
  services: z.array(z.number()).optional(),        // ManyToManyField, array of service IDs
  products: z.array(z.number()).optional(),        // ManyToManyField, array of product IDs
  videos: z.array(z.number()).optional(),          // ManyToManyField, array of video IDs
  amount: z.string().refine(val => !isNaN(parseFloat(val)), {
    message: 'Amount must be a valid number',
  }), // DecimalField, should be a valid number (string for handling inputs)
  status: z.enum(paymentStatusEnum).default('Pending'), // Choices for payment status
  reference: z.string().max(100).optional().nullable(),
  created_at: z.date().optional(),                 // auto_now_add, handled by the backend
  service_delivered: z.boolean().default(false),
  last_updated_date: z.date().optional(),          // auto_now, handled by the backend
});

export const ordersArraySchema = z.array(ordersSchema)