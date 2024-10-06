import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as jwksRsa from 'jwks-rsa';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKeyProvider: jwksRsa.passportJwtSecret({
        cache: true, // Cacheia a chave pública para melhorar a performance
        rateLimit: true, 
        jwksRequestsPerMinute: 5, 
        jwksUri: `https://cognito-idp.us-west-2.amazonaws.com/us-west-2_E0XSOSvZi/.well-known/jwks.json`, // URL do JWKS para o User Pool
      }),
      algorithms: ['RS256'], 
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}