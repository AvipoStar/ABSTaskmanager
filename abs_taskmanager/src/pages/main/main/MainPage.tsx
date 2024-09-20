import { useEffect, useState } from "react";
import "../styles/MainPage.css";
import { Header } from "../../../ui/Header/main/Header";
import { SideMenu } from "../../../ui/SideMenu/main/SideMenu";
import { useSelector } from "react-redux";
import { getUserTeams } from "../logic/getUserTeams";
import { TasManager } from "../molecules/TasManager";
import { getProjectInfo } from "../logic/getProjectInfo";

export const MainPage = () => {
  const userData = useSelector((state: any) => state.worker);
  const [teams, setTeams] = useState<any[]>([]);
  const [selectedProjectId, setselectedProjectId] = useState(-1);
  const [selectedTeam, setselectedTeam] = useState(-1);

  const [project, setproject] = useState<any | null>(null);
  const [reloadProject, setreloadProject] = useState(false);

  useEffect(() => {
    if (userData && userData.id && userData.id !== 0) {
      const fetchUserTeams = async () => {
        const result = await getUserTeams(userData.id);
        if (result) setTeams(result);
      };

      fetchUserTeams();
    }
  }, [userData?.id]);

  useEffect(() => {
    const fetchProjectInfo = async (projectId: number) => {
      const result = await getProjectInfo(projectId);
      if (result) setproject(result);
    };
    if (selectedProjectId != -1) {
      fetchProjectInfo(selectedProjectId);
      setreloadProject(false);
      handleProjectSelect(selectedProjectId);
    }
  }, [selectedProjectId, reloadProject]);

  const handleProjectSelect = (projectId: number) => {
    setselectedProjectId(projectId);

    teams.map((t: any) => {
      t.projectDirections.map((pd: any) => {
        const project = pd.projects.find(
          (p: any) => p.project_id === projectId
        );
        if (project) {
          setselectedTeam(t.team_id);
        }
      });
    });
  };

  return (
    <div className="MainPage">
      <Header selectedTeam={selectedTeam} />
      <div className="Container">
        <SideMenu tabs={teams} setSelectedProjectId={setselectedProjectId} />
        <TasManager project={project} setReloadProject={setreloadProject} />
      </div>
    </div>
  );
};
