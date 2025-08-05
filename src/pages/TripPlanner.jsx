import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  Button,
  TextField,
  Stack,
  Divider,
} from "@mui/material";

function TripPlanner() {
  const navigate = useNavigate();

  const storageKey = `trip_notes_default`;

  // load existing or default
  const parseStored = () => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) return JSON.parse(raw);
    } catch {
      /* ignore */
    }
    return { activities: "", budget: "", packingList: "" };
  };

  const [notes, setNotes] = useState(() => parseStored());

  // update helper that also persists
  const updateField = (field, value) => {
    const updated = { ...notes, [field]: value };
    setNotes(updated);
    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch {
      // swallow
    }
  };

  const handleClear = () => {
    const cleared = { activities: "", budget: "", packingList: "" };
    setNotes(cleared);
    localStorage.removeItem(storageKey);
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: { xs: 3, md: 6 } }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={3}
      >
        <Typography variant="h3" component="h1">
          Trip Planner
        </Typography>
        <Button
          variant="outlined"
          onClick={() => navigate(-1)}
          sx={{ textTransform: "none" }}
        >
          Back
        </Button>
      </Stack>

      <Box
        elevation={3}
        sx={{
          p: { xs: 2, md: 4 },
          position: "relative",
        }}
      >
        <Stack spacing={2}>
          <Divider />

          <TextField
            fullWidth
            label="Activities"
            variant="outlined"
            value={notes.activities}
            onChange={(e) => updateField("activities", e.target.value)}
            multiline
            placeholder="What do you plan to do?"
          />

          <TextField
            fullWidth
            label="Budget"
            variant="outlined"
            value={notes.budget}
            onChange={(e) => updateField("budget", e.target.value)}
            placeholder="Estimated spending"
          />

          <TextField
            fullWidth
            label="Packing List"
            variant="outlined"
            value={notes.packingList}
            onChange={(e) => updateField("packingList", e.target.value)}
            multiline
            minRows={4}
            placeholder="Things to bring"
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              mt: 1,
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="contained"
              onClick={() => navigate(-1)}
              sx={{ textTransform: "none" }}
            >
              Done
            </Button>
            <Button
              variant="outlined"
              onClick={handleClear}
              sx={{ textTransform: "none" }}
            >
              Clear Notes
            </Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

export default TripPlanner;