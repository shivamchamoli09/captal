export interface IPieChartData {
  name: string;
  value: number;
}

export type IBarChartData = Array<string | number>;

export interface IDumbellChartData {
  x: string;
  y: Array<number>;
}
