import axios from 'axios';
import express, { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { i18n, identityServerConfig } from '../config';
import { MessageResponse } from '../types';
import { getValidationErrors } from '../utils';
import url from 'url';

const router = express.Router();
const view = 'change-password';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.get('/', (req: Request, res: Response, _next: NextFunction) => {
  const query = url.parse(req.url, true).query;
  res.render(view, { data: { activationCode: query?.code } });
});

router.post(
  '/',
  body('username')
    .isLength({ min: 9, max: 9 })
    .isNumeric()
    .withMessage(i18n.validationMessage.username),
  body('oldPassword')
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 0,
      minSymbols: 0,
    })
    .withMessage(i18n.validationMessage.password),
  body('newPassword')
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 0,
      minSymbols: 0,
    })
    .withMessage(i18n.validationMessage.password)
    .custom((value, { req }) => {
      if (value === req.body.oldPassword) {
        throw new Error(
          i18n.validationMessage.newPasswordMustBeDifferentFromOldPassword
        );
      }
      // Indicates the success of this synchronous custom validator
      return true;
    }),
  body('newPasswordConfirmation')
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 0,
      minSymbols: 0,
    })
    .withMessage(i18n.validationMessage.password)
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error(
          i18n.validationMessage.passwordConfirmationDoesNotMatchPassword
        );
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
      return res.render(view, {
        data: req.body,
        validationErrors: getValidationErrors(errors),
      });
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await axios.post<MessageResponse>(
        `${identityServerConfig.ccardIdentityServerUri}/api/citizens/change-password`,
        {
          mode: 'username',
          value: req.body.username,
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
        message: i18n.messages.changePasswordSuccessTitle,
        subMessage: i18n.messages.changePasswordSuccessMessage,
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
        return res.render(view, {
          data: req.body,
          error: (error.response.data as MessageResponse).message,
        });
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error', error);
        return res.render(view, { data: req.body, error });
      }
    }
  }
);

export default router;
