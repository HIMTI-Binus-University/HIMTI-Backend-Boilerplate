import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
   await prisma.member.deleteMany();
   await prisma.role.deleteMany();

   const manager = await prisma.role.create({
      data: {
         name: 'Manager',
         description: 'Leads and coordinates the team',
      },
   });

   const staff = await prisma.role.create({
      data: {
         name: 'Staff',
         description: 'Supports daily team operations',
      },
   });

   const coordinator = await prisma.role.create({
      data: {
         name: 'Coordinator',
         description: 'Coordinates tasks between divisions',
      },
   });

   await prisma.member.createMany({
      data: [
         {
            name: 'Daffa',
            email: 'daffa@example.com',
            generation: 2026,
            roleId: manager.id,
         },
         {
            name: 'Josh',
            email: 'josh@example.com',
            generation: 2025,
            roleId: staff.id,
         },
         {
            name: 'Jad',
            email: 'jad@example.com',
            generation: 2024,
            roleId: coordinator.id,
         },
      ],
   });

   console.log('Database seeded successfully');
};

main()
   .catch((error) => {
      console.error('Failed to seed database', error);
      process.exit(1);
   })
   .finally(async () => {
      await prisma.$disconnect();
   });
