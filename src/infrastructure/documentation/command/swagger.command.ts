import { Injectable } from '@nestjs/common';
import { ApiOperationOptions } from '@nestjs/swagger';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { join } from 'path';

export function readApiValidateField(nameController: string, nameRoute: string) {
    const filePathRoot = join(__dirname, '../../../core', nameRoute, 'documentation');
    const [filePathApiOperation, filePathApiResponse] = [
      join(filePathRoot, 'api-operation.ts'),
      join(filePathRoot, 'api-response.ts')
    ]
    const apiOperation: ApiOperationOptions = require(filePathApiOperation)["API_OPERATION"][nameController];
    const schema: SchemaObject = require(filePathApiResponse)["API_RESPONSE"][nameController];
    return { apiOperation, schema };
  }
