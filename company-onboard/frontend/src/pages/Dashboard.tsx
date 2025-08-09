import React, { useEffect, useState } from "react";
import api from "../api/apiClient";
import { Typography, Box, Card, CardContent } from "@mui/material";

export default function Dashboard() {
  const [company, setCompany] = useState<any>(null);
  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/company/me");
        setCompany(res.data.company);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);
  return (
    <Box>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      {company ? (
        <Card><CardContent>
          <Typography variant="h6">{company.name}</Typography>
          <Typography>{company.address}</Typography>
        </CardContent></Card>
      ) : <Typography>No company found yet</Typography>}
    </Box>
  );
}
