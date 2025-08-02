import { useState } from "react";
import { Link as RouterLink } from "react-router";
import { Typography } from "@mui/material";

function Home() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Typography variant="h6">Welcome To Travel Planner</Typography>
    </div>
  );
}

export default Home;
