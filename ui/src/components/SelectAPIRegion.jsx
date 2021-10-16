import React, { useState } from "react";
import { Divider, Paper } from "@material-ui/core";
import { Box } from "@material-ui/system";
import WalletIconSvg from "../assets/wallet.svg";
import ListAPIRegion from "../components/ListAPIRegion";
import { apiRegionsHashLink, Header, SelectPlanButton } from "./PricingPlan";
import { useLocation } from "@reach/router";
import { listAPIregions } from "../data/regions";

const SelectAPIRegion = ({ toggle }) => {
  const location = useLocation();
  const [checked, setChecked] = useState([]);

  const handleOnChangeChecked = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <Box id="Select-API-Regions">
      {location.hash === apiRegionsHashLink && (
        <Box
          sx={{
            mt: 2,
            mb: 2,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Paper
            elevation={6}
            sx={{
              boxShadow: "0 1px 6px rgb(60 64 67 / 30%)",
              borderRadius: "10px",
              alignItems: "center",
              textAlign: "center",
              flexDirection: "column",
              display: "flex",
              flex: "0 1 auto",
              m: 1,
              height: "100%",
              padding: (theme) => `${theme.spacing(4)}  ${theme.spacing(4)} `,
            }}
          >
            <Header>Select API Regions</Header>
            <Box>
              {listAPIregions.map((listAPIRegion, i) => {
                return (
                  <ListAPIRegion
                    key={i}
                    handleOnChangeChecked={handleOnChangeChecked(i)}
                    regionName={listAPIRegion.regionName}
                    price={
                      toggle
                        ? `${listAPIRegion.price}/y`
                        : `${listAPIRegion.price}/mo`
                    }
                    iconSvg={listAPIRegion.iconSvg}
                    checked={
                      checked.find((x) => x === i) === undefined ? false : true
                    }
                  />
                );
              })}
              <Divider sx={{ mt: 3 }} />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingTop: "8px",
                  paddingBottom: "8px",
                  paddingLeft: "16px",
                  paddingRight: "16px",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    alt="wallet"
                    component={WalletIconSvg}
                    sx={{ marginRight: "26px", height: "30px" }}
                  />
                  {toggle ? (
                    <Box>Total billed yearly:</Box>
                  ) : (
                    <Box>Total billed monthly:</Box>
                  )}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "18px",
                  }}
                >
                  $50.99
                </Box>
              </Box>
            </Box>
            <SelectPlanButton
              disabled={checked.length === 0}
              variant="contained"
            >
              Buy now
            </SelectPlanButton>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default SelectAPIRegion;
