const getEmployeeOptionsData = () => {
  return {
    name: "Employee Options",
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
        format: "million",
      },
      {
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
            comment:
              "Calculated from the inputs you entered in the Employee Options section. We use the Black Scholes methodology to work out the estimated market price per employee option. We then minus this from the 'Equity' cell in the Valuation Output (cell B34).",
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
          11: {},
          12: {},
          13: {},
          14: {},
        },
      },
      1: {
        cells: {
          0: {},
          1: {
            style: 6,
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
          11: {},
          12: {},
          13: {},
          14: {},
        },
      },
      2: {
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
          11: {},
          12: {},
          13: {},
          14: {},
        },
      },
      3: {
        cells: {
          0: {},
          1: {
            style: 4,
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
          11: {},
          12: {},
          13: {},
          14: {},
        },
      },
      4: {
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
          11: {},
          12: {},
          13: {},
          14: {},
        },
      },
      5: {
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
          11: {},
          12: {},
          13: {},
          14: {},
        },
      },
      6: {
        cells: {
          0: {},
          1: {
            style: 6,
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
          11: {},
          12: {},
          13: {},
          14: {},
        },
      },
      7: {
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
          11: {},
          12: {},
          13: {},
          14: {},
        },
      },
      8: {
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
          12: {},
          13: {},
          14: {},
        },
      },
      9: {
        cells: {
          0: {},
          1: {
            style: 4,
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
          11: {},
          12: {},
          13: {},
          14: {},
        },
      },
      10: {
        cells: {
          0: {},
          1: {
            style: 4,
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
          11: {},
          12: {},
          13: {},
          14: {},
        },
      },
      11: {
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
          12: {},
          13: {},
          14: {},
        },
      },
      12: {
        cells: {
          0: {},
          1: {
            style: 4,
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
          11: {},
          12: {},
          13: {},
          14: {},
        },
      },
      13: {
        cells: {
          0: {},
          1: {
            style: 4,
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
          11: {},
          12: {},
          13: {},
          14: {},
        },
      },
      14: {
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
          12: {},
          13: {},
          14: {},
        },
      },
      15: {
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
          11: {},
          12: {},
          13: {},
          14: {},
        },
      },
      16: {
        cells: {
          0: {},
          1: {
            style: 7,
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
          11: {},
          12: {},
          13: {},
          14: {},
        },
      },
      17: {
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
          12: {},
          13: {},
          14: {},
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
          11: {},
          12: {},
          13: {},
          14: {},
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
          11: {},
          12: {},
          13: {},
          14: {},
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
          11: {},
          12: {},
          13: {},
          14: {},
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
          11: {},
          12: {},
          13: {},
          14: {},
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
          11: {},
          12: {},
          13: {},
          14: {},
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
          11: {},
          12: {},
          13: {},
          14: {},
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
          11: {},
          12: {},
          13: {},
          14: {},
        },
      },
      25: {
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
          12: {},
          13: {},
          14: {},
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
          11: {},
          12: {},
          13: {},
          14: {},
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
          11: {},
          12: {},
          13: {},
          14: {},
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
          11: {},
          12: {},
          13: {},
          14: {},
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
          11: {},
          12: {},
          13: {},
          14: {},
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
          11: {},
          12: {},
          13: {},
          14: {},
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
          11: {},
          12: {},
          13: {},
          14: {},
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
          11: {},
          12: {},
          13: {},
          14: {},
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
          11: {},
          12: {},
          13: {},
          14: {},
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
          11: {},
          12: {},
          13: {},
          14: {},
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
          11: {},
          12: {},
          13: {},
          14: {},
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
          11: {},
          12: {},
          13: {},
          14: {},
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
          11: {},
          12: {},
          13: {},
          14: {},
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
          11: {},
          12: {},
          13: {},
          14: {},
        },
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
        cells: {
          1: {},
        },
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
    },
    cols: {
      0: {
        width: 260,
      },
      1: {
        width: 165,
      },
    },
    validations: [],
    autofilter: {},
    serializedValues: [
      ["Black Scholes Employee Options Results"],
      ["Employee Options Outstanding", "='Optional Inputs'!$H$2"],
      ["Average Strike Price", "='Optional Inputs'!$H$3"],
      ["Average Maturity", "='Optional Inputs'!$H$4"],
      [
        "Standard deviation in stock price (volatility)",
        '=FIN("standardDeviationInStockPrices")',
      ],
      ["Risk free rate", '=FIN("riskFreeRate")'],
      ["Shares outstanding", '=FIN("sharesOutstanding")'],
      ["Share price", '=FIN("price")'],
      [""],
      [
        "d1",
        "=IFERROR((LN(B8 / B3) + (B6 + (B5 * B5) / 2) * B4) / (B5 * SQRT(B4)), 0)",
      ],
      ["N (d1)", "=NORMDIST(B10, 0, 1, TRUE)"],
      [""],
      ["d2", "=B10 - B5 * SQRT(B4)"],
      ["N (d2)", "=NORMDIST(B13, 0, 1, TRUE)"],
      [""],
      ["Value per option", "=B8 * B11 - B3 * EXP(-B6 * B4) * B14"],
      ["Value of all options", "=B16*B2"],
    ],
  };
};

export default getEmployeeOptionsData;
