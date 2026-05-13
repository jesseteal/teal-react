import Typography from '@mui/material/Typography';

// variants: h1 - h6, subtitle1, subtitle2, body1, body2, button, caption, overline
// colors: primary, secondary, textPrimary, textSecondary, error
// attr: gutterBottom
//
// Box colors:
//  primary.main, secondary.main, error.main, warning.main, info.main, success.main,
//  text.primary, text.secondary, text.disabled

const typo = ({ text, ...props }: any) => (
  <Typography {...props}>{text}</Typography>
);

const body = (text: string, other?: any) =>
  typo({ text, color: 'textPrimary', variant: 'body1', ...other });

const body2 = (text: string, other?: any) =>
  typo({ text, color: 'textSecondary', variant: 'body2', ...other });

const subtitle = (text: string, other?: any) =>
  typo({ text, color: 'textPrimary', variant: 'subtitle1', ...other });

const error = (text: string, other?: any) =>
  typo({ text, color: 'error', variant: 'body1', ...other });

const label = (text: string, other?: any) =>
  typo({ text, color: 'textSecondary', variant: 'subtitle1', ...other });

const header = (text: string, other?: any) =>
  typo({ text, color: 'textSecondary', variant: 'overline', ...other });

const subheader = (text: string, other?: any) =>
  typo({ text, color: 'textSecondary', variant: 'body2', ...other });

const h2 = (text: string, other?: any) =>
  typo({ text, color: 'textSecondary', variant: 'h2', ...other });

const h3 = (text: string, other?: any) =>
  typo({ text, color: 'textSecondary', variant: 'h3', ...other });

const h4 = (text: string, other?: any) =>
  typo({ text, color: 'textSecondary', variant: 'h4', ...other });

const h5 = (text: string, other?: any) =>
  typo({ text, color: 'textSecondary', variant: 'h5', ...other });

const label_value_justified = (label: string, value: string) => (
  <div className="row">
    <div className="col_md">{header(label)}</div>
    <div className="col tr">{body(value)}</div>
  </div>
);

const label_value_stack = (label: string, value: string) => (
  <div>
    {header(label)}
    {body(value)}
  </div>
);

const Typo = {
  body,
  body2,
  subtitle,
  label,
  header,
  subheader,
  h2,
  h3,
  h4,
  h5,
  label_value_justified,
  label_value_stack,
  error,
  poopoo: () => (
    <>
      {header('header')}
      {subheader('subheader')}
      {body('body')}
      {body2('body2')}
      {label('label')}
      {error('error')}
      {h2('h2')}
      {h3('h3')}
      {h4('h4')}
      {h5('h5')}
      {label_value_stack('label/value', 'stack')}
      {label_value_justified('label/value', 'justified')}
    </>
  ),
};

export default Typo;
