import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import * as components from '../index';

const {
  FileUploadButton,
  Icon,
  Input,
  Loading,
  MaxBox,
  PageContent,
  PageHeader,
  PageTabs,
  RawForm,
  SimpleCard,
  SimpleCardActions,
  SimpleConfirm,
  SimpleDeleteConfirm,
  SimpleDialog,
  SimpleDrawer,
  SimpleForm,
  SimpleGrid,
  SimpleList,
  SimpleModal,
  SimpleSearch,
  SimpleTable,
  SimpleTabs,
  Typo,
} = components;

describe('components index', () => {
  it('exports the component surface', () => {
    expect(Icon.Add).toBeDefined();
    expect(Input).toEqual(expect.any(Function));
    expect(SimpleCard).toEqual(expect.any(Function));
    expect(SimpleTable).toEqual(expect.any(Function));
  });
});

describe('atoms and molecules', () => {
  it('renders Typo helpers, Loading, and MaxBox content', () => {
    render(
      <>
        {Typo.body('Body copy')}
        <Loading />
        <MaxBox>Max content</MaxBox>
      </>,
    );

    expect(screen.getByText('Body copy')).toBeInTheDocument();
    expect(screen.getByText('Max content')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders Input text, select, number, and boolean variants', () => {
    const setValues = jest.fn();
    const values = { name: 'Ada', plan: 'team', seats: 3, active: 1 };

    render(
      <>
        <Input
          field={{ name: 'name', label: 'Name' }}
          values={values}
          errors={{}}
          setValues={setValues}
        />
        <Input
          field={{
            name: 'plan',
            label: 'Plan',
            options: [{ value: 'team', label: 'Team' }],
          }}
          values={values}
          errors={{}}
          setValues={setValues}
        />
        <Input
          field={{ name: 'seats', label: 'Seats', number: true }}
          values={values}
          errors={{}}
          setValues={setValues}
        />
        <Input
          field={{ name: 'active', label: 'Active', bool: true }}
          values={values}
          errors={{}}
          setValues={setValues}
        />
      </>,
    );

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Grace' },
    });
    fireEvent.click(screen.getByLabelText('Active'));

    expect(setValues).toHaveBeenCalledWith({ name: 'Grace' });
    expect(setValues).toHaveBeenCalledWith({ active: null });
  });

  it('renders card actions and file upload trigger', () => {
    const onClick = jest.fn();

    render(
      <>
        <SimpleCardActions
          actionsLeft={[{ icon: <Icon.Add />, label: 'Create', onClick }]}
        />
        <FileUploadButton />
      </>,
    );

    fireEvent.click(screen.getByText('Create'));

    expect(onClick).toHaveBeenCalled();
    expect(screen.getByRole('button', { name: '' })).toBeInTheDocument();
  });
});

describe('organisms', () => {
  it('renders page wrappers and tabs', () => {
    const onTabSelect = jest.fn();

    render(
      <>
        <PageHeader title="Dashboard" />
        <PageTabs
          tabs={['One', 'Two']}
          tabIndex={0}
          onTabSelect={onTabSelect}
        />
        <PageContent header={{ title: 'Content' }}>
          <div>Main body</div>
        </PageContent>
      </>,
    );

    fireEvent.click(screen.getByRole('tab', { name: 'Two' }));

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByText('Main body')).toBeInTheDocument();
    expect(onTabSelect).toHaveBeenCalledWith(1);
  });

  it('renders SimpleCard, SimpleGrid, SimpleList, and SimpleTabs', () => {
    render(
      <SimpleCard header="Card title" subheader="Card subtitle">
        <SimpleGrid
          items={[
            { content: <div>Grid item</div>, size: 6 },
            { content: null, size: 6 },
          ]}
        />
        <SimpleList items={[{ icon: <Icon.User />, label: 'Profile' }]} />
        <SimpleTabs
          tabs={[
            { label: 'Details', content: <div>Details content</div> },
            {
              label: 'Admin',
              role: 'admin',
              content: <div>Admin content</div>,
            },
            { label: 'History', content: <div>History content</div> },
          ]}
        />
      </SimpleCard>,
    );

    expect(screen.getByText('Card title')).toBeInTheDocument();
    expect(screen.getByText('Grid item')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Details content')).toBeInTheDocument();
    expect(
      screen.queryByRole('tab', { name: 'Admin' }),
    ).not.toBeInTheDocument();
  });

  it('filters and renders SimpleTable rows', () => {
    const onFilter = jest.fn();
    const rows = Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      name: i === 0 ? 'Ada' : `Person ${i + 1}`,
      role: i === 0 ? 'Engineer' : 'Member',
    }));

    render(
      <SimpleTable
        header="People"
        data={rows}
        onFilter={onFilter}
        columns={[
          { header: 'Name', cell: 'name' },
          { header: 'Role', cell: 'role' },
        ]}
      />,
    );

    fireEvent.change(screen.getByPlaceholderText('Filter results'), {
      target: { value: 'ada' },
    });

    expect(screen.getByText('Ada')).toBeInTheDocument();
    expect(screen.getByText('Engineer')).toBeInTheDocument();
    expect(screen.getByText('1-10 of 12')).toBeInTheDocument();
    expect(onFilter).toHaveBeenCalledWith('ada');
  });

  it('renders RawForm and SimpleForm fields', () => {
    const onChange = jest.fn();
    const save = jest.fn();

    render(
      <>
        <RawForm
          values={{ name: 'Ada' }}
          errors={{}}
          onChange={onChange}
          fields={[{ name: 'name', label: 'Name' }]}
        />
        <SimpleForm
          header="Profile form"
          model={{ email: 'ada@example.com' }}
          save={save}
          fields={[{ name: 'email', label: 'Email' }]}
        />
      </>,
    );

    expect(screen.getByDisplayValue('Ada')).toBeInTheDocument();
    expect(screen.getByText('Profile form')).toBeInTheDocument();
    expect(screen.getByDisplayValue('ada@example.com')).toBeInTheDocument();
  });

  it('renders search, confirm dialogs, modal, drawer, and dialog content', () => {
    const onFilter = jest.fn();
    const onAction = jest.fn();
    const onDelete = jest.fn();
    const onClose = jest.fn();

    render(
      <>
        <SimpleSearch onFilter={onFilter} />
        <SimpleConfirm onAction={onAction} onCancel={onClose} />
        <SimpleDeleteConfirm onDelete={onDelete} onCancel={onClose} />
        <SimpleDialog
          title="Dialog title"
          onClose={onClose}
          actionsRight={[{ label: 'Done', onClick: onAction }]}>
          Dialog body
        </SimpleDialog>
        <SimpleModal open onClose={onClose}>
          Modal body
        </SimpleModal>
        <SimpleDrawer open onClose={onClose}>
          Drawer body
        </SimpleDrawer>
      </>,
    );

    fireEvent.change(screen.getByPlaceholderText('Filter results'), {
      target: { value: 'term' },
    });
    fireEvent.click(screen.getAllByText('Confirm')[1]);
    fireEvent.click(screen.getByText('Delete'));
    fireEvent.click(screen.getByText('Done'));

    expect(onFilter).toHaveBeenCalledWith('term');
    expect(onAction).toHaveBeenCalled();
    expect(onDelete).toHaveBeenCalled();
    expect(screen.getByText('Dialog body')).toBeInTheDocument();
    expect(screen.getByText('Modal body')).toBeInTheDocument();
    expect(screen.getByText('Drawer body')).toBeInTheDocument();
  });
});
