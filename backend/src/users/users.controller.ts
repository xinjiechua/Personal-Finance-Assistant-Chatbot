import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('signup')
  async createUser(
    @Body() userData: { email: string; username: string; password: string },
  ) {
    return this.userService.createUser(
      userData.email,
      userData.username,
      userData.password,
    );
  }

  @Post('login')
  async loginUser(@Body() loginData: { email: string; password: string }) {
    return this.userService.login(loginData);
  }
}
