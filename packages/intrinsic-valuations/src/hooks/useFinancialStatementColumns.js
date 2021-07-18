import dayjs from "dayjs";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import selectIsInUS from "../selectors/stockSelectors/selectIsInUS";

const useFinancialStatementColumns = (yearlyStatements, useTTM) => {
  const isInUS = useSelector(selectIsInUS);

  const columns = useMemo(() => {
    let columns = [
      {
        Header: "",
        accessor: "dataField",
      },
    ];

    if (isInUS) {
      if (useTTM) {
        columns.push({
          Header: "TTM",
          accessor: "ttm",
        });
      } else {
        columns.push({
          Header: "Latest",
          accessor: "latest",
        });
      }
    }

    columns = columns.concat(
      Object.values(yearlyStatements).map((statement) => {
        return {
          Header: dayjs(statement.date).format("MMM YY"),
          accessor: statement.date,
        };
      }),
    );

    return columns;
  }, [isInUS, useTTM, yearlyStatements]);

  return columns;
};

export default useFinancialStatementColumns;
