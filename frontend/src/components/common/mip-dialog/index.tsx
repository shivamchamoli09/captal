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
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { MipSchema, MipSchemaType } from "@/lib/domains/mipSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddMipDTO } from "@/lib/dto/mipDTO";
import { MAX_MIP_CREATE_LIMIT } from "@/core/const/mip.const";
import { LOCAL_STORAGE_KEYS } from "@/core/const/storage.const";
import { getFromLocalStorage, saveToLocalStorage } from "@/core/utils/storage";

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

  const formState = useForm({
    defaultValues: {
      name: "",
      currencies: [],
    },
    resolver: zodResolver(MipSchema),
  });

  const handleAddMip = () => {
    try {
      let prevCurrencies: Array<MipSchemaType> = getFromLocalStorage(
        LOCAL_STORAGE_KEYS.mips
      );
      let newMip = new AddMipDTO();
      if (!prevCurrencies) prevCurrencies = [];
      if (prevCurrencies.length === MAX_MIP_CREATE_LIMIT)
        throw new Error("Max Mip limit is exhausted.");
      const { name, currencies } = formState.getValues();
      const duplicateMipName = prevCurrencies.find((p) => p.name === name);
      if (duplicateMipName)
        throw new Error("Mip with given name already exists!");
      newMip.name = name;
      newMip.currencies = currencies;
      prevCurrencies.push(newMip);
      console.log(prevCurrencies);
      saveToLocalStorage("mips", JSON.stringify(prevCurrencies));
      formState.reset();
      closeDialog?.();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeDialog}
        aria-describedby="add-mip-dialog"
        slotProps={{
          backdrop: {
            style: {
              backdropFilter: "blur(3px)",
              backgroundColor: "rgba(0,0,30,0.4)",
            },
          },
        }}
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
        <FormProvider {...formState}>
          <form onSubmit={formState.handleSubmit(handleAddMip)}>
            <DialogContent>
              <AddMipForm />
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDialog}>Close</Button>
              <Button type="submit" variant="contained" onClick={closeDialog}>
                Create
              </Button>
            </DialogActions>
          </form>
        </FormProvider>
      </Dialog>
    </React.Fragment>
  );
};

export { AddMip };
