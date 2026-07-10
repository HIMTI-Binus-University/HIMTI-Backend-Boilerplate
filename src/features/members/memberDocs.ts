import '@/docs/zodOpenApi.js';
import type { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';
import {
   errorResponseSchema,
   idParamSchema,
   validationErrorResponseSchema,
} from '@/docs/commonSchemas.js';

const tag = 'Members';

const roleSummarySchema = z
   .object({
      id: z.number(),
      name: z.string(),
      description: z.string().nullable(),
      createdAt: z.string().datetime(),
      updatedAt: z.string().datetime(),
   })
   .nullable();

const memberSchema = z.object({
   id: z.number(),
   name: z.string(),
   email: z.string().email(),
   generation: z.number(),
   roleId: z.number().nullable(),
   role: roleSummarySchema.optional(),
   createdAt: z.string().datetime(),
   updatedAt: z.string().datetime(),
});

const createMemberRequestSchema = z.object({
   name: z.string().min(1),
   email: z.string().email(),
   generation: z.number().int(),
   roleId: z.number().int().positive().nullable().optional(),
});

const updateMemberRequestSchema = z.object({
   name: z.string().min(1).optional(),
   email: z.string().email().optional(),
   generation: z.number().int().optional(),
   roleId: z.number().int().positive().nullable().optional(),
});

const memberMutationResponseSchema = z.object({
   msg: z.literal('success'),
   data: memberSchema,
});

const memberListResponseSchema = z.object({
   msg: z.literal('success'),
   data: z.array(memberSchema),
});

export const registerMemberDocs = (registry: OpenAPIRegistry) => {
   const CreateMemberRequest = registry.register(
      'CreateMemberRequest',
      createMemberRequestSchema,
   );
   const UpdateMemberRequest = registry.register(
      'UpdateMemberRequest',
      updateMemberRequestSchema,
   );
   const MemberMutationResponse = registry.register(
      'MemberMutationResponse',
      memberMutationResponseSchema,
   );
   const MemberListResponse = registry.register(
      'MemberListResponse',
      memberListResponseSchema,
   );

   registry.registerPath({
      method: 'get',
      path: '/api/members',
      tags: [tag],
      summary: 'List members',
      responses: {
         200: {
            description: 'Member list.',
            content: {
               'application/json': {
                  schema: MemberListResponse,
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
      path: '/api/member/{id}',
      tags: [tag],
      summary: 'Get a member by ID',
      request: {
         params: idParamSchema,
      },
      responses: {
         200: {
            description: 'Member detail.',
            content: {
               'application/json': {
                  schema: MemberMutationResponse,
               },
            },
         },
         404: {
            description: 'Member not found.',
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
      path: '/api/member',
      tags: [tag],
      summary: 'Create a member',
      request: {
         body: {
            required: true,
            content: {
               'application/json': {
                  schema: CreateMemberRequest,
               },
            },
         },
      },
      responses: {
         201: {
            description: 'Member created.',
            content: {
               'application/json': {
                  schema: MemberMutationResponse,
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
         409: {
            description: 'Member email already exists.',
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
      path: '/api/member/{id}',
      tags: [tag],
      summary: 'Update a member',
      request: {
         params: idParamSchema,
         body: {
            required: true,
            content: {
               'application/json': {
                  schema: UpdateMemberRequest,
               },
            },
         },
      },
      responses: {
         200: {
            description: 'Member updated.',
            content: {
               'application/json': {
                  schema: MemberMutationResponse,
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
            description: 'Member or role not found.',
            content: {
               'application/json': {
                  schema: errorResponseSchema,
               },
            },
         },
         409: {
            description: 'Member email already exists.',
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
      path: '/api/member/{id}',
      tags: [tag],
      summary: 'Delete a member',
      request: {
         params: idParamSchema,
      },
      responses: {
         200: {
            description: 'Member deleted.',
            content: {
               'application/json': {
                  schema: MemberMutationResponse,
               },
            },
         },
         404: {
            description: 'Member not found.',
            content: {
               'application/json': {
                  schema: errorResponseSchema,
               },
            },
         },
      },
   });
};
