import "../styles/TablesSideMenu.css";
import "../styles/DatabaseManagmentPage.css";
import { dropTable } from "../logic/dropTable";
import dropImage from "../../../assets/delete.svg";
interface ITablesSideMenu {
  tablesCount: any;
  tablesColumns: any[];
  setselectedTable: any;
}
export const TablesSideMenu = (params: ITablesSideMenu) => {

  const handleDropTable = async (tableName: any) => {
    await dropTable(tableName);
  };

  return (
    <div className="TablesSideMenu">
      <div className="DatabaseManagmentPage__TablesValues">
        <div>Количество таблиц: {params.tablesCount?.countTables}</div>
        <div>Количество предствлений: {params.tablesCount?.countViews}</div>
      </div>
      <div className="DatabaseManagmentPage__TablesValues">
        <button onClick={() => params.setselectedTable(null)}>
          Новая таблица
        </button>
        <div>
          {params.tablesColumns?.map((tc: any) => (
            <div className="DatabaseManagmentPage__TableColumns">
              <div onClick={() => params.setselectedTable(tc)}>
                {tc.tableName}
              </div>
              <img
                src={dropImage}
                className="Icon"
                onClick={() => handleDropTable(tc.tableName)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
