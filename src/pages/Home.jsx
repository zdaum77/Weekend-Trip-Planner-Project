import { Typography, Button, Stack } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import "../index.css";
import Swal from "sweetalert2";

function Home() {
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "90vh",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 150,
          left: 0,
          fontSize: "2rem",
          fontWeight: "bold",
        }}
        className="text"
      >
        🎇Plan Your Perfect Weekend Adventure and Escape the Ordinary🎇
      </div>

      <Stack spacing={4} alignItems="center">
        <Typography
          variant="h1"
          sx={{ fontWeight: "900", textAlign: "center" }}
        >
          Welcome To Travel Planner
        </Typography>
        <Button
          component={RouterLink}
          to="/destination"
          variant="contained"
          size="large"
          sx={{
            textTransform: "none",
            backgroundColor: "gray",
            fontWeight: "900",
          }}
        >
          Explore Destinations
        </Button>
        <div
          style={{
            position: "absolute",
            top: 500,
            left: 0,
            fontSize: "1rem",
            fontWeight: "bold",
            cursor: "pointer",
            backgroundColor: "lightBlue",
            padding: "10px",
            borderRadius: "15px",
            color: "black",
          }}
          className="prank-text"
          onClick={() => {
            Swal.fire({
              title: "Prank!",
              text: "There’s no free travel 😆",
              icon: "info",
              confirmButtonText: "man.....",
            });
          }}
        >
          CLICK ME TO TRAVEL FREE‼️
        </div>
      </Stack>
    </div>
  );
}

export default Home;
