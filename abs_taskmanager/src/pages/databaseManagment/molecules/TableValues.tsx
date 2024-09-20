import { useEffect, useState } from "react";
import "../styles/TableValues.css";
import { getTableValues } from "../logic/getTableValues";
import { ITable } from "./Table";
import { changeData } from "../logic/changeData";

export const TableValues = (params: ITable) => {
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);

  const fetchData = async (tableName: string) => {
    const result = await getTableValues(tableName);
    if (result) {
      setData(result);
      if (result.length > 0) {
        setColumns(Object.keys(result[0]));
      }
    }
  };

  useEffect(() => {
    if (params.tableInfo && params.tableInfo?.tableName) {
      fetchData(params.tableInfo.tableName);
    }
  }, [params.tableInfo]);

  const updateData = (rowIndex: number, column: string, value: string) => {
    const updatedData = [...data];
    updatedData[rowIndex] = {
      ...updatedData[rowIndex],
      [column]: value,
    };
    setData(updatedData);
  };

  const handleSaveData = async (
    tableName: string,
    columnName: string,
    stringId: number,
    value: string
  ) => {
    await changeData(tableName, columnName, stringId, value);
  };

  // useEffect(() => {
  //   console.log("data", data);
  // }, [data]);

  return (
    <table className="TableValues">
      <thead>
        <tr className="TableString">
          {columns.map((column) => (
            <th key={column} className="TableValue">
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className="TableString">
            {columns.map((column) => (
              <td key={column} className="TableValue">
                <input
                  type="text"
                  value={row[column]}
                  className="inputField"
                  onChange={(e) => {
                    updateData(rowIndex, column, e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSaveData(
                        params.tableInfo.tableName,
                        column,
                        row.id,
                        data[rowIndex][column]
                      );
                    }
                  }}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
