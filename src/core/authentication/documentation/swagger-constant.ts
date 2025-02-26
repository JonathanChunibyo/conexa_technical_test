export const API_OPERATION_SWAGGER = {
  "validate-email": {
      summary: 'Validate Email Address',
      description: 'This endpoint checks if an email address is valid and available for use.',
      type: 'object',
      properties: {
          status: {
              type: 'integer',
              example: 200
          },
          data: {
              type: 'object',
              properties: {
                  isValid: { type: 'boolean', example: true },
                  message: { type: 'string', example: 'The email is valid and available.' }
              },
              required: ['isValid', 'message']
          },
          error: {
              type: ['string', 'null'],
              example: null
          }
      },
      required: ['status', 'data', 'error']
  }
};