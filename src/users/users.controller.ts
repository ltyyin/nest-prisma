import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { User as UserModle } from '.prisma/client';

@Controller('users')
@ApiTags('用户模块')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('regist')
  @ApiOperation({ summary: '添加用户' })
  @ApiOkResponse({})
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: '获取全部的用户' })
  // 因为查询所有的用户，所以返回的是一个用户数组
  @ApiOkResponse({ type: [UserEntity] })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '获取一个用户' })
  @ApiOkResponse({ type: UserEntity })
  findOne(@Param('id') id: string): Promise<UserModle> {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '修改单个用户信息' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '修改单个用户' })
  remove(@Param('id') id: string): string {
    return this.usersService.remove(+id);
  }
}
