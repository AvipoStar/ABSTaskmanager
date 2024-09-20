import { useEffect, useState } from "react";
import { ContainerWithLabel } from "../../ContainerWithLabel/main/ContainerWithLabel";
import { Modal } from "../../Modal/main/Modal";
import { useSelector } from "react-redux";
import { getRoles } from "../../../config/redux/api/getRoles";
import { useDispatch } from "react-redux";
import { MySelect } from "../../MySelect/organless/MySelect";
import { setRole } from "../logic/setRole";
import { createWorker } from "../logic/setUser";
import { addRoles } from "../logic/addRoles";
import { setRoles } from "../../../config/redux/slices/workerSlice";

interface ISettingsModal {
  selectedTeam: number;
  showSettingsModal: boolean;
  setshowSettingsModal: (showSettingsModal: boolean) => void;
}

export const SettingsModal = (params: ISettingsModal) => {
  const dispatch = useDispatch();
  const roles = useSelector((state: any) => state.roles);
  const directions = useSelector((state: any) => state.directions);

  const [roleName, setroleName] = useState("");
  const [directionName, setdirectionName] = useState("");
  const [newUserData, setnewUserData] = useState<{
    login: string;
    password: string;
    fio: string;
    mail: string;
    roles: any[];
  }>({
    login: "",
    password: "",
    fio: "",
    mail: "",
    roles: [],
  });
  const [newProjectData, setnewProjectData] = useState<{
    name: string;
    direction: any;
  }>({
    name: "",
    direction: {},
  });

  useEffect(() => {
    const fetchRoles = async () => {
      if (roles || roles?.length == 0) {
        const result: any = await getRoles(params.selectedTeam);
        if (result) {
          dispatch(setRoles(result));
        }
      }
    };
    fetchRoles();
  }, []);

  const createRole = async () => {
    await setRole(roleName, params.selectedTeam);
  };
  const createUser = async () => {
    if (
      newUserData.login.length > 0 &&
      newUserData.password.length > 0 &&
      newUserData.fio.length > 0 &&
      newUserData.mail.length > 0 &&
      newUserData.roles.length > 0
    ) {
      const result = await createWorker(
        newUserData.login,
        newUserData.password,
        newUserData.fio,
        newUserData.mail
      );
      if (result) {
        const roleIds = newUserData.roles.map((r) => r.value);
        console.log("roleIds", roleIds);
        if (roleIds.length > 0)
          await addRoles(result, params.selectedTeam, roleIds);
      }
    }
  };
  const createProjectDirection = async () => {};
  const createProject = async () => {};

  return (
    <div>
      <Modal
        show={params.showSettingsModal}
        sethHow={params.setshowSettingsModal}
      >
        <div className="SettingsModal">
          <div className="ModalInner">
            <label className="Title">Роль</label>
            <ContainerWithLabel label="Название роли">
              <input
                type="text"
                className="Input"
                value={roleName}
                onChange={(e) => setroleName(e.target.value)}
              />
            </ContainerWithLabel>
            <button onClick={() => createRole()}>Создать</button>
          </div>

          <div className="verticalLine" />

          <div className="ModalInner">
            <label className="Title">Пользователь</label>

            <ContainerWithLabel label="ФИО">
              <input
                type="text"
                className="Input"
                value={newUserData.fio}
                onChange={(e) =>
                  setnewUserData((prevState) => ({
                    ...prevState,
                    fio: e.target.value,
                  }))
                }
              />
            </ContainerWithLabel>
            <ContainerWithLabel label="Логин">
              <input
                type="text"
                className="Input"
                value={newUserData.login}
                onChange={(e) =>
                  setnewUserData((prevState) => ({
                    ...prevState,
                    login: e.target.value,
                  }))
                }
              />
            </ContainerWithLabel>
            <ContainerWithLabel label="Пароль">
              <input
                type="text"
                className="Input"
                value={newUserData.password}
                onChange={(e) =>
                  setnewUserData((prevState) => ({
                    ...prevState,
                    password: e.target.value,
                  }))
                }
              />
            </ContainerWithLabel>
            <ContainerWithLabel label="E-Mail">
              <input
                type="text"
                className="Input"
                value={newUserData.mail}
                onChange={(e) =>
                  setnewUserData((prevState) => ({
                    ...prevState,
                    mail: e.target.value,
                  }))
                }
              />
            </ContainerWithLabel>
            <ContainerWithLabel label="Роли">
              <MySelect
                isMulty={true}
                options={roles ?? []}
                onChange={(e: any) =>
                  setnewUserData((prevState) => ({
                    ...prevState,
                    roles: e,
                  }))
                }
                itemKey={"id"}
                label={"name"}
                placeholder={""}
              />
            </ContainerWithLabel>
            <button onClick={() => createUser()}>Создать</button>
          </div>

          <div className="verticalLine" />

          <div className="ModalInner">
            <label className="Title">Направление проекта</label>
            <ContainerWithLabel label="Название направления">
              <input
                type="text"
                className="Input"
                value={directionName}
                onChange={(e) => setdirectionName(e.target.value)}
              />
            </ContainerWithLabel>
            <button onClick={() => createProjectDirection()}>Создать</button>
          </div>

          <div className="verticalLine" />

          <div className="ModalInner">
            <label className="Title">Проект</label>
            <ContainerWithLabel label="Название проекта">
              <input
                type="text"
                className="Input"
                value={newProjectData.name}
                onChange={(e) =>
                  setnewProjectData((prevState) => ({
                    ...prevState,
                    name: e.target.value,
                  }))
                }
              />
            </ContainerWithLabel>
            <ContainerWithLabel label="Направление">
              <MySelect
                isMulty={true}
                options={directions ?? []}
                onChange={(e: any) =>
                  setnewProjectData((prevState) => ({
                    ...prevState,
                    direction: e,
                  }))
                }
                itemKey={"id"}
                label={"name"}
                placeholder={""}
              />
            </ContainerWithLabel>
            <button onClick={() => createProject()}>Создать</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
