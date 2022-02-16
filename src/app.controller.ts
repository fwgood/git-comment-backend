import { Controller, Get, Request, Post, UseGuards, Render } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { GithubAuthGuard } from './auth/github-auth.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(GithubAuthGuard)
  @Get('auth/github')
  githubAuth(@Request() req) {
    return this.authService.githubLogin(req.user);
  }

  @UseGuards(GithubAuthGuard)
  @Get('auth/github/callback')
  @Render('index')
  githubAuthCallback(@Request() req) {
    return req.user;
  }
}
