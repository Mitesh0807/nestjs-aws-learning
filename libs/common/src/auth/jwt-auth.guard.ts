import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { AUTH_SERVICE } from "../constant";
import { ClientProxy } from "@nestjs/microservices";
import { Reflector } from "@nestjs/core";
import { Observable, catchError, map, of, tap } from "rxjs";
import { UserDto } from "../dto";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy, private readonly reflector: Reflector) { }
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request?.cookies?.Authentication
    if (!token) {
      return false
    }
    return this.authClient.send<UserDto>('authenticate', { Authentication: token }).pipe(
      tap((res) => context.switchToHttp().getRequest().user = res),
      map(() => true),
      catchError((err) => {
        console.log(err, "at comman jwt guard")
        return of(false)
      })
    )
  }
}

