import axios from 'axios';
import express, { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { i18n, identityServerConfig } from '../config';
import { MessageResponse } from '../types';
import { getValidationErrors } from '../utils';
import url from 'url';

const router = express.Router();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.get('/', (req: Request, res: Response, _next: NextFunction) => {
  const query = url.parse(req.url, true).query;
  res.render('activation', { data: { activationCode: query?.code } });
});

router.post(
  '/',
  body('activationCode')
    .isLength({ min: 10, max: 10 })
    .withMessage(i18n.validationMessage.activationCode),
  body('oldPassword')
    .isLength({ min: 10, max: 10 })
    .withMessage(i18n.validationMessage.activationOldPasswordCode),
  body('newPassword')
    .isStrongPassword()
    .withMessage(i18n.validationMessage.password)
    .custom((value, { req }) => {
      if (value === req.body.oldPassword) {
        throw new Error('New password must be different from old password');
      }
      // Indicates the success of this synchronous custom validator
      return true;
    }),
  body('newPasswordConfirmation')
    .isStrongPassword()
    .withMessage(i18n.validationMessage.password)
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error('Password confirmation does not match password');
      }
      // Indicates the success of this synchronous custom validator
      return true;
    }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, _next: NextFunction) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    // debug errors
    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });
      // const validationErrors = getValidationErrors(errors);
      return res.render('activation', {
        data: req.body,
        validationErrors: getValidationErrors(errors),
      });
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await axios.post<MessageResponse>(
        `${identityServerConfig.ccardIdentityServerUri}/api/citizens/change-password`,
        {
          mode: 'activationCode',
          value: req.body.activationCode,
          oldPassword: req.body.oldPassword,
          newPassword: req.body.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${identityServerConfig.ccardIdentityServerApikey}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response);
      res.render('success', {
        message: i18n.messages.activateLoginSuccessTitle,
        subMessage: i18n.messages.activateLoginSuccessMessage,
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
        return res.render('activation', {
          data: req.body,
          error: (error.response.data as MessageResponse).message,
        });
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error', error);
        return res.render('activation', { data: req.body, error });
      }
    }
  }
);

export default router;
