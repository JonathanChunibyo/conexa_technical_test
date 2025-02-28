// libraries
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiOperationOptions, ApiResponse, ApiResponseOptions } from '@nestjs/swagger';
import { ReferenceObject, SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

// constants
import { swaggerResponses } from '../constants/swagger-responses';

export function ApiSwaggerResponse(dataTransfer: { apiOperation: ApiOperationOptions, schema: SchemaObject & Partial<ReferenceObject> }) {
  const { apiOperation, schema } = dataTransfer;
  return applyDecorators(
        ApiOperation(apiOperation),
        ApiResponse({ ...swaggerResponses.ok, schema }),
        ApiResponse(swaggerResponses.badRequest),
        ApiResponse(swaggerResponses.internalError),
  );
}
