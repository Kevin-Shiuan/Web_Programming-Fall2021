import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog({closeAndClear, setOpen, open}) {
//   const [open, setOpen] = useState(false);

  const handleClear = () => {
    closeAndClear();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to clear the Database?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
             All data in database will be cleared and can't be recovered.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleClear}
            variant="contained"
            color="secondary">Clear Database</Button>
          <Button 
            onClick={handleClose} 
            autoFocus
            variant="outlined"
            color="primary"
            >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
  );
}
