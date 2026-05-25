import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Stack,
  Switch,
  Typography,
  MuiIcons,
} from '@jesseteal/teal-react/mui';
import {
  Icon,
  Input,
  MaxBox,
  PageContent,
  SimpleCard,
  SimpleConfirm,
  SimpleDeleteConfirm,
  SimpleDialog,
  SimpleForm,
  SimpleGrid,
  SimpleList,
  SimpleModal,
  SimpleSearch,
  SimpleTable,
  SimpleTabs,
  Typo,
} from '@jesseteal/teal-react';

const people = [
  { id: 1, name: 'Mara Chen', role: 'Designer', status: 'Active' },
  { id: 2, name: 'Noah Patel', role: 'Engineer', status: 'Active' },
  { id: 3, name: 'Iris Lane', role: 'Researcher', status: 'Paused' },
  { id: 4, name: 'Sam Rivera', role: 'Support', status: 'Active' },
  { id: 5, name: 'Sam Rivera', role: 'Support', status: 'Active' },
  { id: 6, name: 'Sam Rivera', role: 'Support', status: 'Active' },
  { id: 7, name: 'Sam Rivera', role: 'Support', status: 'Active' },
  { id: 8, name: 'Sam Rivera', role: 'Support', status: 'Active' },
  { id: 9, name: 'Sam Rivera', role: 'Support', status: 'Active' },
  { id: 10, name: 'Sam Rivera', role: 'Support', status: 'Active' },
  { id: 11, name: 'Sam Rivera', role: 'Support', status: 'Active' },
];

function IconTile({ children, name }: { children: ReactNode; name: string }) {
  return (
    <Box className="icon-tile">
      <Box className="icon-preview">{children}</Box>
      <Typography title={name} variant="caption">
        {name}
      </Typography>
    </Box>
  );
}

export default function App() {
  const [tabIndex, setTabIndex] = useState(0);
  const [filter, setFilter] = useState('');
  const [muiIconFilter, setMuiIconFilter] = useState('');
  const [overlay, setOverlay] = useState<
    'dialog' | 'confirm' | 'delete' | 'modal' | null
  >(null);
  const [values, setValues] = useState({
    active: 1,
    email: 'mara@example.com',
    plan: 'team',
    seats: 8,
  });

  const filteredPeople = useMemo(() => {
    const term = filter.toLowerCase();
    return people.filter((person) =>
      [person.name, person.role, person.status].some((value) =>
        value.toLowerCase().includes(term),
      ),
    );
  }, [filter]);

  const tealIconEntries = useMemo(
    () => Object.entries(Icon) as Array<[string, any]>,
    [],
  );
  const muiIconEntries = useMemo(() => {
    const tealIconComponents = new Set(Object.values(Icon));

    return (Object.entries(MuiIcons) as Array<[string, any]>)
      .filter(([name, Component]) => {
        return /^[A-Z]/.test(name) && !tealIconComponents.has(Component);
      })
      .sort(([a], [b]) => a.localeCompare(b));
  }, []);
  const filteredMuiIconEntries = useMemo(() => {
    const term = muiIconFilter.trim().toLowerCase();

    if (!term) {
      return muiIconEntries;
    }

    return muiIconEntries.filter(([name]) => name.toLowerCase().includes(term));
  }, [muiIconEntries, muiIconFilter]);

  return (
    <PageContent
      header={{
        title: 'teal-react examples',
        buttons: [
          {
            label: 'Add',
            icon: <Icon.Add />,
            onClick: () => alert('Add clicked'),
          },
          {
            group: [{ label: 'Preview', selected: true }, { label: 'Review' }],
          },
        ],
      }}>
      <Stack spacing={2}>
        <SimpleTabs
          activeTab={tabIndex}
          onChange={setTabIndex}
          tabs={[
            {
              label: 'Components',
              content: (
                <Stack spacing={2} className="example-tab">
                  <SimpleGrid
                    spacing={2}
                    items={[
                      {
                        size: 7,
                        content: (
                          <SimpleCard
                            header="SimpleCard"
                            subheader="Reusable content frame with actions"
                            actionsLeft={[
                              {
                                icon: <Icon.Edit />,
                                label: 'Edit',
                                onClick: () => alert('Edit clicked'),
                              },
                            ]}
                            actionsRight={[
                              {
                                icon: <Icon.Save />,
                                label: 'Save',
                                onClick: () => alert('Save clicked'),
                              },
                            ]}>
                            <Stack spacing={2}>
                              {Typo.body(
                                'Use these examples to check component behavior while changing the library.',
                              )}
                              <Stack
                                direction="row"
                                spacing={1}
                                flexWrap="wrap">
                                <Chip label="MUI" />
                                <Chip color="primary" label="Library source" />
                                <Chip color="secondary" label="Live reload" />
                              </Stack>
                            </Stack>
                          </SimpleCard>
                        ),
                      },
                      {
                        size: 5,
                        content: (
                          <SimpleCard header="SimpleList">
                            <SimpleList
                              items={[
                                {
                                  icon: <Icon.User />,
                                  label: 'Profile',
                                  right: <Switch size="small" defaultChecked />,
                                },
                                {
                                  icon: <Icon.Reports />,
                                  label: 'Reports',
                                  right: <Icon.More />,
                                },
                                {
                                  icon: <Icon.Settings />,
                                  label: 'Settings',
                                  right: <Icon.More />,
                                },
                              ]}
                            />
                          </SimpleCard>
                        ),
                      },
                    ]}
                  />

                  <SimpleTable
                    header="SimpleTable"
                    subheader="Sortable rows with filtering"
                    data={filteredPeople}
                    onFilter={setFilter}
                    columns={[
                      { header: 'Name', cell: 'name' },
                      { header: 'Role', cell: 'role' },
                      { header: 'Status', cell: 'status' },
                      {
                        header: '',
                        align: 'right',
                        action: (row: any) => alert(`Open ${row.name}`),
                      },
                    ]}
                  />
                </Stack>
              ),
            },
            {
              label: 'Inputs',
              content: (
                <Stack spacing={2} className="example-tab">
                  <SimpleCard header="Input">
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Input
                          field={{
                            name: 'email',
                            label: 'Email',
                            validate: { required: true },
                          }}
                          values={values}
                          errors={{}}
                          setValues={(data: any) =>
                            setValues((current) => ({ ...current, ...data }))
                          }
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 3 }}>
                        <Input
                          field={{
                            name: 'plan',
                            label: 'Plan',
                            options: [
                              { value: 'starter', label: 'Starter' },
                              { value: 'team', label: 'Team' },
                              { value: 'scale', label: 'Scale' },
                            ],
                          }}
                          values={values}
                          errors={{}}
                          setValues={(data: any) =>
                            setValues((current) => ({ ...current, ...data }))
                          }
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 3 }}>
                        <Input
                          field={{
                            name: 'seats',
                            label: 'Seats',
                            number: true,
                          }}
                          values={values}
                          errors={{}}
                          setValues={(data: any) =>
                            setValues((current) => ({ ...current, ...data }))
                          }
                        />
                      </Grid>
                      <Grid size={12}>
                        <Input
                          field={{
                            name: 'active',
                            label: 'Active account',
                            bool: true,
                          }}
                          values={values}
                          errors={{}}
                          setValues={(data: any) =>
                            setValues((current) => ({ ...current, ...data }))
                          }
                        />
                      </Grid>
                    </Grid>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="body2">
                      Current value: {JSON.stringify(values)}
                    </Typography>
                  </SimpleCard>

                  <SimpleForm
                    header="SimpleForm"
                    subheader="Form wrapper using RawForm and Input"
                    model={{ name: 'Launch review', priority: 'medium' }}
                    save={({ merged }: any) =>
                      alert(`Saved ${JSON.stringify(merged)}`)
                    }
                    clearable
                    resetOnSave
                    fields={[
                      {
                        name: 'name',
                        label: 'Name',
                        size: 6,
                        validate: { required: true },
                        clearable: true,
                      },
                      {
                        name: 'priority',
                        label: 'Priority',
                        size: 6,
                        options: [
                          { value: 'low', label: 'Low' },
                          { value: 'medium', label: 'Medium' },
                          { value: 'high', label: 'High' },
                        ],
                      },
                    ]}
                  />
                </Stack>
              ),
            },
            {
              label: 'Icons',
              content: (
                <Stack spacing={2} className="example-tab">
                  <SimpleCard
                    header="Icon"
                    subheader="Curated icons exported from src/components/atoms/Icon.tsx">
                    <Box className="icon-gallery">
                      {tealIconEntries.map(([name, IconComponent]) => (
                        <IconTile key={name} name={name}>
                          <IconComponent />
                        </IconTile>
                      ))}
                    </Box>
                  </SimpleCard>
                </Stack>
              ),
            },
            {
              label: 'MUI Icons',
              content: (
                <Stack spacing={2} className="example-tab">
                  <SimpleCard
                    header="MUI icons"
                    subheader={`${filteredMuiIconEntries.length} of ${muiIconEntries.length} icons available from @jesseteal/teal-react/mui`}>
                    <SimpleSearch
                      initialFilter={muiIconFilter}
                      onFilter={setMuiIconFilter}
                    />
                    <MaxBox
                      className="icon-gallery mui-icon-gallery"
                      style={{
                        display: 'grid',
                        gridTemplateColumns:
                          'repeat(auto-fill, minmax(132px, 1fr))',
                        gap: '8px',
                      }}>
                      {filteredMuiIconEntries.map(([name, IconComponent]) => (
                        <IconTile key={name} name={name}>
                          <IconComponent />
                        </IconTile>
                      ))}
                    </MaxBox>
                  </SimpleCard>
                </Stack>
              ),
            },
            {
              label: 'Overlays',
              content: (
                <Stack spacing={2} className="example-tab">
                  <SimpleCard
                    header="Dialog examples"
                    subheader="Open each overlay component from the library">
                    <Stack direction="row" flexWrap="wrap" spacing={1}>
                      <Button
                        variant="contained"
                        onClick={() => setOverlay('dialog')}>
                        SimpleDialog
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => setOverlay('confirm')}>
                        SimpleConfirm
                      </Button>
                      <Button
                        color="error"
                        variant="outlined"
                        onClick={() => setOverlay('delete')}>
                        SimpleDeleteConfirm
                      </Button>
                      <Button
                        color="secondary"
                        variant="contained"
                        onClick={() => setOverlay('modal')}>
                        SimpleModal
                      </Button>
                    </Stack>
                  </SimpleCard>

                  <SimpleCard header="Overlay state">
                    <Typography variant="body2">
                      Active overlay: {overlay || 'none'}
                    </Typography>
                  </SimpleCard>
                </Stack>
              ),
            },
            {
              label: 'Typography',
              content: (
                <Box className="example-tab">
                  <SimpleCard header="Typo">
                    <Stack spacing={1}>
                      {Typo.header('Header')}
                      {Typo.subheader('Subheader')}
                      {Typo.body('Primary body text')}
                      {Typo.body2('Secondary body text')}
                      {Typo.error('Error text')}
                      {Typo.label_value_stack('Status', 'Ready')}
                    </Stack>
                  </SimpleCard>
                </Box>
              ),
            },
          ]}
        />
      </Stack>
      {overlay === 'dialog' && (
        <SimpleDialog
          title="SimpleDialog"
          onClose={() => setOverlay(null)}
          actionsLeft={[{ label: 'Cancel', onClick: () => setOverlay(null) }]}
          actionsRight={[
            {
              label: 'Save',
              color: 'primary',
              onClick: () => setOverlay(null),
            },
          ]}>
          <Stack spacing={1}>
            <Typography variant="body1">Dialog body content</Typography>
            <Typography variant="body2" color="text.secondary">
              This example uses custom left and right actions.
            </Typography>
          </Stack>
        </SimpleDialog>
      )}
      {overlay === 'confirm' && (
        <SimpleConfirm
          header="SimpleConfirm"
          message="Confirm this example action?"
          actionLabel="Confirm"
          onAction={() => setOverlay(null)}
          onCancel={() => setOverlay(null)}
        />
      )}
      {overlay === 'delete' && (
        <SimpleDeleteConfirm
          message="Delete this example record?"
          onDelete={() => setOverlay(null)}
          onCancel={() => setOverlay(null)}
        />
      )}
      {overlay === 'modal' && (
        <SimpleModal open onClose={() => setOverlay(null)} size="md">
          <SimpleCard
            header="SimpleModal"
            actionsRight={[
              { label: 'Close', onClick: () => setOverlay(null) },
            ]}>
            <Stack spacing={1}>
              <Typography variant="body1">Modal body content</Typography>
              <Typography variant="body2" color="text.secondary">
                Click outside the modal or use Close to dismiss it.
              </Typography>
            </Stack>
          </SimpleCard>
        </SimpleModal>
      )}
    </PageContent>
  );
}
