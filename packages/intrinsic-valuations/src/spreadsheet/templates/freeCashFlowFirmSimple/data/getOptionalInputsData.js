import { queryNames } from "../inputQueryNames";

const getOptionalInputsData = (inputQueryParams) => {
  return {
    name: "Optional Inputs",
    freeze: "A1",
    serializedValues: [
      [
        "Normal Debt",
        "",
        "Convertible Debt",
        "",
        "Preferred Stock",
        "",
        "Employee Options",
        "",
        "Other",
      ],
      [
        "Pre-tax Cost of Debt",
        inputQueryParams[queryNames.pretaxCostOfDebt],
        "Book Value of Convertible Debt",
        inputQueryParams[queryNames.bookValueOfConvertibleDebt],
        "Number of Preferred Shares",
        inputQueryParams[queryNames.numberOfPreferredShares],
        "Employee Options Outstanding",
        inputQueryParams[queryNames.employeeOptionsOutstanding],
        "Net Operating Loss",
        inputQueryParams[queryNames.netOperatingLoss],
      ],
      [
        "Average Maturity of Debt",
        inputQueryParams[queryNames.averageMaturityOfDebt],
        "Interest Expense on Convertible Debt",
        inputQueryParams[queryNames.interestExpenseOnConvertibleDebt],
        "Market Price Per Share",
        inputQueryParams[queryNames.marketPricePerShare],
        "Average Strike Price",
        inputQueryParams[queryNames.averageStrikePrice],
        "Non-operating assets",
        inputQueryParams[queryNames.nonOperatingAssets],
      ],
      [
        "",
        "",
        "Maturity of Convertible Debt",
        inputQueryParams[queryNames.maturityOfConvertibleDebt],
        "Annual Dividend Per Share",
        inputQueryParams[queryNames.annualDividendPerShare],
        "Average Maturity",
        inputQueryParams[queryNames.averageMaturityOfOptions],
        "Probability of Failure",
        inputQueryParams[queryNames.probabilityOfFailure],
      ],
      [
        "",
        "",
        "Market Value of Convertible Debt",
        inputQueryParams[queryNames.marketValueOfConvertibleBond],
        "",
        "",
        "",
        "",
        "Proceeds as a Percentage of Book value",
        inputQueryParams[queryNames.proceedsAsAPercentageOfBookValue],
      ],
    ],
    styles: [
      {
        format: "percent",
      },
      {},
      {},
      {
        format: "currency",
      },
      {
        format: "number",
      },
      {
        align: "center",
        underline: true,
        font: {
          bold: true,
        },
      },
      {
        format: "million-currency",
      },
      {
        format: "million",
      },
    ],
    merges: ["A1:B1", "C1:D1", "E1:F1", "G1:H1", "I1:J1"],
    rows: {
      0: {
        cells: {
          0: {
            merge: [0, 1],
            style: 5,
          },
          1: {},
          2: {
            style: 5,
            merge: [0, 1],
          },
          3: {},
          4: {
            style: 5,
            merge: [0, 1],
          },
          5: {},
          6: {
            style: 5,
            merge: [0, 1],
          },
          7: {},
          8: {
            style: 5,
            merge: [0, 1],
          },
          9: {},
          10: {},
          11: {},
        },
      },
      1: {
        cells: {
          0: {},
          1: {
            style: 0,
            comment:
              "If you don't enter an input we will use a synthetic pre-tax cost of debt. You can override this by entering your own calculated pre-tax cost of debt here if you want.",
          },
          2: {},
          3: {
            style: 6,
            comment:
              "Debt which is convertible to equity at some point in time. This is found in the financial statements",
          },
          4: {},
          5: {
            style: 7,
            comment:
              "Shares of a company’s stock with dividends that are paid out to shareholders before common stock dividends are issued, i.e they have priority. This is found in the financial statements.",
          },
          6: {},
          7: {
            style: 7,
            comment:
              "The same as shares outstanding but specifically for the employees options outstanding instead. If the company does have employee options outstanding, enter the total number here, vested and non vested, in the money and out of the money. This is found in the financial statements.",
          },
          8: {},
          9: {
            style: 6,
            comment:
              "Any losses from the previous years that the company is carrying over to this year. It allows the company to reduce it's taxable income for the current year. This is found in the financial statements.",
          },
          10: {},
          11: {},
        },
      },
      2: {
        cells: {
          0: {},
          1: {
            style: 4,
            comment:
              "Years until all of the companies outstanding debt matures on average. Generally found in the footnotes to the financial statements.",
          },
          2: {},
          3: {
            style: 6,
            comment:
              "The same as normal interest expense but for Convertible Debt. This is found in the financial statements.",
          },
          4: {},
          5: {
            style: 3,
            comment:
              "The same as normal price per share but for Preferred Stock. This is found in the financial statements.",
          },
          6: {},
          7: {
            style: 3,
            comment:
              "Enter the weighted average strike price of the employee options outstanding. This is found in the financial statements.",
          },
          8: {},
          9: {
            style: 6,
            comment:
              "Also known as 'cross holdings in other companies'. This is the earnings that don't (and will never) show up as part of the operating income. The most common non-operating assets are minority cross-holdings in other companies (which are not consolidated). You can find the book value of these holdings on the balance sheet, but best practice is to convert it to the market value. (Apply a price to book ratio, based on the sector that the company is in to the book value).",
          },
          10: {},
          11: {},
        },
      },
      3: {
        cells: {
          0: {},
          1: {},
          2: {},
          3: {
            style: 4,
            comment:
              "The same as normal maturity of debt but for Convertible Debt. This is found in the financial statements.",
          },
          4: {},
          5: {
            style: 3,
            comment:
              "How much dividends are payed out on average per share each year. This is found in the financial statements.",
          },
          6: {},
          7: {
            style: 4,
            comment:
              "The weighted average maturity of the employee options outstanding. This is found in the financial statements.",
          },
          8: {},
          9: {
            style: 0,
            comment:
              "Many young, growth companies fail, especially if they have trouble raising cash. Many distressed companies fail because they have trouble making debt payments. This is a tough input to estimate but try to use the agencies credit rating if the company has one, if not then use the synthetic credit rating default spread as a guide.",
          },
          10: {},
          11: {},
        },
      },
      4: {
        cells: {
          0: {},
          1: {},
          2: {},
          3: {
            style: 6,
            comment:
              "This is the equity part of the convertible debt. If the debt is publicly traded you can find it's market value on cbonds.com or similar. If it's not then we recommend just using the Book Value of Convertible Debt from cell D2 here as well.",
          },
          4: {},
          5: {},
          6: {},
          7: {},
          8: {},
          9: {
            style: 0,
            comment:
              "If the company fails then sometimes there will be assets that get sold off (usually at fire sale prices) or cash left over to distribute to shareholders. This is only true if all liabilites have been paid first as shareholders are last in line if a company goes bankrupt. Sometimes however, companies will continue to run themselves into the ground with more debt to continue giving the executives a job and therefore will never have proceeds to distribute to shareholders.",
          },
          10: {},
          11: {},
        },
      },
      5: {
        cells: {
          0: {},
          1: {},
          2: {},
          3: {},
          4: {},
          5: {},
          6: {},
          7: {},
          8: {},
          9: {},
          10: {},
          11: {},
        },
      },
      6: {
        cells: {
          0: {},
          1: {},
          2: {},
          3: {},
          4: {},
          5: {},
          6: {},
          7: {},
          8: {},
          9: {},
          10: {},
          11: {},
        },
      },
      7: {
        cells: {},
      },
      8: {
        cells: {},
      },
      9: {
        cells: {},
      },
      10: {
        cells: {},
      },
      11: {
        cells: {},
      },
      12: {
        cells: {},
      },
      13: {
        cells: {},
      },
      14: {
        cells: {},
      },
      15: {
        cells: {},
      },
      16: {
        cells: {},
      },
      17: {
        cells: {},
      },
      18: {
        cells: {},
      },
      19: {
        cells: {},
      },
      20: {
        cells: {},
      },
      21: {
        cells: {},
      },
      22: {
        cells: {},
      },
      23: {
        cells: {},
      },
      24: {
        cells: {},
      },
      25: {
        cells: {},
      },
      26: {
        cells: {},
      },
      27: {
        cells: {},
      },
      28: {
        cells: {},
      },
      29: {
        cells: {},
      },
      30: {
        cells: {},
      },
      31: {
        cells: {},
      },
      32: {
        cells: {},
      },
      33: {
        cells: {},
      },
      34: {
        cells: {},
      },
      35: {
        cells: {},
      },
      36: {
        cells: {},
      },
      37: {
        cells: {},
      },
      38: {
        cells: {},
      },
      39: {
        cells: {},
      },
      40: {
        cells: {},
      },
      41: {
        cells: {},
      },
      42: {
        cells: {},
      },
      43: {
        cells: {},
      },
      44: {
        cells: {},
      },
      45: {
        cells: {},
      },
      46: {
        cells: {},
      },
      47: {
        cells: {},
      },
      48: {
        cells: {},
      },
      49: {
        cells: {},
      },
      50: {
        cells: {},
      },
      51: {
        cells: {},
      },
      52: {
        cells: {},
      },
      53: {
        cells: {},
      },
      54: {
        cells: {},
      },
      55: {
        cells: {},
      },
      56: {
        cells: {},
      },
      57: {
        cells: {},
      },
      58: {
        cells: {},
      },
      59: {
        cells: {},
      },
      60: {
        cells: {},
      },
      61: {
        cells: {},
      },
      62: {
        cells: {},
      },
      63: {
        cells: {},
      },
      64: {
        cells: {},
      },
      65: {
        cells: {},
      },
      66: {
        cells: {},
      },
      67: {
        cells: {},
      },
      68: {
        cells: {},
      },
      69: {
        cells: {},
      },
      70: {
        cells: {},
      },
      71: {
        cells: {},
      },
      72: {
        cells: {},
      },
      73: {
        cells: {},
      },
      74: {
        cells: {},
      },
      75: {
        cells: {},
      },
      76: {
        cells: {},
      },
      77: {
        cells: {},
      },
      78: {
        cells: {},
      },
      79: {
        cells: {},
      },
      80: {
        cells: {},
      },
      81: {
        cells: {},
      },
      82: {
        cells: {},
      },
      83: {
        cells: {},
      },
      84: {
        cells: {},
      },
      85: {
        cells: {},
      },
      86: {
        cells: {},
      },
      87: {
        cells: {},
      },
      88: {
        cells: {},
      },
      89: {
        cells: {},
      },
      90: {
        cells: {},
      },
      91: {
        cells: {},
      },
      92: {
        cells: {},
      },
      93: {
        cells: {},
      },
      94: {
        cells: {},
      },
      95: {
        cells: {},
      },
      96: {
        cells: {},
      },
      97: {
        cells: {},
      },
      98: {
        cells: {},
      },
      99: {
        cells: {},
      },
      len: 100,
    },
    cols: {
      0: {
        width: 155,
      },
      1: {
        width: 75,
      },
      2: {
        width: 230,
      },
      3: {
        width: 85,
      },
      4: {
        width: 175,
      },
      5: {
        width: 85,
      },
      6: {
        width: 195,
      },
      7: {
        width: 85,
      },
      8: {
        width: 250,
      },
      9: {
        width: 85,
      },
      len: 26,
    },
    validations: [],
    autofilter: {},
  };
};

export default getOptionalInputsData;
