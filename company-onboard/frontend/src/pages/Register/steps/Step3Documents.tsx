import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Box, Input } from "@mui/material";

export default function Step3Documents({ onBack, onSubmit }: any) {
  const { handleSubmit, control, register } = useForm();
  return (
    <form onSubmit={handleSubmit((v) => onSubmit(v))}>
      <input {...register("logo")} type="file" accept="image/*" />
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button variant="outlined" onClick={onBack}>Back</Button>
        <Button type="submit" variant="contained">Submit</Button>
      </Box>
    </form>
  );
}
