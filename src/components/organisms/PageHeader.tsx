import {
  AppBar,
  Button,
  ButtonGroup,
  Grid,
  Toolbar,
  Typography,
} from '@mui/material';

const lightColor = 'rgba(255, 255, 255, 0.7)';

interface PageHeaderButton {
  custom?: any; // React elements
  label?: string;
  icon?: any;
  onClick?: () => void;
  selected?: boolean;
  group?: PageHeaderButton[];
}

export interface PageHeaderProps {
  title: string;
  buttons?: PageHeaderButton[];
}

export default function PageHeader({ title, buttons }: PageHeaderProps) {
  return (
    <AppBar
      component="div"
      color="primary"
      position="static"
      elevation={0}
      sx={{ zIndex: 0 }}>
      <Toolbar>
        <Grid container spacing={1} sx={{ alignItems: 'center' }}>
          <Grid size="grow">
            <Typography color="inherit" variant="h5" component="h1">
              {title}
            </Typography>
          </Grid>
          {buttons?.map((button, i) => {
            if (button.group) {
              return (
                <Grid key={`group${i}`}>
                  <ButtonGroup variant="outlined">
                    {button.group?.map((gbutton, j) => {
                      return (
                        <Button
                          key={`group${i}.${j}`}
                          sx={{
                            borderColor: lightColor,
                            backgroundColor: gbutton.selected
                              ? 'rgba(255,255,255,0.25)'
                              : 'rgba(255,255,255,0.05)',
                          }}
                          startIcon={gbutton.icon}
                          // variant={gbutton.selected ? 'outlined' : 'contained'}
                          color={gbutton.selected ? 'inherit' : 'inherit'}
                          size="small"
                          onClick={gbutton.onClick}>
                          {gbutton.label}
                        </Button>
                      );
                    })}
                  </ButtonGroup>
                </Grid>
              );
            }
            if (button.custom) {
              return button.custom;
            }
            return (
              <Grid key={`btn${i}`}>
                <Button
                  sx={{
                    borderColor: lightColor,
                  }}
                  startIcon={button.icon}
                  variant={button.selected ? 'outlined' : 'contained'}
                  color={button.selected ? 'inherit' : 'primary'}
                  size="small"
                  onClick={button.onClick}>
                  {button.label}
                </Button>
              </Grid>
            );
          })}

          {/* <Grid>
            <Tooltip title="Help">
              <IconButton color="inherit">
                <HelpIcon />
              </IconButton>
            </Tooltip>
          </Grid> */}
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
