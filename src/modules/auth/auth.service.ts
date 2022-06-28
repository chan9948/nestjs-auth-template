import { Injectable } from '@nestjs/common';
import { JwtDto } from 'src/common/dtos/auth/jwt.dto';
import { UserEntity } from 'src/common/entities/user.entity';
import { encryptBySalt } from 'src/common/helpers/auth.helper';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { PayloadDto } from 'src/common/dtos/auth/payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async validateUser(
    username: string,
    password: string,
  ): Promise<UserEntity> {
    const user = await this.userService.findUser({
      where: { username: username },
    });
    const hash = encryptBySalt(password, user?.passwordSalt ?? '');
    if (!user || hash !== user?.passwordHash) return null;
    return user;
  }

  public generateJwt(user: UserEntity): JwtDto {
    const { id, username, name } = user;
    const payload = { id, username, name };
    return new JwtDto(this.jwtService.sign(payload));
  }
}
