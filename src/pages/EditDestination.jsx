import { useState } from "react";
import { Link as RouterLink } from "react-router";
import { Button, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Form from "react-bootstrap/Form";

function EditDestination() {
  return (
    <div>
      <Container
        fullWidth
        maxWidth="md"
        sx={{
          py: "60px",
        }}
      >
        <Typography variant="h3">Edit Destination</Typography>
        <Box component="form" noValidate autoComplete="off" sx={{ mt: "20px" }}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Your Destination"
            variant="outlined"
          />
        </Box>
        <Box component="form" noValidate autoComplete="off" sx={{ mt: "20px" }}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Distance"
            variant="outlined"
          />
        </Box>
        <Box component="form" noValidate autoComplete="off" sx={{ mt: "20px" }}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Estimate Cost"
            variant="outlined"
          />
        </Box>
        <Box
          sx={{
            backgroundColor: "green",
            display: "flex",
            justifyContent: "center",
            mt: "20px",
          }}
        >
          <Form.Group controlId="formFileLg" className="mb-3">
            <Form.Control type="file" size="lg" />
          </Form.Group>
        </Box>
        <Button size="small">Edit</Button>
      </Container>
    </div>
  );
}

export default EditDestination;
