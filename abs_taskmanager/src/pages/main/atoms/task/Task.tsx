import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import "../../styles/TasManager.css";

interface ITaskProps {
  task: any;
  index: number;
  onColumnNameChange: (
    taskId: number,
    newName: string,
    columnId: number
  ) => void;
}

export const Task = ({ task, index, onColumnNameChange }: ITaskProps) => {
  const [taskname, settaskName] = useState(task.name);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    settaskName(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && taskname.length != 0) {
      onColumnNameChange(task.id, taskname, task.column_id);
      settaskName("");
    }
  };

  return (
    <div
      className="task"
      style={
        task.priority_id == 1
          ? { border: "#ff6868 2px solid", backgroundColor: "#847987" }
          : task.priority_id == 2
          ? { border: "#e8a700 2px solid", backgroundColor: "#918574" }
          : { border: "#0ebe3f 2px solid", backgroundColor: "#698986" }
      }
    >
      <Draggable draggableId={task.toString()} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <input
              type="text"
              className="taskImput"
              value={taskname}
              placeholder="Новая задача"
              onChange={handleChange}
              onKeyDown={handleKeyPress}
            />
          </div>
        )}
      </Draggable>
    </div>
  );
};
