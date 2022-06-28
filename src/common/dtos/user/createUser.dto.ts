import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @MinLength(1)
  @MaxLength(10)
  @IsString()
  @IsNotEmpty()
  public readonly name!: string;

  @MinLength(8)
  @MaxLength(20)
  @IsString()
  @IsNotEmpty()
  public readonly username!: string;

  @MinLength(8)
  @MaxLength(20)
  @IsString()
  @IsNotEmpty()
  public readonly password!: string;
}
