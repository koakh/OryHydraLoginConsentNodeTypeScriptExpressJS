import { Result, ValidationError } from 'express-validator';
import { ValidationErrors } from './types';

export const getValidationErrors = (
  errors: Result<ValidationError>
): ValidationErrors => {
  const validationErrors: ValidationErrors = {};
  errors.array().forEach((e: ValidationError) => {
    validationErrors[e.param] = { value: e.value, msg: e.msg };
  });
  console.log(`errorsObj: [${JSON.stringify(validationErrors, undefined, 2)}]`);
  return validationErrors;
};
