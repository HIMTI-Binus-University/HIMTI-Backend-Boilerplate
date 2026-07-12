import { Request, Response } from 'express';
import {
   CreateMemberSchema,
   MemberParamsSchema,
   UpdateMemberSchema,
} from './memberSchema.js';
import { memberService } from './memberService.js';

export const getMembers = async (_req: Request, res: Response) => {
   const result = await memberService.getMembers();
   res.status(200).json({ msg: 'success', data: result });
};

export const getMemberById = async (req: Request, res: Response) => {
   const { id } = MemberParamsSchema.parse(req.params);
   const result = await memberService.getMemberById(id);

   if (!result) {
      return res.status(404).json({ msg: 'Member not found' });
   }

   res.status(200).json({ msg: 'success', data: result });
};

export const createMember = async (req: Request, res: Response) => {
   const validation = CreateMemberSchema.safeParse(req.body);

   if (!validation.success) {
      return res.status(400).json({ errors: validation.error.format() });
   }

   const result = await memberService.createMember(validation.data);

   res.status(201).json({ msg: 'success', data: result });
};

export const updateMember = async (req: Request, res: Response) => {
   const { id } = MemberParamsSchema.parse(req.params);
   const validation = UpdateMemberSchema.safeParse(req.body);

   if (!validation.success) {
      return res.status(400).json({ errors: validation.error.format() });
   }

   const result = await memberService.updateMember(validation.data, id);

   res.status(200).json({ msg: 'success', data: result });
};

export const deleteMember = async (req: Request, res: Response) => {
   const { id } = MemberParamsSchema.parse(req.params);
   const result = await memberService.deleteMember(id);

   res.status(200).json({ msg: 'success', data: result });
};
