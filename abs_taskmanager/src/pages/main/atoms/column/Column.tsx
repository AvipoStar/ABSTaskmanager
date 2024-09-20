import { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import "../../styles/TasManager.css";
import { setTask } from "../../logic/setTask";
import { Task } from "../task/Task";
import { useSelector } from "react-redux";

interface IColumnProps {
  column: any;
  onColumnNameChange: (
    columnId: number,
    newName: string,
    projectId: number
  ) => void;
  setReloadProject: any;
}

export const Column = ({
  column,
  onColumnNameChange,
  setReloadProject,
}: IColumnProps) => {
  const userData = useSelector((state: any) => state.worker);
  const [name, setName] = useState(column.name);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && name.length != 0) {
      onColumnNameChange(column.id, name, column.project_id);
      setName("");
    }
  };

  const handleTaskNameChange = async (
    taskId: number,
    newName: string,
    columnId: number
  ) => {
    await setTask(newName, columnId, userData.id, taskId);
    setReloadProject(true);
  };

  return (
    <Droppable droppableId={column.id.toString()} type="TASK">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="Column"
        >
          <input
            type="text"
            className="ColumnHeader"
            value={name}
            placeholder="Новая колонка"
            onChange={handleChange}
            onKeyDown={handleKeyPress}
          />
          <Task
            key={"new"}
            task={{
              id: -1,
              name: "",
              column_id: column.id,
            }}
            index={-1}
            onColumnNameChange={handleTaskNameChange}
          />
          {column?.tasks?.map((task: any, index: any) => (
            <Task
              key={task.id}
              task={task}
              index={index}
              onColumnNameChange={handleTaskNameChange}
            />
          ))}

          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
