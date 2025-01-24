import { ApiResponseOptions } from '@nestjs/swagger';

import { ApiProperty } from '@nestjs/swagger';

export class ValidateFileResponseDto {
  @ApiProperty({
    type: 'boolean',
    example: false,
    description: 'Indicates if the process was successful.',
  })
  processStatus: boolean;
}

export const swaggerResponses = {
  validateFile: {
    description: 'Successful operation. The response includes the expected data according to the parameters provided in the request.',
  },
  badRequest: {
    status: 400,
    description: 'Bad Request - Invalid parameters.',
  } as ApiResponseOptions,
  internalError: {
    status: 500,
    description: 'Internal Server Error.',
  } as ApiResponseOptions,
};
