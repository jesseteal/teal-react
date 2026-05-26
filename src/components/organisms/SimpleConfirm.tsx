import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import T from '../atoms/Typo.js';
/*
usage
<SimpleConfirm
  onAction={() => ...}
  onCancel={() => ...}

  // optional:
  header="Moral Conundrum"
  message="Should I kill them all?"
  actionLabel="Kill"
  cancelLabel="or nah"
/>
 */

const SimpleConfirm = ({
  header = 'Confirm',
  onAction,
  actionLabel = 'Confirm',
  onCancel,
  cancelLabel = 'Cancel',
  message = 'Please confirm this action.',
}: any) => {
  if (typeof onAction !== 'function') {
    return null;
  }

  return (
    <Dialog
      open={true}
      onClose={onCancel}
      style={{ minWidth: 300 }}
      fullWidth={true}>
      <DialogTitle>{T.header(header)}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          {cancelLabel}
        </Button>
        <Button onClick={onAction} color="secondary" variant="contained">
          {actionLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SimpleConfirm;
