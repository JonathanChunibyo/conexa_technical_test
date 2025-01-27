export const API_OPERATION_SWAGGER = {
    "create-user": {
        summary: 'Create a new user',
        description: 'This endpoint allows the creation of a new user in the system and returns the created user details.',
        type: 'object',
        properties: {
          status: {
            type: 'integer',
            example: 200,
          },
          data: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: { type: 'string', example: 'Juan Pére32z' },
                nickName: { type: 'string', example: 'jprez13323333' },
                email: { type: 'string', format: 'email', example: 'juan.ere4513z@exa2mple.com' },
                password: { type: 'string', example: 'securePass123' },
                id: { type: 'string', format: 'uuid', example: '04fdeccb-6d0f-4a65-87c1-e528e8012a62' },
                createdAt: { type: 'string', format: 'date-time', example: '2025-01-22T21:46:40.427Z' },
                updatedAt: { type: 'string', format: 'date-time', example: '2025-01-22T21:46:40.427Z' },
                isState: { type: 'boolean', example: true },
              },
              required: ['name', 'nickName', 'email', 'password', 'id', 'createdAt', 'updatedAt', 'isState'],
            },
          },
          error: {
            type: ['string', 'null'],
            example: null,
          },
        },
        required: ['status', 'data', 'error'],
    }      
}