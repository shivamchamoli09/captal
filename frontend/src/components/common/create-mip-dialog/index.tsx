import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useMipStore } from "@/store";
import { AddMipForm } from "./form";
import { Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { MipSchema, MipSchemaType } from "@/lib/domains/mipSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddMipDTO } from "@/lib/dto/mipDTO";
import { MAX_MIP_CREATE_LIMIT } from "@/core/const/mip.const";
import { LOCAL_STORAGE_KEYS } from "@/core/const/storage.const";
import { getFromLocalStorage, saveToLocalStorage } from "@/core/utils/storage";
import { useCurrencyStore } from "@/store/currencies.store";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddMip = () => {
  const {
    createMip: open,
    closeCreateDialog: closeDialog,
    setMipList,
  } = useMipStore();
  const { currencies: prices } = useCurrencyStore();
  const [errorMsg, setErrorMsg] = React.useState<string | null>("");
  const formState = useForm({
    defaultValues: {
      name: "",
      currencies: [],
    },
    resolver: zodResolver(MipSchema),
  });

  const handleAddMip = () => {
    try {
      setErrorMsg(null);
      let prevCurrencies: Array<MipSchemaType> = getFromLocalStorage(
        LOCAL_STORAGE_KEYS.mips
      );
      if (!prevCurrencies) prevCurrencies = [];
      if (prevCurrencies.length === MAX_MIP_CREATE_LIMIT)
        throw new Error("Max Mip limit is exhausted. Please remove few existing mips.");
      const { name, currencies } = formState.getValues();
      const duplicateMipName = prevCurrencies.find((p) => p.name! === name);
      if (duplicateMipName)
        throw new Error("Mip with this name already exists!");
      const newMip = new AddMipDTO(name, currencies);
      prevCurrencies.unshift(newMip);
      setMipList(prevCurrencies);
      formState.reset();
      handleClose?.();
    } catch (error: any) {
      console.log(error);
      setErrorMsg(error?.message);
    }
  };

  const handleClose = () => {
    formState.reset();
    setErrorMsg(null);
    closeDialog();
  };
  const isFormValid = () =>
    formState.formState.isValid && formState.watch("currencies")?.length;

  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="add-mip-dialog"
      >
        <DialogTitle>
          <Typography variant="h2" fontWeight={"medium"} gutterBottom>
            {"Add Mip"}
          </Typography>

          <Typography variant="body1">
            Currently you can add max {MAX_MIP_CREATE_LIMIT} Mips. Please remove
            existing mips if your limit is exhausted.
          </Typography>
        </DialogTitle>
        {open && (
          <FormProvider {...formState}>
            <form onSubmit={formState.handleSubmit(handleAddMip)}>
              <DialogContent>
                <AddMipForm currencyOptions={prices} />
              </DialogContent>
              <DialogActions>
                {errorMsg && (
                  <Typography variant="body1" color="error">
                    {errorMsg}
                  </Typography>
                )}
                <Button variant="text" onClick={handleClose}>
                  Close
                </Button>
                <Button
                  variant="text"
                  type="submit"
                  onClick={formState.handleSubmit(handleAddMip)}
                  disabled={!isFormValid()}
                >
                  Create
                </Button>
              </DialogActions>
            </form>
          </FormProvider>
        )}
      </Dialog>
    </React.Fragment>
  );
};

export { AddMip };
