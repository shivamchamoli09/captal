import {
  IBarChartData,
  IDumbellChartData,
  IPieChartData,
} from "@/components/chart/types.ts/chart.type";
import { MipSchemaType } from "@/lib/domains/mipSchema";
import { useEffect, useState } from "react";

interface IMipChart {
  mips: Array<MipSchemaType>;
  currentPrices?: Map<string, number>;
}

export const useMipChart = ({ mips, currentPrices }: IMipChart) => {
  const [pieChartData, setPieChartData] = useState<Array<IPieChartData>>([]);
  const [pieChartBalanceData, setPieChartBalanceData] = useState<
    Array<IPieChartData>
  >([]);
  const [pieChartProfitData, setPieChartProfitData] = useState<
    Array<IPieChartData>
  >([]);
  const [barChartData, setBarChartData] = useState<Array<IBarChartData>>([]);
  const [barChartDiffData, setBarChartDiffData] = useState<{
    old: Array<IBarChartData>;
    new: Array<IBarChartData>;
  }>();
  const [dumbellChartData, setDumbellChart] = useState<
    Array<IDumbellChartData>
  >([]);

  useEffect(() => {
    const pieData: Array<IPieChartData> = [];
    const pieProfitData: Array<IPieChartData> = [];
    const pieBalanceData: Array<IPieChartData> = [];
    const barChart: Array<IBarChartData> = [["Name", "Invested", "Balance"]];
    let bardChartDiff: {
      old: Array<IBarChartData>;
      new: Array<IBarChartData>;
    } = {
      old: [["Invested", "Balance"]],
      new: [["Invested", "Balance"]],
    };
    const dumbellData: Array<IDumbellChartData> = [];
    for (const mip of mips) {
      let total = 0;
      for (const curr of mip.currencies) {
        total += Number(curr.regularMarketPrice?.toFixed?.(3));
      }
      let currMipBal = Number(currentPrices?.get(mip.name)?.toFixed?.(3));
      pieData.push({ name: mip.name, value: Number(total?.toFixed(3)) });
      pieBalanceData.push({
        name: mip.name,
        value: currMipBal ?? 0,
      });
      pieProfitData.push({
        name: mip.name,
        value: Number(
          (currMipBal && currMipBal - total > 0
            ? currMipBal - total
            : 0
          )?.toFixed(3)
        ),
      });
      barChart.push([mip.name, total, currMipBal ?? 0]);
      bardChartDiff?.old.push([mip.name, total]);
      bardChartDiff?.new.push([mip.name, currMipBal ?? 0]);
      dumbellData.push({
        x: mip.name,
        y: [total, Number(currMipBal?.toFixed(2))],
      });
    }
    setPieChartData(pieData);
    setPieChartProfitData(pieProfitData);
    setPieChartBalanceData(pieBalanceData);
    setBarChartData(barChart);
    setBarChartDiffData(bardChartDiff);
    setDumbellChart(dumbellData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPrices?.size, mips]);

  return {
    pieChartData,
    pieChartProfitData,
    pieChartBalanceData,
    barChartData,
    barChartDiffData,
    dumbellChartData,
  };
};
