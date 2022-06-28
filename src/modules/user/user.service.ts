import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/common/dtos/user/createUser.dto';
import { UserEntity } from 'src/common/entities/user.entity';
import { encryptBySalt, generateSalt } from 'src/common/helpers/auth.helper';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  public async findUser(
    filter: FindOneOptions<UserEntity>,
  ): Promise<UserEntity> {
    return await this.userRepo.findOne(filter);
  }

  public async createUser(dto: CreateUserDto): Promise<UserEntity> {
    if (await this.findUser({ where: { username: dto.username } })) {
      throw new ConflictException('username already exists');
    }
    const salt = generateSalt();
    const hash = encryptBySalt(dto.password, salt);
    const user = this.userRepo.create({
      name: dto.name,
      username: dto.username,
      passwordSalt: salt,
      passwordHash: hash,
    });
    return await user.save();
  }
}
