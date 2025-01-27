import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiOperationOptions, ApiResponse, ApiResponseOptions } from '@nestjs/swagger';
import { swaggerResponses } from '../constants/swagger-responses';
import { ReferenceObject, SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export function ApiSwaggerResponse(dataTransfer: { apiOperation: ApiOperationOptions, schema: SchemaObject & Partial<ReferenceObject> }) {
  const { apiOperation, schema } = dataTransfer;
  console.log(apiOperation)
  console.log(schema)
  return applyDecorators(
        ApiOperation(apiOperation),
        ApiResponse({ ...swaggerResponses.ok, schema }),
        ApiResponse(swaggerResponses.badRequest),
        ApiResponse(swaggerResponses.internalError),
  );
}
