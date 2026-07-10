import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import {
   CreateMemberSchema,
   DeleteMemberSchema,
   GetMemberSchema,
   MemberParamsSchema,
   UpdateMemberSchema,
} from './memberSchema.js';

export type CreateMemberRequest = z.infer<typeof CreateMemberSchema>;
export type UpdateMemberRequest = z.infer<typeof UpdateMemberSchema>;
export type DeleteMemberRequest = z.infer<typeof DeleteMemberSchema>;
export type GetMemberQuery = z.infer<typeof GetMemberSchema>;
export type MemberParamsRequest = z.infer<typeof MemberParamsSchema>;

export type MemberWithRole = Prisma.MemberGetPayload<{
   include: {
      role: true;
   };
}>;

export interface GetMemberResponse {
   data: MemberWithRole[];
}
