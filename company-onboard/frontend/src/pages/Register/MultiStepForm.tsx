import React, { useState } from "react";
import Step1CompanyInfo from "./steps/Step1CompanyInfo";
import Step2Address from "./steps/Step2Address";
import Step3Documents from "./steps/Step3Documents";
import { Paper, Stepper, Step, StepLabel, Box, Button } from "@mui/material";
import api from "../../api/apiClient";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";

const steps = ["Company Info", "Address", "Documents"];

export default function MultiStepForm() {
  const [active, setActive] = useState(0);
  const [data, setData] = useState<any>({});
  const dispatch = useDispatch();

  const next = (partial: any) => {
    setData((d: any) => ({ ...d, ...partial }));
    setActive((a) => a + 1);
  };
  const back = () => setActive((a) => a - 1);

  const submit = async (finalData: any) => {
    const form = new FormData();
    Object.entries({ ...data, ...finalData }).forEach(([k,v]) => {
      if (v !== undefined && v !== null) form.append(k, v as any);
    });
    try {
      // Create company requires auth middleware; demonstration: register user first
      const reg = await api.post("/auth/register", { email: finalData.ownerEmail, password: finalData.ownerPassword, name: finalData.ownerName, phone: finalData.ownerPhone });
      dispatch(setCredentials({ user: reg.data.user, token: reg.data.token }));
      // now create company
      const res = await api.post("/company", form, { headers: { "Content-Type": "multipart/form-data" } });
      alert("Company created: " + JSON.stringify(res.data.company));
    } catch (err: any) {
      console.error(err);
      alert(err?.response?.data?.message || "Error");
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Stepper activeStep={active} alternativeLabel>
        {steps.map((s) => (
          <Step key={s}><StepLabel>{s}</StepLabel></Step>
        ))}
      </Stepper>
      <Box sx={{ mt: 3 }}>
        {active === 0 && <Step1CompanyInfo onNext={next} />}
        {active === 1 && <Step2Address onNext={next} onBack={back} />}
        {active === 2 && <Step3Documents onBack={back} onSubmit={submit} />}
      </Box>
    </Paper>
  );
}
