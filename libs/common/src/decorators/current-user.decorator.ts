import { UserDocument } from "@app/common";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

function getCurrentUserByContext(
  context: ExecutionContext
): UserDocument {
  console.log(" getCurrentUserByContext");
  const request = context.switchToHttp().getRequest();
  return request.user
}

export const CurrentUser = createParamDecorator((data, context: ExecutionContext) => getCurrentUserByContext(context))

