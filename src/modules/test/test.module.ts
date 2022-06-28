import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/common/entities/user.entity';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { TestController } from './test.controller';
import { TestService } from './test.service';

@Module({
  imports: [UserModule],
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}
