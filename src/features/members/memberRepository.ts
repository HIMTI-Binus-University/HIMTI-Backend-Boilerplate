import type { Member, Prisma } from '@prisma/client';
import { prisma } from '@/config/prisma.js';
import type { MemberWithRole } from './memberTypes.js';

class MemberRepository {
   async create(data: Prisma.MemberCreateInput): Promise<MemberWithRole> {
      return await prisma.member.create({
         data,
         include: { role: true },
      });
   }

   async update(
      id: number,
      data: Prisma.MemberUpdateInput,
   ): Promise<MemberWithRole> {
      return await prisma.member.update({
         where: { id },
         data,
         include: { role: true },
      });
   }

   async findById(id: number): Promise<MemberWithRole | null> {
      return await prisma.member.findUnique({
         where: { id },
         include: { role: true },
      });
   }

   async findByEmail(email: string): Promise<Member | null> {
      return await prisma.member.findUnique({
         where: { email },
      });
   }

   async findAll(): Promise<MemberWithRole[]> {
      return await prisma.member.findMany({
         include: { role: true },
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
