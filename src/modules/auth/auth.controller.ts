import { Body, Controller, Post, UseGuards, Req, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IResponse, UsersOperation } from 'src/helper';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ResponseUtil } from 'src/interceptors/response-interceptor';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    register(@Body() body: any) {
        return this.authService.register(body);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req): Promise<IResponse<{ accessToken: string }>> {
        console.log('Inside login controller with user:', req.user);
        const result = await this.authService.login(req.user); // eslint-disable-line @typescript-eslint/no-unsafe-member-access
        return ResponseUtil.success(result, UsersOperation.LOGIN, HttpStatus.OK);
    }


}
