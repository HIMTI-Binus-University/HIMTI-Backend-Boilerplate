import express from 'express';
import type { Router } from 'express';
import {
   getMembers,
   getMemberById,
   createMember,
   updateMember,
   deleteMember,
} from './memberController.js';

const router: Router = express.Router();

router.get('/members', getMembers);
router.get('/member/:id', getMemberById);
router.post('/member', createMember);
router.patch('/member/:id', updateMember);
router.delete('/member/:id', deleteMember);

export default router;
