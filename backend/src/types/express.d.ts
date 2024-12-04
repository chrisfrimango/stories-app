import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

export interface UserPayload {
  userId: string;
}

export interface AuthenticatedRequest<
  P = ParamsDictionary,
  ResBody = Record<string, unknown>,
  ReqBody = Record<string, unknown>,
  ReqQuery = ParsedQs
> extends Request<P, ResBody, ReqBody, ReqQuery> {
  user: JwtPayload & UserPayload;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload & UserPayload;
    }
  }
}
