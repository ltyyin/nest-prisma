import { Prisma, UsersInfo } from '.prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto implements Prisma.UserCreateInput {
  @ApiProperty({ example: '13528912523', description: '用户手机号码' })
  @MinLength(11)
  phone: string;

  // @ApiProperty({ description: '用户名称', example: 'Lisa' })
  // @IsNotEmpty({ message: '请输入用户名称' })
  // name: string;

  // @ApiPropertyOptional() 它可以顶替@ApiProperty({ required: false })
  // @ApiProperty({ description: '使用crypto随机生成的盐' })
  salt: string;

  // @ApiProperty({ required: false, description: '用户年龄', example: 18 })
  // @Min(16, { message: '年龄不能低于16' })
  // age?: string;

  @ApiProperty({
    description: '关系型数据库user-info',
    example: {
      name: 'Evan',
      password: '123456',
      description: 'hello',
    },
  })
  usersInfo?: {
    name: string;
    password: string;
    description?: string;
    userID?: number;
  };
}
