import express from 'express';
import type { Router } from 'express';
import {
   getRoles,
   getRoleById,
   createRole,
   updateRole,
   deleteRole,
} from './roleController.js';

const router: Router = express.Router();

router.get('/roles', getRoles);
router.get('/role/:id', getRoleById);
router.post('/role', createRole);
router.patch('/role/:id', updateRole);
router.delete('/role/:id', deleteRole);

export default router;
