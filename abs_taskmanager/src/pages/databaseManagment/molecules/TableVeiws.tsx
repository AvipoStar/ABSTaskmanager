import { useEffect, useState } from "react";
import "../styles/TableViews.css";
import {
  getDirections,
  getFirstView,
  getSecondView,
  getThirdView,
} from "../logic/getTableView";
import { MySelect } from "../../../ui/MySelect/organless/MySelect";

export const TableVeiws = () => {
  const [views, setviews] = useState<any | null>(null);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [directions, setDirections] = useState<any[]>([]);
  const [selectedDirections, setselectedDirections] = useState<any[]>([]);

  useEffect(() => {
    fetchviews();
    fetchDirections();
  }, []);

  const fetchviews = async () => {
    const result1 = await getFirstView();
    if (result1) {
      setviews({ ...views, first: result1 });
    }
  };

  const fetchDirections = async () => {
    const result1 = await getDirections();
    if (result1) {
      setDirections(result1);
    }
  };

  const fetchSecondView = async () => {
    const result2 = await getSecondView(startDate, endDate);
    if (result2) {
      setviews({ ...views, second: result2 });
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    fetchSecondView();
  };

  useEffect(() => {
    if (selectedDirections) {
      const dirIds = selectedDirections.map((item: any) => item.value);
      fetchThirdView(dirIds);
    }
  }, [selectedDirections]);

  const fetchThirdView = async (dirIds: number[]) => {
    const result2 = await getThirdView(dirIds);
    if (result2) {
      setviews({ ...views, second: result2 });
    }
  };

  return (
    <div className="TableVeiws">
      <div>
        <h2>Группировки данных с вычислениями статистических показателей</h2>
        <table>
          <thead>
            <tr>
              <th>Column ID</th>
              <th>Total Tasks</th>
              <th>Average Priority</th>
              <th>Completed Tasks</th>
            </tr>
          </thead>
          <tbody>
            {views?.first?.map((item: any, index: number) => (
              <tr key={index}>
                <td>{item.column_id}</td>
                <td>{item.total_tasks}</td>
                <td>{item.average_priority?.toFixed(2)}</td>
                <td>{item.completed_tasks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2>Функции по работе с датой/временем</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Начальная дата:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </label>
          <label>
            Конечная дата:
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </label>
          <button type="submit">Фильтровать</button>
        </form>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>birthday</th>
              <th>fio</th>
            </tr>
          </thead>
          <tbody>
            {views?.second?.map((item: any, index: any) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.birthday}</td>
                <td>{item.fio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2>Проверки вхождение во множество</h2>
        <MySelect
          isMulty={true}
          options={directions ?? []}
          onChange={(e: any) => setselectedDirections(e)}
          itemKey={"id"}
          label={"name"}
          placeholder={"Направления"}
        />
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>isActive</th>
              <th>name</th>
              <th>project_direction_name</th>
              <th>team_id</th>
            </tr>
          </thead>
          <tbody>
            {views?.second?.map((item: any, index: any) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.isActive}</td>
                <td>{item.name}</td>
                <td>{item.project_direction_name}</td>
                <td>{item.team_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
