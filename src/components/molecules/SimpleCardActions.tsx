import { Box, Button, IconButton, CardActions, Divider } from '@mui/material';

/*
usage: include as child in <SimpleCard>
  <SimpleCardActions
    actionsLeft={[
      icon: ...,
      label: ..., // icon or label
      className: '',
      color: 'primary'
      onClick: () => {}
    ]}
  />
*/

const SimpleCardActions = ({
  actionsLeft,
  actionsRight,
  children,
  showDivider = true,
}: any) => {
  if (!(actionsLeft || actionsRight || children)) return null;
  return (
    <>
      {showDivider && <Divider />}
      <CardActions>
        {actionsLeft &&
          actionsLeft.map((t: any, i: number) => {
            return t.label ? (
              <Button
                variant={'outlined'}
                key={i}
                disabled={t.disabled ? t.disabled() : false}
                className={t.className}
                color={t.color || 'primary'}
                startIcon={t.icon}
                onClick={t.onClick}>
                {t.label}
              </Button>
            ) : (
              <IconButton
                key={i}
                disabled={t.disabled ? t.disabled() : false}
                size="small"
                className={t.className}
                color={t.color || 'primary'}
                onClick={t.onClick}>
                {t.icon}
              </IconButton>
            );
          })}
        <Box flexGrow={1}>{children}</Box>
        {actionsRight &&
          actionsRight.map((t: any, i: number) => {
            return t.label ? (
              <Button
                variant={'outlined'}
                key={i}
                disabled={t.disabled ? t.disabled() : false}
                className={t.className}
                color={t.color || 'primary'}
                onClick={t.onClick}
                startIcon={t.icon}>
                {t.label}
              </Button>
            ) : (
              <IconButton
                key={i}
                disabled={t.disabled ? t.disabled() : false}
                size="small"
                className={t.className}
                color={t.color || 'primary'}
                onClick={t.onClick}>
                {t.icon}
              </IconButton>
            );
          })}
      </CardActions>
    </>
  );
};

export default SimpleCardActions;
