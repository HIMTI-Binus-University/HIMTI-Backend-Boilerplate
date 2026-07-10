import '@/docs/zodOpenApi.js';
import type { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';
import {
   errorResponseSchema,
   idParamSchema,
   validationErrorResponseSchema,
} from '@/docs/commonSchemas.js';

const tag = 'Roles';

const roleSchema = z.object({
   id: z.number(),
   name: z.string(),
   description: z.string().nullable(),
   createdAt: z.string().datetime(),
   updatedAt: z.string().datetime(),
});

const createRoleRequestSchema = z.object({
   name: z.string().min(1),
   description: z.string().nullable().optional(),
});

const updateRoleRequestSchema = z.object({
   name: z.string().min(1).optional(),
   description: z.string().nullable().optional(),
});

const roleMutationResponseSchema = z.object({
   msg: z.literal('success'),
   data: roleSchema,
});

const roleListResponseSchema = z.object({
   msg: z.literal('success'),
   data: z.array(roleSchema),
});

export const registerRoleDocs = (registry: OpenAPIRegistry) => {
   const CreateRoleRequest = registry.register(
      'CreateRoleRequest',
      createRoleRequestSchema,
   );
   const UpdateRoleRequest = registry.register(
      'UpdateRoleRequest',
      updateRoleRequestSchema,
   );
   const RoleMutationResponse = registry.register(
      'RoleMutationResponse',
      roleMutationResponseSchema,
   );
   const RoleListResponse = registry.register(
      'RoleListResponse',
      roleListResponseSchema,
   );

   registry.registerPath({
      method: 'get',
      path: '/api/roles',
      tags: [tag],
      summary: 'List roles',
      responses: {
         200: {
            description: 'Role list.',
            content: {
               'application/json': {
                  schema: RoleListResponse,
               },
            },
         },
         500: {
            description: 'Unexpected server or database error.',
            content: {
               'application/json': {
                  schema: errorResponseSchema,
               },
            },
         },
      },
   });

   registry.registerPath({
      method: 'get',
      path: '/api/role/{id}',
      tags: [tag],
      summary: 'Get a role by ID',
      request: {
         params: idParamSchema,
      },
      responses: {
         200: {
            description: 'Role detail.',
            content: {
               'application/json': {
                  schema: RoleMutationResponse,
               },
            },
         },
         404: {
            description: 'Role not found.',
            content: {
               'application/json': {
                  schema: errorResponseSchema,
               },
            },
         },
      },
   });

   registry.registerPath({
      method: 'post',
      path: '/api/role',
      tags: [tag],
      summary: 'Create a role',
      request: {
         body: {
            required: true,
            content: {
               'application/json': {
                  schema: CreateRoleRequest,
               },
            },
         },
      },
      responses: {
         201: {
            description: 'Role created.',
            content: {
               'application/json': {
                  schema: RoleMutationResponse,
               },
            },
         },
         400: {
            description: 'Validation error.',
            content: {
               'application/json': {
                  schema: validationErrorResponseSchema,
               },
            },
         },
         409: {
            description: 'Role name already exists.',
            content: {
               'application/json': {
                  schema: errorResponseSchema,
               },
            },
         },
      },
   });

   registry.registerPath({
      method: 'patch',
      path: '/api/role/{id}',
      tags: [tag],
      summary: 'Update a role',
      request: {
         params: idParamSchema,
         body: {
            required: true,
            content: {
               'application/json': {
                  schema: UpdateRoleRequest,
               },
            },
         },
      },
      responses: {
         200: {
            description: 'Role updated.',
            content: {
               'application/json': {
                  schema: RoleMutationResponse,
               },
            },
         },
         400: {
            description: 'Validation error.',
            content: {
               'application/json': {
                  schema: validationErrorResponseSchema,
               },
            },
         },
         404: {
            description: 'Role not found.',
            content: {
               'application/json': {
                  schema: errorResponseSchema,
               },
            },
         },
      },
   });

   registry.registerPath({
      method: 'delete',
      path: '/api/role/{id}',
      tags: [tag],
      summary: 'Delete a role',
      request: {
         params: idParamSchema,
      },
      responses: {
         200: {
            description: 'Role deleted.',
            content: {
               'application/json': {
                  schema: RoleMutationResponse,
               },
            },
         },
         400: {
            description: 'Role still has members.',
            content: {
               'application/json': {
                  schema: errorResponseSchema,
               },
            },
         },
         404: {
            description: 'Role not found.',
            content: {
               'application/json': {
                  schema: errorResponseSchema,
               },
            },
         },
      },
   });
};
