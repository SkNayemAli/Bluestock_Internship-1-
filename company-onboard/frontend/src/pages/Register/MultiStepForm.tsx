import React, { useMemo, useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import Step1CompanyInfo from "./steps/Step1CompanyInfo";
import Step2Address from "./steps/Step2Address";
import Step3Documents from "./steps/Step3Documents";

/**
 * Nav labels + icons to mirror the design.
 * We'll hook the remaining steps as you share their UIs.
 */
const NAV = [
  { label: "Company Info", icon: <PersonOutlineOutlinedIcon fontSize="small" /> },
  { label: "Founding Info", icon: <ApartmentOutlinedIcon fontSize="small" /> },
  { label: "Social Media Profile", icon: <PublicOutlinedIcon fontSize="small" /> },
  { label: "Contact", icon: <ChatBubbleOutlineOutlinedIcon fontSize="small" /> },
];

export default function MultiStepForm() {
  const [active, setActive] = useState(0);
  const percent = useMemo(() => Math.round((active / (NAV.length - 1)) * 100), [active]);

  return (
    <Box>
      {/* Header strip (logo + tabs + setup progress) */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          py: 2,
          borderBottom: "1px solid #eceff1",
          px: 2,
          bgcolor: "#fff",
        }}
      >
        {/* Brand (swap for your real logo if you have one in /public/logo.png) */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* <img src="/logo.png" alt="HireNext" width={28} height={28} /> */}
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: "8px",
              background: "linear-gradient(135deg,#ff6b6b,#7c4dff)",
            }}
          />
          <Typography sx={{ fontSize: 20, fontWeight: 700, letterSpacing: 0.2 }}>
            HireNext<span style={{ color: "#5a6cf3" }}>.</span>
          </Typography>
        </Box>

        {/* Tabs */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3, flex: 1 }}>
          {NAV.map((item, idx) => {
            const activeTab = idx === active;
            return (
              <Box
                key={item.label}
                onClick={() => setActive(idx)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: activeTab ? "#1a73e8" : "#8a94a6",
                  cursor: "pointer",
                  pb: 1.25,
                  borderBottom: activeTab ? "3px solid #1a73e8" : "3px solid transparent",
                }}
              >
                {item.icon}
                <Typography sx={{ fontWeight: 600, fontSize: 16 }}>{item.label}</Typography>
              </Box>
            );
          })}
        </Box>

        {/* Setup Progress */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography sx={{ color: "#697386" }}>Setup Progress</Typography>
          <Typography sx={{ color: "#1a73e8", fontWeight: 700 }}>{percent}%</Typography>
          <Typography sx={{ color: "#1a73e8" }}>Completed</Typography>
        </Box>
      </Box>

      {/* Content surface */}
      <Box sx={{ p: 3 }}>
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          {active === 0 && <Step1CompanyInfo onNext={() => setActive(1)} />}
          {active === 1 && <Step2Address onNext={() => setActive(2)} onBack={() => setActive(0)} />}
          {active === 2 && <Step3Documents onBack={() => setActive(1)} onSubmit={() => setActive(3)} />}
          {active === 3 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                Contact
              </Typography>
              <Typography color="text.secondary">The Contact step UI will be added next.</Typography>
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
}
