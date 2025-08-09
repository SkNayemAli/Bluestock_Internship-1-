import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import MultiStepForm from "./pages/Register/MultiStepForm";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import { Container, AppBar, Toolbar, Button, Typography } from "@mui/material";
import ProtectedRoute from "./components/ProtectedRoute";
import { useDispatch } from "react-redux";
import { logout } from "./features/auth/authSlice";

function App() {
  const dispatch = useDispatch();
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Bluestock - Company Registration
          </Typography>
          <Button color="inherit" component={Link} to="/">Register</Button>
          <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
          <Button color="inherit" onClick={() => dispatch(logout())}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<MultiStepForm />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
