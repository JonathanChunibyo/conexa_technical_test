import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiOperationOptions, ApiResponse } from '@nestjs/swagger';
import { swaggerResponses } from '../swagger-responses';
import { OperationObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

interface ApiSchema {
  summary: string;
  description: string;
  properties: Record<string, any>;
  required: string[];
  statusCodes?: Record<number, { description: string }>;
};

export function createApiSchema(options: ApiSchema): Partial<OperationObject> {
  const { summary, description, properties, required, statusCodes = {} } = options;
  if(!statusCodes[200]) statusCodes[200] = swaggerResponses.validateFile;
  const responses = Object.entries(statusCodes).reduce((acc, [status, config]) => {
    acc[status] = {
      description: config.description,
      ...(status === '200' && {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties,
              required,
            },
          },
        },
      }),
    };
    return acc;
  }, {});

  return {
    summary,
    description,
    responses,
  };
}

export function ApiValidateFile(options: ApiSchema) {
  const schema: Partial<OperationObject> = createApiSchema(options);
  return applyDecorators(
        ApiOperation(schema),
        ApiResponse(swaggerResponses.validateFile),
        ApiResponse(swaggerResponses.badRequest),
        ApiResponse(swaggerResponses.internalError),
  );
}
