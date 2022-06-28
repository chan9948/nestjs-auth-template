import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR, APP_PIPE, RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getEnvPath } from './common/helpers/env.helper';
import { TypeOrmConfigService } from './common/services/typeorm.service';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { ApiModule } from './modules/api/api.module';
import { AuthModule } from './modules/auth/auth.module';
import { TestModule } from './modules/test/test.module';
import { UserModule } from './modules/user/user.module';

const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    ApiModule,
    UserModule,
    AuthModule,
    TestModule,
    RouterModule.register([
      {
        path: 'api',
        module: ApiModule,
        children: [
          { path: 'user', module: UserModule },
          { path: 'auth', module: AuthModule },
        ],
      },
      { path: 'test', module: TestModule, children: [] },
    ]),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true }),
    },
  ],
})
export class AppModule {}
