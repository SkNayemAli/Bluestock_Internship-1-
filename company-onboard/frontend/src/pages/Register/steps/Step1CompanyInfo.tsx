import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

type Props = {
  onNext?: (values: any) => void;
};

export default function Step1CompanyInfo({ onNext }: Props) {
  const { handleSubmit, control } = useForm();

  const UploadBox = ({ helper, onChange }: any) => (
    <Paper
      variant="outlined"
      sx={{
        height: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "2px dashed #cfd8dc",
        bgcolor: "#fafafa",
        borderRadius: 2,
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <CloudUploadOutlinedIcon sx={{ fontSize: 42, color: "#9aa5b1", mb: 1 }} />
        <Typography component="span" sx={{ color: "#1a73e8", fontWeight: 600 }}>
          Browse photo
        </Typography>
        <Typography component="span" sx={{ color: "#9aa5b1" }}>
          {" "}
          or drop here
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, color: "#9aa5b1" }}>
          {helper}
        </Typography>
        <input type="file" hidden onChange={onChange} accept="image/*" />
      </Box>
    </Paper>
  );

  return (
    <Box component="form" onSubmit={handleSubmit((v) => onNext?.(v))}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
        Logo &amp; Banner Image
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography sx={{ mb: 1, fontWeight: 600, color: "#263238" }}>
            Upload Logo
          </Typography>
          <Controller
            name="logo"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <UploadBox
                helper="A photo larger than 400 pixels works best. Max photo size 5 MB."
                onChange={(e: any) => field.onChange(e.target.files?.[0] ?? null)}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography sx={{ mb: 1, fontWeight: 600, color: "#263238" }}>
            Banner Image
          </Typography>
          <Controller
            name="banner"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <UploadBox
                helper="Optimal: 1520x400, JPEG/PNG, Max 5 MB."
                onChange={(e: any) => field.onChange(e.target.files?.[0] ?? null)}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography sx={{ mb: 1, fontWeight: 600, color: "#263238" }}>
            Company name
          </Typography>
          <Controller
            name="companyName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} placeholder="Enter your company name" fullWidth />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography sx={{ mb: 1, fontWeight: 600, color: "#263238" }}>
            About Us
          </Typography>
          <Controller
            name="about"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="Write about your company here..."
                fullWidth
                multiline
                minRows={5}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button type="submit" variant="contained" sx={{ px: 4 }}>
            Save &amp; Continue
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
