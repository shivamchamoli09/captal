import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useAddMipStore } from "@/store";
import { AddMipForm } from "./form";
import { Typography } from "@mui/material";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddMip = () => {
  const { open, closeDialog } = useAddMipStore();
  console.log("open((((((((((", open);
  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeDialog}
        aria-describedby="add-mip-dialog"
      >
        <DialogTitle>
          <Typography variant="h2" fontWeight={"medium"} gutterBottom>
            {"Add Mip"}
          </Typography>

          <Typography variant="body1">
            Currently you can add max 6 Mips at a time. The first Mip will be
            deleted if the limit is exhausted.
          </Typography>
        </DialogTitle>
        <DialogContent>
          <AddMipForm />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Close</Button>
          <Button variant="contained" onClick={closeDialog}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export { AddMip };
