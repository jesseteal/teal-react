import {
  Checkbox,
  InputAdornment,
  MenuItem,
  TextField,
  FormLabel,
  FormControl,
  FormControlLabel,
  FormHelperText,
} from '@mui/material';
import { find, get, isNumeric, zeroIsOk } from '../../utils/helpers.js';
import Icon from './Icon.js';
import { formatPhone } from '../../utils/format.js';
import DatePicker from './DatePicker.js';
import DateTimePicker from './DateTimePicker.js';

/*
usage:
  <Input
    autoFocus={true||false}
    field={FieldDef.name("").get()}
    disabled={(!values.id && !canCreate) || (!!values.id && !canUpdate)}
    values={local_values}
    errors={errors}
    setValues={data => {
      setValues(data);
      onChange(data);
    }}
    onEnter={onEnter}
    lookups={lookups}
  />
*/

const Input = (props: any) => {
  const {
    field,
    values,
    setValues,
    errors,
    onEnter,
    autoFocus,
    edit = true,
    disabled = false,
  } = props;
  const variant = edit ? 'outlined' : 'standard';

  const prepend = field.prepend
    ? {
        startAdornment: (
          <InputAdornment position="start">{field.prepend}</InputAdornment>
        ),
      }
    : null;
  const append = field.append
    ? {
        endAdornment: (
          <InputAdornment position="end">{field.append}</InputAdornment>
        ),
      }
    : null;
  // const options = field.lookup ? lookups.filter(l => l.type === field.lookup).map(l => ({ value:l.id, label:l.name, group: l.group })) : field.options;
  const selectedValue = zeroIsOk(get(values, field.name));
  const clear =
    field.clearable && selectedValue !== ''
      ? {
          endAdornment: (
            <InputAdornment
              style={{ cursor: 'pointer' }}
              position="end"
              onClick={() => field.clearable(null)}>
              <Icon.Clear />
            </InputAdornment>
          ),
        }
      : null;

  if (field.date) {
    return (
      <DatePicker
        autoFocus={autoFocus === true}
        disabled={disabled || field.disabled}
        required={edit && field.validate && field.validate.required}
        name={field.name}
        label={field.label}
        value={selectedValue}
        clearable={field.clearable}
        // variant={variant}
        readOnly={!!field.readOnly || !edit}
        className={field.className}
        // style={field.style}
        onChange={(formattedDate) => {
          setValues({ [field.name]: formattedDate });
        }}
        fullWidth={field.fullWidth ?? true}
        error={errors && !!errors[field.name]}
        helperText={(errors && errors[field.name]) || field.helperText}
      />
    );
  } else if (field.datetime) {
    return (
      <DateTimePicker
        autoFocus={autoFocus === true}
        disabled={disabled || field.disabled}
        required={edit && field.validate && field.validate.required}
        name={field.name}
        label={field.label}
        value={selectedValue}
        clearable={field.clearable}
        // variant={variant}
        readOnly={!!field.readOnly || !edit}
        className={field.className}
        // style={field.style}
        onChange={(formattedDate) => {
          setValues({ [field.name]: formattedDate });
        }}
        fullWidth={field.fullWidth ?? true}
        error={errors && !!errors[field.name]}
        helperText={(errors && errors[field.name]) || field.helperText}
      />
    );
  } else if (field.bool) {
    return (
      <>
        <FormControl component="fieldset">
          {field.legend && (
            <FormLabel component="legend">{field.legend}</FormLabel>
          )}
          <FormControlLabel
            control={
              <Checkbox
                color={edit ? 'primary' : 'default'}
                disabled={disabled || field.disabled}
                checked={!!get(values, field.name)}
                onChange={(e) =>
                  edit &&
                  setValues({ [field.name]: e.target.checked ? 1 : null })
                }
              />
            }
            label={field.label}
          />
          {field.boolExtra}
        </FormControl>
        {errors && !!errors[field.name] && (
          <FormHelperText error>{errors[field.name]}</FormHelperText>
        )}
      </>
    );
  }
  return (
    <TextField
      autoComplete="off"
      autoFocus={autoFocus === true}
      disabled={disabled || field.disabled}
      required={edit && field.validate && field.validate.required}
      select={!!field.foreignKey || !!field.options}
      name={field.name}
      label={field.label}
      value={selectedValue}
      variant={variant}
      className={field.className}
      style={field.style}
      onBlur={(e) => {
        if (field.phone) {
          setValues({ [field.name]: formatPhone(e.target.value) });
        }
        if (field.number) {
          if (e.target.value.trim() === '') {
            setValues({ [field.name]: '' });
          } else {
            setValues({ [field.name]: Number(e.target.value) });
          }
        }
      }}
      onChange={(e) => {
        if (
          field.number &&
          !isNumeric(e.target.value) &&
          e.target.value.trim() !== ''
        ) {
          return;
        }
        setValues({ [field.name]: e.target.value });
        if (field.options) {
          const t = find(field.options, { value: e.target.value });
          field.onChange && field.onChange(t);
        }
      }}
      type={field.password ? 'password' : 'text'}
      fullWidth={field.fullWidth ?? true}
      multiline={!!field.multiline}
      maxRows={field.multiline || 6}
      minRows={field.multiline || 1}
      error={errors && !!errors[field.name]}
      helperText={(errors && errors[field.name]) || field.helperText}
      onKeyDown={(ev) => {
        if (ev.key === 'Enter' && !field.multiline) {
          onEnter && onEnter();
          ev.preventDefault();
        }
      }}
      slotProps={{
        input: {
          ...(prepend || append || clear),
          readOnly: !!field.readOnly || !edit,
        },
      }}>
      {field.options &&
        field.options.map((o: any, i: number) => {
          return (
            <MenuItem key={`menuitem${i}`} value={o.value}>
              {o.label}
            </MenuItem>
          );
        })}
    </TextField>
  );
};

export default Input;
