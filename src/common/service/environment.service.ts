// Libraries
import { Injectable } from '@nestjs/common';
import { resolve } from 'path';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

@Injectable()
export class EnvironmentService {
    #envPath: any;
    #nodeEnv: string | undefined = process.env.APP_ENV ? process.env.APP_ENV.trim() : 'local';
    #envConfig: { [key: string]: string };

    constructor() {
        switch (this.#nodeEnv) {
            case 'local':
              this.#envPath = resolve(process.cwd(), '.env.local');
              break;
            case 'qa':
              this.#envPath = resolve(process.cwd(), '.env');
              break;
            case 'production':
              this.#envPath = resolve(process.cwd(), '.env');
              break;
            case 'develop':
              this.#envPath = resolve(process.cwd(), '.env');
              break;
            case 'test':
              this.#envPath = resolve(process.cwd(), '.env');
              break;
            default:
              throw new Error('Specify the APP_ENV variable');
        }

        this.#envConfig = dotenv.parse(fs.readFileSync(this.#envPath));
    }

    get(key: string): string | undefined {
      return this.#envConfig[key];
    }
}
