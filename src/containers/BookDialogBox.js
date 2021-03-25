import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DateOfSlotToBook from './DateOfSlotToBook';
import SlotDurationSelector from './SlotDurationSelector';
import SearchIcon from '@material-ui/icons/Search';
import AvailableFreeSlots from './AvailableFreeSlots';
import ConfirmationSnackbar from './ConfirmationSnackbar';
import TextField from '@material-ui/core/TextField';

const slots = [8, 9, 10, 15, 19, 20, 21, 23]; // temporary data, to be fetched from backend

export default function BookDialogBox() {
  const [open, setOpen] = React.useState(false);
  const [subjectName, setSubjectName] = React.useState("")
  const [slotDurationWanted, setSlotDurationWanted] = React.useState(1);
  const [dateOfSlotWanted, setDateOfSlotWanted] = React.useState(new Date());
  const [freeSlots, setFreeSlots] = React.useState(null);
  const [slotSelected, setSlotSelected] = React.useState(null);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [cancelSuccessfull, setCancelSuccessfull] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSlotDurationWanted = (event) => {
    setSlotDurationWanted(event.target.value); // send req to backend
  }

  const handleDateChange = (date) => {
    setDateOfSlotWanted(date); // search time table of given date (to be done on backend) and return free slots
  };

  const findFreeSlots = () => { // send slot duration and date to backend for searching
    setFreeSlots(slots);
  }

  const handleSlotSelected = (slot) => {
    setSlotSelected(slot);
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleBookSlot = () => { // need to set slotToBook
    // send req to backend
    setTimeout(() => {
      setCancelSuccessfull(true);
      // setCancelSuccessfull(false);
      setSnackbarOpen(true);
    }, 1000);
  }

  return (
    <>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>Book a slot</Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="sm">
        <DialogTitle id="form-dialog-title">Book</DialogTitle>
        <DialogContent>

          <TextField
            margin="normal"
            label="Subject name"
            color="primary"
            fullWidth
          />

          <SlotDurationSelector handleRadioChange={handleSlotDurationWanted} />
          <DateOfSlotToBook selectedDate={dateOfSlotWanted} handleDateChange={handleDateChange} />

          <Button
            startIcon={<SearchIcon />}
            fullWidth
            onClick={findFreeSlots}
          >
            Search for free slots
          </Button>

          {freeSlots && <AvailableFreeSlots freeSlots={freeSlots} slotSelected={slotSelected} handleSlotSelected={handleSlotSelected} />}

        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose} color="primary">
            Close
          </Button>
          {slotSelected && <Button variant="contained" disableElevation onClick={handleBookSlot} color="primary">
            Confirm
          </Button>}

          <ConfirmationSnackbar open={snackbarOpen} handleClose={handleSnackbarClose} success={cancelSuccessfull}></ConfirmationSnackbar>
        </DialogActions>
      </Dialog>
    </>
  );
}