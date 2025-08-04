import { useState } from "react";
import { Link as RouterLink } from "react-router";
import { Card, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function EditTrip() {
  return (
    <div>
      <Typography variant="h3" sx={{ m: 5 }}>
        Trip Planner
      </Typography>
      <Card>
        <Typography variant="h5">Trip Name: Valorant</Typography>
        <Box component="form" noValidate autoComplete="off" sx={{ mt: "20px" }}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Activies"
            variant="outlined"
          />
        </Box>
        <Box component="form" noValidate autoComplete="off" sx={{ mt: "20px" }}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Budget"
            variant="outlined"
          />
        </Box>
        <Box component="form" noValidate autoComplete="off" sx={{ mt: "20px" }}>
          <TextField
            fullWidth
            id="outlined-multiline-static"
            label="Packing List"
            multiline
            rows={4}
          />
        </Box>
      </Card>
      <Button size="small">Done</Button>
    </div>
  );
}

export default EditTrip;
