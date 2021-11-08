import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('Shop documentation')
    .setDescription(' Welcome! This is the official documentation for Shop')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('documentation', app, document);
}