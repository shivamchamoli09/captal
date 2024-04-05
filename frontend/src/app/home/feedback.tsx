import { EmailSvg } from "@/static/svgs/form/email";
import { UserSvg } from "@/static/svgs/form/user";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  InputLabel,
  LinearProgress,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const containerStyles = {
  background:
    "radial-gradient(164.42% 139.2% at 0% 3.17%, rgba(0, 150, 255, 0.32) 0%, rgba(255, 222, 106, 0.26) 100%)",
  borderRadius: "50px",
  p: 4,
  maxWidth: "620px",
  m: "auto",
};

const FeedBackForm: React.FC = () => {
  const theme = useTheme();
  const [feedbackSubmit, setFeedbackSubmit] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm({
    defaultValues: {
      email: "",
      name: "",
      feedback: "",
    },
    resolver: zodResolver(
      z.object({
        name: z.string().nullish(),
        email: z
          .string()
          // .email("This is not a valid email.")
          .nullable(),
        feedback: z.string().min(1, "Please add your feedback"),
      })
    ),
  });
  const handleSubmitFeedback = async () => {
    try {
      setIsLoading(true);
      console.log(form.getValues());
      await fetch("/api/feedback", {
        method: "POST",
        body: JSON.stringify(form.getValues()),
      });
      setFeedbackSubmit(true);
      setIsLoading(false);
      form.reset();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <Box sx={containerStyles}>
      <Stack
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        gap={1}
      >
        <Typography variant="h2" gutterBottom>
          Suggestion Box
        </Typography>
        <Typography variant="body1" fontWeight={"normal"}>
          {
            "Unlocking Innovation: Your Feedback Shapes Our Future! 🚀 Share your thoughts on how we can soar even higher and craft the features you crave. Together, let's sculpt the next chapter of excellence!"
          }
        </Typography>
      </Stack>

      <Card sx={{ p: 2, mt: 2 }}>
        <FormProvider {...form}>
          <Stack display={"flex"} flexDirection={"column"} gap={2}>
            <Box display={"flex"} flexDirection={"column"} gap={"5px"}>
              <InputLabel>Name</InputLabel>
              <TextField
                variant="outlined"
                placeholder="Enter you name"
                InputProps={{
                  startAdornment: <UserSvg />,
                  sx: { gap: 1 },
                }}
                {...form.register("name")}
                helperText={form.formState.errors?.name?.message}
              />
            </Box>

            <Box display={"flex"} flexDirection={"column"} gap={"5px"}>
              <InputLabel>Email</InputLabel>
              <TextField
                variant="outlined"
                placeholder="Enter you email"
                InputProps={{
                  startAdornment: <EmailSvg />,
                  sx: { gap: 1 },
                }}
                {...form.register("email")}
                helperText={form.formState.errors?.email?.message}
                FormHelperTextProps={{
                  sx: { color: theme.palette.error.main },
                }}
              />
            </Box>

            <Box display={"flex"} flexDirection={"column"} gap={"5px"}>
              <TextField
                variant="outlined"
                rows={10}
                multiline={true}
                placeholder="Here goes your suggestions&#x1F44A;..."
                {...form.register("feedback")}
                helperText={form.formState.errors?.feedback?.message}
                FormHelperTextProps={{
                  sx: { color: theme.palette.error.main },
                }}
              />
            </Box>
            {feedbackSubmit && (
              <Typography variant="body1" color={"success.main"}>
                Thank you for your valuable feedback. We assure you that we are
                committed to implementing your suggestions promptly to enhance
                our services.
              </Typography>
            )}
            <Button
              disabled={feedbackSubmit || isLoading}
              sx={{ ml: "auto", width: "120px" }}
              onClick={form.handleSubmit(handleSubmitFeedback)}
            >
              {isLoading ? (
                <CircularProgress size={24} color="success" />
              ) : (
                "Submit"
              )}
            </Button>
          </Stack>
        </FormProvider>
      </Card>
    </Box>
  );
};

export { FeedBackForm };
