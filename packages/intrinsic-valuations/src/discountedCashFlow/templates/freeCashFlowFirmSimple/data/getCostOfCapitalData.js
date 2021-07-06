const getCostOfCapitalData = () => {
  return {
    calculationOrder: 1,
    name: "Cost of Capital",
    freeze: "A1",
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
        font: {
          bold: true,
        },
      },
      {
        font: {
          bold: true,
        },
        underline: true,
      },
      {
        font: {
          bold: false,
        },
      },
      {
        font: {
          bold: false,
        },
        underline: true,
      },
      {
        font: {
          bold: false,
        },
        underline: false,
      },
      {
        font: {
          bold: true,
        },
        underline: false,
      },
      {
        underline: true,
      },
      {
        border: {
          right: ["thin", "#000"],
          bottom: ["thin", "#000"],
        },
        format: "currency",
      },
      {
        border: {
          bottom: ["thin", "#000"],
        },
        format: "currency",
      },
      {
        border: {
          right: ["thin", "#000"],
        },
        format: "percent",
      },
      {
        border: {
          right: ["thin", "#000"],
          bottom: ["thin", "#000"],
        },
        font: {
          bold: true,
        },
      },
      {
        border: {
          right: ["thin", "#000"],
        },
        font: {
          bold: true,
        },
      },
      {
        border: {
          bottom: ["thin", "#000"],
        },
        font: {
          bold: true,
        },
      },
      {
        bgcolor: "rgba(120, 73, 191, 0.4)",
        format: "percent",
      },
      {
        border: {
          right: ["thin", "#000"],
          bottom: ["thin", "#000"],
        },
        format: "percent",
      },
      {
        border: {
          bottom: ["thin", "#000"],
        },
        format: "percent",
      },
      {
        format: "million",
      },
      {
        format: "million-currency",
      },
      {
        border: {
          right: ["thin", "#000"],
          bottom: ["thin", "#000"],
        },
        format: "million-currency",
      },
      {
        border: {
          bottom: ["thin", "#000"],
        },
        format: "million-currency",
      },
    ],
    merges: ["A1:B1"],
    rows: {
      0: {
        cells: {
          0: {
            merge: [0, 1],
            style: 5,
          },
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
        },
      },
      1: {
        cells: {
          0: {
            style: 7,
          },
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
        },
      },
      2: {
        cells: {
          0: {},
          1: {
            style: 22,
          },
          2: {},
          3: {},
          4: {},
          5: {},
          6: {},
          7: {},
          8: {},
          9: {},
          10: {},
        },
      },
      3: {
        cells: {
          0: {},
          1: {
            style: 3,
          },
          2: {},
          3: {},
          4: {},
          5: {},
          6: {},
          7: {},
          8: {},
          9: {},
          10: {},
        },
      },
      4: {
        cells: {
          0: {},
          1: {
            style: 4,
            comment:
              "Is a measure of the market risk of the company relative to it's peers in the same industry without the impact of debt. This determines how much risk comes with owning a stock.",
          },
          2: {},
          3: {},
          4: {},
          5: {},
          6: {},
          7: {},
          8: {},
          9: {},
          10: {},
        },
      },
      5: {
        cells: {
          0: {},
          1: {
            style: 0,
            comment:
              "Refers to the theoretical rate of return of an investment with zero risk.",
          },
          2: {},
          3: {},
          4: {},
          5: {},
          6: {},
          7: {},
          8: {},
          9: {},
          10: {},
        },
      },
      6: {
        cells: {
          0: {},
          1: {
            style: 0,
          },
          2: {},
          3: {},
          4: {},
          5: {},
          6: {},
          7: {},
          8: {},
          9: {},
          10: {},
        },
      },
      7: {
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
        },
      },
      8: {
        cells: {
          0: {
            style: 7,
          },
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
        },
      },
      9: {
        cells: {
          0: {},
          1: {
            style: 23,
          },
          2: {
            style: 7,
          },
          3: {},
          4: {},
          5: {},
          6: {},
          7: {},
          8: {},
          9: {},
          10: {},
        },
      },
      10: {
        cells: {
          0: {},
          1: {
            style: 23,
          },
          2: {},
          3: {
            style: 23,
          },
          4: {},
          5: {},
          6: {},
          7: {},
          8: {},
          9: {},
          10: {},
        },
      },
      11: {
        cells: {
          0: {},
          1: {
            style: 4,
          },
          2: {},
          3: {
            style: 23,
          },
          4: {},
          5: {},
          6: {},
          7: {},
          8: {},
          9: {},
          10: {},
        },
      },
      12: {
        cells: {
          0: {},
          1: {},
          2: {},
          3: {
            style: 23,
          },
          4: {},
          5: {},
          6: {},
          7: {},
          8: {},
          9: {},
          10: {},
        },
      },
      13: {
        cells: {
          0: {},
          1: {
            style: 0,
            comment:
              "By default this is the synthetic credit rating pre-tax cost of debt that we have automatically calculated for you which is fine for most cases. If you manually input a cost of debt in the Normal Debt input field then it will overwrite this synthetic cost of debt.",
          },
          2: {},
          3: {
            style: 4,
            comment:
              "Is a measure of market risk of the company relative to it's peers in the same industry including the impact of debt on the company. This determines how much risk comes with owning a stock.",
          },
          4: {},
          5: {},
          6: {},
          7: {},
          8: {},
          9: {},
          10: {},
        },
      },
      14: {
        cells: {
          0: {},
          1: {
            style: 0,
          },
          2: {
            style: 13,
          },
          3: {
            style: 16,
          },
          4: {
            style: 16,
          },
          5: {
            style: 16,
          },
          6: {
            style: 18,
          },
          7: {},
          8: {},
          9: {},
          10: {},
        },
      },
      15: {
        cells: {
          0: {},
          1: {},
          2: {
            style: 16,
          },
          3: {
            style: 24,
          },
          4: {
            style: 24,
          },
          5: {
            style: 24,
          },
          6: {
            style: 25,
          },
          7: {},
          8: {},
          9: {},
          10: {},
        },
      },
      16: {
        cells: {
          0: {
            style: 7,
          },
          1: {},
          2: {
            style: 16,
          },
          3: {
            style: 20,
          },
          4: {
            style: 20,
          },
          5: {
            style: 20,
          },
          6: {
            style: 21,
          },
          7: {},
          8: {},
          9: {},
          10: {},
        },
      },
      17: {
        cells: {
          0: {},
          1: {
            style: 23,
          },
          2: {
            style: 17,
          },
          3: {
            style: 15,
          },
          4: {
            style: 15,
          },
          5: {
            style: 15,
          },
          6: {
            style: 19,
            comment:
              "The total cost of raising capital (cash) for the company, weighted by equity and debt.",
          },
          7: {},
          8: {},
          9: {},
          10: {},
        },
      },
      18: {
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
        },
      },
      19: {
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
        },
      },
      20: {
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
        },
      },
      21: {
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
        },
      },
      22: {
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
        },
      },
      23: {
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
        },
      },
      24: {
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
        },
      },
      25: {
        cells: {
          0: {
            style: 7,
          },
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
        },
      },
      26: {
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
        },
      },
      27: {
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
        },
      },
      28: {
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
        },
      },
      29: {
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
        },
      },
      30: {
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
        },
      },
      31: {
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
        },
      },
      32: {
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
        },
      },
      33: {
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
        },
      },
      34: {
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
        },
      },
      35: {
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
        },
      },
      36: {
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
        },
      },
      37: {
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
        },
      },
      38: {
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
        },
      },
      39: {
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
        },
      },
      40: {
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
        },
      },
      41: {
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
        },
      },
      42: {
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
        },
      },
      43: {
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
        },
      },
      44: {
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
        },
      },
      45: {
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
        },
      },
      46: {
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
        },
      },
      47: {
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
        },
      },
      48: {
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
        },
      },
      49: {
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
        },
      },
      50: {
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
        },
      },
      51: {
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
        },
      },
      52: {
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
        },
      },
      53: {
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
        },
      },
      54: {
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
        },
      },
      55: {
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
        },
      },
      56: {
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
        },
      },
      57: {
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
        },
      },
      58: {
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
        },
      },
      59: {
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
        },
      },
      60: {
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
        },
      },
      61: {
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
        },
      },
      62: {
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
        },
      },
      63: {
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
        },
      },
      64: {
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
        },
      },
      65: {
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
        },
      },
      66: {
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
        },
      },
      67: {
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
        },
      },
      68: {
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
        },
      },
      69: {
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
        },
      },
      70: {
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
        },
      },
      71: {
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
        },
      },
      72: {
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
        },
      },
      73: {
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
        },
      },
      74: {
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
        },
      },
      75: {
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
        },
      },
      76: {
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
        },
      },
      77: {
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
        },
      },
      78: {
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
        },
      },
      79: {
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
        },
      },
      80: {
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
        },
      },
      81: {
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
        },
      },
      82: {
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
        },
      },
      83: {
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
        },
      },
      84: {
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
        },
      },
      85: {
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
        },
      },
      86: {
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
        },
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
      "-1": {
        cells: {},
      },
    },
    cols: {
      0: {
        width: 280,
      },
      1: {
        width: 150,
      },
      2: {
        width: 281,
      },
    },
    validations: [],
    autofilter: {},
    serializedValues: [
      ["Estimated Cost of Capital"],
      ["Equity"],
      ["Number of Shares Outstanding", '=FIN("sharesOutstanding")'],
      ["Market Price per Share", '=FIN("price")'],
      ["Unlevered Beta", '=FIN("unleveredBeta")'],
      ["Riskfree Rate", '=FIN("riskFreeRate")'],
      ["Equity Risk Premium", '=FIN("equityRiskPremium")'],
      [],
      ["Normal Debt"],
      ["Book Value", '=FIN("bookValueOfDebt")', "Output"],
      [
        "Interest Expense",
        '=ABS(FIN("interestExpense"))',
        "Estimated Market Value of Normal Debt",
        "=B11*(1-(1+B14)^(-B12))/B14+B10/(1+B14)^B12",
      ],
      [
        "Average Maturity",
        "='Optional Inputs'!$B$3",
        "Estimated Value of Normal Debt in Convertible",
        "='Optional Inputs'!$D$3*(1-(1+B14)^(-'Optional Inputs'!$D$4))/B14+'Optional Inputs'!$D$2/(1+B14)^'Optional Inputs'!$D$4",
      ],
      [
        "Method of Calculating Pre-tax Cost of Debt",
        '=IF(\'Optional Inputs\'!$B$2="", "Synthetic Credit Rating", "Manual Input")',
        "Estimated Value of Equity in Convertible",
        "='Optional Inputs'!$D$5-D12",
      ],
      [
        '="Pre-tax Cost of Debt"&" ("&B13&")"',
        "=IF('Optional Inputs'!$B$2=\"\", FIN(\"estimatedCostOfDebt\"), 'Optional Inputs'!$B$2)",
        "Levered Beta for Equity",
        "=B5*(1+(1-B15)*(E16/D16))",
      ],
      [
        "Marginal Tax Rate",
        '=FIN("marginalTaxRate")',
        null,
        "Equity",
        "Debt",
        "Preferred Stock",
        "Capital",
      ],
      [
        null,
        null,
        "Market Value",
        "=B3*B4+D13",
        "=D11+D12+B18",
        "='Optional Inputs'!$F$2*'Optional Inputs'!$F$3",
        "=SUM(D16:F16)",
      ],
      [
        "Operating Leases",
        null,
        "Weight in Cost of Capital",
        "=D16/G16",
        "=E16/G16",
        "=F16/G16",
        "=SUM(D17:F17)",
      ],
      [
        "Operating Leases Value",
        '=FIN("capitalLeaseObligations")',
        "Cost of Component",
        "=B6+D14*B7",
        "=B14*(1-B15)",
        "=IF(ISERROR('Optional Inputs'!$F$4/'Optional Inputs'!$F$3), 0, 'Optional Inputs'!$F$4/'Optional Inputs'!$F$3)",
        "=D17*D18+E17*E18+F17*F18",
      ],
    ],
  };
};

export default getCostOfCapitalData;
