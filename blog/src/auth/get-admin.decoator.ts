// import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// import { Admin } from "./admin.entity";

// // export const GetUser = createParamDecorator((data, req):Admin =>{
// //     return req.admin;
// // });
// export const GetUser = createParamDecorator((data, ctx: ExecutionContext): Admin => {
//     const req = ctx.switchToHttp().getRequest();
//     return req.admin;

// });
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);