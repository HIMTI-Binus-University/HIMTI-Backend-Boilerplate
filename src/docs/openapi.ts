import {
   OpenAPIRegistry,
   OpenApiGeneratorV3,
} from '@asteasolutions/zod-to-openapi';
import { registerHealthDocs } from '@/docs/healthDocs.js';
import { registerMemberDocs } from '@/features/members/memberDocs.js';
import { registerRoleDocs } from '@/features/roles/roleDocs.js';

const registry = new OpenAPIRegistry();

registerHealthDocs(registry);
registerRoleDocs(registry);
registerMemberDocs(registry);

export const generateOpenApiDocument = () => {
   const generator = new OpenApiGeneratorV3(registry.definitions);

   return generator.generateDocument({
      openapi: '3.0.0',
      info: {
         title: 'Root Team Member List API',
         version: '1.0.0',
         description: 'API documentation for the Root Team member list demo.',
      },
      servers: [
         {
            url: '/',
            description: 'Current docs host',
         },
         {
            url: `http://localhost:${process.env.PORT || 3000}`,
            description: 'Local development',
         },
      ],
   });
};
