import { useEffect, useState } from "react";
import { setTable } from "../logic/setTable";
import { IEditedTable, INewColumn } from "../main/DatabaseManagment";
import "../styles/Table.css";
import { MySelect } from "../../../ui/MySelect/organless/MySelect";
import { getTableColumnsInfo } from "../logic/getTableColumnsInfo";
import { alterTable } from "../logic/alterTable";
import dropImage from "../../../assets/delete.svg";
import { setIndex } from "../logic/setIndex";
import { getColumnNulls } from "../logic/getColumnNulls";

export interface ITable {
  tableInfo: { tableName: string; columns: any[] };
}
export const Table = (params: ITable) => {
  const [newTable, setnewTable] = useState<IEditedTable | null>(null);

  useEffect(() => {
    if (!params.tableInfo) {
      setnewTable(null);
    } else fetchTableColumnsInfo(params.tableInfo?.tableName);
  }, [params.tableInfo]);

  const fetchTableColumnsInfo = async (tableName: string) => {
    const result = await getTableColumnsInfo(tableName);
    if (result)
      setnewTable({
        ...newTable,
        columns: result,
        name: params.tableInfo.tableName,
      });
  };

  const handleAddColumn = () => {
    const newColumn: INewColumn = {
      name: "",
      type: "VARCHAR(255)",
      notNull: false,
      primaryKey: false,
      autoInc: false,
    };
    setnewTable({
      ...newTable,
      columns: [...(newTable?.columns || []), newColumn],
    });
  };

  const handleDropColumn = async (index: any) => {
    if (newTable && newTable.columns) {
      console.log("index", index);
      console.log("newTable.columns", newTable.columns);
      // Удаляем столбец по индексу
      const updatedColumns = newTable.columns.filter((c) => c.name !== index);
      console.log("updatedColumns", updatedColumns);
      // Обновляем состояние новой таблицы
      setnewTable({
        ...newTable,
        columns: updatedColumns,
      });
      handleAlterTable({ columns: updatedColumns, name: newTable.name });
    }
  };

  const handleColumnNameChange = (index: number, value: string) => {
    const updatedColumns = newTable?.columns?.map((column, idx) => {
      if (idx === index) {
        return { ...column, name: value };
      }
      return column;
    });
    setnewTable({ ...newTable, columns: updatedColumns });
  };
  const handleColumnTypeChange = (index: number, value: string) => {
    const updatedColumns = newTable?.columns?.map((column, idx) => {
      if (idx === index) {
        return { ...column, type: value };
      }
      return column;
    });

    setnewTable({ ...newTable, columns: updatedColumns });
  };
  const handleColumnBoolValueChange = (
    index: number,
    field: keyof INewColumn
  ) => {
    const updatedColumns = newTable?.columns?.map((column, idx) => {
      if (idx === index) {
        return { ...column, [field]: !column[field] }; // Переключаем значение булевого поля
      }
      return column;
    });
    setnewTable({ ...newTable, columns: updatedColumns });
  };

  const handleCreateTable = async () => {
    if (newTable?.name != "" && newTable?.columns) {
      await setTable(newTable);
      setnewTable(null);
    }
  };

  const handleAlterTable = async (newTableData: IEditedTable) => {
    if (
      newTableData &&
      newTableData.name &&
      newTableData?.name != "" &&
      newTableData?.columns
    ) {
      await alterTable(newTableData);
      setnewTable(null);
      fetchTableColumnsInfo(newTableData.name);
    }
  };

  useEffect(() => {
    console.log("newTable?.columns", newTable?.columns);
  }, [newTable?.columns]);

  const handleCreateIndex = async (
    table_name: string,
    index_name: any,
    column_name: string
  ) => {
    await setIndex(table_name, index_name, column_name);
  };

  const handleCheckNulls = async (tableName: string, columnName: string) => {
    const result = await getColumnNulls(tableName, columnName);
    if (result && result !== undefined) {
      const updatedColumns = newTable?.columns?.map((column) => {
        if (column.name === columnName) {
          return { ...column, nulls: result };
        }
        return column;
      });
      setnewTable((prev) => ({ ...prev, columns: updatedColumns }));
    }
  };

  return (
    <div className="Table">
      <div className="TableName">
        Название таблицы:
        <input
          type="text"
          value={newTable?.name ?? ""}
          onChange={(e) => {
            setnewTable({
              ...newTable,
              name: e.target.value,
            });
          }}
        />
        <button onClick={handleAddColumn}>Добавить столбец</button>
        <button onClick={handleCreateTable}>Создать</button>
        <button onClick={() => handleAlterTable(newTable ?? {})}>
          Сохранить
        </button>
      </div>
      <div style={{ width: "100%" }}>
        <div className="Columns">
          <div>Primary key</div>
          <div>Название столбца</div>
          <div>Тип столбца</div>
          <div>Автоинкремент</div>
          <div>Not NULL</div>
          <div>Добавить индекс</div>
        </div>
        {newTable?.columns?.map((c, index) => (
          <div className="Columns">
            <input
              type="checkbox"
              checked={c.primaryKey}
              onChange={() => handleColumnBoolValueChange(index, "primaryKey")}
            />
            <input
              type="text"
              value={c.name}
              onChange={(e) => handleColumnNameChange(index, e.target.value)}
            />
            <MySelect
              isMulty={false}
              options={[
                { value: "int(11)", label: "Число" },
                { value: "double", label: "Число дробное" },
                { value: "varchar(10)", label: "Строка 10" },
                { value: "varchar(50)", label: "Строка 50" },
                { value: "varchar(250)", label: "Строка 250" },
                { value: "tinyint(1)", label: "Логический" },
                { value: "datetime", label: "Дата и время" },
              ]}
              selected={[
                { value: "int(11)", label: "Число" },
                { value: "double", label: "Число дробное" },
                { value: "varchar(10)", label: "Строка 10" },
                { value: "varchar(50)", label: "Строка 50" },
                { value: "varchar(250)", label: "Строка 250" },
                { value: "tinyint(1)", label: "Логический" },
                { value: "datetime", label: "Дата и время" },
              ].map((s) => {
                if (s.value == c.type) return s;
              })}
              onChange={(selectedOption: any) =>
                handleColumnTypeChange(index, selectedOption.value)
              }
              itemKey={"value"}
              label={"label"}
              placeholder={"Тип"}
            />
            <input
              type="checkbox"
              checked={c.autoInc}
              onChange={() => handleColumnBoolValueChange(index, "autoInc")}
            />
            <input
              type="checkbox"
              checked={c.notNull}
              onChange={() => handleColumnBoolValueChange(index, "notNull")}
            />
            <input
              type="text"
              onKeyDown={(e: any) => {
                if (e.key === "Enter") {
                  handleCreateIndex(
                    params.tableInfo.tableName,
                    e.target?.value,
                    c.name
                  );
                }
              }}
            />
            <img
              src={dropImage}
              onClick={() => handleDropColumn(c.name)}
              className="Icon"
            />
            <button
              onClick={() =>
                handleCheckNulls(params.tableInfo.tableName, c.name)
              }
            >
              Показать количество NULL значений {c.nulls || ""}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
