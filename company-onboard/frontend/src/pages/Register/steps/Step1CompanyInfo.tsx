import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Box } from "@mui/material";

export default function Step1CompanyInfo({ onNext }: any) {
  const { handleSubmit, control } = useForm();

  return (
    <form onSubmit={handleSubmit((v) => onNext(v))}>
      <Controller name="name" control={control} defaultValue="" render={({ field }) => <TextField {...field} label="Company Name" fullWidth sx={{ mb: 2 }} />} />
      <Controller name="type" control={control} defaultValue="" render={({ field }) => <TextField {...field} label="Company Type" fullWidth sx={{ mb: 2 }} />} />
      <Controller name="ownerName" control={control} defaultValue="" render={({ field }) => <TextField {...field} label="Owner Full Name" fullWidth sx={{ mb: 2 }} />} />
      <Controller name="ownerEmail" control={control} defaultValue="" render={({ field }) => <TextField {...field} label="Owner Email" fullWidth sx={{ mb: 2 }} />} />
      <Controller name="ownerPassword" control={control} defaultValue="" render={({ field }) => <TextField {...field} label="Password" type="password" fullWidth sx={{ mb: 2 }} />} />
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button type="submit" variant="contained">Next</Button>
      </Box>
    </form>
  );
}
