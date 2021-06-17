const getCaretPositionIndex = (text, format) => {
  return format === "percent" && text?.includes("%")
    ? text.length - 1
    : text.length;
};

export default getCaretPositionIndex;
