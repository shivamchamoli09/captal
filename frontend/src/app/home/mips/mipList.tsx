"use client";

import { Box, Button, ButtonGroup, Grid, Typography } from "@mui/material";
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
import { Card } from "@/components/base/Card";
import { DummyMips } from "./lib";
import { EstimatedPricesSchemaType } from "@/lib/domains/estimatedPrices";
import { getTomorrowEstimations } from "@/lib/external/estimations";
import { PriceEstimationlist } from "../estimations/price-estimation-card";

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
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const latestPricesMapBySymbol: Map<string, CurrencySchemaType> =
    useMemo(() => {
      const map: Map<string, CurrencySchemaType> = new Map();
      for (const currency of currentPrices) {
        map.set(currency.symbol, currency);
      }
      return map;
    }, [currentPrices]);
  const [estimations, setEstimations] = useState<EstimatedPricesSchemaType>([]);

  const {
    mipList: mips,
    setMipList,
    deleteMipCurrentBalance,
    setIsLoading,
    isLoading,
  } = useMipStore();

  useEffect(() => {
    const savedMips = getFromLocalStorage(LOCAL_STORAGE_KEYS.mips, {
      schema: z.array(MipSchema),
    }) as any;
    setMipList(savedMips ?? []);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [setIsLoading, setMipList]);

  useEffect(() => {
    const fetchEstimations = async () => {
      try {
        const estimates = await getTomorrowEstimations();
        setEstimations(estimates);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEstimations();
  }, [setEstimations]);

  const handleDeleteMip = () => {
    try {
      const mipToDeleteIdx = mips?.findIndex((m) => m.id === currentMip?.id);
      if (mipToDeleteIdx < 0) throw new Error("Invalid mip provided!");
      let currentMips = Array.from(mips!);
      currentMips.splice(mipToDeleteIdx, 1);
      setMipList(currentMips);
      deleteMipCurrentBalance(currentMip?.id!);
      closeConfirmationDelete();
    } catch (error) {
      console.log(error);
    }
  };
  const renderMips = () => {
    return (
      <Grid container spacing={2} height={"100%"} alignItems={"start"}>
        {(mips?.length ? mips : (DummyMips as Array<MipSchemaType>))?.map(
          (mip, index) => (
            <Grid item md={3} sm={6} xs={12} key={index}>
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
          )
        )}
      </Grid>
    );
  };
  const renderEstimations = () => {
    return (
      <Grid container spacing={2} height={"100%"} alignItems={"start"}>
        {estimations?.map((estimation, index) => (
          <Grid item md={3} sm={6} xs={12} key={index}>
            <PriceEstimationlist data={estimation} />
          </Grid>
        ))}
      </Grid>
    );
  };

  if (!mips?.length && !DummyMips?.length)
    return (
      <Card
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          p: 4,
        }}>
        <Typography variant="h6" gutterBottom>
          Embark on a journey of financial empowerment and growth with our
          innovative MIP (Mixed Investment Plan) solutions, designed to help you
          realize your long-term goals through disciplined and strategic
          investment, one mip at a time. Click on the add icon above to create
          your first mip.
        </Typography>
      </Card>
    );
  return (
    <>
      <Grid container gap={2}>
        <ButtonGroup variant="contained" aria-label="Basic button group">
          <Button
            variant={selectedTab === 0 ? "contained" : "outlined"}
            onClick={() => {
              setSelectedTab(0);
            }}>
            My Mips
          </Button>
          <Button
            variant={selectedTab === 1 ? "contained" : "outlined"}
            onClick={() => {
              setSelectedTab(1);
            }}>
            {`Estimations ${
              estimations?.[0]?.estimatedDate
                ? "for " +
                  new Date(estimations?.[0]?.estimatedDate)?.toLocaleDateString(
                    "en-US",
                    {
                      weekday: "long",
                    }
                  )
                : ""
            }`}
          </Button>
        </ButtonGroup>
        {selectedTab === 0 && renderMips()}
        {selectedTab === 1 && renderEstimations()}
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
