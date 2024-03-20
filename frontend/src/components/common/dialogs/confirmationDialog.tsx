import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface IConfirmation {
  open: boolean;
  onClose?: () => void;
  title?: string;
  subtitle?: string;
  cancelProps?: {
    label: string;
    disabled: boolean;
  };
  submitProps?: {
    label: string;
    disabled: boolean;
  };
  onSubmit?: () => void;
}

const ConfirmationDialog: React.FC<IConfirmation> = ({
  open,
  onClose,
  title = "Are you sure you want to complete the action?",
  subtitle,
  cancelProps = {
    label: "Cancel",
  },
  submitProps = {
    label: "Submit",
  },
  onSubmit,
}) => {
  const handleClose = () => {
    onClose?.();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="confirmation-labael"
      aria-describedby="confirmation-description"
    >
      <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
      {subtitle && (
        <DialogContent>
          <DialogContentText id="confirmation-dialog-description">
            {subtitle}
          </DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={handleClose}>{cancelProps.label}</Button>
        <Button onClick={onSubmit} autoFocus>
          {submitProps.label}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { ConfirmationDialog };
