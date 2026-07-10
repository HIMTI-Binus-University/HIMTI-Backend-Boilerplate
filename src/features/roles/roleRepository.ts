import type { Prisma, Role } from '@prisma/client';
import { prisma } from '@/config/prisma.js';

class RoleRepository {
   async create(data: Prisma.RoleCreateInput): Promise<Role> {
      return await prisma.role.create({ data });
   }

   async update(id: number, data: Prisma.RoleUpdateInput): Promise<Role> {
      return await prisma.role.update({
         where: { id },
         data,
      });
   }

   async findById(id: number): Promise<Role | null> {
      return await prisma.role.findUnique({
         where: { id },
      });
   }

   async findByName(name: string): Promise<Role | null> {
      return await prisma.role.findUnique({
         where: { name },
      });
   }

   async findAll(): Promise<Role[]> {
      return await prisma.role.findMany({
         orderBy: { id: 'asc' },
      });
   }

   async delete(id: number): Promise<Role> {
      return await prisma.role.delete({
         where: { id },
      });
   }

   async countMembers(roleId: number): Promise<number> {
      return await prisma.member.count({
         where: { roleId },
      });
   }
}

export const roleRepository = new RoleRepository();
