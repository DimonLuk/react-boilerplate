import React, { useState } from "react";
import StarRatings from "react-star-ratings";
import { Box } from "@material-ui/core";

// const setHoveredRatingText = (hoveredRating) => {
//   let text = "";
//   switch (hoveredRating) {
//     case 1:
//       text = "Bad";
//       break;
//     case 2:
//       text = "Unsatisfied";
//       break;

//     case 3:
//       text = "OK";
//       break;

//     case 4:
//       text = "Good";
//       break;

//     case 5:
//       text = "Amazing";

//       break;

//     case -Infinity:
//       text = "Not rated";
//       break;
//     default:
//       text = "Not rated";
//       break;
//   }
//   return text;
// };
const Feedback = (props) => {
  const { onChange, style } = props;
  const [rating, setRating] = useState(props.rating || 0);

  return (
    <Box style={style}>
      <StarRatings
        rating={rating}
        starDimension="40px"
        starRatedColor="#fdde00"
        starHoverColor="rgba(253, 222, 0,0.4)"
        changeRating={(r) => {
          setRating(r);
          if (onChange) {
            onChange(r);
          }
        }}
        numberOfStars={10}
        name="rating"
      />
    </Box>
  );
};
export default Feedback;
