import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
            TypeOrmModule.forRootAsync({
              useFactory: () => ({
                type: 'mysql',
                host: 'localhost',
                port: 3312,
                username: 'root',
                password: 'root',
                database: 'base-nest',
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                synchronize: true,
              }),
            }),
          ],
})
export class DatabaseModule {}
