import yahooFinance from "yahoo-finance2";
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";

const symbols = [
  "BTC-USD",
  "ETH-USD",
  "USDT-USD",
  "BNB-USD",
  "SOL-USD",
  "XRP-USD",
  "STETH-USD",
  "USDC-USD",
  "DOGE-USD",
  "ADA-USD",
  "AVAX-USD",
  "TON11419-USD",
  "SHIB-USD",
  "DOT-USD",
  "BCH-USD",
  "LINK-USD",
  "WBTC-USD",
  "TRX-USD",
  "WTRX-USD",
  "MATIC-USD",
  "ICP-USD",
  "UNI7083-USD",
  "LTC-USD",
  "NEAR-USD",
  "APT21794-USD",
  "LEO-USD",
  "DAI-USD",
  "STX4847-USD",
  "FIL-USD",
  "ETC-USD",
  "ATOM-USD",
  "IMX10603-USD",
  "ARB11841-USD",
  "WIF-USD",
  "MNT27075-USD",
  "RNDR-USD",
  "CRO-USD",
  "XLM-USD",
  "HBAR-USD",
  "WHBAR-USD",
  "BTCB-USD",
  "OKB-USD",
  "GRT6719-USD",
  "OP-USD",
  "PEPE24478-USD",
  "MKR-USD",
  "INJ-USD",
  "VET-USD",
  "WBETH-USD",
  "TAO22974-USD",
  "KAS-USD",
  "RUNE-USD",
  "THETA-USD",
  "FTM-USD",
  "FET-USD",
  "FDUSD-USD",
  "TIA22861-USD",
  "LDO-USD",
  "AR-USD",
  "XMR-USD",
  "FLOKI-USD",
  "SUI20947-USD",
  "SEI-USD",
  "ALGO-USD",
  "GALA-USD",
  "RETH-USD",
  "JUP29210-USD",
  "FLOW-USD",
  "BSV-USD",
  "AAVE-USD",
  "CFX-USD",
  "BONK-USD",
  "BEAM28298-USD",
  "AGIX-USD",
  "QNT-USD",
  "EGLD-USD",
  "DYDX-USD",
  "SAND-USD",
  "STRK22691-USD",
  "AXS-USD",
  "BTT-USD",
  "USDE29470-USD",
  "SNX-USD",
  "ORDI-USD",
  "BGB-USD",
  "PYTH-USD",
  "ZBU-USD",
  "XTZ-USD",
  "WLD-USD",
  "MINA-USD",
  "CHZ-USD",
  "XEC-USD",
  "FLR-USD",
  "CORE23254-USD",
  "MANA-USD",
  "AXL17799-USD",
  "ONDO-USD",
  "MSOL-USD",
  "VBNB-USD",
  "RON14101-USD",
  "EOS-USD",
  "APE18876-USD",
  "AKT-USD",
  "CAKE-USD",
  "NEO-USD",
  "1000SATS-USD",
  "KAVA-USD",
  "IOTA-USD",
  "PENDLE-USD",
  "JASMY-USD",
  "KCS-USD",
  "WBNB-USD",
  "GT-USD",
  "ETHDYDX-USD",
  "HNT-USD",
  "KLAY-USD",
  "CHEEL-USD",
  "RBN-USD",
  "ROSE-USD",
  "GNO-USD",
  "BLUR-USD",
  "OSMO-USD",
  "LUNC-USD",
  "AIOZ-USD",
  "BTG-USD",
  "DYM-USD",
  "CKB-USD",
  "WEMIX-USD",
  "WOO-USD",
  "BOME-USD",
  "CRV-USD",
  "PRIME23711-USD",
  "XRD-USD",
  "RVN-USD",
  "ASTR-USD",
  "LUNA20314-USD",
  "ETHFI-USD",
  "OCEAN-USD",
  "MANTA-USD",
  "NEXO-USD",
  "CBETH-USD",
  "USDD-USD",
  "1INCH-USD",
  "IOTX-USD",
  "BRETT29743-USD",
  "ENJ-USD",
  "GMT18069-USD",
  "ALT29073-USD",
  "XDC-USD",
  "ENS-USD",
  "ZRX-USD",
  "ORBR-USD",
  "SUPER8290-USD",
  "CELO-USD",
  "FRAX-USD",
  "ZIL-USD",
  "COMP5692-USD",
  "FTT-USD",
  "SKL-USD",
  "GLM-USD",
  "FXS-USD",
  "RPL-USD",
  "HOT2682-USD",
  "LPT-USD",
  "PIXEL29335-USD",
  "SC-USD",
  "MEW30126-USD",
  "TWT-USD",
  "DEXE-USD",
  "OM-USD",
  "SSV-USD",
  "NFT9816-USD",
  "ANKR-USD",
  "XAUT-USD",
  "RAY-USD",
  "FTN-USD",
  "POLYX-USD",
  "RSR-USD",
  "ID21846-USD",
  "TFUEL-USD",
  "MASK8536-USD",
  "ETHW-USD",
  "LRC-USD",
  "WKAVA-USD",
  "GAL11877-USD",
  "METIS-USD",
  "ILV-USD",
  "ZETA-USD",
  "PAAL-USD",
  "QTUM-USD",
  "TUSD-USD",
  "ZEC-USD",
  "BAT-USD",
  "TRAC-USD",
  "CFG-USD",
  "T-USD",
  "ELF-USD",
  "CSPR-USD",
  "GAS-USD",
  "XEM-USD",
  "DASH-USD",
  "BICO-USD",
  "FLUX-USD",
];

async function getQuotes(symbols: Array<string>) {
  try {
    let result = [];
    for (const q of symbols) {
      result.push(
        await yahooFinance.quoteCombine(q, {}, { validateResult: false })
      );
    }
    return result;
  } catch (error) {
    return [];
  }
}

export async function GET() {
  try {
    let pairs = [];
    let currPair: string[] = [];
    for (let i = 0; i < symbols.length; i++) {
      if (i === 0 || i % 15 !== 0) {
        currPair.push(symbols[i]);
        if (i === symbols.length - 1) pairs.push(currPair);
      } else {
        pairs.push(currPair);
        currPair = [symbols[i]];
      }
    }
    const promises = [];
    for (const pair of pairs) {
      promises.push(getQuotes(pair));
    }
    let data = await Promise.all(promises);
    const result: any[] = [];
    data.forEach((res) => {
      result.push(...res);
    });
    return Response.json(result);
  } catch (error) {
    console.log("error: ", error);
    if (isDynamicServerError(error)) {
      throw error;
    }
    return Response.json([]);
  }
}
