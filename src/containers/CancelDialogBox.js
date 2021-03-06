import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DateTimeComponent from './DateTimeComponent';
import ConfirmationSnackbar from './ConfirmationSnackbar';
import { fetchTimeTable } from './helpers';

export default function CancelDialogBox({ periodsSchedule, setPeriodsSchedule }) {
  const [open, setOpen] = React.useState(false);
  const [slotToCancel, setSlotToCancel] = React.useState(new Date());
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [cancelSuccessfull, setCancelSuccessfull] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleCancelSlot = async () => {
    //sent request to backend to cancel the slot selected.
    const hour = slotToCancel.getHours();
    const changes = { slotToCancel, hour };
    fetch("/api/periodsSchedule/cancel", {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(changes)
    }).then(res => {
      if(res.ok) {
        setCancelSuccessfull(true);
        fetchTimeTable(setPeriodsSchedule);
      }
      else setCancelSuccessfull(false);
      setSnackbarOpen(true);
    })
  }

  return (
    <>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>Cancel a slot</Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Cancel</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Choose the date and time of the slot you want to cancel.
          </DialogContentText>

          <DateTimeComponent slotToCancel={slotToCancel} handleDateTimeChange={setSlotToCancel} />

        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={handleClose} color="primary">
            Close
          </Button>
          <Button variant="contained" disableElevation onClick={() => handleCancelSlot()} color="primary">
            Confirm
          </Button>

          <ConfirmationSnackbar open={snackbarOpen} handleClose={handleSnackbarClose} success={cancelSuccessfull}></ConfirmationSnackbar>
        </DialogActions>
      </Dialog>
    </>
  );
}
