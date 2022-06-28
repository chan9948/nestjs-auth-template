import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class UserController {
  @UseGuards(AuthGuard('jwt'))
  @Get()
  get(): string {
    return 'user';
  }
}
