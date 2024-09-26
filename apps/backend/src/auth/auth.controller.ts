import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Post, Body, InternalServerErrorException } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('UpdateEmail')
  async updateEmail(@Body() body: { email: string; user_id: string }) {
    try {
      const result = await this.authService.updateEmail(
        body.email,
        body.user_id,
      );
      return result;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Post('ChangePassword')
  async changePassword(@Body() body: { password: string; user_id: string }) {
    try {
      const result = await this.authService.changePassword(
        body.password,
        body.user_id,
      );
      return result;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Post('ChangeSharingMode')
  async changeSharingMode(
    @Body() body: { sharingMode: string; user_id: string },
  ) {
    try {
      const result = await this.authService.changeSharingMode(
        body.sharingMode,
        body.user_id,
      );
      return result;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Post('deleteAccount')
  async deleteUserAccount(@Body() body: { user_id: string }) {
    try {
      await this.authService.deleteAccount(body.user_id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
