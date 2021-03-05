import { useSelector } from "react-redux";
import React from "react";

const withFundamentalsLoaded = (Component) => {
  return (props) => {
    const fundamnetalsLoaded = useSelector((state) => state.fundamentals.data);

    return fundamnetalsLoaded ? <Component {...props} /> : null;
  };
};

export default withFundamentalsLoaded;
