import { Injectable, Logger } from '@nestjs/common';
import { IResponse } from 'src/interface/response.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

const logger = new Logger('users.service');

@Injectable()
export class UsersService {
  private response: IResponse;
  constructor(private readonly prisma: PrismaService) {}

  public async create(createUserDto: CreateUserDto) {
    return this.prisma.user
      .findUnique({
        where: {
          phone: createUserDto.phone,
        },
        select: {
          phone: true,
        },
      })
      .then((res) => {
        if (res) {
          this.response = {
            code: 1,
            msg: '该用户已注册',
          };

          throw this.response;
        }
      })
      .then(async () => {
        try {
          await this.prisma.user.create({
            data: {
              phone: createUserDto.phone,
              salt: createUserDto.salt,
              UsersInfo: {
                create: [
                  {
                    name: createUserDto.usersInfo.name,
                    password: createUserDto.usersInfo.password,
                    description: createUserDto.usersInfo.description,
                  },
                ],
              },
            },
          });

          this.response = {
            code: 0,
            msg: '用户注册成功',
          };

          return this.response;
        } catch (err) {
          this.response = {
            code: 2,
            msg: `用户注册失败,详情:${err}`,
          };
          throw this.response;
        }
      })
      .catch((err) => {
        logger.log(`注册用户失败:${createUserDto.phone}${err.msg}`);
        return this.response;
      });
  }

  findAll() {
    // 查询所有的用户
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        UsersInfo: true,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
