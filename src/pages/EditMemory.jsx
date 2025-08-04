import { useState } from "react";
import { Link as RouterLink } from "react-router";
import { Grid, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function EditMemory() {
  return (
    <div>
      <Container
        fullWidth
        maxWidth="md"
        sx={{
          py: "60px",
        }}
      >
        <Typography variant="h3">Edit Memory</Typography>

        <Box component="form" noValidate autoComplete="off" sx={{ mt: "20px" }}>
          <Typography>Room November</Typography>
          <TextField
            fullWidth
            id="outlined-multiline-static"
            label="Memory Of The Trip"
            multiline
            rows={4}
          />
        </Box>

        <Button size="small">Back</Button>
      </Container>
    </div>
  );
}

export default EditMemory;
