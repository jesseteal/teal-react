import { validate_fields } from '../validate';

const fields = [
  {
    name: 'email',
    label: 'Email',
    validate: { required: true, email: true },
  },
  {
    name: 'code',
    label: 'Code',
    validate: {
      custom: (values: any) => (values.code === 'ok' ? null : 'Invalid code'),
    },
  },
];

describe('validate utils', () => {
  it('returns field errors for schema and custom validators', () => {
    expect(validate_fields({ email: '', code: 'bad' }, fields)).toEqual({
      email: ['Email is required.', 'Emailis not valid. '],
      code: 'Invalid code',
    });
  });

  it('returns undefined when values pass validation', () => {
    expect(
      validate_fields({ email: 'a@example.com', code: 'ok' }, fields),
    ).toBeUndefined();
  });
});
