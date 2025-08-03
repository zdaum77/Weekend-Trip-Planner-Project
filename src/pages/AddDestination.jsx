import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Form from "react-bootstrap/Form";
import { nanoid } from "nanoid";
import Swal from "sweetalert2";

function AddDestination() {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [distance, setDistance] = useState("");
  const [cost, setCost] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!destination || !distance || !cost || !image) {
      Swal.fire(
        "Error",
        "Please fill in all fields and upload an image.",
        "error"
      );
      return;
    }

    const newPost = {
      id: nanoid(),
      destination,
      distance,
      cost,
      image,
    };

    const existingPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const updatedPosts = [...existingPosts, newPost];
    localStorage.setItem("posts", JSON.stringify(updatedPosts));

    Swal.fire({
      title: "Success!",
      text: "Your destination has been saved.",
      icon: "success",
      confirmButtonText: "Back to Home",
    }).then(() => {
      navigate("/destination");
    });

    // Clear form
    setDestination("");
    setDistance("");
    setCost("");
    setImage(null);
  };

  return (
    <div>
      <Container maxWidth="md" sx={{ py: "60px" }}>
        <Typography variant="h3">Add Destination</Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
          sx={{ mt: "20px" }}
        >
          <TextField
            fullWidth
            label="Your Destination"
            variant="outlined"
            onChange={(e) => setDestination(e.target.value)}
            value={destination}
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            label="Distance"
            variant="outlined"
            onChange={(e) => setDistance(e.target.value)}
            value={distance}
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            label="Estimate Cost"
            variant="outlined"
            onChange={(e) => setCost(e.target.value)}
            value={cost}
            sx={{ mb: 3 }}
          />

          <Box
            sx={{
              backgroundColor: "green",
              display: "flex",
              justifyContent: "center",
              mb: 3,
              py: 2,
            }}
          >
            <Form.Group controlId="formFileLg" className="mb-3">
              <Form.Control
                type="file"
                size="lg"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setImage(reader.result);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </Form.Group>
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Create Post
          </Button>
        </Box>
      </Container>
    </div>
  );
}

export default AddDestination;
