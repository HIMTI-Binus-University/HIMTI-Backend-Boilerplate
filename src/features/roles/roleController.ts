import { Request, Response } from 'express';
import {
   CreateRoleSchema,
   DeleteRoleSchema,
   GetRoleSchema,
   RoleParamsSchema,
   UpdateRoleSchema,
} from './roleSchema.js';
import { roleService } from './roleService.js';

export const getRoles = async (req: Request, res: Response) => {
   const query = GetRoleSchema.parse(req.query);
   const result = await roleService.getRoles(query);
   res.status(200).json({ msg: 'success', data: result });
};

export const getRoleById = async (req: Request, res: Response) => {
   const { id } = RoleParamsSchema.parse(req.params);
   const result = await roleService.getRoleById(id);

   if (!result) {
      return res.status(404).json({ msg: 'Role not found' });
   }

   res.status(200).json({ msg: 'success', data: result });
};

export const createRole = async (req: Request, res: Response) => {
   const validation = CreateRoleSchema.safeParse(req.body);

   if (!validation.success) {
      return res.status(400).json({ errors: validation.error.format() });
   }

   const result = await roleService.createRole(validation.data);

   res.status(201).json({ msg: 'success', data: result });
};

export const updateRole = async (req: Request, res: Response) => {
   const { id } = RoleParamsSchema.parse(req.params);
   const validation = UpdateRoleSchema.safeParse(req.body);

   if (!validation.success) {
      return res.status(400).json({ errors: validation.error.format() });
   }

   const result = await roleService.updateRole(validation.data, id);

   res.status(200).json({ msg: 'success', data: result });
};

export const deleteRole = async (req: Request, res: Response) => {
   const { id } = RoleParamsSchema.parse(req.params);
   const validation = DeleteRoleSchema.safeParse(req.body ?? {});

   if (!validation.success) {
      return res.status(400).json({ errors: validation.error.format() });
   }

   const result = await roleService.deleteRole(id);

   res.status(200).json({ msg: 'success', data: result });
};
