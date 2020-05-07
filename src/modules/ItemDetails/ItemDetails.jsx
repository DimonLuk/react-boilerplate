import { Box, Grid, Paper, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import SimpleImageSlider from "react-simple-image-slider";
import { ApplicationContext } from "../../App";

export const getRateString = (rate) => {
  switch (rate) {
    case "M":
      return "Monthly";

    case "H":
      return "Hourly";

    case "D":
      return "Daily";

    case "W":
      return "Weekly";

    case "Y":
      return "Yearly";

    default:
      return "Hourly";
  }
};
const ItemDetails = (props) => {
  const { currentItemState } = useContext(ApplicationContext);
  let { currentItem } = currentItemState;
  if (!currentItem) {
    currentItem = JSON.parse(localStorage.currentItem);
  }
  const images = currentItem.pictures.map((p) => ({
    url: p.file.replace(["b'"], "").replace("'", ""),
  }));

  return (
    <>
      <Typography variant="h3" style={{ margin: "40px 0px 0px 40px" }}>
        Product Details
      </Typography>
      <Grid container spacing={10}>
        <Grid item xs={6}>
          <Paper elevation={0} style={{ padding: "30px 0px 0px 50px" }}>
            <Box
              overflow="hidden"
              position="relative"
              height="400px"
              width="400px"
            >
              <SimpleImageSlider width="2000" height="2000" images={images} />
              <Typography variant="h4" style={{ marginTop: "100px" }}>
                {currentItem.name || "Product Name"}
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={5}>
          <Typography variant="body1" style={{ marginTop: "60px" }}>
            {currentItem.description ||
              `Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
                rem sequi assumenda totam ab? Provident dolor molestiae
                recusandae facilis libero? Earum corrupti dolor iste ex voluptas
                a minima, laudantium reiciendis.`}
          </Typography>
          <Typography variant="body2" style={{ marginTop: "30px" }}>
            RATE: {getRateString(currentItem.rate)}
          </Typography>
          <Typography
            variant="body2"
            style={{ marginTop: "30px", textTransform: "capitalize" }}
          >
            {currentItem.state || "Product Status"}
          </Typography>
          <Typography variant="body2" style={{ marginTop: "30px" }}>
            Owner E-mail: {currentItem.owner_email || "test@mail.com"}
          </Typography>
          <Typography variant="body2" style={{ marginTop: "30px" }}>
            Filter tags:{" "}
            {[
              ...currentItem.tags,
              ...currentItem.topics.map((t) => t.name),
            ].join(", ") || "test@mail.com"}
          </Typography>

          <Typography variant="body2" style={{ marginTop: "30px" }}>
            Price: {(currentItem.price || "666") + "$"}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default ItemDetails;
