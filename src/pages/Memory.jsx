import { useState } from "react";
import {
  Typography,
  Container,
  Card,
  CardContent,
  Button,
  CardActionArea,
  CardActions,
  CardMedia,
  Grid,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Memory() {
  const navigate = useNavigate();
  const [images, setImages] = useState(() => {
    return JSON.parse(localStorage.getItem("memoryImages") || "[]");
  });

  const MAX_FILE_SIZE = 2 * 1024 * 1024;

  const safeSetItem = (key, value) => {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (err) {
      if (err instanceof DOMException && err.name === "QuotaExceededError") {
        Swal.fire(
          "Storage Full",
          "Unable to save because localStorage quota was exceeded. Delete some memories or use smaller images.",
          "error"
        );
      } else {
        Swal.fire("Error", "Failed to save to storage.", "error");
      }
      return false;
    }
  };

  const handleAddImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) {
        Swal.fire("No file selected", "", "info");
        return;
      }
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
        const base64 = reader.result;
        const updated = [...images, base64];
        setImages(updated);
        const ok = safeSetItem("memoryImages", JSON.stringify(updated));
        if (ok) {
          Swal.fire("Uploaded!", "Your memory image was added.", "success");
        }
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  const handleDelete = (idx) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this memory image?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        const updated = [...images];
        updated.splice(idx, 1);
        setImages(updated);
        safeSetItem("memoryImages", JSON.stringify(updated));
        Swal.fire("Deleted!", "The image has been deleted.", "success");
      }
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h3" sx={{ mb: 2, fontWeight: "bold" }}>
        Memory Place
      </Typography>
      <Typography variant="h6" sx={{ mb: 2, color: "gray " }}>
        Upload memories from your journey
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
        <Button
          variant="contained"
          onClick={handleAddImage}
          sx={{ borderRadius: 2, textTransform: "none" }}
        >
          + Add Memory Pics
        </Button>
        <Button
          variant="outlined"
          onClick={() => navigate("/destination")}
          sx={{ borderRadius: 2, textTransform: "none" }}
        >
          Back
        </Button>
      </Box>


      <Grid container spacing={3} justifyContent="center">
        {images.map((img, idx) => (
          <Grid item key={idx}>
            <Card sx={{ width: 350 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200"
                  image={img}
                  alt={`Memory ${idx}`}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Memory #{idx + 1}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="error" onClick={() => handleDelete(idx)}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {images.length === 0 && (
        <Typography sx={{ mt: 6 }} color="text.secondary">
          No memory images yet.
        </Typography>
      )}
    </Container>
  );
}

export default Memory;
