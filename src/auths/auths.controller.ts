import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthsService } from './auths.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { Public } from './decorator/metadata';

@Controller('auths')
export class AuthsController {
  constructor(private readonly authsService: AuthsService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @Public()
  // debug có user nhưng bên post ko nhận đc khi đã export và import rồi
  handleLogin(@Request() req) {
    return this.authsService.login(req.user);
  }

  @Post('register')
  @Public()
  Register(@Body() registerDTO: CreateAuthDto) {
    return this.authsService.handleRegister(registerDTO);
  }

  @Get('profiles')
  getProfile(@Request() req) {
    return req.user;
  }
}
