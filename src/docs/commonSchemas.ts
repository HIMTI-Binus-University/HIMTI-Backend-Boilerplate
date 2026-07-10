import '@/docs/zodOpenApi.js';
import { z } from 'zod';

export const idParamSchema = z.object({
   id: z.coerce.number().int().positive(),
});

export const errorResponseSchema = z.object({
   status: z.string().optional(),
   msg: z.string().optional(),
});

export const validationErrorResponseSchema = z.object({
   errors: z.unknown(),
});

export const successResponseSchema = z.object({
   msg: z.literal('success'),
});
