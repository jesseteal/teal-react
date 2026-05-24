import validate from 'validate.js';

type FormValues = Record<string, any>;
type ValidationErrorMap = Record<string, any>;
type FieldValidator = {
  required?: boolean;
  email?: boolean;
  confirm?: boolean;
  format?: string | RegExp;
  message?: string;
  custom?: (values: FormValues) => any;
};
type FieldDefinition = {
  name: string;
  label?: string;
  validate?: FieldValidator;
};
type ValidationConstraints = Record<string, any>;
type ValidationSchema = Record<string, ValidationConstraints>;

/**
 * Builds the validate.js constraints for a single field definition.
 */
const fieldConstraints = (field: FieldDefinition): ValidationConstraints => {
  const rules = field.validate;
  const label = field.label || field.name;

  if (!rules) {
    return {};
  }

  const constraints: ValidationConstraints = {};

  if (rules.required) {
    constraints.presence = {
      allowEmpty: false,
      message: rules.message || `${label} is required.`,
    };
  }

  if (rules.email) {
    constraints.email = { message: label + 'is not valid. ' };
  } else if (rules.confirm) {
    constraints.equality = 'password';
  }

  if (rules.format) {
    constraints.format = {
      pattern: rules.format,
      flags: 'i',
      message: rules.message || `${label} is not formatted properly`,
    };
  }

  return constraints;
};

/**
 * Converts form field metadata into a validate.js schema object.
 */
const validationSchema = (fields: FieldDefinition[]): ValidationSchema => {
  const schema: ValidationSchema = {};

  for (const field of fields) {
    schema[field.name] = fieldConstraints(field);
  }

  return schema;
};

/**
 * Runs validate.js constraints, then applies custom validators for fields that
 * do not already have schema errors.
 */
export const validate_fields = (
  values: FormValues,
  fields: FieldDefinition[],
) => {
  const errors = validate(values, validationSchema(fields), {
    fullMessages: false,
  }) as ValidationErrorMap | undefined;
  let validationErrors = errors;

  for (const field of fields) {
    const customValidator = field.validate?.custom;

    if (customValidator && !validationErrors?.[field.name]) {
      const errorMessage = customValidator(values);

      if (errorMessage) {
        validationErrors = validationErrors || {};
        validationErrors[field.name] = errorMessage;
      }
    }
  }

  if (validationErrors && Object.keys(validationErrors).length) {
    return validationErrors;
  }
};
