import React from "react";
import { Helmet } from "react-helmet";
import getTitle from "../../../shared/getTitle";
import resourceName from "../../../shared/resourceName";
import {
  RnDAmortizationConverter,
  selectGeneral,
  useTicker,
} from "@tracktak/intrinsic-valuations";
import { useSelector } from "react-redux";

const RnDAmortizationConverterPage = () => {
  const general = useSelector(selectGeneral);
  const ticker = useTicker();

  return (
    <>
      <Helmet>
        <title>{getTitle(`${general.name} R&D Amortization`)}</title>
        <link
          rel="canonical"
          href={`${resourceName}/rnd-amortization-converter/${ticker}`}
        />
      </Helmet>
      <RnDAmortizationConverter />
    </>
  );
};

export default RnDAmortizationConverterPage;
