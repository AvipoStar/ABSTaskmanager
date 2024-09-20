import { useState } from "react";
import "../styles/SideMenu.css";
import menuIcon from "../../../assets/menu.svg";
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";
import { Box } from "@mui/material";

interface Project {
  project_id: number;
  project_name: string;
}

interface ProjectDirection {
  project_direction_id: number;
  project_direction_name: string;
  projects: Project[];
}

interface Team {
  team_id: number;
  team_name: string;
  projectDirections: ProjectDirection[];
}

interface ISideMenu {
  tabs: Team[];
  setSelectedProjectId: (id: number) => void;
}

export const SideMenu = (params: ISideMenu) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <>
      <div
        className="SideMenu"
        style={isOpened ? { width: "200px" } : { width: "30px" }}
      >
        {isOpened ? (
          <Box sx={{ minHeight: 352, minWidth: 200 }}>
            <SimpleTreeView>
              {params.tabs.map((team: any) => (
                <TreeItem itemId={`${team.team_id}`} label={team.team_name}>
                  {team.projectDirections.map((projectDirection: any) => (
                    <TreeItem
                      itemId={`${team.team_id}-${projectDirection.project_direction_id}`}
                      label={projectDirection.project_direction_name}
                    >
                      {projectDirection.projects.map((project: any) => (
                        <TreeItem
                          itemId={`${team.team_id}-${projectDirection.project_direction_id}-${project.project_id}`}
                          label={project.project_name}
                          onClick={() =>
                            params.setSelectedProjectId(project.project_id)
                          }
                        />
                      ))}
                    </TreeItem>
                  ))}
                </TreeItem>
              ))}
            </SimpleTreeView>
          </Box>
        ) : (
          <img
            src={menuIcon}
            onClick={() => setIsOpened(true)}
            className="MenuOpen"
          />
        )}
      </div>
      {isOpened && (
        <div
          className="SideMenuBackground"
          onClick={() => setIsOpened(false)}
        />
      )}
    </>
  );
};
