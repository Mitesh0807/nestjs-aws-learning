import { UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export class JwtAuthGuard extends AuthGuard('jwt') {
  //
  // constructor() {
  //   super();
  // }

  // handleRequest(err, user, info) {
  //   // You can throw an exception based on either "info" or "err" arguments
  //   if (err || !user) {
  //     console.log(err, user, info, " error")
  //     throw err || new UnauthorizedException();
  //   }
  //   return user;
  // }
  // canActivate(context: any) {
  //   const request = context.switchToHttp().getRequest();
  //   // console.log(request, " request")
  //   const token = request?.cookies?.Authentication || request?.Authentication || request?.headers?.Authentication;
  //   // console.log(token, " token")
  //   if (!token) {
  //     return false
  //   }
  //   //verify token 
  //
  //   // console.log(user, " user")
  //   // Add your custom authentication logic here
  //   // for example, call super.logIn(request) to establish a session.
  //   return super.canActivate(context);
  // }
}
