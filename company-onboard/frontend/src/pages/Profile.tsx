import React, { useEffect, useState } from "react";
import api from "../api/apiClient";
import { Typography, Box, TextField, Button } from "@mui/material";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/company/me");
        setProfile(res.data.company || {});
      } catch (err) {}
    })();
  }, []);
  const save = async () => {
    try {
      const res = await api.put("/company", profile);
      alert("Saved");
    } catch (err) {
      alert("Failed");
    }
  };
  return (
    <Box>
      <Typography variant="h4">Company Profile</Typography>
      <TextField label="Name" value={profile.name || ""} onChange={(e)=>setProfile({...profile, name: e.target.value})} fullWidth sx={{ mt: 2 }} />
      <Button onClick={save} sx={{ mt: 2 }} variant="contained">Save</Button>
    </Box>
  );
}
