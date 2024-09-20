import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import "../styles/TasManager.css";
import { setColumn } from "../logic/setColumn";
import { Column } from "../atoms/column/Column";

const reorder = (list: any, startIndex: any, endIndex: any) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

interface ITaskmanager {
  project: any;
  setReloadProject: any;
}

export const TasManager = (params: ITaskmanager) => {
  const [columns, setColumns] = useState<any[]>([]);

  useEffect(() => {
    if (params.project?.columns) setColumns(params.project.columns);
  }, [params.project]);

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId !== destination.droppableId) {
      const startColumn = columns.find(
        (col: any) => col.id === parseInt(source.droppableId)
      );
      const finishColumn = columns.find(
        (col: any) => col.id === parseInt(destination.droppableId)
      );
      const startTasks = Array.from(startColumn.tasks);
      const finishTasks = Array.from(finishColumn.tasks);

      const [movedTask] = startTasks.splice(source.index, 1);

      finishTasks.splice(destination.index, 0, movedTask);

      const newColumns = columns.map((col: any) => {
        if (col.id === parseInt(source.droppableId)) {
          return { ...col, tasks: startTasks };
        }
        if (col.id === parseInt(destination.droppableId)) {
          return { ...col, tasks: finishTasks };
        }
        return col;
      });

      setColumns(newColumns);
    } else {
      const column = columns.find(
        (col: any) => col.id === parseInt(source.droppableId)
      );
      const reorderedTasks = reorder(
        column.tasks,
        source.index,
        destination.index
      );
      const newColumns = columns.map((col: any) => {
        if (col.id === column.id) {
          return { ...col, tasks: reorderedTasks };
        }
        return col;
      });

      setColumns(newColumns);
    }
  };

  const handleColumnNameChange = async (
    columnId: number,
    newName: string,
    projectId: number
  ) => {
    const result = await setColumn(newName, projectId, columnId);
    if (result) {
      params.setReloadProject(true);
    }
  };

  return (
    <div className="TasManager">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-columns" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="kanban-board"
            >
              {columns.map((column: any) => (
                <Column
                  key={column.id}
                  column={column}
                  onColumnNameChange={handleColumnNameChange}
                  setReloadProject={params.setReloadProject}
                />
              ))}
              {columns.length !== 0 && (
                <Column
                  key={"new"}
                  column={{
                    id: -1,
                    name: "",
                    project_id: params.project.project_info.id,
                  }}
                  onColumnNameChange={handleColumnNameChange}
                  setReloadProject={params.setReloadProject}
                />
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
