import React from "react";
import { Box, Typography, LinearProgress } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ApartmentIcon from "@mui/icons-material/Apartment";
import LanguageIcon from "@mui/icons-material/Language";
import ContactMailIcon from "@mui/icons-material/ContactMail";

interface Props {
  steps: string[];
  active: number;
  progress: number;
}

export default function Header({ steps, active, progress }: Props) {
  const icons = [<PersonIcon />, <ApartmentIcon />, <LanguageIcon />, <ContactMailIcon />];

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
      <Box display="flex" gap={4}>
        {steps.map((s, i) => (
          <Box
            key={s}
            display="flex"
            alignItems="center"
            gap={1}
            sx={{ color: active === i ? "blue" : "gray" }}
          >
            {icons[i]}
            <Typography>{s}</Typography>
          </Box>
        ))}
      </Box>
      <Box textAlign="right">
        <Typography variant="body2">Setup Progress</Typography>
        <Typography variant="body2" color="primary">
          {progress}% Completed
        </Typography>
        <LinearProgress variant="determinate" value={progress} sx={{ mt: 0.5 }} />
      </Box>
    </Box>
  );
}
