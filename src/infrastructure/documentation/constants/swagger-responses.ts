// libraries
import { ApiResponseOptions } from '@nestjs/swagger';

export const swaggerResponses = {
  ok: {
    status: 200,
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
