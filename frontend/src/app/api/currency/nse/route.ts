import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";

export async function GET() {
  try {
    const result = await fetch(
      "https://query1.finance.yahoo.com/v1/finance/screener?crumb=2kMRwZO2CxU&lang=en-US&region=US&formatted=true&corsDomain=finance.yahoo.com",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          getSetCookie:
            "tbla_id=46a36958-b11b-4820-aae9-d61e45b560e0-tuctb2de75b; OTH=v=2&s=2&d=eyJraWQiOiIwMTY0MGY5MDNhMjRlMWMxZjA5N2ViZGEyZDA5YjE5NmM5ZGUzZWQ5IiwiYWxnIjoiUlMyNTYifQ.eyJjdSI6eyJndWlkIjoiUUZaVEtIS05aSVFaTk9KSEVSMlhXU0c3NUkiLCJwZXJzaXN0ZW50Ijp0cnVlLCJzaWQiOiJaMUtFRXN4NVVEMXkifX0.gDpldeCALmENShn8KWhO2AtwKVySCKVLkKuvCi1ciUbTParPwqCUcVIW1VhdBy69xkvehKBDo9hr8vjhQ9Jd-Afsl1YxIsyMfyTEftrYKhjU5u0UUyJSScRFP67MXMjEnGlx7XOUE_z0JiwuQUQEp6vcvtMoPNKCmldClXYe1ns; T=af=JnRzPTE3MTExMzY5MzgmcHM9Ry5vMzZ1TGdnclBaNXNxcV9GdFlndy0t&d=bnMBeWFob28BZwFRRlpUS0hLTlpJUVpOT0pIRVIyWFdTRzc1SQFhYwFBSDBZOEx1TgFhbAFzaGl2YW1jaGFtb2xpMTk5N0BnbWFpbC5jb20Bc2MBbWJyX3JlZ2lzdHJhdGlvbgFmcwFiUkJ1eXBwbF9lQ3EBenoBcUNlL2xCQTdFAWEBUUFFAWxhdAFxQ2UvbEIBbnUBMA--&kt=EAAJg4QlD2O3vhAq5w1OWAkhw--~I&ku=FAATWJr0Es3ZfeUIdmC2AfAlqTM8E1Z65xBWEfoHsuSIGVbF1OqT5SzCtoSFFqs.AAQ_8HuQgd1sWMkV4g5k.4xXO3nKXIoEhYiVYuK0OtJkKViJN8wfBKiojDbpEhy23H_PUdFH3tRPB_IGsag1WxtCSqyhSKqJ_KGbBg1JBhh3DE-~E; F=d=XtNBnlM9vGtBZlvqPu1p5V3kiDl9i3qt9fm28tRVpc_DPnO1fIOZ4zI0nDkiVBE-; PH=l=en-US; Y=v=1&n=2fp8egna8dcjp&l=2ov4xponwl605d0uvshwdwn3pb0bvnan8o4ffl0w/o&p=n31vvin00000000&r=1d6&intl=us; GUC=AQEACAJl_ylmMEIbjARN&s=AQAAAE3do3s7&g=Zf3gug; A1=d=AQABBDTSJ2QCEEyK-nsFkPCgEvKrR2qcMAMFEgEACAIp_2UwZtwZyyMA_eMBAAcINNInZGqcMAMID_HukVfj2DwmJeg-Uar12wkBBwoBuQ&S=AQAAAjuTikD6Y0wp7XStaSgtNGs; A3=d=AQABBDTSJ2QCEEyK-nsFkPCgEvKrR2qcMAMFEgEACAIp_2UwZtwZyyMA_eMBAAcINNInZGqcMAMID_HukVfj2DwmJeg-Uar12wkBBwoBuQ&S=AQAAAjuTikD6Y0wp7XStaSgtNGs; DSS=ts=1681539941&cnt=0&sdts=1711468805&sdtp=mcafee; A1S=d=AQABBDTSJ2QCEEyK-nsFkPCgEvKrR2qcMAMFEgEACAIp_2UwZtwZyyMA_eMBAAcINNInZGqcMAMID_HukVfj2DwmJeg-Uar12wkBBwoBuQ&S=AQAAAjuTikD6Y0wp7XStaSgtNGs; cmp=t=1712325985&j=0&u=1YNN; gpp=DBAA; gpp_sid=-1; PRF=t%3DBGFV%252BAPI%252BRS%26newChartbetateaser%3D0%252C1712378115263; axids=gam=y-G.Qiu2lG2uJnVXfme5fKJ03xfcy7gRfhj4ZkZEIMzb4JoI.M_w---A&dv360=eS00R0NlZWdKRTJ1SHZEdHNzTU1ZT2RrY2FBeThCcWxZZXBuaWJYY2M4NWJkNDdUUkR6Ym9jYm1fei5YWHNlbEpLMlREZn5B&ydsp=y-hclpFeBE2uKih9s2SA42CnUvpNUP.FTfAFkZdr0uGOhLbWMDgznSWiEsevs0PTIBiiWH~A&tbla=y-lruobC5G2uLyXPpslbwyPiuDaTBbX6KR6nhTdK4v58U7_16PCw---A; __gpi=UID=00000d71905cec22:T=1711633298:RT=1712343564:S=ALNI_Mb5ZFKQKvJcev1RfCyqAgvDagcIaQ; __eoi=ID=15e4ab6630d4b59a:T=1711633298:RT=1712343564:S=AA-AfjZzv_55rjXz_EfbPaY7I3-4",
        },
        body: JSON.stringify({
          size: 250,
          offset: 0,
          sortField: "intradaymarketcap",
          sortType: "DESC",
          quoteType: "EQUITY",
          topOperator: "AND",
          query: {
            operator: "AND",
            operands: [
              {
                operator: "or",
                operands: [
                  {
                    operator: "EQ",
                    operands: ["region", "in"],
                  },
                ],
              },
            ],
          },
          userId: "QFZTKHKNZIQZNOJHER2XWSG75I",
          userIdType: "guid",
        }),
      }
    );
    return Response.json(result);
  } catch (error) {
    console.log("error: ", error);
    if (isDynamicServerError(error)) {
      throw error;
    }
    return Response.json([]);
  }
}
