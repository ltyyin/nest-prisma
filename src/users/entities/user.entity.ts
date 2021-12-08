import { User, UsersInfo } from '.prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserEntity implements User {
  @ApiProperty()
  id: number;
  @ApiProperty()
  phone: string;

  @ApiProperty()
  salt: string;

  // 属性设置成可不必填，还可以为null
  // @ApiProperty({ required: false, nullable: true })
  // 属性设置成默认值
  // @ApiProperty({ default: 18 })
  // age: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updateAt: Date;

  @ApiProperty({
    example: [
      { name: 'Evant', password: 'string', description: 'string', userID: '1' },
    ],
  })
  userInfo: UsersInfo[];
}
