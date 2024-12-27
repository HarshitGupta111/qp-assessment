import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { BasicStrategy as Strategy } from 'passport-http';
import { Role } from 'src/utils/enum/role.enum';
import { ExceptionMessage } from '../constant/message.constant';

@Injectable()
export class BasicAuthStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super();
  }
  async validate(
    username: string,
    password: string,
  ): Promise<{ role: string }> {
    if (username === 'admin' && password === 'admin') {
      return { role: Role.ADMIN };
    }
    if (username === 'user' && password === 'user') {
      return { role: Role.USER };
    }
    throw new UnauthorizedException(ExceptionMessage.InvalidCred);
  }
}
