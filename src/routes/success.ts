import express, { NextFunction, Request, Response } from 'express';
import { i18n } from '../config';

const router = express.Router();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.get('/', (_req: Request, res: Response, _next: NextFunction) => {
  res.render('success', {
    message: i18n.messages.activateLoginSuccessTitle,
    subMessage: i18n.messages.activateLoginSuccessMessage,
  });
});

export default router;
