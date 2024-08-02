/** @format */

import * as React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CircularProgress from '@mui/material/CircularProgress';
import DialogContentText from '@mui/material/DialogContentText';

interface DeleteTasksModalProps {
  isOpen: boolean;

  handleClose: () => void;

  isUpdatingTasks: boolean;
  handleSubmit: () => void;
}

const DeleteTasksModal: React.FunctionComponent<DeleteTasksModalProps> = (props) => {
  return (
    <Dialog fullWidth maxWidth='xs' open={props.isOpen} onClose={props.handleClose} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
      <DialogTitle id='alert-dialog-title'>Are you sure?</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>You are about to delete the task. Once the action is taken you cannot undone.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button disabled={props.isUpdatingTasks} onClick={props.handleClose} variant='outlined' color='primary'>
          No, Cancel
        </Button>
        <Button disabled={props.isUpdatingTasks} onClick={props.handleSubmit} autoFocus variant='contained' color='error'>
          {props.isUpdatingTasks && <CircularProgress sx={{ mr: 2 }} />}
          {props.isUpdatingTasks ? 'Deleting...' : "Yes, I'm sure"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteTasksModal;
