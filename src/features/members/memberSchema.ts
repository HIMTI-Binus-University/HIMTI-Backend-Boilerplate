import { z } from 'zod';

export const CreateMemberSchema = z.object({
   name: z.string().trim().min(1, 'Member name is required'),
   email: z
      .string()
      .trim()
      .min(1, 'Email is required')
      .email('Invalid email address'),
   generation: z.coerce.number().int('Generation must be a number'),
   roleId: z.coerce.number().int().positive(),
});

export const UpdateMemberSchema = CreateMemberSchema.partial()
   .extend({
      roleId: z.coerce.number().int().positive().optional(),
   })
   .refine(
      (data) => Object.keys(data).length > 0,
      'At least one field must be provided',
   );

export const MemberParamsSchema = z.object({
   id: z.coerce.number().int().positive('Member id must be a positive number'),
});
