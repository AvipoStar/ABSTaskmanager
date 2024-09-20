import { useEffect, useState } from "react";
import { getCountTables } from "../logic/getCountTables";
import "../styles/DatabaseManagmentPage.css";
import { getTablesColumns } from "../logic/getTablesColumns";
import { Table } from "../molecules/Table";
import { TablesSideMenu } from "../molecules/TablesSideMenu";
import { TableValues } from "../molecules/TableValues";
import { TableVeiws } from "../molecules/TableVeiws";

export interface INewColumn {
  name: string;
  type: string;
  notNull: boolean;
  primaryKey: boolean;
  autoInc: boolean;
  nulls?: number;
}

export interface IEditedTable {
  name?: string;
  columns?: INewColumn[];
}

export const DatabaseManagment = () => {
  const [tablesCount, settablesCount] = useState<any | null>(null);
  const [tablesColumns, settablesColumns] = useState<any>();
  const [selectedTable, setselectedTable] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState<"table" | "tableValues" | "veiws">(
    "table"
  ); // Состояние для активной вкладки

  useEffect(() => {
    getTables();
  }, []);

  const getTables = async () => {
    const resultCountTables = await getCountTables();
    if (resultCountTables) settablesCount(resultCountTables);
    const resultTablesColumns = await getTablesColumns();
    if (resultTablesColumns) settablesColumns(resultTablesColumns);
  };

  // Функция для переключения вкладок
  const handleTabChange = (tab: "table" | "tableValues" | "veiws") => {
    setActiveTab(tab);
  };

  return (
    <div className="DatabaseManagmentPage">
      <TablesSideMenu
        tablesCount={tablesCount}
        tablesColumns={tablesColumns}
        setselectedTable={setselectedTable}
      />
      <div style={{ width: "100%" }}>
        <div className="tabs">
          <button onClick={() => handleTabChange("table")}>Параметры</button>
          <button onClick={() => handleTabChange("tableValues")}>
            Значения
          </button>
          <button onClick={() => handleTabChange("veiws")}>Выборки</button>
        </div>

        {/* Отрисовка выбранного компонента в зависимости от активной вкладки */}
        {activeTab === "table" && <Table tableInfo={selectedTable} />}
        {activeTab === "tableValues" && (
          <TableValues tableInfo={selectedTable} />
        )}
        {activeTab === "veiws" && <TableVeiws />}
      </div>
    </div>
  );
};
