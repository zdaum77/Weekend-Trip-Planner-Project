import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  IconButton,
  Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

function ViewPage() {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const found = posts.find((p) => p.id === id);
    setTrip(found);
  }, [id]);

  if (!trip) return <Typography>Trip not found</Typography>;

  return (
    <Box sx={{ display: "flex", justifyContent: "space-around", p: 5 }}>
      {/* LEFT CARD */}
      <Card
        sx={{
          width: 200,
          backgroundColor: "#b0b0b0",
          borderRadius: 3,
        }}
      >
        <CardMedia
          sx={{
            height: 100,
            backgroundColor: "#ffffff",
            borderRadius: 2,
            m: 2,
          }}
          image={trip.image || ""}
          title="Trip Image"
        />
        <CardContent>
          {trip.completed && (
            <Button
              size="small"
              sx={{
                backgroundColor: "#5a5a5a",
                color: "white",
                borderRadius: "15px",
                textTransform: "none",
                fontSize: "0.7rem",
                mb: 1,
              }}
            >
              completed
            </Button>
          )}
          <Typography variant="body2">Travel: {trip.destination}</Typography>
          <Typography variant="body2">Distance: {trip.distance}</Typography>
          <Typography variant="body2">Cost: RM{trip.cost}</Typography>
        </CardContent>
      </Card>

      {/* RIGHT TRIP PLANNER PANEL */}
      <Box>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", mr: 2 }}>
            trip planner
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#b0b0b0",
              borderRadius: 2,
              textTransform: "none",
            }}
          >
            add a trip
          </Button>
        </Box>

        {/* Task List */}
        <Paper
          elevation={1}
          sx={{
            borderRadius: 3,
            p: 2,
            backgroundColor: "#fff",
            width: 300,
          }}
        >
          {trip.tasks && trip.tasks.length > 0 ? (
            trip.tasks.map((task, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  borderBottom: "2px solid black",
                  mb: 2,
                  pb: 1,
                }}
              >
                <Typography sx={{ flexGrow: 1 }}>{task}</Typography>
                <IconButton>
                  <EditIcon />
                </IconButton>
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))
          ) : (
            <Typography>No tasks added yet.</Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
}

export default ViewPage;
