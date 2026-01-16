import { Body, Controller, Get, Post, HttpStatus } from '@nestjs/common';
import { Public } from 'src/decorators';
import { UsersService } from './users.service';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { AccessTypes, IResponse, UsersOperation } from 'src/helper';
import type { UserDetails } from 'src/helper';
import { ResponseUtil } from 'src/interceptors/response-interceptor';
import { UserProfileDetailsModel } from './interface/users.interface';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Public(AccessTypes.PUBLIC)
  @Post('register')
  async register(@Body() body: any) {
    const data = await this.usersService.register(body);
    console.log('Registered User:', data);
    return ResponseUtil.success(
      data,
      UsersOperation.REGISTER,
      HttpStatus.OK
    );
  }


  @Get('/detail')
  async getUserProfileDetails(
    @CurrentUser() user: UserDetails
  ): Promise<IResponse<any>> {
    console.log('Current User:', user);
    return ResponseUtil.success(
      user,
      UsersOperation.FETCHED,
      HttpStatus.OK
    );
  }
}

