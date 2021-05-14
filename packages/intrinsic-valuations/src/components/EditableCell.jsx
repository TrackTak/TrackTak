import React, { useEffect, useState } from "react";
import { Box, TextField } from "@material-ui/core";

const EditableCell = ({
  value: { value: newValue = "", FormatInput },
  row: { index },
  column: { id },
  updateMyData,
}) => {
  const [value, setValue] = useState(newValue);

  const onEditChange = (e) => {
    setValue(e.target.value);
  };

  const onEditBlur = () => {
    updateMyData(index, id, value);
  };

  useEffect(() => {
    setValue(newValue);
  }, [newValue]);

  return (
    <Box>
      <TextField
        value={value}
        onChange={onEditChange}
        onBlur={onEditBlur}
        InputProps={{
          inputComponent: FormatInput,
        }}
      />
    </Box>
  );
};

export default EditableCell;
