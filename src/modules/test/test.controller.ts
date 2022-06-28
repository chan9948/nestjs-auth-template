import { Controller, Get } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Controller()
export class TestController {
  constructor(private readonly userSerivce: UserService) {}

  @Get()
  get(): string {
    return 'test';
  }

  @Get('gu')
  getUser(): any {
    return this.userSerivce.createUser({
      username: 'un',
      name: 'n',
      password: 'pw',
    });
  }
}
