import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function swaggerInit(app: any) {
  const config = new DocumentBuilder()
    .setTitle('API Documentation Base Nest')
    .setDescription('Documentation about POST, PUT, PATCH, DELETE, GET requests of the Nest JS base project developed by the collaborator Jonathan Rubio of the Lions team.')
    .setVersion('1.0')
    .addTag('API')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}