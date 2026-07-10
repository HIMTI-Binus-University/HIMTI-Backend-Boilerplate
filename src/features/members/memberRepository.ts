import type { Member, Prisma } from '@prisma/client';
import { prisma } from '@/config/prisma.js';
import type { MemberWithRole } from './memberTypes.js';

const memberInclude = {
   role: true,
} satisfies Prisma.MemberInclude;

class MemberRepository {
   async create(
      data: Prisma.MemberUncheckedCreateInput,
   ): Promise<MemberWithRole> {
      return await prisma.member.create({
         data,
         include: memberInclude,
      });
   }

   async update(
      id: number,
      data: Prisma.MemberUncheckedUpdateInput,
   ): Promise<MemberWithRole> {
      return await prisma.member.update({
         where: { id },
         data,
         include: memberInclude,
      });
   }

   async findById(id: number): Promise<MemberWithRole | null> {
      return await prisma.member.findUnique({
         where: { id },
         include: memberInclude,
      });
   }

   async findByEmail(email: string): Promise<Member | null> {
      return await prisma.member.findUnique({
         where: { email },
      });
   }

   async findAll(): Promise<MemberWithRole[]> {
      return await prisma.member.findMany({
         include: memberInclude,
         orderBy: { id: 'asc' },
      });
   }

   async delete(id: number): Promise<Member> {
      return await prisma.member.delete({
         where: { id },
      });
   }
}

export const memberRepository = new MemberRepository();
