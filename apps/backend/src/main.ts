import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';

declare const module: any;

async function bootstrap() {

  const base64Credentials = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (base64Credentials) {
    const decodedCredentials = Buffer.from(base64Credentials, 'base64').toString('utf8');
    fs.writeFileSync('/tmp/google-credentials.json', decodedCredentials);
    process.env.GOOGLE_APPLICATION_CREDENTIALS = '/tmp/google-credentials.json';
  }
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000', 'https://abctravelplanner-8a6f6247b848.herokuapp.com'], 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  const port = process.env.PORT || 4000; // Default to 4000 if PORT is not set
  await app.listen(port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();