import Joi from 'joi';
import _ from 'lodash';

export const validateJoiObjectSchema = (schema: Joi.Schema, data: any, options: Joi.ValidationOptions = {}) => {
  const joiErrors = schema.validate(data, { abortEarly: false });
  console.log('ERRORDDDD validateJoiObjectSchema', joiErrors, data);
  const errors = {};

  joiErrors.error?.details?.forEach(item => {
    if (item.path && item.path?.length >= 0) {
      _.update(errors, item.path.join('.'), () => {
        return item?.message;
      });
    }
  });
  console.log('ERRORDDDD errorserrors', errors);

  return errors;
};
