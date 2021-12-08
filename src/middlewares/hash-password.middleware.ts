import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { addSalt, encript } from 'src/utils/Encryption';

@Injectable()
export class HashPasswordMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    let userPassword = req.body['usersInfo']['password'];
    const salt = addSalt();

    if (userPassword) {
      req.body['salt'] = salt;
      req.body['usersInfo']['password'] = encript(userPassword, salt);
    }
    next();
  }
}
