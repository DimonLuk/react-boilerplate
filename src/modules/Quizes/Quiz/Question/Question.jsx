import React from "react";
import {
  Typography,
  Box,
  Radio,
  Checkbox,
  RadioGroup,
  FormControlLabel,
} from "@material-ui/core";
import { useState } from "react";

const Question = (props) => {
  const { id, answers_type, answers, text, onChange } = props;
  const [value, setValue] = useState();

  return (
    <Box>
      <Typography variant="h5" style={{ margin: "40px 50px" }}>
        {text}
      </Typography>
      {answers_type === "radio" && (
        <Box margin="50px">
          <RadioGroup value={value}>
            {answers.map((answer) => {
              return (
                <FormControlLabel
                  key={answer.id}
                  value={answer.is_ticked}
                  control={
                    <Radio
                      onChange={(e) => {
                        if (onChange) {
                          setValue(answer.id);

                          onChange(
                            id,
                            answer.id,
                            e.target.checked,
                            answers_type
                          );
                        }
                      }}
                      value={answer.id}
                      label={answer.text}
                      key={answer.id}
                    />
                  }
                  label={answer.text}
                />
              );
            })}
          </RadioGroup>
        </Box>
      )}
      {answers_type === "checkbox" && (
        <Box
          display="flex"
          flexDirection="column"
          style={{ margin: "40px 50px" }}
        >
          {answers.map((answer) => {
            return (
              <FormControlLabel
                key={answer.id}
                control={
                  <Checkbox
                    onChange={(e) => {
                      if (onChange) {
                        onChange(id, answer.id, e.target.checked, answers_type);
                      }
                    }}
                    checked={answer.is_ticked}
                    key={answer.id}
                  />
                }
                label={answer.text}
              />
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default Question;
