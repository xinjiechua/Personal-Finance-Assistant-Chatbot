import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { user } from '@prisma/client';
import { NotFoundError } from 'rxjs';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(
    email: string,
    username: string,
    password: string,
  ): Promise<user> {
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

  async getUser(userId: number) {
    return this.prisma.user.findFirst({ where: { id: userId } });
  }

    async login(loginData: { email: string; password: string }): Promise<user> {
        const userExist = await this.prisma.user.findFirst({ where: { email: loginData.email } });
        if (!userExist) {
            throw new NotFoundException('User Has Not Registered Yet')
        }
        if (userExist.password !== loginData.password) {
            throw new NotFoundException('Invalid Credentials');
        }
        return userExist;
  }
}
