import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import docsRoutes from '@/docs/docsRoutes.js';
import routes from '@/routes/routes.js';
import { prisma } from '@/config/prisma.js';
import { globalErrorHandler } from '@/middleware/errorMiddleware.js';

const app = express();
const port = process.env.PORT || 3000;
const shouldEnableApiDocs = process.env.ENABLE_API_DOCS === 'true';

app.use(express.json());
app.use(
   cors({
      origin: [
         'http://localhost:3000',
         'http://localhost:8000',
         'http://localhost:5173',
      ],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
   }),
);

if (shouldEnableApiDocs) {
   app.use('/api', docsRoutes);
}
app.use('/api', routes);
app.use(globalErrorHandler);

const startServer = async () => {
   try {
      await prisma.$connect();

      app.listen(port, () => {
         console.log(`Server is running at http://localhost:${port}`);
      });
   } catch (error) {
      console.error('Failed to start server', error);
      process.exit(1);
   }
};

startServer();
