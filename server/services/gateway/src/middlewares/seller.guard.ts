import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable
} from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

@Injectable()
export class SellerGuard implements CanActivate {
  constructor() {}

  canActivate(context: ExecutionContext) {
    const ctx: any = GqlExecutionContext.create(context).getContext();
    if (ctx.user && ctx.user.seller) {
      return true;
    }
    throw new HttpException("Unauthorized access", HttpStatus.UNAUTHORIZED);
  }
}
