import z from "zod";
import { StockSchema } from "./stockSchema";

export const CryptoSchema = StockSchema
// .omit({
//   firstTradeDateMilliseconds: true,
//   regularMarketTime: true,
//   regularMarketDayRange: true,
//   fiftyTwoWeekRange: true,
//   startDate: true,
// }).extend({
//   firstTradeDateMilliseconds: z.string().nullish(),
//   regularMarketTime: z.string().nullish(),
//   regularMarketDayRange: z
//     .object({
//       low: z.number(),
//       high: z.number(),
//     })
//     .nullish(),
//   fiftyTwoWeekRange: z
//     .object({
//       low: z.number(),
//       high: z.number(),
//     })
//     .nullish(),
//   startDate: z.string().nullish(),
// });
// z.object({
//   language: "en-US",
//   region: "US",
//   quoteType: "CRYPTOCURRENCY",
//   typeDisp: "Cryptocurrency",
//   quoteSourceName: "CoinMarketCap",
//   triggerable: false,
//   customPriceAlertConfidence: "LOW",
//   currency: "USD",
//   regularMarketChangePercent: 0.4005259,
//   exchange: "CCC",
//   fiftyTwoWeekLow: 0.783616,
//   fiftyTwoWeekHigh: 11.448678,
//   shortName: "THORChain USD",
//   hasPrePostMarketData: false,
//   firstTradeDateMilliseconds: 1563840000000,
//   priceHint: 4,
//   circulatingSupply: 336067264,
//   lastMarket: "CoinMarketCap",
//   volume24Hr: 303072384,
//   volumeAllCurrencies: 303072384,
//   fromCurrency: "RUNE",
//   toCurrency: "USD=X",
//   coinMarketCapLink: "https://coinmarketcap.com/currencies/thorchain",
//   regularMarketChange: 0.033537865,
//   regularMarketTime: 1711302840,
//   regularMarketPrice: 8.406945,
//   regularMarketDayHigh: 8.521915,
//   regularMarketDayRange: "8.059167 - 8.521915",
//   regularMarketDayLow: 8.059167,
//   regularMarketVolume: 303072384,
//   regularMarketPreviousClose: 8.074088,
//   market: "ccc_market",
//   messageBoardId: "finmb_RUNE_CCC",
//   fullExchangeName: "CCC",
//   longName: "THORChain USD",
//   regularMarketOpen: 8.074088,
//   averageDailyVolume3Month: 337244194,
//   averageDailyVolume10Day: 647992448,
//   startDate: 1563840000,
//   coinImageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/4157.png",
//   logoUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/4157.png",
//   fiftyTwoWeekLowChange: 7.623329,
//   fiftyTwoWeekLowChangePercent: 9.728399,
//   fiftyTwoWeekRange: "0.783616 - 11.448678",
//   fiftyTwoWeekHighChange: -3.0417328,
//   fiftyTwoWeekHighChangePercent: -0.2656842,
//   fiftyTwoWeekChangePercent: 475.6168,
//   marketState: "REGULAR",
//   fiftyDayAverage: 6.462679,
//   fiftyDayAverageChange: 1.9442663,
//   fiftyDayAverageChangePercent: 0.30084527,
//   twoHundredDayAverage: 4.5342846,
//   twoHundredDayAverageChange: 3.8726606,
//   twoHundredDayAverageChangePercent: 0.85408413,
//   marketCap: 2825299200,
//   sourceInterval: 15,
//   exchangeDataDelayedBy: 0,
//   exchangeTimezoneName: "UTC",
//   exchangeTimezoneShortName: "UTC",
//   gmtOffSetMilliseconds: 0,
//   esgPopulated: false,
//   tradeable: false,
//   cryptoTradeable: false,
//   symbol: "RUNE-USD",
// });
// .transform((data) => ({
//   shortName: data.symbol,
//   currency: "USD",
//   marketCap: null,
//   regularMarketVolume: data.quoteVolume,
//   sharesOutstanding: data.volume,
//   regularMarketPrice
// }));

export type CryptoSchemaType = z.infer<typeof CryptoSchema>;
