import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';


export function verifyToken(req: Request, res: Response, next: NextFunction) {
  let token = req.headers['authorization'];
  const tokenCookie = req.headers.cookie?.split('=')[1];
  if (!token && !tokenCookie) {
    return res.status(403).send({ message: 'No token provided!' });
  }
  if (!token) {
    token = tokenCookie
  }
  jwt.verify(
    token!,
    process.env.SECRET_KEY! || 'secret',
    (err: VerifyErrors | null, decoded: any | undefined) => {
      if (err) {
        console.log(err);
        res.status(401).send({ message: 'Unauthorized!' });
        return;
      }
      req.userId = decoded?._id;
      next();
    },
  );
}
