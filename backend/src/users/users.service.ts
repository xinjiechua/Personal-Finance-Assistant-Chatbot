import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { NotFoundError } from 'rxjs';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async createUser(
    email: string,
    username: string,
    password: string,
  ): Promise<User> {
    const userExist = await this.prisma.user.findFirst({ where: { email: email } });
    if (userExist) {
      throw new ConflictException(`User already Registered`);
    }

    return this.prisma.user.create({
      data: {
        email: email,
        username: username,
        password: password,
      },
    });
  }

  async getUser(userId: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async login(loginData: { email: string; password: string }): Promise<User> {

    const user = await this.prisma.user.findFirst({ where: { email: loginData.email } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.password !== loginData.password) {
      throw new NotFoundException('Invalid credentials');
    }

    return user;
  }
}