import type { Role } from '@prisma/client';
import { z } from 'zod';
import {
   CreateRoleSchema,
   GetRoleSchema,
   RoleParamsSchema,
   UpdateRoleSchema,
} from './roleSchema.js';

export type CreateRoleRequest = z.infer<typeof CreateRoleSchema>;
export type UpdateRoleRequest = z.infer<typeof UpdateRoleSchema>;
export type GetRoleQuery = z.infer<typeof GetRoleSchema>;
export type RoleParamsRequest = z.infer<typeof RoleParamsSchema>;

export interface GetRoleResponse {
   data: Role[];
}
