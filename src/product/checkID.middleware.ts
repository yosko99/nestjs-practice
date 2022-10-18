import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class CheckIDMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const productID = req.params.id as string;
    if (isValidObjectId(productID)) {
      return next();
    }

    return res.status(404).send('Provided invalid product id');
  }
}
