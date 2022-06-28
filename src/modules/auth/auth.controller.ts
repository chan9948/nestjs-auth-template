import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/common/dtos/user/createUser.dto';
import { UserEntity } from 'src/common/entities/user.entity';
import { LoaclAuthGuard } from 'src/common/guards/localAuth.guard';
import { IAthRequest } from 'src/common/interfaces/iAuthRequest.interface';
import { IdType } from 'src/common/types/common.type';
import { UserService } from '../user/user.service';

@Controller()
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Get()
  get(): string {
    return 'auth';
  }

  @Post('signup')
  public async signup(@Body() dto: CreateUserDto): Promise<IdType> {
    const user = await this.userService.createUser(dto);
    return user.id;
  }

  @UseGuards(LoaclAuthGuard)
  @Post('signin')
  public async signin(@Req() request: IAthRequest): Promise<UserEntity> {
    return request.user;
  }
}
