const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function addProxyMiddleware(app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target:
        "https://query1.finance.yahoo.com/v1/finance/screener?crumb=2kMRwZO2CxU&lang=en-US&region=US&formatted=true&corsDomain=finance.yahoo.com",
      changeOrigin: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers":
          "X-Requested-With, content-type, Authorization",
        authority: "finance.yahoo.com",
        accept: "text/html,application/xhtml+xml,application/xml",
        cookie:
          "DSS=ts=1681539941&cnt=0&sdts=1710956485&sdtp=mcafee; gpp=DBAA; gpp_sid=-1; tbla_id=46a36958-b11b-4820-aae9-d61e45b560e0-tuctb2de75b; OTH=v=2&s=2&d=eyJraWQiOiIwMTY0MGY5MDNhMjRlMWMxZjA5N2ViZGEyZDA5YjE5NmM5ZGUzZWQ5IiwiYWxnIjoiUlMyNTYifQ.eyJjdSI6eyJndWlkIjoiUUZaVEtIS05aSVFaTk9KSEVSMlhXU0c3NUkiLCJwZXJzaXN0ZW50Ijp0cnVlLCJzaWQiOiJaMUtFRXN4NVVEMXkifX0.gDpldeCALmENShn8KWhO2AtwKVySCKVLkKuvCi1ciUbTParPwqCUcVIW1VhdBy69xkvehKBDo9hr8vjhQ9Jd-Afsl1YxIsyMfyTEftrYKhjU5u0UUyJSScRFP67MXMjEnGlx7XOUE_z0JiwuQUQEp6vcvtMoPNKCmldClXYe1ns; T=af=JnRzPTE3MTExMzY5MzgmcHM9Ry5vMzZ1TGdnclBaNXNxcV9GdFlndy0t&d=bnMBeWFob28BZwFRRlpUS0hLTlpJUVpOT0pIRVIyWFdTRzc1SQFhYwFBSDBZOEx1TgFhbAFzaGl2YW1jaGFtb2xpMTk5N0BnbWFpbC5jb20Bc2MBbWJyX3JlZ2lzdHJhdGlvbgFmcwFiUkJ1eXBwbF9lQ3EBenoBcUNlL2xCQTdFAWEBUUFFAWxhdAFxQ2UvbEIBbnUBMA--&kt=EAAJg4QlD2O3vhAq5w1OWAkhw--~I&ku=FAATWJr0Es3ZfeUIdmC2AfAlqTM8E1Z65xBWEfoHsuSIGVbF1OqT5SzCtoSFFqs.AAQ_8HuQgd1sWMkV4g5k.4xXO3nKXIoEhYiVYuK0OtJkKViJN8wfBKiojDbpEhy23H_PUdFH3tRPB_IGsag1WxtCSqyhSKqJ_KGbBg1JBhh3DE-~E; F=d=XtNBnlM9vGtBZlvqPu1p5V3kiDl9i3qt9fm28tRVpc_DPnO1fIOZ4zI0nDkiVBE-; PH=l=en-US; Y=v=1&n=2fp8egna8dcjp&l=2ov4xponwl605d0uvshwdwn3pb0bvnan8o4ffl0w/o&p=n31vvin00000000&r=1d6&intl=us; axids=gam=y-G.Qiu2lG2uJnVXfme5fKJ03xfcy7gRfhj4ZkZEIMzb4JoI.M_w---A&dv360=eS00R0NlZWdKRTJ1SHZEdHNzTU1ZT2RrY2FBeThCcWxZZXBuaWJYY2M4NWJkNDdUUkR6Ym9jYm1fei5YWHNlbEpLMlREZn5B&ydsp=y-hclpFeBE2uKih9s2SA42CnUvpNUP.FTfAFkZdr0uGOhLbWMDgznSWiEsevs0PTIBiiWH~A&tbla=y-lruobC5G2uLyXPpslbwyPiuDaTBbX6KR6nhTdK4v58U7_16PCw---A; GUC=AQEACAJl_ylmMEIbjARN&s=AQAAAE3do3s7&g=Zf3gug; A1=d=AQABBDTSJ2QCEEyK-nsFkPCgEvKrR2qcMAMFEgEACAIp_2UwZtwZyyMA_eMBAAcINNInZGqcMAMID_HukVfj2DwmJeg-Uar12wkBBwoBuQ&S=AQAAAjuTikD6Y0wp7XStaSgtNGs; A3=d=AQABBDTSJ2QCEEyK-nsFkPCgEvKrR2qcMAMFEgEACAIp_2UwZtwZyyMA_eMBAAcINNInZGqcMAMID_HukVfj2DwmJeg-Uar12wkBBwoBuQ&S=AQAAAjuTikD6Y0wp7XStaSgtNGs; A1S=d=AQABBDTSJ2QCEEyK-nsFkPCgEvKrR2qcMAMFEgEACAIp_2UwZtwZyyMA_eMBAAcINNInZGqcMAMID_HukVfj2DwmJeg-Uar12wkBBwoBuQ&S=AQAAAjuTikD6Y0wp7XStaSgtNGs; PRF=t%3DAPI%252BRS%26newChartbetateaser%3D0%252C1712378115263; cmp=t=1711198611&j=0&u=1YNN; __gpi=UID=00000d59fa6da2f1:T=1711198614:RT=1711198614:S=ALNI_MZp8gUBpA4Hg-lGAgktovs9nt0WGQ; __eoi=ID=e14398a3c1267bb0:T=1711198614:RT=1711198614:S=AA-Afjbvm2AB0a7d3nSJxfx-Vz7E",
        "content-type": "application/json",
      },
    })
  );
};
