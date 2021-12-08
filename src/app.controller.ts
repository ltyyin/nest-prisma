import { User, Prisma } from '.prisma/client';
import { Body, Controller, Get, Redirect, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get()
  fetchUser(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
}
