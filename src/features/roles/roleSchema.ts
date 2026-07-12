import { z } from 'zod';

export const CreateRoleSchema = z.object({
   name: z.string().trim().min(1, 'Role name is required'),
   description: z.string().trim().optional().nullable(),
});

export const UpdateRoleSchema = CreateRoleSchema.partial().refine(
   (data) => Object.keys(data).length > 0,
   'At least one field must be provided',
);

export const GetRoleSchema = z.object({});

export const RoleParamsSchema = z.object({
   id: z.coerce.number().int().positive('Role id must be a positive number'),
});
