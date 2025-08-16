import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Box } from "@mui/material";

export default function Step2Address({ onNext, onBack }: any) {
  const { handleSubmit, control } = useForm();
  return (
    <form onSubmit={handleSubmit((v) => onNext(v))}>
      <Controller name="address" control={control} defaultValue="" render={({ field }) => <TextField {...field} label="Address" fullWidth sx={{ mb: 2 }} />} />
      <Controller name="phone" control={control} defaultValue="" render={({ field }) => <TextField {...field} label="Company Phone" fullWidth sx={{ mb: 2 }} />} />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="outlined" onClick={onBack}>Back</Button>
        <Button type="submit" variant="contained">Next</Button>
      </Box>
    </form>
  );
}