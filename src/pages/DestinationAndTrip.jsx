import { useState } from "react";
import { Link as RouterLink } from "react-router";
import { Box, Container, Grid, Typography, InputLabel } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Edit, Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

function DestinationAndTrip() {
  return (
    <div>
      <Grid container spacing={2} sx={{ mt: 5 }}>
        <Grid size={{ lg: 6 }}>
          <Card sx={{ backgroundColor: "#545454" }}>
            <CardMedia
              sx={{ height: 140, backgroundColor: "white" }}
              image="/static/images/cards/contemplative-reptile.jpg"
              title="this is coffee"
            />
            <CardContent>
              <Typography gutterBottom variant="h5">
                Completed
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Travel:
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Distance:
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Cost:
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Memory</Button>
              <Button size="small">View</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid size={{ lg: 6 }}>
          <div>
            <Typography variant="h6 ">Trip Planner</Typography>

            <Button size="small">Add A Trip</Button>
          </div>
          <InputLabel>The Plan </InputLabel>
          <List sx={{ width: "100%" }}>
            <ListItem>
              <Box sx={{ display: "flex", gap: "10px" }}>
                <Typography>Room November</Typography>
                <IconButton>
                  <Edit />
                </IconButton>
                <IconButton>
                  <Delete />
                </IconButton>
              </Box>
              <ListItemText />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </div>
  );
}

export default DestinationAndTrip;
