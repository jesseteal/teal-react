import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import { lightColor } from '../../layout/theme';
import { ButtonGroup } from '@mui/material';

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
        <Grid container alignItems="center" spacing={1}>
          <Grid item xs>
            <Typography color="inherit" variant="h5" component="h1">
              {title}
            </Typography>
          </Grid>
          {buttons?.map((button, i) => {
            if (button.group) {
              return (
                <Grid item key={`group${i}`}>
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
              <Grid item key={`btn${i}`}>
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

          {/* <Grid item>
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
