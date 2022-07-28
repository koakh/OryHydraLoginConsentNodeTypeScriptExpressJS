import axios from 'axios';
import express, { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { i18n, identityServerConfig } from '../config';
import { MessageResponse } from '../types';
import { getValidationErrors } from '../utils';

// Sets up csrf protection
const router = express.Router()

// TODO:
// This allows you to reuse the validator
// const isPasswordEqual: CustomValidator = (newPassword, newPasswordConfirmation) => {
//   if (newPassword != newPasswordConfirmation) {
//     return Promise.reject('Passwords don\'t match');
//   }
// };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.get('/', (_req: Request, res: Response, _next: NextFunction) => {

  // If authentication can't be skipped we MUST show the login UI.
  res.render('change-password', {
    message: 'Change password stub',
    subMessage: 'work in progress'
  })
})

// router.post('/register', [
//   // check('username', 'This username must me 3+ characters long')
//   //   .exists()
//   //   .isLength({ min: 3 }),
//   // check('email', 'Email is not valid')
//   //   .isEmail()
//   //   .normalizeEmail()

// ], (req: Request, res: Response, _next: NextFunction) => {
//   return res.status(422).jsonp(errors.array())
//   // // const errors = validationResult(req);
//   // if (!errors.isEmpty()) {
//   //   // return res.status(422).jsonp(errors.array())
//   //   const alert = errors.array()
//   //   res.render('register', {
//   //     alert
//   //   })
//   // }
// })

router.post('/',
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
      return res.render('change-password', { data: req.body, validationErrors: getValidationErrors(errors) });
    }

    try {
      const url = `${identityServerConfig.ccardIdentityServerUri}/api/citizens/change-password`;
      const response = await axios.post<MessageResponse>(url, {
        mode: 'activationCode', value: req.body.activationCode, oldPassword: req.body.oldPassword, newPassword: req.body.newPassword
      }, {
        headers: {
          'Authorization': `Bearer ${identityServerConfig.ccardIdentityServerApikey}`,
          'Content-Type': 'application/json',
        }
      })

      console.log(response);

      res.render('activation', {
        message: 'Activation code stub',
        subMessage: 'work in progress',
        // data: response.data,
      })
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
        return res.render('change-password', { data: req.body, error: (error.response.data as MessageResponse).message });
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error', error);
        return res.render('change-password', { data: req.body, error });
      }
    }

    // TODO: remove
    console.log(req.body);

    // User.create({
    //   username: req.body.username,
    //   password: req.body.password,
    // }).then(user => res.json(user));

    // TODO: show success page with message
    res.render('change-password', { data: req.body, error: 'Username / password is not correct' });
  },
);

export default router
