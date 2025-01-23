import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
            TypeOrmModule.forRootAsync({
              useFactory: () => ({
                type: 'mariadb',
                host: 'localhost',
                port: 3312,
                username: 'root',
                password: 'root',
                database: 'base-nest',
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                // ! ALWAYS FALSE IN PROD
                synchronize: true,
                autoLoadEntities: true,
                logging: false
              }),
            }),
          ],
})
export class DatabaseModule {}
