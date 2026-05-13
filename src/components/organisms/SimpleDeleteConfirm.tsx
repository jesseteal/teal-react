import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import T from '../atoms/Typo';

const SimpleDeleteConfirm = ({ onDelete, onCancel, message = null }: any) => {
  if (typeof onDelete !== 'function') {
    return null;
  }

  return (
    <Dialog open={true} onClose={onCancel}>
      <DialogTitle>{T.header('Confirm Delete')}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {message
            ? message
            : 'Data will be lost. This action cannot be undone.'}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={onDelete} color="secondary" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SimpleDeleteConfirm;
