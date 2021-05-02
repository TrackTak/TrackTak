import React, { useEffect, useState } from "react";

const TTEditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData,
}) => {
  const [value, setValue] = useState(initialValue);

  const onEditChange = (e) => {
    setValue(e.target.value);
  };

  const onEditBlur = () => {
    updateMyData(index, id, value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <div>
      <input value={value} onChange={onEditChange} onBlur={onEditBlur} />
    </div>
  );
};

export default TTEditableCell;
