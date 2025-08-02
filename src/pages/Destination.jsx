import { useState } from "react";
import { Link as RouterLink } from "react-router";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  InputBase,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function Destination() {
  const [posts, setPosts] = useState(() => {
    const stored = localStorage.getItem("posts");
    return stored ? JSON.parse(stored) : [];
  });

  // Track completion per post ID
  const [completedStatus, setCompletedStatus] = useState({});

  const toggleCompletion = (id) => {
    setCompletedStatus((prevStatus) => ({
      ...prevStatus,
      [id]: !prevStatus[id],
    }));
  };

  return (
    <div>
      <Container sx={{ py: 10 }}>
        <Grid>
          <Grid item sm={6}>
            <Box>
              <Search
                sx={{
                  display: "flex",
                  alignContent: "center",
                  border: "2px solid black",
                  borderRadius: "15px",
                }}
              >
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  fullWidth
                />
              </Search>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mt: 5 }}>
          {posts.map((post) => (
            <Grid item key={post.id} xs={12} sm={6} md={4}>
              <Card sx={{ backgroundColor: "#545454" }}>
                <CardMedia
                  sx={{ height: 200, width: 360, backgroundColor: "white" }}
                  image={
                    post.image ||
                    "/static/images/cards/contemplative-reptile.jpg"
                  }
                  title={post.destination}
                />
                <CardContent>
                  <Button
                    variant="contained"
                    onClick={() => toggleCompletion(post.id)}
                    startIcon={
                      completedStatus[post.id] ? (
                        <CheckCircleIcon />
                      ) : (
                        <CancelIcon />
                      )
                    }
                    color={completedStatus[post.id] ? "success" : "error"}
                    sx={{
                      mb: 1,
                      borderRadius: "20px",
                      textTransform: "none",
                      fontWeight: "bold",
                    }}
                  >
                    {completedStatus[post.id] ? "Completed" : "Not Completed"}
                  </Button>

                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Travel: {post.destination}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Distance: {post.distance}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Cost: RM {post.cost}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Memory</Button>
                  <Button size="small">View</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default Destination;
