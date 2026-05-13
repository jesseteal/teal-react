import validate from 'validate.js';

const validationSchema = (fields: any[]) => {
  // const schema = {
  //   city: {
  //     presence: { allowEmpty: false, message: 'is required' },
  //     length: {
  //       maximum: 10
  //     }
  //   }
  // };
  const schema: any = {};
  fields.forEach((f) => {
    const check: any = {};
    if (f.validate) {
      if (f.validate.required) {
        check['presence'] = {
          allowEmpty: false,
          message: f.validate.message || `${f.label} is required.`,
        };
      }
      if (f.validate.email) {
        check['email'] = { message: f.label + 'is not valid. ' };
        // } else if (f.validate.number) {
        //   if (f.validate.number === true) {
        //     check['numericality'] = { message: f.label + ' is not a number. ' };
        //   } else {
        //     check['numericality'] = f.validate.number;
        //   }
      } else if (f.validate.confirm) {
        check['equality'] = 'password';
      }
      if (f.validate.format) {
        check['format'] = {
          pattern: f.validate.format,
          flags: 'i',
          message: f.validate.message || `${f.label} is not formatted properly`,
        };
      }
      // if(f.validate.unique){
      //   check['unique'] = { message: 'is already in use.', field: f.name, table: Pluralize(f.validate.unique) };
      // }
    }
    schema[f.name] = check;
  });
  return schema;
};

export const validate_fields = (values: any[], fields: any) => {
  const errors = validate(values, validationSchema(fields), {
    fullMessages: false,
  });
  const custom_err = { ...errors };
  // console.log('Validate: errors', { errors })
  for (var field of fields) {
    // console.log({ field })
    if (field?.validate?.custom && !custom_err[field.name]) {
      const error_message = field.validate.custom(values);
      if (error_message) {
        custom_err[field.name] = error_message;
      }
    }
  }
  // console.log('Validate: values', values)
  if (Object.keys(custom_err).length) {
    return custom_err;
  }
};

const validationContainer = {
  validate: (values: any[], fields: any) => {
    return validate(values, validationSchema(fields));
  },
};

export default validationContainer;
