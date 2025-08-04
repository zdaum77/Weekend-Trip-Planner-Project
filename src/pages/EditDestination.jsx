import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Typography,
  Button,
  Container,
  Box,
  TextField,
  Stack,
  Alert,
} from "@mui/material";
import Swal from "sweetalert2";

function EditDestination() {
  const { id } = useParams();
  const navigate = useNavigate();

  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

  const safeSetItem = (key, value) => {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (err) {
      if (err instanceof DOMException && err.name === "QuotaExceededError") {
        Swal.fire(
          "Storage Full",
          "Unable to save because localStorage quota was exceeded. Try removing old trips or using a smaller image.",
          "error"
        );
      } else {
        Swal.fire("Error", "Failed to save to storage.", "error");
      }
      return false;
    }
  };

  const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
  const originalPost = storedPosts.find((p) => p.id === id);

  const [destination, setDestination] = useState(
    originalPost ? originalPost.destination : ""
  );
  const [distance, setDistance] = useState(
    originalPost ? originalPost.distance : ""
  );
  const [cost, setCost] = useState(originalPost ? originalPost.cost : "");
  const [image, setImage] = useState(originalPost ? originalPost.image : null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!originalPost) {
    return (
      <Container maxWidth="md" sx={{ py: "60px" }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          Destination not found.
        </Alert>
        <Typography variant="h5" gutterBottom>
          The destination you are trying to edit does not exist.
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/destination")}
          sx={{ textTransform: "none" }}
        >
          Back to list
        </Button>
      </Container>
    );
  }

  const validate = () => {
    if (!destination.trim() || !distance.trim() || !cost.trim()) {
      Swal.fire("Error", "Destination, distance and cost are required.", "error");
      return false;
    }
    return true;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        Swal.fire(
          "File too large",
          "Image exceeds 2MB. Please choose a smaller file.",
          "error"
        );
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    const updatedPosts = storedPosts.map((p) =>
      p.id === id
        ? {
            ...p,
            destination: destination.trim(),
            distance: distance.trim(),
            cost: cost.trim(),
            image: image || p.image,
          }
        : p
    );

    const serialized = JSON.stringify(updatedPosts);
    const ok = safeSetItem("posts", serialized);
    if (!ok) {
      setIsSubmitting(false);
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Saved",
      text: "Destination updated successfully.",
      confirmButtonText: "Back to Destination List",
    }).then(() => {
      navigate("/destination");
    });
  };

  return (
    <Container maxWidth="md" sx={{ py: "60px" }}>
      <Typography variant="h3" gutterBottom>
        Edit Destination
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
        sx={{ mt: "20px" }}
      >
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Your Destination"
            variant="outlined"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />

          <TextField
            fullWidth
            label="Distance"
            variant="outlined"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
          />

          <TextField
            fullWidth
            label="Estimate Cost"
            variant="outlined"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
          />

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                flex: 1,
                p: 2,
                border: "1px solid",
                borderColor: "grey.400",
                borderRadius: 2,
              }}
            >
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Upload Image
              </Typography>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isSubmitting}
              />
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              sx={{ textTransform: "none" }}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate("/destination")}
              disabled={isSubmitting}
              sx={{ textTransform: "none" }}
            >
              Cancel
            </Button>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
}

export default EditDestination;
