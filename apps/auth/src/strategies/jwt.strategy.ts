import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { TokenPayload } from '../interface/token-payload.interface';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    console.log("testing ")
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => {
          console.log("request", request?.cookies?.Authentication)
          return request?.cookies?.Authentication ||
            request?.Authentication ||
            request?.headers.Authentication;
        }
      ]),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate({ userId }: TokenPayload) {
    return this.usersService.findOne({ _id: userId });
  }
}
