import Grid from '@mui/material/Grid';
import Typo from '../atoms/Typo';
import Input from '../atoms/Input';

/*
usage:
<RawForm
  onChange={modified => {}}
  onEnter={() => {}}
  errors={errors}
  values={values}
  fields={[
    FieldDef.name('name').get()
  ]}
/>
*/
const RawForm = (props: any) => {
  const { fields, values, errors, edit = true, useAutoFocus = false } = props;

  const column_grid = (col_array: any[]) => {
    return (
      <Grid container spacing={6}>
        {col_array.map((col, i) => {
          return (
            <Grid item xs={12} sm={col.column.size || 12} key={`col_grid_${i}`}>
              {field_grid(col.column.fields)}
            </Grid>
          );
        })}
      </Grid>
    );
  };

  const field_grid = (field_array: any[]) => {
    return (
      <Grid container spacing={3}>
        {field_array
          .filter(
            (f: any) => !!f.label || !!f.spacer || !!f.header || !!f.children,
          )
          .map((f: any, i: number) => {
            if (f.spacer) {
              return <Grid item xs={12} sm={f.spacer} key={`spacer${i}`} />;
            }
            if (f.children) {
              return (
                <Grid item xs={12} sm={f.size} key={`child${i}`}>
                  {f.children}
                </Grid>
              );
            }
            if (f.header) {
              return (
                <Grid item xs={12} sm={f.size} key={`header${i}`}>
                  {Typo.header(f.header)}
                </Grid>
              );
            }
            if (f.hide && f.hide(values)) {
              return <Grid item xs={12} sm={f.size || 12} key={f.name} />;
            }
            return (
              <Grid item xs={12} sm={f.size || 12} key={f.name}>
                <Input
                  autoFocus={useAutoFocus && i === 0 && !values.id}
                  edit={edit}
                  field={f}
                  values={values}
                  errors={errors}
                  setValues={props.onChange}
                  onEnter={props.onEnter}
                />
              </Grid>
            );
          })}
      </Grid>
    );
  };

  if (!fields) {
    return null;
  }
  // alt-view with columns
  if (!!fields[0].column) {
    return column_grid(fields);
  }
  return field_grid(fields);
};

export default RawForm;
