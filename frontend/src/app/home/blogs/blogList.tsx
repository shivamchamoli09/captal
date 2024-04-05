"use"
import { Box, Card, Chip, Grid, Link, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";
import { Blog1Svg } from "@/static/svgs/blog1";
import { Blog2Svg } from "@/static/svgs/blog2";
import { Blog3Svg } from "@/static/svgs/blog3";
import { Blog4Svg } from "@/static/svgs/blog4";
import { Blog5Svg } from "@/static/svgs/blog5";

interface IBlog {}

const blogs: Array<{
  icon: JSX.Element;
  chipColor:
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
  chipLabel: string;
  url?: string;
  title: string;
  subtitle: string;
}> = [
  {
    icon: <Blog1Svg />,
    chipColor: "success",
    chipLabel: "News",
    url: "https://finance.yahoo.com/news/global-markets-stocks-head-quarter-131844922.html",
    title: "Stocks head into quarter-end on the up; yen on intervention watch",
    subtitle:
      "Global shares rose on Thursday, heading for their second quarterly gain, while a strong dollar kept the yen languishing near its weakest in decades, with the threat of intervention from Japanese authorities warding...",
  },
  {
    icon: <Blog3Svg />,
    chipColor: "error",
    chipLabel: "Crypto",
    url: "https://finance.yahoo.com/news/us-uk-probe-20-billion-130343584.html",
    title:
      "US and UK Probe $20 Billion of Crypto Transfers to Russian Exchange",
    subtitle:
      "The US and UK are reviewing more than $20 billion of cryptocurrency transactions that passed through a Russia-based virtual exchange, according to people familiar with...",
  },
  {
    icon: <Blog2Svg />,
    chipColor: "warning",
    chipLabel: "Crypto",
    url: "https://finance.yahoo.com/news/1-us-cryptocurrency-etf-inflows-131223967.html",
    title: "US cryptocurrency ETF inflows pick up as bitcoin price recovers",
    subtitle:
      "Inflows into the nine recently launched exchange-traded funds (ETFs) tied to bitcoin have resumed their upward trajectory this week after the cryptocurrency's price bounced back from its dip last week.",
  },
  {
    icon: <Blog4Svg />,
    chipColor: "info",
    chipLabel: "News",
    url: "https://www.indiratrade.com/blog/top-5-stock-market-bubbles-%7C-history-of-biggest-5-stock-market-crash/8313",
    title:
      "Top 5 Stock Market Bubbles | History of Biggest 5 stock market crash",
    subtitle:
      "A market bubble is a period of excessive enthusiasm and inflated asset prices driven by speculative buying, detached from the true underlying value. This speculative fervor often leads to...",
  },
  {
    icon: <Blog5Svg />,
    chipColor: "success",
    chipLabel: "Funding",
    url: "https://finance.yahoo.com/news/cybersecurity-platform-coro-raises-100-132041044.html",
    title:
      "Cybersecurity platform Coro raises $100 mln at valuation of $750 mln",
    subtitle:
      "Coro, a U.S.-Israeli cybersecurity platform for small and medium-sized businesses (SMEs), has raised $100 million in a private funding round at a company valuation of $750 million, it said on Thursday.",
  },
  {
    icon: <Blog5Svg />,
    chipColor: "success",
    chipLabel: "Funding",
    url: "https://finance.yahoo.com/news/cybersecurity-platform-coro-raises-100-132041044.html",
    title:
      "Cybersecurity platform Coro raises $100 mln at valuation of $750 mln",
    subtitle:
      "Coro, a U.S.-Israeli cybersecurity platform for small and medium-sized businesses (SMEs), has raised $100 million in a private funding round at a company valuation of $750 million, it said on Thursday.",
  },
];
// const defaultOptions = {
//   loop: true,
//   autoplay: true,
//   animationData: animationData,
//   rendererSettings: {
//     preserveAspectRatio: "xMidYMid slice",
//   },
// };

const BlogList: React.FC<IBlog> = () => {
  return (
    <Grid container spacing={2} height={"100%"} alignItems={"center"}>
      {blogs.map((blog, index) => (
        <Grid item md={4} sm={6} xs={12} key={index}>
          <Card>
            {blog.icon}
            <Box
              display={"flex"}
              flexDirection={"column"}
              gap={"16px"}
              alignItems={"flex-start"}
              p={2}
            >
              <Chip color={blog.chipColor} label={blog.chipLabel!} />

              <Link rel="noopener noreferrer" href={blog.url} target="_blank">
                <Typography variant="h6" gutterBottom fontStyle={"italic"}>
                  {blog.title}
                </Typography>
              </Link>

              {/* <Typography variant="body1">{blog.subtitle}</Typography> */}
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export { BlogList };
