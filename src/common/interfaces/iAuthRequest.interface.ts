import { Request } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
export interface IAthRequest extends Request {
  user: UserEntity;
}
