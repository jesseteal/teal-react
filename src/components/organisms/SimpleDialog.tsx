import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Button,
} from '@mui/material';
import type { DialogProps } from '@mui/material/Dialog';
import type { ReactNode } from 'react';
import DeleteButton from './SimpleDeleteConfirm.js';
/*
<SimpleDialog
  open={open}
  title=""
  actionsRight={[ { label: "", onClick: () => {}, color: "primary"}]}
  onClose={}>
  content
</SimpleDialog>
 */
interface SimpleDialogAction {
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning';
  confirm?: boolean;
  label: string;
  onClick: () => boolean | void;
}

interface SimpleDialogProps {
  actionsLeft?: SimpleDialogAction[];
  actionsRight?: SimpleDialogAction[];
  children: ReactNode;
  noGutter?: boolean;
  onClose: (
    reason?: Parameters<NonNullable<DialogProps['onClose']>>[1],
  ) => void;
  open?: boolean;
  size?: DialogProps['maxWidth'];
  title?: ReactNode;
}

const SimpleDialog = ({
  title,
  children,
  actionsLeft,
  actionsRight,
  open = true,
  onClose,
  size = 'md',
  noGutter = false,
}: SimpleDialogProps) => {
  const handleDialogClose: DialogProps['onClose'] = (_event, reason) => {
    onClose?.(reason);
  };

  const handleClose = (fn: () => boolean | void) => {
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
    <Dialog
      open={open}
      onClose={handleDialogClose}
      fullWidth={true}
      maxWidth={size}>
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
              actionsLeft.map((t, i: number) => (
                <Button
                  key={`actionLeftButton${i}`}
                  onClick={() => handleClose(t.onClick)}
                  color={t.color || 'inherit'}>
                  {t.label}
                </Button>
              ))}
            <div style={{ flexGrow: 1 }} />
            {actionsRight &&
              actionsRight.map((t, i: number) => {
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
                    color={t.color || 'inherit'}>
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
