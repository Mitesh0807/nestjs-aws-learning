import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserDocument } from '@app/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({ usernameField: 'email' });
  }

  async validate(username: string, password: string): Promise<UserDocument> {
    try {
      console.log(username, password, " Local strategy");
      return await this.userService.validateUser(username, password);
    } catch (error) {
      console.log(error, " Local strategy error");
      throw new UnauthorizedException(' Invalid credentials');
    }
  }
}
