import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// 토큰에서 유저 정보 추출하는 커스텀 데코레이터
export const GetUser = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  return req.user;
});
