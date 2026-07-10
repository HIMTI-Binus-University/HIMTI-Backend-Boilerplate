import type { Prisma, Role } from '@prisma/client';
import { AppError } from '@/utils/appError.js';
import { roleRepository } from './roleRepository.js';
import type {
   CreateRoleRequest,
   GetRoleQuery,
   UpdateRoleRequest,
} from './roleTypes.js';

class RoleService {
   async getRoles(_params: GetRoleQuery): Promise<Role[]> {
      return await roleRepository.findAll();
   }

   async getRoleById(id: number): Promise<Role | null> {
      return await roleRepository.findById(id);
   }

   async createRole(payload: CreateRoleRequest): Promise<Role> {
      const existingRole = await roleRepository.findByName(payload.name);

      if (existingRole) {
         throw new AppError('Role name already exists', 409);
      }

      const data: Prisma.RoleCreateInput = {
         name: payload.name,
         description: payload.description,
      };

      return await roleRepository.create(data);
   }

   async updateRole(payload: UpdateRoleRequest, id: number): Promise<Role> {
      const role = await roleRepository.findById(id);

      if (!role) {
         throw new AppError('Role not found', 404);
      }

      if (payload.name) {
         const existingRole = await roleRepository.findByName(payload.name);

         if (existingRole && existingRole.id !== id) {
            throw new AppError('Role name already exists', 409);
         }
      }

      const data: Prisma.RoleUpdateInput = {
         name: payload.name,
         description: payload.description,
      };

      return await roleRepository.update(id, data);
   }

   async deleteRole(id: number): Promise<Role> {
      const role = await roleRepository.findById(id);

      if (!role) {
         throw new AppError('Role not found', 404);
      }

      const memberCount = await roleRepository.countMembers(id);

      if (memberCount > 0) {
         throw new AppError(
            'Cannot delete role because it still has members',
            400,
         );
      }

      return await roleRepository.delete(id);
   }
}

export const roleService = new RoleService();
