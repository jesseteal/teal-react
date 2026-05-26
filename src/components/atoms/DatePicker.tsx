import moment, { Moment } from 'moment';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import type { DatePickerProps as MuiDatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DB_DATE } from '../../utils/date.js';

type DateValue = string | Date | Moment | null | undefined;

export interface DatePickerProps extends Omit<
  MuiDatePickerProps,
  'onChange' | 'value'
> {
  error?: boolean;
  fullWidth?: boolean;
  helperText?: string | null;
  onChange?: (value: string | null, date: Moment | null) => void;
  clearable?: () => void;
  outputFormat?: string;
  required?: boolean;
  value?: DateValue;
}

const toMoment = (value: DateValue) => {
  if (!value) {
    return null;
  }

  const date = moment.isMoment(value) ? value : moment(value);
  return date.isValid() ? date : null;
};

export default function DatePicker({
  error,
  fullWidth = true,
  helperText,
  onChange,
  outputFormat = DB_DATE,
  required,
  slotProps,
  value,
  clearable,
  ...pickerProps
}: DatePickerProps) {
  const textFieldSlotProps =
    typeof slotProps?.textField === 'function'
      ? slotProps.textField
      : {
          ...slotProps?.textField,
          error,
          fullWidth,
          helperText,
          required,
        };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <MuiDatePicker
        {...pickerProps}
        value={toMoment(value)}
        onChange={(date) => {
          onChange?.(date?.isValid() ? date.format(outputFormat) : null, date);
        }}
        slotProps={{
          ...slotProps,
          field: { clearable: !!clearable, onClear: () => clearable?.() },
          textField: textFieldSlotProps,
        }}
      />
    </LocalizationProvider>
  );
}
