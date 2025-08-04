import { useState } from "react";
import { Link as RouterLink } from "react-router";
import { Grid, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";

function Memory() {
  return (
    <div>
      <Container
        fullWidth
        maxWidth="md"
        sx={{
          py: "60px",
        }}
      >
        <Typography variant="h3">Memory Place</Typography>
        <Card>
          <CardActionArea>
            <CardContent>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                The memory of Valorant example: piriyan say spike the plant in a
                match
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Back
            </Button>
          </CardActions>
        </Card>
      </Container>
    </div>
  );
}

export default Memory;
