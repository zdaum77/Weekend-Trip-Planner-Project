import { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  IconButton,
  Paper,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function ViewPage({ tripId: propTripId }) {
  const navigate = useNavigate();

  // Resolve ID: prop -> query string -> last pathname segment
  const getId = () => {
    if (propTripId) return propTripId;
    const params = new URLSearchParams(window.location.search);
    const q = params.get("id");
    if (q) return q;
    const parts = window.location.pathname.split("/").filter(Boolean);
    return parts[parts.length - 1] || null;
  };
  const id = getId();

  const loadPosts = () => {
    try {
      return JSON.parse(localStorage.getItem("posts")) || [];
    } catch {
      return [];
    }
  };

  const findTrip = () => {
    if (!id) return null;
    return loadPosts().find((p) => p.id === id) || null;
  };

  const [trip, setTrip] = useState(() => findTrip());

  if (!id) {
    return (
      <Box sx={{ p: 5 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          No trip ID provided.
        </Alert>
        <Button variant="contained" onClick={() => navigate("/destination")}>
          Back to destinations
        </Button>
      </Box>
    );
  }

  if (!trip) {
    return (
      <Box sx={{ p: 5 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          Trip not found.
        </Alert>
        <Button variant="contained" onClick={() => navigate("/destination")}>
          Back to destinations
        </Button>
      </Box>
    );
  }

  const persistTrip = (updatedTrip) => {
    const posts = loadPosts();
    const updatedPosts = posts.map((p) => (p.id === id ? updatedTrip : p));
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setTrip(updatedTrip);
  };

  const handleDeleteTrip = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This trip will be removed permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const posts = loadPosts();
        const updated = posts.filter((p) => p.id !== id);
        localStorage.setItem("posts", JSON.stringify(updated));
        Swal.fire({
          title: "Deleted!",
          text: "Your trip has been deleted.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate(`/TripPlanner/${id}`);
        });
      }
    });
  };

  const handleAddTask = async () => {
    const { value: task } = await Swal.fire({
      title: "Add a new task",
      input: "text",
      inputLabel: "Task",
      inputPlaceholder: "Enter a task for your trip",
      showCancelButton: true,
      inputValidator: (v) => {
        if (!v) return "Task cannot be empty!";
      },
    });

    if (task) {
      const updatedTasks = [...(trip.tasks || []), task];
      persistTrip({ ...trip, tasks: updatedTasks });
      Swal.fire("Task added!", `"${task}" was added to your trip.`, "success");
    }
  };

  const handleRemoveTaskWithConfirm = (index) => {
    Swal.fire({
      title: "Remove task?",
      text: "This will delete the task from the trip.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove",
      cancelButtonText: "Cancel",
    }).then((res) => {
      if (res.isConfirmed) {
        const updatedTasks = (trip.tasks || []).filter((_, i) => i !== index);
        persistTrip({ ...trip, tasks: updatedTasks });
        Swal.fire("Removed", "Task was removed.", "success");
      }
    });
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4, p: 5 }}>
      {/* LEFT CARD */}
      <Card
        sx={{
          backgroundColor: "#b0b0b0",
          borderRadius: 3,
          position: "relative",
          minWidth: 300,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            display: "flex",
            gap: 1,
          }}
        >
          <IconButton
            aria-label="go to trip planner"
            onClick={() => navigate(`/TripPlanner/${id}`)}
          >
            <StickyNote2Icon />
          </IconButton>
          <IconButton aria-label="delete trip" onClick={handleDeleteTrip}>
            <DeleteIcon />
          </IconButton>
        </Box>

        <CardMedia
          sx={{
            height: 300,
            width: 600,
            backgroundColor: "#ffffff",
            borderRadius: 2,
            m: 2,
            objectFit: "cover",
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
          <Typography variant="body1">Travel: {trip.destination}</Typography>
          <Typography variant="body1">Distance: {trip.distance}</Typography>
          <Typography variant="body1">Cost: RM{trip.cost}</Typography>
        </CardContent>
      </Card>


      <Box sx={{ flex: 1, minWidth: 300 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: "bold", mr: 2 }}>
            Trip Planner
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#2db6f5ff",
              borderRadius: 2,
              textTransform: "none",
              padding: 2,
              mt: { xs: 1, sm: 0 },
            }}
            onClick={handleAddTask}
          >
            add a task
          </Button>
        </Box>

        <Paper
          elevation={1}
          sx={{
            borderRadius: 3,
            p: 2,
            backgroundColor: "#fff",
            width: "100%",
            maxWidth: 600,
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
                  gap: 1,
                }}
              >
                <Typography sx={{ flexGrow: 1 }}>{task}</Typography>
                <IconButton
                  aria-label="go to trip planner"
                  onClick={() => navigate(`/TripPlanner/${id}`)}
                >
                  <StickyNote2Icon />
                </IconButton>
                <IconButton
                  aria-label="delete task"
                  onClick={() => handleRemoveTaskWithConfirm(index)}
                >
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
