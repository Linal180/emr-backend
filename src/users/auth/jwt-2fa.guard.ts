import { ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";
import { UsersService } from "../services/users.service";

@Injectable()
export class Jwt2FAGuard extends AuthGuard('jwt') {
  constructor(private usersService: UsersService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    if (!ctx.req.headers.authorization) {
      return false;
    }
    const user = await this.validateToken(ctx.req.headers.authorization);
    ctx.user = user
    const { isTwoFactorEnabled } = user || {}
    return isTwoFactorEnabled;
  }

  async validateToken(auth: string) {
    if (auth.split(' ')[0] !== 'Bearer') {
      throw new HttpException('Invalid Authorization Token - No Token Provided in Headers', HttpStatus.UNAUTHORIZED);
    }
    const token = auth.split(' ')[1];
    try {
      const { user } = await this.usersService.verify2FaToken(token);
      return user
    } catch (err) {

      throw new HttpException({
        status: HttpStatus.UNAUTHORIZED,
        error: 'Invalid Authorization Token - Expired or Invalid',
        message: 'Token Invalid'
      }, HttpStatus.UNAUTHORIZED);
    }
  }
}