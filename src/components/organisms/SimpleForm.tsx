import React from 'react';
import SimpleCard from './SimpleCard.js';
import RawForm from './RawForm.js';
// import { Utils } from '@jesseteal/teal-react'
import { validate_fields } from '../../utils/validate.js';
import { hasDiff } from '../../utils/helpers.js';
import Icon from '../atoms/Icon.js';

// import K from 'Constants'

/*
usage
<SimpleForm
  header="Header"
  subheader="Subheader"
  model={model}
  save={modified => {
    doSave({...modified, id: model.id}, !model.id).then(refetch);
    set_edit(null)
  }}
  cancel={() => set_edit(null)}
  fields={[
    FieldDef.name('name').label('Flight Date').required().get(6),
  ]}
/>
*/
const SimpleForm = (props: any) => {
  // console.log('[SimpleForm]', props.header)
  const {
    header,
    subheader,
    cancel,
    save,
    model,
    fields,
    editMode = true,
    ...rest
  } = props;
  const [modified, set_modified] = React.useState(props.modified || {});
  const [errors, set_errors] = React.useState({});
  const [edit, set_edit] = React.useState(editMode);
  const merged = { ...model, ...modified };
  const onSave = () => {
    let all_fields: any[] = [];
    // console.log('[SimpleForm] allfields preservied?', all_fields);
    if (!!fields[0].column) {
      for (var f of fields) {
        console.log({ f });
        all_fields = all_fields.concat(f.column.fields);
      }
    } else {
      all_fields = fields;
    }
    // console.log('[SimpleForm] all_fields', { fields, all_fields });
    const errors = validate_fields(merged, all_fields);
    // console.log({ errors });
    if (!!errors) {
      set_errors(errors);
      return; // no save if errors
    }
    save({ modified, merged });
    set_edit(editMode);
    set_errors({});
    if (props.resetOnSave) {
      set_modified({});
      set_errors({});
    }
  };
  const onChange = (data: any) => {
    let changes = { ...modified, ...data };
    set_modified(changes);
    // console.log('[SimpleForm]', { changes })
    props.onChange && props.onChange(changes);
  };

  const get_actions = () => {
    if (props.displayOnly) {
      return null;
    }
    if (props.actionsRight) {
      // allow full override
      return props.actionsRight;
    }
    const options = [];
    if (edit) {
      const SaveIcon = props.saveIcon || Icon.Save;
      const label = props.saveLabel || 'Save';
      options.push({
        icon: <SaveIcon />,
        label,
        onClick: onSave,
        disabled: () => !hasDiff(modified, {}),
      });
      if (editMode === false) {
        options.push({
          icon: <Icon.Cancel />,
          label: 'Cancel',
          onClick: () => {
            set_edit(false);
            set_modified({});
            set_errors({});
          },
        });
      }
    } else {
      options.push({
        icon: <Icon.Edit />,
        label: 'Edit',
        onClick: () => set_edit(true),
      });
    }
    return options;
  };

  const get_actions_left = () => {
    if (rest.onDelete) {
      return [
        {
          icon: <Icon.Delete />,
          label: 'Delete',
          onClick: () => rest.onDelete?.(),
        },
      ];
    }
  };

  return (
    <SimpleCard
      {...rest}
      header={header}
      subheader={subheader}
      headeraction={cancel ? { icon: <Icon.Close />, onClick: cancel } : null}
      actionsRight={get_actions()}
      actionsLeft={get_actions_left()}>
      <RawForm
        edit={edit}
        values={{ ...model, ...modified }}
        fields={fields}
        errors={errors}
        onChange={onChange}
        onEnter={onSave}
      />
    </SimpleCard>
  );
};

export default SimpleForm;
