import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserDTO } from './auth.service';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService, configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          return req.cookies['access_token'];
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET')!,
    });
  }

  async validate(payload: UserDTO): Promise<UserDTO> {
    if (await this.userService.findBy(payload.username)) {
      return payload;
    } else {
      throw new UnauthorizedException('Invalid token');
    }
  }
}