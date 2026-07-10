import express from 'express';
import type { Request, Response, Router } from 'express';
import memberRoutes from '@/features/members/memberRoutes.js';
import roleRoutes from '@/features/roles/roleRoutes.js';

const router: Router = express.Router();

router.get('/health', (_req: Request, res: Response) => {
   res.status(200).json({
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
   });
});

router.use('/', roleRoutes);
router.use('/', memberRoutes);

export default router;
