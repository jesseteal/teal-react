import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Button,
} from '@mui/material';
import DeleteButton from './SimpleDeleteConfirm';
/*
<SimpleDialog
  open={open}
  title=""
  actionsRight={[ { label: "", onClick: () => {}, color: "primary"}]}
  onClose={}>
  content
</SimpleDialog>
 */
const SimpleDialog = ({
  title,
  children,
  actionsLeft,
  actionsRight,
  open = true,
  onClose,
  size = 'md',
  noGutter = false,
}: any) => {
  const handleClose = (fn: () => boolean) => {
    if (fn) {
      if (fn() !== false) {
        onClose();
      }
    } else {
      onClose();
    }
  };
  const Wrap = noGutter ? Box : DialogContent;
  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth={size}>
      {title && (
        <>
          <DialogTitle>{title}</DialogTitle>
          <Divider />
        </>
      )}
      <Wrap>{children}</Wrap>
      {(actionsLeft || actionsRight) && (
        <>
          <Divider />
          <DialogActions>
            {actionsLeft &&
              actionsLeft.map((t: any, i: number) => (
                <Button
                  key={`actionLeftButton${i}`}
                  onClick={() => handleClose(t.onClick)}
                  color={t.color || 'default'}>
                  {t.label}
                </Button>
              ))}
            <div style={{ flexGrow: 1 }} />
            {actionsRight &&
              actionsRight.map((t: any, i: number) => {
                if (t.confirm) {
                  return (
                    <DeleteButton
                      key={`deleteright${i}`}
                      onClick={t.onClick}
                      label={t.label}
                      color="error"
                    />
                  );
                }
                return (
                  <Button
                    key={`actionRightBtn${i}`}
                    onClick={() => handleClose(t.onClick)}
                    color={t.color || 'default'}>
                    {t.label}
                  </Button>
                );
              })}
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default SimpleDialog;
