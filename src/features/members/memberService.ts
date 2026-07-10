import type { Member, Prisma } from '@prisma/client';
import { AppError } from '@/utils/appError.js';
import { roleRepository } from '@/features/roles/roleRepository.js';
import { memberRepository } from './memberRepository.js';
import type {
   CreateMemberRequest,
   GetMemberQuery,
   MemberWithRole,
   UpdateMemberRequest,
} from './memberTypes.js';

class MemberService {
   async getMembers(_params: GetMemberQuery): Promise<MemberWithRole[]> {
      return await memberRepository.findAll();
   }

   async getMemberById(id: number): Promise<MemberWithRole | null> {
      return await memberRepository.findById(id);
   }

   async createMember(payload: CreateMemberRequest): Promise<MemberWithRole> {
      const existingMember = await memberRepository.findByEmail(payload.email);

      if (existingMember) {
         throw new AppError('Member email already exists', 409);
      }

      if (payload.roleId !== undefined && payload.roleId !== null) {
         const role = await roleRepository.findById(payload.roleId);

         if (!role) {
            throw new AppError('Role not found', 404);
         }
      }

      const data: Prisma.MemberUncheckedCreateInput = {
         name: payload.name,
         email: payload.email,
         generation: payload.generation,
         roleId: payload.roleId,
      };

      return await memberRepository.create(data);
   }

   async updateMember(
      payload: UpdateMemberRequest,
      id: number,
   ): Promise<MemberWithRole> {
      const member = await memberRepository.findById(id);

      if (!member) {
         throw new AppError('Member not found', 404);
      }

      if (payload.email) {
         const existingMember = await memberRepository.findByEmail(
            payload.email,
         );

         if (existingMember && existingMember.id !== id) {
            throw new AppError('Member email already exists', 409);
         }
      }

      if (payload.roleId !== undefined && payload.roleId !== null) {
         const role = await roleRepository.findById(payload.roleId);

         if (!role) {
            throw new AppError('Role not found', 404);
         }
      }

      const data: Prisma.MemberUncheckedUpdateInput = {
         name: payload.name,
         email: payload.email,
         generation: payload.generation,
         roleId: payload.roleId,
      };

      return await memberRepository.update(id, data);
   }

   async deleteMember(id: number): Promise<Member> {
      const member = await memberRepository.findById(id);

      if (!member) {
         throw new AppError('Member not found', 404);
      }

      return await memberRepository.delete(id);
   }
}

export const memberService = new MemberService();
