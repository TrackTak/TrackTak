import React, { useEffect } from "react";
import {
  Box,
  Link,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import {
  BlackScholesResults,
  CompanyOverviewStats,
  CostOfCapitalResults,
  DiscountedCashFlowSheet,
  IndustryAveragesResults,
  OptionalInputs,
  FinancialsSummary,
  Section,
  SubSection,
  withFundamentalsLoaded,
  ValueDrivingInputs,
  useTicker,
} from "@tracktak/dcf-react";
import { Link as RouterLink } from "gatsby";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../redux/actions/snackbarsActions";
import { useLocation } from "@reach/router";
import SubscribeCover from "./SubscribeCover";
import useLocalStorageState from "use-local-storage-state";
import subscribePopupShownHook from "../hooks/subscribePopupShownHook";
import selectScope from "../../../packages/dcf-react/src/selectors/dcfSelectors/selectScope";
import { sentenceCase } from "sentence-case";
import pluralize from "pluralize";

const DiscountedCashFlow = () => {
  const [subscribePopupShown] = subscribePopupShownHook();
  const [rotateSnackbarShown, setRotateSnackbarShown] = useLocalStorageState(
    "rotateSnackbarShown",
  );
  const theme = useTheme();
  const isOnMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const scope = useSelector(selectScope);
  const dispatch = useDispatch();
  const ticker = useTicker();
  const location = useLocation();

  useEffect(() => {
    if (!rotateSnackbarShown && isOnMobile) {
      setRotateSnackbarShown(true);

      dispatch(
        setMessage({
          message: "Rotate your device for best viewing",
        }),
      );
    }
  }, [dispatch, isOnMobile, rotateSnackbarShown, setRotateSnackbarShown]);

  useEffect(() => {
    let errors = [];

    const fieldsToCheck = [
      "price",
      "totalRevenue",
      "bookValueOfEquity",
      "sharesOutstanding",
    ];
    const scopeKeys = Object.keys(scope).filter(
      (key) => fieldsToCheck.indexOf(key) !== -1,
    );

    scopeKeys.forEach((key) => {
      if (!scope[key]) {
        errors.push(sentenceCase(key));
      }
    });

    if (errors.length) {
      dispatch(
        setMessage({
          message: `${errors.join(", ")} ${pluralize(
            "has",
            errors.length,
          )} incorrect data from our API. Please export to excel and modify data.`,
          severity: "error",
        }),
      );
    }
  }, [dispatch]);

  return (
    <React.Fragment>
      <CompanyOverviewStats useDescriptionShowMore />
      <Section>
        <FinancialsSummary />
        <Box sx={{ mt: 1 }}>
          <Typography>
            See the&nbsp;
            <Link
              component={RouterLink}
              to={`/stock/${ticker}/financial-statements${location.search}`}
            >
              Financial Statements
            </Link>
            &nbsp;tab for the full financials.
          </Typography>
        </Box>
      </Section>
      <Section sx={{ display: "flex", gridColumnGap: 20, flexWrap: "wrap" }}>
        <Box sx={{ flex: 1 }}>
          <SubSection>
            <ValueDrivingInputs />
          </SubSection>
          <SubSection>
            <OptionalInputs />
          </SubSection>
        </Box>
        <Box sx={{ flex: 1 }}>
          <SubSection>
            <IndustryAveragesResults />
          </SubSection>
          <SubSection>
            <CostOfCapitalResults
              SyntheticCreditRatingLink={({
                ticker,
                searchParams,
                ...props
              }) => {
                return (
                  <Link
                    component={RouterLink}
                    to={`/stock/${ticker}/synthetic-credit-rating${searchParams}`}
                    {...props}
                  />
                );
              }}
            />
          </SubSection>
          <SubSection>
            <BlackScholesResults />
          </SubSection>
        </Box>
      </Section>
      <Section>
        <DiscountedCashFlowSheet
          SubscribeCover={SubscribeCover}
          loadingCells={!subscribePopupShown}
        />
      </Section>
    </React.Fragment>
  );
};

export default withFundamentalsLoaded(DiscountedCashFlow);
