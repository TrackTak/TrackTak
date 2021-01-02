import React, { cloneElement } from "react";
import { Box, Typography, useTheme } from "@material-ui/core";
import TTTable from "../components/TTTable";
import dayjs from "dayjs";
import FormatRawNumberToMillion from "../components/FormatRawNumberToMillion";
import Section from "../components/Section";
import SubSection from "../components/SubSection";
import SubscribeMailingList from "../components/SubscribeMailingList";
import CompanyOverviewStats from "../components/CompanyOverviewStats";
import ValueDrivingInputs from "../components/ValueDrivingInputs";
import OptionalInputs from "../components/OptionalInputs";
import CostOfCapitalResults from "../components/CostOfCapitalResults";
import { InfoOutlinedIconWrapper } from "../components/InfoOutlinedIconWrapper";
import BlackScholesResults from "../components/BlackScholesResults";
import { useSelector } from "react-redux";
import DiscountedCashFlowSheet from "./DiscountedCashFlowSheet";
import FormatRawNumber from "../components/FormatRawNumber";
import FormatRawNumberToPercent from "../components/FormatRawNumberToPercent";

const TableValueMillionFormatter = (props) => (
  <FormatRawNumberToMillion decimalScale={2} {...props} />
);

const mapFromStatementsToDateObject = (
  objectToLoop,
  valueKey,
  valueFormatter = <TableValueMillionFormatter />
) => {
  const dateObject = {};

  Object.keys(objectToLoop).forEach((key) => {
    const value = objectToLoop[key];

    dateObject[key] = cloneElement(valueFormatter, {
      value: value[valueKey],
    });
  });

  return dateObject;
};

const DiscountedCashFlow = () => {
  const fundamentals = useSelector((state) => state.fundamentals);
  const theme = useTheme();

  if (!fundamentals.isLoaded) return null;

  const companyFundamentalsColumns = [
    {
      Header: "",
      accessor: "dataField",
    },
    {
      Header: "TTM",
      accessor: "ttm",
    },
  ].concat(
    Object.values(fundamentals.yearlyIncomeStatements).map((statement) => ({
      Header: dayjs(statement.date).format("MMM YY"),
      accessor: statement.date,
    }))
  );

  const rowData = [
    {
      dataField: (
        <InfoOutlinedIconWrapper text="The total amount of income generated by the sale of goods/services related to the company's primary operations.">
          Revenue
        </InfoOutlinedIconWrapper>
      ),
      ttm: fundamentals.hasIncomeTTM ? (
        <TableValueMillionFormatter
          value={fundamentals.incomeStatement.totalRevenue}
        />
      ) : null,
      ...mapFromStatementsToDateObject(
        fundamentals.yearlyIncomeStatements,
        "totalRevenue"
      ),
    },
    {
      dataField: (
        <InfoOutlinedIconWrapper text="Income earned by the company from it's day to day operations. Operating income includes Depreciation and Amortization, whereas EBITDA excludes it.">
          Operating Income
        </InfoOutlinedIconWrapper>
      ),
      ttm: fundamentals.hasIncomeTTM ? (
        <TableValueMillionFormatter
          value={fundamentals.incomeStatement.operatingIncome}
        />
      ) : null,
      ...mapFromStatementsToDateObject(
        fundamentals.yearlyIncomeStatements,
        "operatingIncome"
      ),
    },
    {
      dataField: (
        <InfoOutlinedIconWrapper text="Measures how much profit a company makes after paying for variable costs of production, such as wages and raw materials, but before paying interest or tax. Formula: Operating Income / Revenue.">
          Operating Margin
        </InfoOutlinedIconWrapper>
      ),
      ttm: fundamentals.hasIncomeTTM ? (
        <FormatRawNumberToPercent
          value={fundamentals.incomeStatement.operatingMargin}
        />
      ) : null,
      ...mapFromStatementsToDateObject(
        fundamentals.yearlyIncomeStatements,
        "operatingMargin",
        <FormatRawNumberToPercent />
      ),
    },
    {
      dataField: (
        <InfoOutlinedIconWrapper text="The costs of borrowing money. Usually paid at a recurring rate every set date and time. For example: bonds, loans, convertible debt or lines of credit.">
          Interest Expense
        </InfoOutlinedIconWrapper>
      ),
      ttm: fundamentals.hasIncomeTTM ? (
        <TableValueMillionFormatter
          value={fundamentals.incomeStatement.interestExpense}
        />
      ) : null,
      ...mapFromStatementsToDateObject(
        fundamentals.yearlyIncomeStatements,
        "interestExpense"
      ),
    },
    {
      dataField: (
        <InfoOutlinedIconWrapper text="Non-operating assets are assets that are not considered to be part of a company's core operations for eg. unused land, spare equipment.">
          Cross Holdings &amp; Other Non-Operating Assets
        </InfoOutlinedIconWrapper>
      ),
      ttm: (
        <TableValueMillionFormatter
          value={
            fundamentals.balanceSheet.noncontrollingInterestInConsolidatedEntity
          }
        />
      ),
      ...mapFromStatementsToDateObject(
        fundamentals.yearlyBalanceSheets,
        "noncontrollingInterestInConsolidatedEntity"
      ),
    },
    {
      dataField: (
        <InfoOutlinedIconWrapper
          text="Reflects the requirement that if you own more than 50% of another company or have effective control of it, you have to consolidate that company's statements with yours.
    Thus, you count 100% of that subsidiaries assets, revenues and operating income with your company, even if you own only 60%.
    Minority interest reflects the book value of the 40% of the equity in the subsidiary that does not belong to you."
        >
          Minority Interests
        </InfoOutlinedIconWrapper>
      ),
      ttm: fundamentals.hasIncomeTTM ? (
        <TableValueMillionFormatter
          value={fundamentals.incomeStatement.minorityInterest}
        />
      ) : null,
      ...mapFromStatementsToDateObject(
        fundamentals.yearlyIncomeStatements,
        "minorityInterest"
      ),
    },
    {
      dataField: (
        <InfoOutlinedIconWrapper text="Marketable securities are assets that can be readily bought and sold in a public market and can be liquidated to cash quickly.">
          Cash &amp; Marketable Securities
        </InfoOutlinedIconWrapper>
      ),
      ttm: (
        <TableValueMillionFormatter
          value={fundamentals.balanceSheet.cashAndShortTermInvestments}
        />
      ),
      ...mapFromStatementsToDateObject(
        fundamentals.yearlyBalanceSheets,
        "cashAndShortTermInvestments"
      ),
    },
    {
      dataField: (
        <InfoOutlinedIconWrapper text="Also known as Total Stockholders Equity is the amount of assets remaining after all of it's liabilities have been paid. This is because Assets = Liabilities + Equity.">
          Book Value of Equity
        </InfoOutlinedIconWrapper>
      ),
      ttm: (
        <TableValueMillionFormatter
          value={fundamentals.balanceSheet.bookValueOfEquity}
        />
      ),
      ...mapFromStatementsToDateObject(
        fundamentals.yearlyBalanceSheets,
        "bookValueOfEquity"
      ),
    },
    {
      dataField: (
        <InfoOutlinedIconWrapper text="The total amount of debt of which the company owes, which is recorded in the books of the company. We include capital lease obligations in this number as lease obligations are a form of debt.">
          Book Value of Debt
        </InfoOutlinedIconWrapper>
      ),
      ttm: (
        <TableValueMillionFormatter
          value={fundamentals.balanceSheet.bookValueOfDebt}
        />
      ),
      ...mapFromStatementsToDateObject(
        fundamentals.yearlyBalanceSheets,
        "bookValueOfDebt"
      ),
    },
    {
      dataField: (
        <InfoOutlinedIconWrapper text="The amount of capital that has been invested into the business. The formula is: (Equity + Debt) - Cash &amp; Marketable Securities. We minus the cash out because cash is not an investment as it returns nothing.">
          Invested Capital
        </InfoOutlinedIconWrapper>
      ),
      ttm: (
        <TableValueMillionFormatter
          value={fundamentals.balanceSheet.investedCapital}
        />
      ),
      ...mapFromStatementsToDateObject(
        fundamentals.yearlyBalanceSheets,
        "investedCapital"
      ),
    },
    {
      dataField: (
        <InfoOutlinedIconWrapper text="The efficiency of how much the company has to reinvest into the business to grow. The formula is: Total Revenue / Invested Capital. The higher the number the more efficient the company is.">
          Sales to Capital Ratio
        </InfoOutlinedIconWrapper>
      ),
      ttm: (
        <FormatRawNumber
          value={fundamentals.balanceSheet.salesToCapitalRatio}
          decimalScale={2}
        />
      ),
      ...mapFromStatementsToDateObject(
        fundamentals.yearlyBalanceSheets,
        "salesToCapitalRatio",
        <FormatRawNumber decimalScale={2} />
      ),
    },
  ];

  return (
    <>
      <Box sx={{ display: "flex", gap: theme.spacing(10) }}>
        <CompanyOverviewStats />
      </Box>
      <Section>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h5">Past Fundamentals</Typography>
          <Typography
            style={{
              marginLeft: theme.spacing(1),
              fontWeight: theme.typography.fontWeightBold,
            }}
          >
            ({fundamentals.valuationCurrencySymbol}:
            {fundamentals.valuationCurrencyCode})
          </Typography>
        </Box>
        <Box style={{ overflowX: "auto" }}>
          <TTTable columns={companyFundamentalsColumns} data={rowData} />
        </Box>
      </Section>
      <Section sx={{ display: "flex", gridColumnGap: 20, flexWrap: "wrap" }}>
        <Box sx={{ flex: 1 }}>
          <SubSection>
            <ValueDrivingInputs />
          </SubSection>
          <SubSection>
            <CostOfCapitalResults />
          </SubSection>
          <SubSection>
            <BlackScholesResults />
          </SubSection>
        </Box>
        <Box sx={{ flex: 1 }}>
          <SubSection>
            <Typography variant="h5" gutterBottom>
              Optional Inputs
            </Typography>
            <OptionalInputs />
          </SubSection>
        </Box>
      </Section>
      <Section>
        <DiscountedCashFlowSheet />
      </Section>
      <Section sx={{ display: "flex", mt: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            margin: "0 auto",
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            style={{ fontWeight: theme.typography.fontWeightBold }}
          >
            Want us to implement features you need?
          </Typography>
          <SubscribeMailingList subscribeText="Sign Up" />
        </Box>
      </Section>
    </>
  );
};

export default DiscountedCashFlow;
