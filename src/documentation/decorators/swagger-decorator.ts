import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiOperationOptions, ApiResponse } from '@nestjs/swagger';
import { swaggerResponses } from '../swagger-responses';

export function ApiValidateFile(request: ApiOperationOptions) {
  return applyDecorators(
        ApiOperation(request),
        ApiResponse(swaggerResponses.validateFile),
        ApiResponse(swaggerResponses.badRequest),
        ApiResponse(swaggerResponses.internalError),
  );
}
