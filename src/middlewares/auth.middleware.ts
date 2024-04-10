// import {RequestHandler} from "express";
// import {RoleEnum} from "./role";
//
// export function authRequired(roles?: RoleEnum[]): RequestHandler {
//     return async (req: Request, res, next) => {
//         try {
//
//             // todo: check if header has token
//
//             // const authorization = req.header("Authorization");
//             // if(!authorization) {
//             //     console.log("authorize");
//             //     return ResponseUtil.unauthorized(res, 'no_authorization');
//             // }
//             //
//             // const split = authorization.split(" ");
//             // if(split.length !== 2 || split[0] !== 'Bearer' || !split[1]) {
//             //     return ResponseUtil.unauthorized(res, 'invalid_authorization');
//             // }
//
//
//             // todo : decode the token to see if it's valid
//             // const token = split[1].trim();
//             // if(!JwtUtil.isTokenValid(token)) {
//             //     return ResponseUtil.badRequest(res, 'token_invalid');
//             // }
//
//             // todo : check if a user has the token
//             // const user = await UserService.fetchByToken(token);
//             // if(!user) {
//             //     console.log(`your token is invalid: [${token.trim()}]`);
//             //     return ResponseUtil.userTokenNotFound(res);
//             // }
//
//             // todo : check if the token expired
//
//             // todo : check the role forbidden if not
//
//
//
//
//         } catch (e) {
//             console.error(e)
//         }
//
//     }
//
// }