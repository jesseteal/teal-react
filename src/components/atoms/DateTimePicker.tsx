import moment, { Moment } from 'moment';
import { DateTimePicker as MuiDateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import type { DateTimePickerProps as MuiDateTimePickerProps } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { FULL_DATETIME } from '../../utils/date.js';

type DateTimeValue = string | Date | Moment | null | undefined;

export interface DateTimePickerProps extends Omit<
  MuiDateTimePickerProps,
  'onChange' | 'value'
> {
  clearable?: () => void;
  error?: boolean;
  fullWidth?: boolean;
  helperText?: string | null;
  onChange?: (value: string | null, date: Moment | null) => void;
  outputFormat?: string;
  required?: boolean;
  value?: DateTimeValue;
}

const toMoment = (value: DateTimeValue) => {
  if (!value) {
    return null;
  }

  const date = moment.isMoment(value) ? value : moment(value);
  return date.isValid() ? date : null;
};

export default function DateTimePicker({
  clearable,
  error,
  fullWidth = true,
  helperText,
  onChange,
  outputFormat = FULL_DATETIME,
  required,
  slotProps,
  value,
  ...pickerProps
}: DateTimePickerProps) {
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
      <MuiDateTimePicker
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
