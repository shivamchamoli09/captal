import { Grid } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { MipDetails } from "./mipDetails";
import { MipSchema, MipSchemaType } from "@/lib/domains/mipSchema";
import { getFromLocalStorage, saveToLocalStorage } from "@/core/utils/storage";
import { LOCAL_STORAGE_KEYS } from "@/core/const/storage.const";
import { z } from "zod";
import { ConfirmationDialog } from "@/components/common/dialogs/confirmationDialog";
import { CurrencyListDialog } from "./currenyListing/currencyDialog";
import { useMipStore } from "@/store";
import { useCurrencyStore } from "@/store/currencies.store";
import { CurrencySchemaType } from "@/lib/domains";

interface IMipList {}

const MipList: React.FC<IMipList> = () => {
  const { currencies: currentPrices } = useCurrencyStore();
  const [confirmDeletion, setConfirmDeletion] = useState<boolean>(false);
  const [currentMip, setCurrentMip] = useState<MipSchemaType>();
  const [showCurrencyListDialog, setShowCurrencyListDialog] =
    useState<boolean>(false);
  const closeCurrencylistDialog = () => {
    setCurrentMip(undefined);
    setShowCurrencyListDialog(false);
  };
  const openConfirmationDelete = () => setConfirmDeletion(true);
  const closeConfirmationDelete = () => {
    setCurrentMip(undefined);
    setConfirmDeletion(false);
  };

  const latestPricesMapBySymbol: Map<string, CurrencySchemaType> =
    useMemo(() => {
      const map: Map<string, CurrencySchemaType> = new Map();
      for (const currency of currentPrices) {
        map.set(currency.symbol, currency);
      }
      return map;
    }, [currentPrices]);

  const { mipList: mips, setMipList } = useMipStore();
  useEffect(() => {
    setMipList(
      getFromLocalStorage(LOCAL_STORAGE_KEYS.mips, {
        schema: z.array(MipSchema),
      }) ?? []
    );
  }, [setMipList]);

  const handleDeleteMip = () => {
    try {
      const mipToDeleteIdx = mips?.findIndex((m) => m.id === currentMip?.id);
      if (mipToDeleteIdx < 0) throw new Error("Invalid mip provided!");
      let currentMips = Array.from(mips!);
      currentMips.splice(mipToDeleteIdx, 1);
      setMipList(currentMips);
      closeConfirmationDelete();
    } catch (error) {
      console.log(error);
    }
  };
  if (!mips) return <></>;
  return (
    <>
      <Grid container spacing={2} height={"100%"} alignItems={"center"}>
        {mips?.map((mip, index) => (
          <Grid item md={3} xs={6} key={index}>
            <MipDetails
              {...mip}
              onDelete={(mip) => {
                setCurrentMip(mip);
                openConfirmationDelete();
              }}
              onClick={() => {
                setCurrentMip(mip);
                setShowCurrencyListDialog(true);
              }}
              currentPrices={latestPricesMapBySymbol}
            />
          </Grid>
        ))}
      </Grid>
      <ConfirmationDialog
        title={`Are you sure you want to delete ${currentMip?.name}?`}
        open={confirmDeletion}
        onClose={closeConfirmationDelete}
        onSubmit={handleDeleteMip}
      />
      <CurrencyListDialog
        open={showCurrencyListDialog}
        id={currentMip?.id!}
        onClose={closeCurrencylistDialog}
      />
    </>
  );
};

export { MipList };
