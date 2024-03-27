import { Box, Card, Grid, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";
import { Blog1Svg } from "@/static/svgs/blog1";
import { Blog2Svg } from "@/static/svgs/blog2";
import { Blog3Svg } from "@/static/svgs/blog3";
import { Blog4Svg } from "@/static/svgs/blog4";
import { Blog5Svg } from "@/static/svgs/blog5";
// import Lottie from "react-lottie";
// import * as animationData from "../../../static/json/mobileInvestment.json";

interface IBlog {}

const blogs = [
  {
    icon: <Blog1Svg />,
  },
  {
    icon: <Blog2Svg />,
  },
  {
    icon: <Blog3Svg />,
  },
  {
    icon: <Blog4Svg />,
  },
  {
    icon: <Blog5Svg />,
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
        <Grid item md={4} xs={6} key={index}>
          <Card>
            {blog.icon}
            {/* <Lottie
              options={defaultOptions}
              height={260}
              width={300}
              //   isStopped={this.state.isStopped}
              //   isPaused={this.state.isPaused}
            /> */}
            <Box
              display={"flex"}
              flexDirection={"column"}
              gap={"16px"}
              alignItems={"flex-start"}
              p={2}
            >
              <Box>News</Box>

              <Typography variant="h6" gutterBottom>
                Meet your Glide Certified community challenge winners
              </Typography>

              <Typography variant="body1">
                Last month we announced Glide’s first level of certification. To
                celebrate the launch, we challenged our Glide community members
                to share
              </Typography>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export { BlogList };
