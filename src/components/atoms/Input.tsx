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
import { find, get, isNumeric, zeroIsOk } from '../../utils/helpers';
import Icon from './Icon';
import { formatPhone } from '../../utils/format';

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
          startAdornment: (
            <InputAdornment
              className="clickable"
              position="start"
              onClick={() => field.clearable(null)}>
              <Icon.Clear />
            </InputAdornment>
          ),
        }
      : null;

  // if (field.date) {
  //   return (
  //     <LocalizationProvider dateAdapter={AdapterMoment}>
  //       {edit ? (
  //         <DatePicker
  //           // disableToolbar
  //           // fullWidth
  //           // inputVariant={variant}
  //           // variant="inline"
  //           // autoOk={true}
  //           disabled={disabled || field.disabled}
  //           label={field.label}
  //           minDate={DateUtil.toDate(field.minDate)}
  //           maxDate={DateUtil.toDate(field.maxDate) || undefined}
  //           // required={edit && field.validate && field.validate.required}
  //           // error={errors && !!errors[field.name]}
  //           // helperText={(errors && errors[field.name]) || field.helperText}
  //           // InputProps={{
  //           //   ...(prepend || append || clear),
  //           //   readOnly: !!field.readOnly || !edit,
  //           // }}
  //           renderInput={(params: TextFieldProps) => (
  //             <TextField
  //             {...params}
  //             error={errors && !!errors[field.name]}
  //             required={edit && field.validate && field.validate.required}
  //             // helperText={params?.inputProps?.placeholder}
  //             helperText={(errors && errors[field.name]) || field.helperText}
  //             />
  //           )}
  //           // format="MM/dd/yyyy"
  //           // value={Utils.date.format(Utils.resolve(values, field.name)) || null}
  //           value={values[field.name]}
  //           onChange={(date, formatted) => {
  //             setValues({
  //               [field.name]: DateUtil.format(date, DateUtil.DB_DATE),
  //             });
  //           }}
  //           // onKeyPress={(ev) => {
  //           //   if (ev.key === 'Enter') {
  //           //     onEnter && onEnter()
  //           //     ev.preventDefault()
  //           //   }
  //           // }}
  //         />
  //       ) : (
  //         <TextField
  //           fullWidth
  //           label={field.label}
  //           value={DateUtil.format(_.get(values, field.name)) || null}
  //           InputProps={{ readOnly: true }}
  //           variant={variant}
  //         />
  //       )}
  //     </LocalizationProvider>
  //   );
  //   // } else if (field.time) {
  //   //   // deprecated?
  //   //   return (
  //   //     <MuiPickersUtilsProvider utils={DateFnsUtils}>
  //   //       <KeyboardTimePicker
  //   //         fullWidth
  //   //         disabled={disabled || field.disabled}
  //   //         margin="normal"
  //   //         label={field.label}
  //   //         variant={variant}
  //   //         value={Utils.resolve(values, field.name)}
  //   //         onKeyPress={(ev) => {
  //   //           if (ev.key === 'Enter') {
  //   //             onEnter && onEnter()
  //   //             ev.preventDefault()
  //   //           }
  //   //         }}
  //   //         onChange={(date, formatted) => {
  //   //           setValues({ [field.name]: date ? date.format('HH:mm') : null })
  //   //         }}
  //   //       />
  //   //     </MuiPickersUtilsProvider>
  //   //   )
  // } else
  if (field.bool) {
    return (
      <>
        <FormControl component="fieldset" className="pt2">
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
